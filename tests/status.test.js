const {
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
} = require("../lib/status");

function futureDate(daysAhead = 30) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

function pastDate(daysAgo = 30) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

describe("isInvoiceOverdue", () => {
  it("returns false for no dueDate", () => {
    expect(isInvoiceOverdue("")).toBe(false);
    expect(isInvoiceOverdue(null)).toBe(false);
    expect(isInvoiceOverdue(undefined)).toBe(false);
  });

  it("returns true for past due date", () => {
    expect(isInvoiceOverdue(pastDate(10))).toBe(true);
  });

  it("returns false for future due date", () => {
    expect(isInvoiceOverdue(futureDate(10))).toBe(false);
  });
});

describe("isBillOverdue", () => {
  it("returns false for no dueDate", () => {
    expect(isBillOverdue("")).toBe(false);
    expect(isBillOverdue(null)).toBe(false);
  });

  it("returns true for past due date", () => {
    expect(isBillOverdue(pastDate(5))).toBe(true);
  });

  it("returns false for future due date", () => {
    expect(isBillOverdue(futureDate(5))).toBe(false);
  });
});

describe("deriveInvoiceStatus", () => {
  it("returns Draft for null invoice", () => {
    expect(deriveInvoiceStatus(null)).toBe("Draft");
  });

  it("returns Paid when status is Paid", () => {
    expect(deriveInvoiceStatus({ status: "Paid", dueDate: pastDate() })).toBe("Paid");
  });

  it("returns Draft when status is Draft", () => {
    expect(deriveInvoiceStatus({ status: "Draft", dueDate: pastDate() })).toBe("Draft");
  });

  it("returns Overdue when Sent and past due", () => {
    expect(deriveInvoiceStatus({ status: "Sent", dueDate: pastDate() })).toBe("Overdue");
  });

  it("returns Sent when Sent and not past due", () => {
    expect(deriveInvoiceStatus({ status: "Sent", dueDate: futureDate() })).toBe("Sent");
  });
});

describe("deriveBillStatus", () => {
  it("returns Draft for null bill", () => {
    expect(deriveBillStatus(null)).toBe("Draft");
  });

  it("returns Paid when status is Paid", () => {
    expect(deriveBillStatus({ status: "Paid", dueDate: pastDate() })).toBe("Paid");
  });

  it("returns Draft when status is Draft", () => {
    expect(deriveBillStatus({ status: "Draft", dueDate: pastDate() })).toBe("Draft");
  });

  it("returns Overdue when Received and past due", () => {
    expect(deriveBillStatus({ status: "Received", dueDate: pastDate() })).toBe("Overdue");
  });

  it("returns Received when Received and not past due", () => {
    expect(deriveBillStatus({ status: "Received", dueDate: futureDate() })).toBe("Received");
  });
});

describe("getDaysOverdue", () => {
  it("returns 0 for no dueDate", () => {
    expect(getDaysOverdue("")).toBe(0);
    expect(getDaysOverdue(null)).toBe(0);
  });

  it("returns 0 for future date", () => {
    expect(getDaysOverdue(futureDate(10))).toBe(0);
  });

  it("returns positive number for past date", () => {
    const days = getDaysOverdue(pastDate(5));
    expect(days).toBeGreaterThanOrEqual(4);
    expect(days).toBeLessThanOrEqual(6);
  });
});

describe("shouldShowOnboardingWizard", () => {
  it("returns false when company has no _id", () => {
    expect(shouldShowOnboardingWizard({}, [], [])).toBe(false);
  });

  it("returns false when company has no name", () => {
    expect(shouldShowOnboardingWizard({ _id: "c1", name: "" }, [], [])).toBe(false);
  });

  it("returns false when onboarding is complete", () => {
    expect(shouldShowOnboardingWizard({ _id: "c1", name: "Test", onboardingComplete: true }, [], [])).toBe(false);
  });

  it("returns true when has onboarding journal entries", () => {
    const company = { _id: "c1", name: "Test", onboardingComplete: false };
    const entries = [{ sourceType: "onboarding" }];
    expect(shouldShowOnboardingWizard(company, [], entries)).toBe(true);
  });

  it("returns false when has non-onboarding/non-system entries", () => {
    const company = { _id: "c1", name: "Test", onboardingComplete: false };
    const entries = [{ sourceType: "quick_transaction" }];
    expect(shouldShowOnboardingWizard(company, [], entries)).toBe(false);
  });

  it("returns true when only default onboarding accounts and no entries", () => {
    const company = { _id: "c1", name: "Test", onboardingComplete: false };
    const accounts = [{ code: "3000", name: "Opening Balance Equity" }];
    expect(shouldShowOnboardingWizard(company, accounts, [])).toBe(true);
  });

  it("returns false when has custom accounts", () => {
    const company = { _id: "c1", name: "Test", onboardingComplete: false };
    const accounts = [{ code: "1000", name: "Cash" }];
    expect(shouldShowOnboardingWizard(company, accounts, [])).toBe(false);
  });
});

describe("hasOnlyDefaultOnboardingAccounts", () => {
  it("returns true for empty accounts", () => {
    expect(hasOnlyDefaultOnboardingAccounts([])).toBe(true);
  });

  it("returns true for null/undefined", () => {
    expect(hasOnlyDefaultOnboardingAccounts(null)).toBe(true);
    expect(hasOnlyDefaultOnboardingAccounts(undefined)).toBe(true);
  });

  it("returns true when all accounts are default onboarding", () => {
    expect(hasOnlyDefaultOnboardingAccounts([{ code: "3000", name: "Opening Balance Equity" }])).toBe(true);
  });

  it("returns false when any account is not default", () => {
    expect(
      hasOnlyDefaultOnboardingAccounts([
        { code: "3000", name: "Opening Balance Equity" },
        { code: "1000", name: "Cash" },
      ]),
    ).toBe(false);
  });
});

