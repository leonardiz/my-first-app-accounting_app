const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/User");
const Company = require("./models/Company");
const Account = require("./models/Account");
const JournalEntry = require("./models/JournalEntry");

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;
const groqApiKey = process.env.GROQ_API_KEY || "";
const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const mongoUri = process.env.MONGODB_URI || "";
const jwtSecret = process.env.JWT_SECRET || "";
const authCookieName = "ledgrai_token";

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(root));

app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail }).lean();
    if (existingUser) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    setAuthCookie(res, user._id.toString());
    return res.status(201).json({
      user: serializeUser(user),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to register user.");
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    setAuthCookie(res, user._id.toString());
    return res.json({
      user: serializeUser(user),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to log in.");
  }
});

app.post("/auth/logout", (req, res) => {
  clearAuthCookie(res);
  return res.json({ success: true });
});

app.get("/auth/me", async (req, res) => {
  try {
    const userId = readAuthToken(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const user = await User.findById(userId);
    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({ error: "Unauthorized." });
    }

    const company = await Company.findOne({ userId: user._id }).lean();
    return res.json({
      user: serializeUser(user),
      company: serializeCompany(company),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to load current user.");
  }
});

app.use("/api", requireAuth);

app.get("/api/bootstrap", async (req, res) => {
  try {
    const [company, accounts, journalEntries] = await Promise.all([
      Company.findOne({ userId: req.user._id }).lean(),
      Account.find({ userId: req.user._id }).sort({ code: 1, name: 1 }).lean(),
      JournalEntry.find({ userId: req.user._id }).sort({ date: -1, createdAt: -1 }).lean(),
    ]);

    return res.json({
      user: serializeUser(req.user),
      company: serializeCompany(company),
      accounts: accounts.map(serializeAccount),
      journalEntries: journalEntries.map(serializeJournalEntry),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to load workspace data.");
  }
});

app.put("/api/company", async (req, res) => {
  try {
    const payload = normalizeCompanyPayload(req.body || {});
    const company = await Company.findOneAndUpdate(
      { userId: req.user._id },
      { ...payload, userId: req.user._id },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.json({ company: serializeCompany(company) });
  } catch (error) {
    return sendServerError(res, error, "Failed to save company settings.");
  }
});

app.post("/api/accounts", async (req, res) => {
  try {
    const payload = normalizeAccountPayload(req.body || {});
    const account = await Account.create({
      userId: req.user._id,
      ...payload,
    });
    return res.status(201).json({ account: serializeAccount(account) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Account code must be unique." });
    }
    return sendServerError(res, error, "Failed to create account.");
  }
});

app.put("/api/accounts/:id", async (req, res) => {
  try {
    const payload = normalizeAccountPayload(req.body || {});
    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      payload,
      { new: true, runValidators: true },
    );

    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    return res.json({ account: serializeAccount(account) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Account code must be unique." });
    }
    return sendServerError(res, error, "Failed to update account.");
  }
});

app.delete("/api/accounts/:id", async (req, res) => {
  try {
    const isReferenced = await JournalEntry.exists({
      userId: req.user._id,
      "lines.accountId": req.params.id,
    });
    if (isReferenced) {
      return res.status(409).json({
        error: "This account is used in journal entries and cannot be deleted.",
      });
    }

    const deletion = await Account.deleteOne({ _id: req.params.id, userId: req.user._id });
    if (!deletion.deletedCount) {
      return res.status(404).json({ error: "Account not found." });
    }

    return res.json({ success: true });
  } catch (error) {
    return sendServerError(res, error, "Failed to delete account.");
  }
});

app.post("/api/journal-entries", async (req, res) => {
  try {
    const payload = normalizeJournalEntryPayload(req.body || {});
    const journalEntry = await JournalEntry.create({
      userId: req.user._id,
      ...payload,
    });
    return res.status(201).json({ journalEntry: serializeJournalEntry(journalEntry) });
  } catch (error) {
    return sendServerError(res, error, "Failed to create journal entry.");
  }
});

app.put("/api/journal-entries/:id", async (req, res) => {
  try {
    const payload = normalizeJournalEntryPayload(req.body || {});
    const journalEntry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      payload,
      { new: true, runValidators: true },
    );

    if (!journalEntry) {
      return res.status(404).json({ error: "Journal entry not found." });
    }

    return res.json({ journalEntry: serializeJournalEntry(journalEntry) });
  } catch (error) {
    return sendServerError(res, error, "Failed to update journal entry.");
  }
});

app.delete("/api/journal-entries/:id", async (req, res) => {
  try {
    const deletion = await JournalEntry.deleteOne({ _id: req.params.id, userId: req.user._id });
    if (!deletion.deletedCount) {
      return res.status(404).json({ error: "Journal entry not found." });
    }

    return res.json({ success: true });
  } catch (error) {
    return sendServerError(res, error, "Failed to delete journal entry.");
  }
});

app.post("/api/assistant", async (req, res) => {
  if (!groqApiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY is not configured on the server.",
    });
  }

  try {
    const payload = req.body || {};
    const conversation = Array.isArray(payload.messages) ? payload.messages : [];
    const financialData = payload.financialData || {};

    const systemPrompt = [
      "You are the LedgrAI finance assistant embedded in an accounting web app.",
      "Answer only from the supplied financial data context.",
      "If data is incomplete, say what is missing and make that limitation explicit.",
      "Keep answers concise and practical for a business user.",
      "Use simple accounting language and cite relevant figures from the provided context.",
      "",
      "Financial data context:",
      JSON.stringify(financialData, null, 2),
    ].join("\n");

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: groqModel,
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          { role: "system", content: systemPrompt },
          ...conversation.map((message) => ({
            role: message.role === "assistant" ? "assistant" : "user",
            content: message.content || "",
          })),
        ],
      }),
    });

    const data = await groqResponse.json();
    if (!groqResponse.ok) {
      return res.status(groqResponse.status).json({
        error: data?.error?.message || "Groq request failed.",
      });
    }

    const text = data?.choices?.[0]?.message?.content || "";
    return res.json({
      message: text || "No response returned from Groq.",
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to process assistant request.");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

start();

async function start() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`LedgrAI running at http://localhost:${port}`);
  });
}

