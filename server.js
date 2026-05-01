const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const User = require("./models/User");
const Company = require("./models/Company");
const Account = require("./models/Account");
const JournalEntry = require("./models/JournalEntry");
const Invoice = require("./models/Invoice");
const Bill = require("./models/Bill");

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;
const groqApiKey = process.env.GROQ_API_KEY || "";
const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const mongoUri = process.env.MONGODB_URI || "";
const jwtSecret = process.env.JWT_SECRET || "";
const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = Number(process.env.SMTP_PORT) || 0;
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const appBaseUrl = process.env.APP_URL || process.env.APP_BASE_URL || `http://localhost:${port}`;
const authCookieName = "ledgrai_token";
const isProduction = process.env.NODE_ENV === "production";
const allowedAccountTypes = new Set(["Asset", "Liability", "Equity", "Revenue", "Expense"]);
const schedulerTimezone = "Africa/Lagos";
let schedulerInitialized = false;

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
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

    await sendWelcomeEmail(user);
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
    const [accounts, journalEntries, invoices, bills] = activeCompanyId
      ? await Promise.all([
          Account.find({ userId: req.user._id, companyId: activeCompanyId })
            .sort({ code: 1, name: 1 })
            .lean(),
          JournalEntry.find({ userId: req.user._id, companyId: activeCompanyId })
            .sort({ date: -1, createdAt: -1 })
            .lean(),
          Invoice.find({ userId: req.user._id, companyId: activeCompanyId })
            .sort({ invoiceDate: -1, createdAt: -1 })
            .lean(),
          Bill.find({ userId: req.user._id, companyId: activeCompanyId })
            .sort({ billDate: -1, createdAt: -1 })
            .lean(),
        ])
      : [[], [], [], []];

    return res.json({
      user: serializeUser(req.user),
      activeCompanyId: activeCompanyId?.toString() || "",
      company: serializeCompany(activeCompany),
      companies: companies.map(serializeCompany),
      accounts: accounts.map(serializeAccount),
      journalEntries: journalEntries.map(serializeJournalEntry),
      invoices: invoices.map(serializeInvoice),
      bills: bills.map(serializeBill),
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
  let payload = {};
  let step = "validating request";
  try {
    payload = normalizeCompanyPayload(req.body || {});
    step = "creating company document";
    const company = new Company({
      userId: req.user._id,
      ...payload,
    });
    await company.save();

    step = "linking company to authenticated user";
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { activeCompanyId: company._id } },
      { new: true },
    );
    if (!updatedUser) {
      throw new Error("Authenticated user was not found while assigning the active company.");
    }
    req.user = updatedUser;

    step = "loading updated company list";
    const companies = await Company.find({ userId: req.user._id }).sort({ createdAt: 1, name: 1 }).lean();

    step = "sending company creation response";
    return res.status(201).json({
      activeCompanyId: company._id.toString(),
      company: serializeCompany(company),
      companies: companies.map(serializeCompany),
    });
  } catch (error) {
    logCompanyCreationError(error, {
      step,
      userId: req.user?._id,
      payload,
      bodyKeys: Object.keys(req.body || {}),
    });
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

app.post("/api/invoices", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const payload = await normalizeInvoicePayload(req.body || {});
    const invoiceNumber = payload.invoiceNumber || (await generateNextInvoiceNumber(req.user._id, activeCompany._id));
    const invoice = await Invoice.create({
      userId: req.user._id,
      companyId: activeCompany._id,
      ...payload,
      invoiceNumber,
      overdueNotifiedAt: null,
    });

    await syncInvoiceJournalEntry(req.user._id, activeCompany._id, invoice);
    return res.status(201).json({ invoice: serializeInvoice(invoice) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Invoice number must be unique." });
    }
    return sendServerError(res, error, "Failed to create invoice.");
  }
});

app.put("/api/invoices/:id", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const existingInvoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }

    const payload = await normalizeInvoicePayload(req.body || {}, { invoiceNumber: existingInvoice.invoiceNumber });
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
      {
        $set: {
          ...payload,
          invoiceNumber: existingInvoice.invoiceNumber,
          overdueNotifiedAt: shouldResetInvoiceOverdueNotification(payload)
            ? null
            : existingInvoice.overdueNotifiedAt,
        },
      },
      { new: true, runValidators: true },
    );

    await syncInvoiceJournalEntry(req.user._id, activeCompany._id, invoice);
    return res.json({ invoice: serializeInvoice(invoice) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Invoice number must be unique." });
    }
    return sendServerError(res, error, "Failed to update invoice.");
  }
});