describe("isDefaultOnboardingAccount", () => {
  it("identifies Opening Balance Equity", () => {
    expect(isDefaultOnboardingAccount({ code: "3000", name: "Opening Balance Equity" })).toBe(true);
  });

  it("identifies Owner's Equity", () => {
    expect(isDefaultOnboardingAccount({ code: "3000", name: "Owner's Equity" })).toBe(true);
  });

  it("identifies Owners Equity (no apostrophe)", () => {
    expect(isDefaultOnboardingAccount({ code: "3000", name: "Owners Equity" })).toBe(true);
  });

  it("rejects non-3000 codes", () => {
    expect(isDefaultOnboardingAccount({ code: "1000", name: "Opening Balance Equity" })).toBe(false);
  });

  it("rejects unrelated names with code 3000", () => {
    expect(isDefaultOnboardingAccount({ code: "3000", name: "Retained Earnings" })).toBe(false);
  });

  it("handles null/undefined", () => {
    expect(isDefaultOnboardingAccount(null)).toBe(false);
    expect(isDefaultOnboardingAccount(undefined)).toBe(false);
  });
});

describe("shouldResetInvoiceOverdueNotification", () => {
  it("returns true for Draft status", () => {
    expect(shouldResetInvoiceOverdueNotification({ status: "Draft", dueDate: pastDate() })).toBe(true);
  });

  it("returns true for Paid status", () => {
    expect(shouldResetInvoiceOverdueNotification({ status: "Paid", dueDate: pastDate() })).toBe(true);
  });

  it("returns true when not overdue", () => {
    expect(shouldResetInvoiceOverdueNotification({ status: "Sent", dueDate: futureDate() })).toBe(true);
  });

  it("returns false when Sent and overdue", () => {
    expect(shouldResetInvoiceOverdueNotification({ status: "Sent", dueDate: pastDate() })).toBe(false);
  });
});

describe("shouldResetBillOverdueNotification", () => {
  it("returns true for Draft status", () => {
    expect(shouldResetBillOverdueNotification({ status: "Draft", dueDate: pastDate() })).toBe(true);
  });

  it("returns true for Paid status", () => {
    expect(shouldResetBillOverdueNotification({ status: "Paid", dueDate: pastDate() })).toBe(true);
  });

  it("returns true when not overdue", () => {
    expect(shouldResetBillOverdueNotification({ status: "Received", dueDate: futureDate() })).toBe(true);
  });

  it("returns false when Received and overdue", () => {
    expect(shouldResetBillOverdueNotification({ status: "Received", dueDate: pastDate() })).toBe(false);
  });
});

describe("resolveBillApprovalStatus", () => {
  it("returns Not Required for Draft bills", () => {
    expect(resolveBillApprovalStatus({ billStatus: "Draft", totalAmount: 500000, threshold: 100000 })).toBe(
      "Not Required",
    );
  });

  it("returns Pending Approval when over threshold", () => {
    expect(resolveBillApprovalStatus({ billStatus: "Received", totalAmount: 200000, threshold: 100000 })).toBe(
      "Pending Approval",
    );
  });

  it("preserves Approved status when over threshold", () => {
    expect(
      resolveBillApprovalStatus({
        billStatus: "Received",
        totalAmount: 200000,
        threshold: 100000,
        existingApprovalStatus: "Approved",
      }),
    ).toBe("Approved");
  });

  it("preserves Rejected status when over threshold", () => {
    expect(
      resolveBillApprovalStatus({
        billStatus: "Received",
        totalAmount: 200000,
        threshold: 100000,
        existingApprovalStatus: "Rejected",
      }),
    ).toBe("Rejected");
  });

  it("returns Approved when under threshold", () => {
    expect(resolveBillApprovalStatus({ billStatus: "Received", totalAmount: 50000, threshold: 100000 })).toBe(
      "Approved",
    );
  });
});

describe("shouldCreateBillJournalEntry", () => {
  it("returns false for null bill", () => {
    expect(shouldCreateBillJournalEntry(null)).toBe(false);
  });

  it("returns true for Received + Approved bill", () => {
    expect(
      shouldCreateBillJournalEntry({ status: "Received", approvalStatus: "Approved", dueDate: futureDate() }),
    ).toBe(true);
  });

  it("returns true for Paid + Approved bill", () => {
    expect(shouldCreateBillJournalEntry({ status: "Paid", approvalStatus: "Approved", dueDate: futureDate() })).toBe(
      true,
    );
  });

  it("returns false for Draft bill", () => {
    expect(shouldCreateBillJournalEntry({ status: "Draft", approvalStatus: "Approved", dueDate: futureDate() })).toBe(
      false,
    );
  });

  it("returns false when not approved", () => {
    expect(
      shouldCreateBillJournalEntry({ status: "Received", approvalStatus: "Pending Approval", dueDate: futureDate() }),
    ).toBe(false);
  });

  it("returns true for overdue + Approved bill", () => {
    expect(
      shouldCreateBillJournalEntry({ status: "Received", approvalStatus: "Approved", dueDate: pastDate() }),
    ).toBe(true);
  });
});
