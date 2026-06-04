const { isInvoiceOverdue, isBillOverdue } = require("./status");

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
      onboardingComplete: false,
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
    onboardingComplete: Boolean(company.onboardingComplete),
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

module.exports = {
  serializeUser,
  serializeCompany,
  serializeAccount,
  serializeJournalEntry,
  serializeInvoice,
  serializeBill,
};