app.post("/api/invoices/:id/mark-paid", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
      { $set: { status: "Paid", overdueNotifiedAt: null } },
      { new: true },
    );

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }

    await syncInvoiceJournalEntry(req.user._id, activeCompany._id, invoice);
    return res.json({ invoice: serializeInvoice(invoice) });
  } catch (error) {
    return sendServerError(res, error, "Failed to mark invoice as paid.");
  }
});

app.delete("/api/invoices/:id", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }

    await JournalEntry.deleteMany({
      userId: req.user._id,
      companyId: activeCompany._id,
      sourceType: "invoice",
      sourceId: invoice._id.toString(),
    });
    return res.json({ success: true });
  } catch (error) {
    return sendServerError(res, error, "Failed to delete invoice.");
  }
});

app.post("/api/bills", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const payload = await normalizeBillPayload(req.body || {});
    const billNumber = payload.billNumber || (await generateNextBillNumber(req.user._id, activeCompany._id));
    const approvalStatus = resolveBillApprovalStatus({
      billStatus: payload.status,
      totalAmount: payload.totalAmount,
      threshold: activeCompany.billApprovalThreshold,
    });

    const bill = await Bill.create({
      userId: req.user._id,
      companyId: activeCompany._id,
      ...payload,
      billNumber,
      approvalStatus,
    });

    await syncBillJournalEntry(req.user._id, activeCompany._id, bill);
    return res.status(201).json({ bill: serializeBill(bill) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Bill number must be unique." });
    }
    return sendServerError(res, error, "Failed to create bill.");
  }
});

app.put("/api/bills/:id", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const existingBill = await Bill.findOne({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
    if (!existingBill) {
      return res.status(404).json({ error: "Bill not found." });
    }

    const payload = await normalizeBillPayload(req.body || {}, { billNumber: existingBill.billNumber });
    const approvalStatus = resolveBillApprovalStatus({
      billStatus: payload.status,
      totalAmount: payload.totalAmount,
      threshold: activeCompany.billApprovalThreshold,
      existingApprovalStatus: existingBill.approvalStatus,
    });

    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
      {
        $set: {
          ...payload,
          billNumber: existingBill.billNumber,
          approvalStatus,
        },
      },
      { new: true, runValidators: true },
    );

    await syncBillJournalEntry(req.user._id, activeCompany._id, bill);
    return res.json({ bill: serializeBill(bill) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ error: "Bill number must be unique." });
    }
    return sendServerError(res, error, "Failed to update bill.");
  }
});

app.post("/api/bills/:id/mark-paid", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const existingBill = await Bill.findOne({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
    if (!existingBill) {
      return res.status(404).json({ error: "Bill not found." });
    }

    const approvalStatus = resolveBillApprovalStatus({
      billStatus: "Paid",
      totalAmount: existingBill.totalAmount,
      threshold: activeCompany.billApprovalThreshold,
      existingApprovalStatus: existingBill.approvalStatus,
    });

    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
      { $set: { status: "Paid", approvalStatus } },
      { new: true },
    );

    await syncBillJournalEntry(req.user._id, activeCompany._id, bill);
    return res.json({ bill: serializeBill(bill) });
  } catch (error) {
    return sendServerError(res, error, "Failed to mark bill as paid.");
  }
});

app.post("/api/bills/:id/approve", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
      { $set: { approvalStatus: "Approved" } },
      { new: true },
    );
    if (!bill) {
      return res.status(404).json({ error: "Bill not found." });
    }

    await syncBillJournalEntry(req.user._id, activeCompany._id, bill);
    return res.json({ bill: serializeBill(bill) });
  } catch (error) {
    return sendServerError(res, error, "Failed to approve bill.");
  }
});

app.post("/api/bills/:id/reject", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, companyId: activeCompany._id },
      { $set: { approvalStatus: "Rejected" } },
      { new: true },
    );
    if (!bill) {
      return res.status(404).json({ error: "Bill not found." });
    }

    await syncBillJournalEntry(req.user._id, activeCompany._id, bill);
    return res.json({ bill: serializeBill(bill) });
  } catch (error) {
    return sendServerError(res, error, "Failed to reject bill.");
  }
});

