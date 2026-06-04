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

function deriveBillStatus(bill) {
  if (!bill) {
    return "Draft";
  }

  if (bill.status === "Paid") {
    return "Paid";
  }

  if (bill.status === "Draft") {
    return "Draft";
  }

  return isBillOverdue(bill.dueDate) ? "Overdue" : "Received";
}

function getDaysOverdue(dueDate) {
  if (!dueDate) {
    return 0;
  }

  const due = new Date(`${dueDate}T00:00:00`);
  const today = new Date();
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - due.getTime();
  if (diffMs <= 0) {
    return 0;
  }

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function shouldShowOnboardingWizard(company, accounts, journalEntries) {
  if (!company?._id) {
    return false;
  }

  if (!String(company.name || "").trim()) {
    return false;
  }

  if (company.onboardingComplete) {
    return false;
  }

  const entries = journalEntries || [];
  const hasOnboardingEntries = entries.some((entry) => String(entry?.sourceType || "").trim() === "onboarding");
  if (hasOnboardingEntries) {
    return true;
  }

  const hasOtherEntries = entries.some((entry) => {
    const sourceType = String(entry?.sourceType || "").trim();
    return sourceType && sourceType !== "onboarding" && sourceType !== "system";
  });
  if (hasOtherEntries) {
    return false;
  }

  if (!hasOnlyDefaultOnboardingAccounts(accounts)) {
    return false;
  }

  return true;
}

function hasOnlyDefaultOnboardingAccounts(accounts) {
  if (!accounts?.length) {
    return true;
  }

  return accounts.every((account) => isDefaultOnboardingAccount(account));
}

function isDefaultOnboardingAccount(account) {
  const code = String(account?.code || "").trim();
  const name = String(account?.name || "").trim().toLowerCase();
  return (
    code === "3000" &&
    (name.includes("opening balance equity") || name.includes("owner's equity") || name.includes("owners equity"))
  );
}

function shouldResetInvoiceOverdueNotification(invoiceLike) {
  const normalizedStatus = String(invoiceLike?.status || "").trim();
  if (normalizedStatus === "Draft" || normalizedStatus === "Paid") {
    return true;
  }

  return !isInvoiceOverdue(invoiceLike?.dueDate || "");
}

function shouldResetBillOverdueNotification(billLike) {
  const normalizedStatus = String(billLike?.status || "").trim();
  if (normalizedStatus === "Draft" || normalizedStatus === "Paid") {
    return true;
  }

  return !isBillOverdue(billLike?.dueDate || "");
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

module.exports = {
  isInvoiceOverdue,
  isBillOverdue,
  deriveInvoiceStatus,
  deriveBillStatus,
  getDaysOverdue,
  shouldShowOnboardingWizard,
  hasOnlyDefaultOnboardingAccounts,
  isDefaultOnboardingAccount,
  shouldResetInvoiceOverdueNotification,
  shouldResetBillOverdueNotification,
  resolveBillApprovalStatus,
  shouldCreateBillJournalEntry,
};
