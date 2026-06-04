const { createHttpError, parseNumberField } = require("./validation");
const { sanitizeText, sanitizeEmail, sanitizeUppercaseCode, sanitizeDateInput } = require("./sanitize");
const { roundMoney } = require("./financial");

const allowedAccountTypes = new Set(["Asset", "Liability", "Equity", "Revenue", "Expense"]);

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

function normalizeJournalLine(line, index, validateAccountId) {
  const accountId = String(line?.accountId || "").trim();
  if (validateAccountId) {
    if (!validateAccountId(accountId)) {
      throw createHttpError(400, `Journal line ${index + 1} has an invalid account reference.`);
    }
  } else if (!accountId) {
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

function normalizeOnboardingOpeningCapitalPayload(payload) {
  const totalAmount = parseNumberField(payload.amount ?? payload.totalAmount, "Opening capital amount");
  if (totalAmount <= 0) {
    throw createHttpError(400, "Opening capital amount must be greater than zero.");
  }

  const date = sanitizeDateInput(payload.date || new Date().toISOString().slice(0, 10));
  const splitBank = Boolean(payload.splitBank);
  let cashAmount = totalAmount;
  let bankAmount = 0;

  if (splitBank) {
    cashAmount = parseNumberField(payload.cashAmount, "Cash amount");
    bankAmount = parseNumberField(payload.bankAmount, "Bank amount");
    if (cashAmount < 0 || bankAmount < 0) {
      throw createHttpError(400, "Cash and bank amounts must be zero or greater.");
    }
    if (roundMoney(cashAmount + bankAmount) !== roundMoney(totalAmount)) {
      throw createHttpError(400, "Cash and bank amounts must add up to the total opening capital.");
    }
    if (cashAmount <= 0 && bankAmount <= 0) {
      throw createHttpError(400, "Enter a cash or bank amount when splitting opening capital.");
    }
  }

  return {
    totalAmount: roundMoney(totalAmount),
    date,
    splitBank,
    cashAmount: roundMoney(cashAmount),
    bankAmount: roundMoney(bankAmount),
  };
}

function normalizeOnboardingInitialPurchasePayload(payload) {
  const description = sanitizeText(payload.description || "Initial purchase", 240);
  const amount = parseNumberField(payload.amount, "Purchase amount");
  if (amount <= 0) {
    throw createHttpError(400, "Purchase amount must be greater than zero.");
  }

  const date = sanitizeDateInput(payload.date || new Date().toISOString().slice(0, 10));
  return {
    description,
    amount: roundMoney(amount),
    date,
  };
}

const quickTransactionTypes = new Set([
  "sale",
  "expense",
  "received_payment",
  "paid_supplier",
]);

function normalizeQuickTransactionPayload(body, type) {
  if (!quickTransactionTypes.has(type) && type !== "other") {
    throw createHttpError(400, "Unsupported transaction type.");
  }

  const amount = parseNumberField(body.amount, "Amount");
  if (amount <= 0) {
    throw createHttpError(400, "Amount must be greater than zero.");
  }

  const date = sanitizeDateInput(body.date || new Date().toISOString().slice(0, 10));
  const description = sanitizeText(body.description || "", 240);
  const partyName = sanitizeText(body.partyName || "", 120);
  const paymentMethod = sanitizeText(body.paymentMethod || "cash", 24).toLowerCase();

  if (type === "expense" && !description) {
    throw createHttpError(400, "What you paid for is required.");
  }

  if (type === "sale" && paymentMethod !== "cash" && paymentMethod !== "credit") {
    throw createHttpError(400, "Choose cash or credit for this sale.");
  }

  if (type === "expense" && !["cash", "bank", "card"].includes(paymentMethod)) {
    throw createHttpError(400, "Choose how you paid for this expense.");
  }

  return {
    amount: roundMoney(amount),
    date,
    description,
    partyName,
    paymentMethod,
  };
}

function buildQuickTransactionDescription(prefix, payload) {
  const parts = [prefix];
  if (payload.description) {
    parts.push(payload.description);
  }
  if (payload.partyName) {
    parts.push(payload.partyName);
  }
  return sanitizeText(parts.filter(Boolean).join(" — "), 240);
}

function deriveBillExpenseAccountName(description) {
  const cleaned = sanitizeText(description || "", 70);
  return cleaned ? `Expense - ${cleaned}` : "Expense - Supplier Bill";
}

module.exports = {
  normalizeCompanyPayload,
  normalizeAccountPayload,
  normalizeInvoiceLine,
  normalizeBillLine,
  normalizeJournalLine,
  normalizeOnboardingOpeningCapitalPayload,
  normalizeOnboardingInitialPurchasePayload,
  normalizeQuickTransactionPayload,
  buildQuickTransactionDescription,
  deriveBillExpenseAccountName,
};