app.delete("/api/bills/:id", async (req, res) => {
  try {
    const activeCompany = await requireActiveCompany(req.user);
    const bill = await Bill.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
      companyId: activeCompany._id,
    });
    if (!bill) {
      return res.status(404).json({ error: "Bill not found." });
    }

    await JournalEntry.deleteMany({
      userId: req.user._id,
      companyId: activeCompany._id,
      sourceType: "bill",
      sourceId: bill._id.toString(),
    });
    return res.json({ success: true });
  } catch (error) {
    return sendServerError(res, error, "Failed to delete bill.");
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
  await mongoose.connection.collection("companies").dropIndex("userId_1").catch(() => {});
  initializeSchedulers();
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
      billApprovalThreshold: 100000,
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
    billApprovalThreshold: Number.isFinite(Number(company.billApprovalThreshold))
      ? Number(company.billApprovalThreshold)
      : 100000,
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
    sourceType: entry.sourceType || "",
    sourceId: entry.sourceId || "",
    lineItems: (entry.lines || []).map((line) => ({
      accountId: line.accountId.toString(),
      debit: Number(line.debit) || 0,
      credit: Number(line.credit) || 0,
    })),
  };
}

function serializeInvoice(invoice) {
  if (!invoice) {
    return null;
  }

  const effectiveStatus =
    invoice.status === "Paid"
      ? "Paid"
      : invoice.status === "Draft"
        ? "Draft"
        : isInvoiceOverdue(invoice.dueDate)
          ? "Overdue"
          : "Sent";

  return {
    id: invoice._id.toString(),
    invoiceNumber: invoice.invoiceNumber || "",
    clientName: invoice.clientName || "",
    clientEmail: invoice.clientEmail || "",
    invoiceDate: invoice.invoiceDate || "",
    dueDate: invoice.dueDate || "",
    lineItems: (invoice.lineItems || []).map((line) => ({
      description: line.description || "",
      quantity: Number(line.quantity) || 0,
      unitPrice: Number(line.unitPrice) || 0,
      amount: Number(line.amount) || 0,
    })),
    subtotal: Number(invoice.subtotal) || 0,
    taxPercentage: Number(invoice.taxPercentage) || 0,
    totalAmount: Number(invoice.totalAmount) || 0,
    status: effectiveStatus,
  };
}

