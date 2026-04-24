const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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
const isProduction = process.env.NODE_ENV === "production";
const allowedAccountTypes = new Set(["Asset", "Liability", "Equity", "Revenue", "Expense"]);

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://countriesnow.space"],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    frameguard: { action: "deny" },
  }),
);
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: "Too many requests from this IP. Please wait 15 minutes and try again.",
      });
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(sanitizeRequestBody);
app.use(express.static(root));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many authentication attempts. Please wait 15 minutes before trying again.",
    });
  },
});

app.post("/auth/register", authLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    const normalizedEmail = sanitizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail }).lean();
    if (existingUser) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: sanitizeText(name),
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

app.post("/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: sanitizeEmail(email) });
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

    const { companies, activeCompany } = await resolveUserCompanies(user);
    return res.json({
      user: serializeUser(user),
      activeCompanyId: activeCompany?._id?.toString() || "",
      company: serializeCompany(activeCompany),
      companies: companies.map(serializeCompany),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to load current user.");
  }
});

app.use("/api", requireAuth);

app.get("/api/bootstrap", async (req, res) => {
  try {
    const { companies, activeCompany } = await resolveUserCompanies(req.user);
    const activeCompanyId = activeCompany?._id || null;
    const [accounts, journalEntries] = activeCompanyId
      ? await Promise.all([
          Account.find({ userId: req.user._id, companyId: activeCompanyId })
            .sort({ code: 1, name: 1 })
            .lean(),
          JournalEntry.find({ userId: req.user._id, companyId: activeCompanyId })
            .sort({ date: -1, createdAt: -1 })
            .lean(),
        ])
      : [[], []];

    return res.json({
      user: serializeUser(req.user),
      activeCompanyId: activeCompanyId?.toString() || "",
      company: serializeCompany(activeCompany),
      companies: companies.map(serializeCompany),
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
    let company = await getActiveCompany(req.user);
    if (!company) {
      company = await Company.create({
        userId: req.user._id,
        ...payload,
      });
      await User.updateOne({ _id: req.user._id }, { $set: { activeCompanyId: company._id } });
      req.user.activeCompanyId = company._id;
    } else {
      company = await Company.findOneAndUpdate(
        { _id: company._id, userId: req.user._id },
        payload,
        { new: true, runValidators: true },
      );
    }

    const companies = await Company.find({ userId: req.user._id }).sort({ createdAt: 1, name: 1 }).lean();
    return res.json({
      activeCompanyId: company._id.toString(),
      company: serializeCompany(company),
      companies: companies.map(serializeCompany),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to save company settings.");
  }
});

app.post("/api/companies", async (req, res) => {
  try {
    const payload = normalizeCompanyPayload(req.body || {});
    const company = await Company.create({
      userId: req.user._id,
      ...payload,
    });

    await User.updateOne({ _id: req.user._id }, { $set: { activeCompanyId: company._id } });
    req.user.activeCompanyId = company._id;

    const companies = await Company.find({ userId: req.user._id }).sort({ createdAt: 1, name: 1 }).lean();
    return res.status(201).json({
      activeCompanyId: company._id.toString(),
      company: serializeCompany(company),
      companies: companies.map(serializeCompany),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to create company.");
  }
});

app.post("/api/companies/:id/select", async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id, userId: req.user._id });
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }

    await User.updateOne({ _id: req.user._id }, { $set: { activeCompanyId: company._id } });
    req.user.activeCompanyId = company._id;

    return res.json({
      activeCompanyId: company._id.toString(),
      company: serializeCompany(company),
    });
  } catch (error) {
    return sendServerError(res, error, "Failed to switch company.");
  }
});

app.post("/api/accounts", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const payload = normalizeAccountPayload(req.body || {});
    const account = await Account.create({
      userId: req.user._id,
      companyId: activeCompany._id,
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
    const activeCompany = await requireActiveCompany(req.user);
    const payload = normalizeAccountPayload(req.body || {});
    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
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
    const activeCompany = await requireActiveCompany(req.user);
    const isReferenced = await JournalEntry.exists({
      userId: req.user._id,
      companyId: activeCompany._id,
      "lines.accountId": req.params.id,
    });
    if (isReferenced) {
      return res.status(409).json({
        error: "This account is used in journal entries and cannot be deleted.",
      });
    }

    const deletion = await Account.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
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
    const activeCompany = await requireActiveCompany(req.user);
    const payload = await normalizeJournalEntryPayload(req.body || {}, req.user._id, activeCompany._id);
    const journalEntry = await JournalEntry.create({
      userId: req.user._id,
      companyId: activeCompany._id,
      ...payload,
    });
    return res.status(201).json({ journalEntry: serializeJournalEntry(journalEntry) });
  } catch (error) {
    return sendServerError(res, error, "Failed to create journal entry.");
  }
});

app.put("/api/journal-entries/:id", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const payload = await normalizeJournalEntryPayload(req.body || {}, req.user._id, activeCompany._id);
    const journalEntry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
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
    const activeCompany = await requireActiveCompany(req.user);
    const deletion = await JournalEntry.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
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
    sameSite: "strict",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(authCookieName, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
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
    activeCompanyId: user.activeCompanyId ? user.activeCompanyId.toString() : "",
    createdAt: user.createdAt,
  };
}

function serializeCompany(company) {
  if (!company) {
    return {
      id: "",
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
    id: company._id.toString(),
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
  const currency = sanitizeUppercaseCode(payload.currency || "NGN", 3);
  const financialYearStart = sanitizeDateInput(payload.financialYearStart || "");
  return {
    name: sanitizeText(payload.companyName || payload.name || "", 120),
    industry: sanitizeText(payload.industry || "", 120),
    businessType: sanitizeText(payload.businessType || "", 120),
    address: sanitizeText(payload.address || "", 240),
    phone: sanitizeText(payload.phone || "", 40),
    email: sanitizeEmail(payload.email || ""),
    currency: currency || "NGN",
    country: sanitizeText(payload.country || "", 120),
    stateProvince: sanitizeText(payload.stateProvince || "", 120),
    city: sanitizeText(payload.city || "", 120),
    financialYearStart,
  };
}

function normalizeAccountPayload(payload) {
  const type = sanitizeText(payload.type || "", 20);
  if (!allowedAccountTypes.has(type)) {
    throw createHttpError(400, "Account type is invalid.");
  }

  return {
    code: sanitizeUppercaseCode(payload.code || "", 24),
    name: sanitizeText(payload.name || "", 120),
    type,
    openingBalance: parseNumberField(payload.openingBalance, "Opening balance"),
  };
}

async function normalizeJournalEntryPayload(payload, userId, companyId) {
  const linesSource = Array.isArray(payload.lineItems || payload.lines)
    ? payload.lineItems || payload.lines
    : [];
  const lines = linesSource.map((line, index) => normalizeJournalLine(line, index));
  if (!lines.length) {
    throw createHttpError(400, "Journal entry must include at least one line.");
  }

  const uniqueAccountIds = [...new Set(lines.map((line) => line.accountId))];
  const accountCount = await Account.countDocuments({
    _id: { $in: uniqueAccountIds },
    userId,
    companyId,
  });
  if (accountCount !== uniqueAccountIds.length) {
    throw createHttpError(400, "Journal entry lines must reference accounts in the active company.");
  }

  return {
    date: sanitizeDateInput(payload.date || ""),
    description: sanitizeText(payload.description || "", 240),
    lines,
  };
}

function normalizeJournalLine(line, index) {
  const accountId = String(line?.accountId || "").trim();
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    throw createHttpError(400, `Journal line ${index + 1} has an invalid account reference.`);
  }

  const debit = parseNumberField(line?.debit, `Journal line ${index + 1} debit`);
  const credit = parseNumberField(line?.credit, `Journal line ${index + 1} credit`);
  return {
    accountId,
    debit,
    credit,
  };
}

async function getActiveCompany(user) {
  const { activeCompany } = await resolveUserCompanies(user);
  return activeCompany;
}

async function requireActiveCompany(user) {
  const activeCompany = await getActiveCompany(user);
  if (!activeCompany) {
    throw createHttpError(400, "Create or select a company before working with financial data.");
  }
  return activeCompany;
}

async function resolveUserCompanies(user) {
  let companies = await Company.find({ userId: user._id }).sort({ createdAt: 1, name: 1 }).lean();

  if (!companies.length) {
    const hasLegacyFinancialData = await Promise.all([
      Account.exists({ userId: user._id, companyId: { $exists: false } }),
      JournalEntry.exists({ userId: user._id, companyId: { $exists: false } }),
    ]).then((results) => results.some(Boolean));

    if (hasLegacyFinancialData) {
      const company = await Company.create({
        userId: user._id,
        name: "Primary Company",
      });
      companies = [company.toObject()];
      await User.updateOne({ _id: user._id }, { $set: { activeCompanyId: company._id } });
      user.activeCompanyId = company._id;
    }
  }

  let activeCompany =
    companies.find((company) => company._id.toString() === String(user.activeCompanyId || "")) || null;

  if (!activeCompany && companies.length) {
    activeCompany = companies[0];
    await User.updateOne({ _id: user._id }, { $set: { activeCompanyId: activeCompany._id } });
    user.activeCompanyId = activeCompany._id;
  }

  if (activeCompany) {
    await backfillLegacyCompanyData(user._id, activeCompany._id);
  }

  return {
    companies,
    activeCompany,
  };
}

async function backfillLegacyCompanyData(userId, companyId) {
  await Promise.all([
    Account.updateMany(
      { userId, companyId: { $exists: false } },
      { $set: { companyId } },
    ),
    JournalEntry.updateMany(
      { userId, companyId: { $exists: false } },
      { $set: { companyId } },
    ),
  ]);
}

function sanitizeRequestBody(req, res, next) {
  try {
    req.body = sanitizeValue(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request payload." });
  }
}

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === "object") {
    const sanitized = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      if (key.includes("$") || key.includes(".")) {
        throw createHttpError(400, "Invalid request payload.");
      }
      sanitized[key] = sanitizeValue(nestedValue);
    }
    return sanitized;
  }

  if (typeof value === "string") {
    return sanitizeRawString(value);
  }

  return value;
}

function sanitizeRawString(value) {
  return String(value)
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "");
}

function sanitizeText(value, maxLength = 160) {
  return sanitizeRawString(value).trim().slice(0, maxLength);
}

function sanitizeEmail(value) {
  return sanitizeRawString(value).trim().toLowerCase().slice(0, 254);
}

function sanitizeUppercaseCode(value, maxLength = 24) {
  return sanitizeRawString(value).trim().toUpperCase().slice(0, maxLength);
}

function sanitizeDateInput(value) {
  const normalized = sanitizeRawString(value).trim();
  if (!normalized) {
    return "";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw createHttpError(400, "Date must be in YYYY-MM-DD format.");
  }

  return normalized;
}

function parseNumberField(value, fieldName) {
  if (value === "" || value === null || typeof value === "undefined") {
    return 0;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw createHttpError(400, `${fieldName} must be a valid number.`);
  }

  return number;
}

function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function sendServerError(res, error, message) {
  console.error(message, error);
  if (error?.status) {
    return res.status(error.status).json({ error: error.message || message });
  }

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return res.status(400).json({ error: "Invalid request data." });
  }

  const response = { error: message };
  if (!isProduction) {
    response.details = error instanceof Error ? error.message : String(error);
  }

  return res.status(500).json(response);
}