async function requireAuth(req, res, next) {
  try {
    const userId = readAuthToken(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const user = await User.findById(userId);
    if (!user) {
      clearAuthCookie(res);
      return res.status(401).json({ error: "Unauthorized." });
    }

    req.user = user;
    return next();
  } catch {
    clearAuthCookie(res);
    return res.status(401).json({ error: "Unauthorized." });
  }
}

function setAuthCookie(res, userId) {
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
  res.cookie(authCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(authCookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function readAuthToken(req) {
  const token = req.cookies?.[authCookieName];
  if (!token) {
    return null;
  }

  const decoded = jwt.verify(token, jwtSecret);
  return decoded?.userId || null;
}

function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function serializeCompany(company) {
  if (!company) {
    return {
      name: "",
      industry: "",
      businessType: "",
      address: "",
      phone: "",
      email: "",
      currency: "NGN",
      financialYearStart: "",
    };
  }

  return {
    name: company.name || "",
    industry: company.industry || "",
    businessType: company.businessType || "",
    address: company.address || "",
    phone: company.phone || "",
    email: company.email || "",
    currency: company.currency || "NGN",
    country: company.country || "",
    stateProvince: company.stateProvince || "",
    city: company.city || "",
    financialYearStart: company.financialYearStart || "",
  };
}

function serializeAccount(account) {
  return {
    id: account._id.toString(),
    code: account.code,
    name: account.name,
    type: account.type,
    openingBalance: Number(account.openingBalance) || 0,
  };
}

function serializeJournalEntry(entry) {
  return {
    id: entry._id.toString(),
    date: entry.date,
    description: entry.description,
    lineItems: (entry.lines || []).map((line) => ({
      accountId: line.accountId.toString(),
      debit: Number(line.debit) || 0,
      credit: Number(line.credit) || 0,
    })),
  };
}

function normalizeCompanyPayload(payload) {
  return {
    name: String(payload.companyName || payload.name || "").trim(),
    industry: String(payload.industry || "").trim(),
    businessType: String(payload.businessType || "").trim(),
    address: String(payload.address || "").trim(),
    phone: String(payload.phone || "").trim(),
    email: String(payload.email || "").trim(),
    currency: String(payload.currency || "NGN").trim().toUpperCase(),
    country: String(payload.country || "").trim(),
    stateProvince: String(payload.stateProvince || "").trim(),
    city: String(payload.city || "").trim(),
    financialYearStart: String(payload.financialYearStart || "").trim(),
  };
}

function normalizeAccountPayload(payload) {
  return {
    code: String(payload.code || "").trim(),
    name: String(payload.name || "").trim(),
    type: String(payload.type || "").trim(),
    openingBalance: Number(payload.openingBalance) || 0,
  };
}

function normalizeJournalEntryPayload(payload) {
  return {
    date: String(payload.date || "").trim(),
    description: String(payload.description || "").trim(),
    lines: Array.isArray(payload.lineItems || payload.lines)
      ? (payload.lineItems || payload.lines).map((line) => ({
          accountId: line.accountId,
          debit: Number(line.debit) || 0,
          credit: Number(line.credit) || 0,
        }))
      : [],
  };
}

function sendServerError(res, error, message) {
  console.error(message, error);
  return res.status(500).json({
    error: message,
    details: error instanceof Error ? error.message : String(error),
  });
}