function serializeBill(bill) {
  if (!bill) {
    return null;
  }

  const effectiveStatus =
    bill.status === "Paid"
      ? "Paid"
      : bill.status === "Draft"
        ? "Draft"
        : isBillOverdue(bill.dueDate)
          ? "Overdue"
          : "Received";

  return {
    id: bill._id.toString(),
    billNumber: bill.billNumber || "",
    supplierName: bill.supplierName || "",
    supplierEmail: bill.supplierEmail || "",
    billDate: bill.billDate || "",
    dueDate: bill.dueDate || "",
    lineItems: (bill.lineItems || []).map((line) => ({
      description: line.description || "",
      quantity: Number(line.quantity) || 0,
      unitPrice: Number(line.unitPrice) || 0,
      amount: Number(line.amount) || 0,
    })),
    subtotal: Number(bill.subtotal) || 0,
    taxPercentage: Number(bill.taxPercentage) || 0,
    totalAmount: Number(bill.totalAmount) || 0,
    status: effectiveStatus,
    approvalStatus: bill.approvalStatus || "Not Required",
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
    billApprovalThreshold: Math.max(
      0,
      parseNumberField(
        typeof payload.billApprovalThreshold === "undefined" ? 100000 : payload.billApprovalThreshold,
        "Bill approval threshold",
      ),
    ),
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

async function normalizeInvoicePayload(payload, options = {}) {
  const linesSource = Array.isArray(payload.lineItems) ? payload.lineItems : [];
  const lineItems = linesSource
    .map((line, index) => normalizeInvoiceLine(line, index))
    .filter((line) => line.description || line.quantity > 0 || line.unitPrice > 0 || line.amount > 0);

  if (!lineItems.length) {
    throw createHttpError(400, "Invoice must include at least one line item.");
  }

  const subtotal = lineItems.reduce((sum, line) => sum + line.amount, 0);
  const taxPercentage = parseNumberField(payload.taxPercentage, "Tax percentage");
  const totalAmount = subtotal + subtotal * (taxPercentage / 100);
  const requestedStatus = sanitizeText(payload.status || "Draft", 20);
  const normalizedStatus =
    requestedStatus === "Paid" ? "Paid" : requestedStatus === "Sent" || requestedStatus === "Overdue" ? "Sent" : "Draft";

  return {
    invoiceNumber: sanitizeUppercaseCode(payload.invoiceNumber || options.invoiceNumber || "", 32),
    clientName: sanitizeText(payload.clientName || "", 120),
    clientEmail: sanitizeEmail(payload.clientEmail || ""),
    invoiceDate: sanitizeDateInput(payload.invoiceDate || ""),
    dueDate: sanitizeDateInput(payload.dueDate || ""),
    lineItems,
    subtotal,
    taxPercentage,
    totalAmount,
    status: normalizedStatus,
  };
}

async function normalizeBillPayload(payload, options = {}) {
  const linesSource = Array.isArray(payload.lineItems) ? payload.lineItems : [];
  const lineItems = linesSource
    .map((line, index) => normalizeBillLine(line, index))
    .filter((line) => line.description || line.quantity > 0 || line.unitPrice > 0 || line.amount > 0);

  if (!lineItems.length) {
    throw createHttpError(400, "Bill must include at least one line item.");
  }

  const subtotal = lineItems.reduce((sum, line) => sum + line.amount, 0);
  const taxPercentage = parseNumberField(payload.taxPercentage, "Tax percentage");
  const totalAmount = subtotal + subtotal * (taxPercentage / 100);
  const requestedStatus = sanitizeText(payload.status || "Draft", 20);
  const normalizedStatus =
    requestedStatus === "Paid"
      ? "Paid"
      : requestedStatus === "Received" || requestedStatus === "Overdue"
        ? "Received"
        : "Draft";

  return {
    billNumber: sanitizeUppercaseCode(payload.billNumber || options.billNumber || "", 32),
    supplierName: sanitizeText(payload.supplierName || "", 120),
    supplierEmail: sanitizeEmail(payload.supplierEmail || ""),
    billDate: sanitizeDateInput(payload.billDate || ""),
    dueDate: sanitizeDateInput(payload.dueDate || ""),
    lineItems,
    subtotal,
    taxPercentage,
    totalAmount,
    status: normalizedStatus,
  };
}

function normalizeInvoiceLine(line, index) {
  const description = sanitizeText(line?.description || "", 240);
  const quantity = parseNumberField(line?.quantity, `Invoice line ${index + 1} quantity`);
  const unitPrice = parseNumberField(line?.unitPrice, `Invoice line ${index + 1} unit price`);
  const amount = quantity * unitPrice;

  if (!description) {
    throw createHttpError(400, `Invoice line ${index + 1} description is required.`);
  }

  if (quantity <= 0) {
    throw createHttpError(400, `Invoice line ${index + 1} quantity must be greater than zero.`);
  }

  if (unitPrice < 0) {
    throw createHttpError(400, `Invoice line ${index + 1} unit price must be zero or greater.`);
  }

  return {
    description,
    quantity,
    unitPrice,
    amount,
  };
}

function normalizeBillLine(line, index) {
  const description = sanitizeText(line?.description || "", 240);
  const quantity = parseNumberField(line?.quantity, `Bill line ${index + 1} quantity`);
  const unitPrice = parseNumberField(line?.unitPrice, `Bill line ${index + 1} unit price`);
  const amount = quantity * unitPrice;

  if (!description) {
    throw createHttpError(400, `Bill line ${index + 1} description is required.`);
  }

  if (quantity <= 0) {
    throw createHttpError(400, `Bill line ${index + 1} quantity must be greater than zero.`);
  }

  if (unitPrice < 0) {
    throw createHttpError(400, `Bill line ${index + 1} unit price must be zero or greater.`);
  }

  return {
    description,
    quantity,
    unitPrice,
    amount,
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
      Invoice.exists({ userId: user._id, companyId: { $exists: false } }),
      Bill.exists({ userId: user._id, companyId: { $exists: false } }),
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
    Invoice.updateMany(
      { userId, companyId: { $exists: false } },
      { $set: { companyId } },
    ),
    Bill.updateMany(
      { userId, companyId: { $exists: false } },
      { $set: { companyId } },
    ),
  ]);
}

async function generateNextInvoiceNumber(userId, companyId) {
  const latestInvoice = await Invoice.findOne({ userId, companyId })
    .sort({ createdAt: -1, invoiceNumber: -1 })
    .lean();

  const lastSequenceMatch = latestInvoice?.invoiceNumber?.match(/(\d+)$/);
  const nextSequence = lastSequenceMatch ? Number(lastSequenceMatch[1]) + 1 : 1;
  return `INV-${String(nextSequence).padStart(4, "0")}`;
}

async function generateNextBillNumber(userId, companyId) {
  const latestBill = await Bill.findOne({ userId, companyId })
    .sort({ createdAt: -1, billNumber: -1 })
    .lean();

  const lastSequenceMatch = latestBill?.billNumber?.match(/(\d+)$/);
  const nextSequence = lastSequenceMatch ? Number(lastSequenceMatch[1]) + 1 : 1;
  return `BILL-${String(nextSequence).padStart(4, "0")}`;
}

function isInvoiceOverdue(dueDate) {
  if (!dueDate) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today;
}

function isBillOverdue(dueDate) {
  if (!dueDate) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today;
}

async function ensureCompanyAccount(userId, companyId, config) {
  const existingByName = await Account.findOne({
    userId,
    companyId,
    name: config.name,
    type: config.type,
  });
  if (existingByName) {
    return existingByName;
  }

  let code = config.code;
  let suffix = 1;
  while (
    await Account.exists({
      userId,
      companyId,
      code,
    })
  ) {
    suffix += 1;
    code = `${config.code}-${suffix}`;
  }

  return Account.create({
    userId,
    companyId,
    code,
    name: config.name,
    type: config.type,
    openingBalance: 0,
  });
}

async function syncInvoiceJournalEntry(userId, companyId, invoice) {
  if (!invoice) {
    return;
  }

  await JournalEntry.deleteMany({
    userId,
    companyId,
    sourceType: "invoice",
    sourceId: invoice._id.toString(),
  });

  if (invoice.status !== "Sent" && invoice.status !== "Paid") {
    return;
  }

  const [accountsReceivable, serviceRevenue] = await Promise.all([
    ensureCompanyAccount(userId, companyId, {
      code: "1100",
      name: "Accounts Receivable",
      type: "Asset",
    }),
    ensureCompanyAccount(userId, companyId, {
      code: "4000",
      name: "Service Revenue",
      type: "Revenue",
    }),
  ]);

  await JournalEntry.create({
    userId,
    companyId,
    date: invoice.invoiceDate,
    description: `Invoice ${invoice.invoiceNumber} - ${invoice.clientName}`,
    sourceType: "invoice",
    sourceId: invoice._id.toString(),
    lines: [
      {
        accountId: accountsReceivable._id,
        debit: Number(invoice.totalAmount) || 0,
        credit: 0,
      },
      {
        accountId: serviceRevenue._id,
        debit: 0,
        credit: Number(invoice.totalAmount) || 0,
      },
    ],
  });
}

function shouldResetInvoiceOverdueNotification(invoiceLike) {
  const normalizedStatus = String(invoiceLike?.status || "").trim();
  if (normalizedStatus === "Draft" || normalizedStatus === "Paid") {
    return true;
  }

  return !isInvoiceOverdue(invoiceLike?.dueDate || "");
}

function resolveBillApprovalStatus({
  billStatus,
  totalAmount,
  threshold,
  existingApprovalStatus = "Not Required",
}) {
  if (billStatus === "Draft") {
    return "Not Required";
  }

  if (Number(totalAmount) > Number(threshold || 0)) {
    if (existingApprovalStatus === "Approved" || existingApprovalStatus === "Rejected") {
      return existingApprovalStatus;
    }
    return "Pending Approval";
  }

  return "Approved";
}

function shouldCreateBillJournalEntry(bill) {
  if (!bill) {
    return false;
  }

  return (
    (bill.status === "Received" || bill.status === "Paid" || isBillOverdue(bill.dueDate)) &&
    bill.approvalStatus === "Approved"
  );
}

function deriveBillExpenseAccountName(description) {
  const cleaned = sanitizeText(description || "", 70);
  return cleaned ? `Expense - ${cleaned}` : "Expense - Supplier Bill";
}

async function syncBillJournalEntry(userId, companyId, bill) {
  if (!bill) {
    return;
  }

  await JournalEntry.deleteMany({
    userId,
    companyId,
    sourceType: "bill",
    sourceId: bill._id.toString(),
  });

  if (!shouldCreateBillJournalEntry(bill)) {
    return;
  }

  const accountsPayable = await ensureCompanyAccount(userId, companyId, {
    code: "2000",
    name: "Accounts Payable",
    type: "Liability",
  });

  const expenseLines = [];
  for (const line of bill.lineItems || []) {
    const expenseAccount = await ensureCompanyAccount(userId, companyId, {
      code: "5000",
      name: deriveBillExpenseAccountName(line.description),
      type: "Expense",
    });

    expenseLines.push({
      accountId: expenseAccount._id,
      debit: Number(line.amount) || 0,
      credit: 0,
    });
  }

  await JournalEntry.create({
    userId,
    companyId,
    date: bill.billDate,
    description: `Bill ${bill.billNumber} - ${bill.supplierName}`,
    sourceType: "bill",
    sourceId: bill._id.toString(),
    lines: [
      ...expenseLines,
      {
        accountId: accountsPayable._id,
        debit: 0,
        credit: Number(bill.totalAmount) || 0,
      },
    ],
  });
}

function getMailTransport() {
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

async function sendEmail({ to, subject, text, html }) {
  if (!to) {
    return false;
  }

  const transport = getMailTransport();
  if (!transport) {
    console.warn("Email skipped because SMTP configuration is incomplete.");
    return false;
  }

  await transport.sendMail({
    from: smtpUser,
    to,
    subject,
    text,
    html,
  });
  return true;
}

async function sendWelcomeEmail(user) {
  if (!user?.email) {
    return;
  }

  await sendEmail({
    to: user.email,
    subject: "Welcome to LedgrAI",
    text: [
      `Hello ${user.name || "there"},`,
      "",
      "Your LedgrAI account has been created successfully.",
      `Open the app: ${appBaseUrl}`,
    ].join("\n"),
    html: `
      <p>Hello ${escapeHtml(user.name || "there")},</p>
      <p>Your LedgrAI account has been created successfully.</p>
      <p><a href="${escapeHtml(appBaseUrl)}">Open LedgrAI</a></p>
    `,
  }).catch((error) => {
    console.error("Failed to send welcome email.", error);
  });
}

async function sendInvoiceOverdueNotificationEmail({ user, company, invoice }) {
  if (!user?.email || !invoice) {
    return false;
  }

  return sendEmail({
    to: user.email,
    subject: `Invoice Overdue Notice — ${invoice.invoiceNumber}`,
    text: [
      `Hello ${user.name || "there"},`,
      "",
      `Invoice ${invoice.invoiceNumber} is overdue.`,
      `Client: ${invoice.clientName}`,
      `Amount: ${formatCurrencyAmount(Number(invoice.totalAmount) || 0, company?.currency || "NGN")}`,
      `Due Date: ${invoice.dueDate}`,
      `Open LedgrAI: ${appBaseUrl}`,
    ].join("\n"),
    html: `
      <p>Hello ${escapeHtml(user.name || "there")},</p>
      <p>Invoice <strong>${escapeHtml(invoice.invoiceNumber)}</strong> is overdue.</p>
      <ul>
        <li>Client: ${escapeHtml(invoice.clientName || "Not specified")}</li>
        <li>Amount: ${escapeHtml(formatCurrencyAmount(Number(invoice.totalAmount) || 0, company?.currency || "NGN"))}</li>
        <li>Due Date: ${escapeHtml(invoice.dueDate || "")}</li>
      </ul>
      <p><a href="${escapeHtml(appBaseUrl)}">Open LedgrAI</a></p>
    `,
  });
}

async function sendOverdueInvoiceNotifications() {
  const today = new Date().toISOString().slice(0, 10);
  const invoices = await Invoice.find({
    dueDate: { $lt: today },
    status: { $in: ["Sent", "Overdue"] },
    overdueNotifiedAt: null,
  }).lean();

  for (const invoice of invoices) {
    const [user, company] = await Promise.all([
      User.findById(invoice.userId).lean(),
      Company.findById(invoice.companyId).lean(),
    ]);
    if (!user || !company) {
      continue;
    }

    try {
      await sendInvoiceOverdueNotificationEmail({ user, company, invoice });
      await Invoice.updateOne({ _id: invoice._id }, { $set: { overdueNotifiedAt: new Date() } });
    } catch (error) {
      console.error("Failed to send overdue invoice email.", error);
    }
  }
}

function formatCurrencyAmount(value, currencyCode = "NGN") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "NGN",
    }).format(Number(value) || 0);
  } catch {
    return `${currencyCode || "NGN"} ${Number(value) || 0}`;
  }
}

function computeCompanyFinancialMetrics({ accounts, journalEntries, invoices }) {
  const accountMap = new Map(
    (accounts || []).map((account) => [String(account._id), account]),
  );
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthlyJournalEntries = (journalEntries || []).filter((entry) => {
    const entryDate = new Date(`${entry.date}T00:00:00`);
    return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
  });

  const currentCashBalance = (accounts || [])
    .filter((account) => account.type === "Asset" && /(cash|bank|petty cash)/i.test(account.name))
    .reduce((sum, account) => {
      const totals = getJournalPostingTotals(journalEntries, String(account._id));
      return sum + calculateAccountClosingBalance(account.type, Number(account.openingBalance) || 0, totals);
    }, 0);

  let netIncomeThisMonth = 0;
  let totalExpensesThisMonth = 0;
  monthlyJournalEntries.forEach((entry) => {
    (entry.lines || []).forEach((line) => {
      const account = accountMap.get(String(line.accountId));
      if (!account) {
        return;
      }

      const debit = Number(line.debit) || 0;
      const credit = Number(line.credit) || 0;
      if (account.type === "Revenue") {
        netIncomeThisMonth += credit - debit;
      } else if (account.type === "Expense") {
        const expenseAmount = debit - credit;
        totalExpensesThisMonth += expenseAmount;
        netIncomeThisMonth -= expenseAmount;
      }
    });
  });

  const outstandingInvoicesTotal = (invoices || [])
    .filter((invoice) => {
      const status = deriveInvoiceStatus(invoice);
      return status === "Sent" || status === "Overdue";
    })
    .reduce((sum, invoice) => sum + (Number(invoice.totalAmount) || 0), 0);

  const overdueInvoicesCount = (invoices || []).filter((invoice) => deriveInvoiceStatus(invoice) === "Overdue").length;

  return {
    currentCashBalance,
    netIncomeThisMonth,
    totalExpensesThisMonth,
    outstandingInvoicesTotal,
    overdueInvoicesCount,
  };
}

function getJournalPostingTotals(journalEntries, accountId) {
  return (journalEntries || [])
    .flatMap((entry) => entry.lines || [])
    .filter((line) => String(line.accountId) === String(accountId))
    .reduce(
      (sum, line) => ({
        debits: sum.debits + (Number(line.debit) || 0),
        credits: sum.credits + (Number(line.credit) || 0),
      }),
      { debits: 0, credits: 0 },
    );
}

function calculateAccountClosingBalance(accountType, openingBalance, postingTotals) {
  if (accountType === "Asset" || accountType === "Expense") {
    return openingBalance + postingTotals.debits - postingTotals.credits;
  }

  return openingBalance + postingTotals.credits - postingTotals.debits;
}

function deriveInvoiceStatus(invoice) {
  if (!invoice) {
    return "Draft";
  }

  if (invoice.status === "Paid") {
    return "Paid";
  }

  if (invoice.status === "Draft") {
    return "Draft";
  }

  return isInvoiceOverdue(invoice.dueDate) ? "Overdue" : "Sent";
}

async function requestWeeklyInsight(summaryPayload) {
  if (!groqApiKey) {
    return "Groq insight is unavailable because GROQ_API_KEY is not configured.";
  }

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model: groqModel,
      temperature: 0.3,
      max_tokens: 120,
      messages: [
        {
          role: "system",
          content:
            "You are a finance assistant. Return one concise practical insight based only on the supplied weekly financial summary.",
        },
        {
          role: "user",
          content: JSON.stringify(summaryPayload),
        },
      ],
    }),
  });

  const data = await groqResponse.json();
  if (!groqResponse.ok) {
    throw new Error(data?.error?.message || data?.error || "Groq request failed.");
  }

  return data?.choices?.[0]?.message?.content?.trim() || "No AI insight available this week.";
}

async function sendWeeklyFinancialSummaries() {
  const users = await User.find({}).lean();

  for (const user of users) {
    const companies = await Company.find({ userId: user._id }).lean();
    for (const company of companies) {
      const [accounts, journalEntries, invoices] = await Promise.all([
        Account.find({ userId: user._id, companyId: company._id }).lean(),
        JournalEntry.find({ userId: user._id, companyId: company._id }).lean(),
        Invoice.find({ userId: user._id, companyId: company._id }).lean(),
      ]);

      const nonSystemEntries = journalEntries.filter((entry) => entry.sourceType !== "system");
      if (!nonSystemEntries.length) {
        continue;
      }

      const metrics = computeCompanyFinancialMetrics({ accounts, journalEntries, invoices });
      const insightPayload = {
        companyName: company.name || "Unnamed Company",
        currency: company.currency || "NGN",
        ...metrics,
      };

      let insight = "No AI insight available this week.";
      try {
        insight = await requestWeeklyInsight(insightPayload);
      } catch (error) {
        console.error("Failed to generate weekly Groq insight.", error);
      }

      try {
        await sendEmail({
          to: user.email,
          subject: `Your LedgrAI Weekly Summary — ${company.name || "Company"}`,
          text: [
            `Hello ${user.name || "there"},`,
            "",
            `Company: ${company.name || "Unnamed Company"}`,
            `Current Cash Balance: ${formatCurrencyAmount(metrics.currentCashBalance, company.currency)}`,
            `Net Income This Month: ${formatCurrencyAmount(metrics.netIncomeThisMonth, company.currency)}`,
            `Total Expenses This Month: ${formatCurrencyAmount(metrics.totalExpensesThisMonth, company.currency)}`,
            `Outstanding Invoices Total: ${formatCurrencyAmount(metrics.outstandingInvoicesTotal, company.currency)}`,
            `Overdue Invoices Count: ${metrics.overdueInvoicesCount}`,
            `AI Insight: ${insight}`,
            "",
            `Open LedgrAI: ${appBaseUrl}`,
          ].join("\n"),
          html: `
            <p>Hello ${escapeHtml(user.name || "there")},</p>
            <p><strong>${escapeHtml(company.name || "Unnamed Company")}</strong></p>
            <table>
              <tr><td>Current Cash Balance</td><td>${escapeHtml(formatCurrencyAmount(metrics.currentCashBalance, company.currency))}</td></tr>
              <tr><td>Net Income This Month</td><td>${escapeHtml(formatCurrencyAmount(metrics.netIncomeThisMonth, company.currency))}</td></tr>
              <tr><td>Total Expenses This Month</td><td>${escapeHtml(formatCurrencyAmount(metrics.totalExpensesThisMonth, company.currency))}</td></tr>
              <tr><td>Outstanding Invoices Total</td><td>${escapeHtml(formatCurrencyAmount(metrics.outstandingInvoicesTotal, company.currency))}</td></tr>
              <tr><td>Overdue Invoices Count</td><td>${escapeHtml(String(metrics.overdueInvoicesCount))}</td></tr>
            </table>
            <p><strong>AI Insight:</strong> ${escapeHtml(insight)}</p>
            <p><a href="${escapeHtml(appBaseUrl)}">Open LedgrAI</a></p>
          `,
        });
      } catch (error) {
        console.error("Failed to send weekly financial summary email.", error);
      }
    }
  }
}

function initializeSchedulers() {
  if (schedulerInitialized) {
    return;
  }

  cron.schedule(
    "0 8 * * 1",
    async () => {
      await sendWeeklyFinancialSummaries().catch((error) => {
        console.error("Weekly summary job failed.", error);
      });
    },
    { timezone: schedulerTimezone },
  );

  cron.schedule(
    "0 8 * * *",
    async () => {
      await sendOverdueInvoiceNotifications().catch((error) => {
        console.error("Overdue invoice notification job failed.", error);
      });
    },
    { timezone: schedulerTimezone },
  );

  schedulerInitialized = true;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function logCompanyCreationError(error, context = {}) {
  const details = {
    step: context.step || "unknown",
    userId: context.userId ? String(context.userId) : "",
    bodyKeys: Array.isArray(context.bodyKeys) ? context.bodyKeys : [],
    payload: context.payload || {},
    errorName: error?.name || "",
    errorMessage: error instanceof Error ? error.message : String(error),
    errorCode: typeof error?.code === "undefined" ? "" : error.code,
    status: typeof error?.status === "undefined" ? "" : error.status,
    stack: error?.stack || "",
    validationErrors:
      error?.errors && typeof error.errors === "object"
        ? Object.fromEntries(
            Object.entries(error.errors).map(([fieldName, fieldError]) => [
              fieldName,
              fieldError?.message || String(fieldError),
            ]),
          )
        : {},
  };

  console.error("Company creation failed.", details);
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
