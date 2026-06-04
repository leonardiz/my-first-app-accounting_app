const {
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
} = require("../lib/normalize");

describe("normalizeCompanyPayload", () => {
  it("extracts and sanitizes all fields", () => {
    const result = normalizeCompanyPayload({
      companyName: "  Test Corp  ",
      industry: "Tech",
      businessType: "LLC",
      address: "123 Main St",
      phone: "555-1234",
      email: "Info@Test.COM",
      currency: "usd",
      country: "Nigeria",
      stateProvince: "Lagos",
      city: "Lagos",
      financialYearStart: "2024-01-01",
    });

    expect(result.name).toBe("Test Corp");
    expect(result.email).toBe("info@test.com");
    expect(result.currency).toBe("USD");
    expect(result.country).toBe("Nigeria");
  });

  it("uses name field when companyName is absent", () => {
    const result = normalizeCompanyPayload({ name: "My Company" });
    expect(result.name).toBe("My Company");
  });

  it("defaults currency to NGN", () => {
    const result = normalizeCompanyPayload({});
    expect(result.currency).toBe("NGN");
  });

  it("defaults billApprovalThreshold to 100000", () => {
    const result = normalizeCompanyPayload({});
    expect(result.billApprovalThreshold).toBe(100000);
  });

  it("clamps negative billApprovalThreshold to 0", () => {
    const result = normalizeCompanyPayload({ billApprovalThreshold: -500 });
    expect(result.billApprovalThreshold).toBe(0);
  });

  it("throws for invalid financialYearStart date format", () => {
    expect(() => normalizeCompanyPayload({ financialYearStart: "bad-date" })).toThrow();
  });
});

describe("normalizeAccountPayload", () => {
  it("normalizes a valid account", () => {
    const result = normalizeAccountPayload({ code: "1000", name: "Cash", type: "Asset", openingBalance: 500 });
    expect(result.code).toBe("1000");
    expect(result.name).toBe("Cash");
    expect(result.type).toBe("Asset");
    expect(result.openingBalance).toBe(500);
  });

  it("uppercases the code", () => {
    const result = normalizeAccountPayload({ code: "abc", name: "Test", type: "Revenue" });
    expect(result.code).toBe("ABC");
  });

  it("throws for invalid account type", () => {
    expect(() => normalizeAccountPayload({ code: "1000", name: "Cash", type: "Invalid" })).toThrow(
      "Account type is invalid.",
    );
  });

  it("throws for empty type", () => {
    expect(() => normalizeAccountPayload({ code: "1000", name: "Cash" })).toThrow("Account type is invalid.");
  });

  it("defaults openingBalance to 0", () => {
    const result = normalizeAccountPayload({ code: "1000", name: "Cash", type: "Asset" });
    expect(result.openingBalance).toBe(0);
  });
});

describe("normalizeInvoiceLine", () => {
  it("normalizes a valid line item", () => {
    const result = normalizeInvoiceLine({ description: "Widget", quantity: 5, unitPrice: 10 }, 0);
    expect(result).toEqual({ description: "Widget", quantity: 5, unitPrice: 10, amount: 50 });
  });

  it("calculates amount as quantity * unitPrice", () => {
    const result = normalizeInvoiceLine({ description: "Service", quantity: 3, unitPrice: 100 }, 0);
    expect(result.amount).toBe(300);
  });

  it("throws for missing description", () => {
    expect(() => normalizeInvoiceLine({ description: "", quantity: 1, unitPrice: 10 }, 0)).toThrow(
      "Invoice line 1 description is required.",
    );
  });

  it("throws for zero quantity", () => {
    expect(() => normalizeInvoiceLine({ description: "Item", quantity: 0, unitPrice: 10 }, 0)).toThrow(
      "Invoice line 1 quantity must be greater than zero.",
    );
  });

  it("throws for negative quantity", () => {
    expect(() => normalizeInvoiceLine({ description: "Item", quantity: -1, unitPrice: 10 }, 0)).toThrow(
      "Invoice line 1 quantity must be greater than zero.",
    );
  });

  it("throws for negative unit price", () => {
    expect(() => normalizeInvoiceLine({ description: "Item", quantity: 1, unitPrice: -5 }, 0)).toThrow(
      "Invoice line 1 unit price must be zero or greater.",
    );
  });

  it("allows zero unit price", () => {
    const result = normalizeInvoiceLine({ description: "Free item", quantity: 1, unitPrice: 0 }, 0);
    expect(result.amount).toBe(0);
  });

  it("uses 1-based index in error messages", () => {
    expect(() => normalizeInvoiceLine({ description: "", quantity: 1, unitPrice: 10 }, 2)).toThrow(
      "Invoice line 3 description is required.",
    );
  });
});

describe("normalizeBillLine", () => {
  it("normalizes a valid line", () => {
    const result = normalizeBillLine({ description: "Office supplies", quantity: 10, unitPrice: 5 }, 0);
    expect(result).toEqual({ description: "Office supplies", quantity: 10, unitPrice: 5, amount: 50 });
  });

  it("throws for missing description", () => {
    expect(() => normalizeBillLine({ description: "", quantity: 1, unitPrice: 10 }, 0)).toThrow(
      "Bill line 1 description is required.",
    );
  });

  it("throws for zero quantity", () => {
    expect(() => normalizeBillLine({ description: "Item", quantity: 0, unitPrice: 10 }, 0)).toThrow(
      "Bill line 1 quantity must be greater than zero.",
    );
  });

  it("throws for negative unit price", () => {
    expect(() => normalizeBillLine({ description: "Item", quantity: 1, unitPrice: -1 }, 0)).toThrow(
      "Bill line 1 unit price must be zero or greater.",
    );
  });
});

describe("normalizeJournalLine", () => {
  it("normalizes a valid journal line", () => {
    const result = normalizeJournalLine({ accountId: "abc123", debit: 100, credit: 0 }, 0);
    expect(result).toEqual({ accountId: "abc123", debit: 100, credit: 0 });
  });

  it("throws for empty accountId when no validator", () => {
    expect(() => normalizeJournalLine({ accountId: "", debit: 100, credit: 0 }, 0)).toThrow(
      "Journal line 1 has an invalid account reference.",
    );
  });

  it("throws for missing accountId", () => {
    expect(() => normalizeJournalLine({ debit: 100, credit: 0 }, 0)).toThrow(
      "Journal line 1 has an invalid account reference.",
    );
  });

  it("defaults debit and credit to 0", () => {
    const result = normalizeJournalLine({ accountId: "abc" }, 0);
    expect(result.debit).toBe(0);
    expect(result.credit).toBe(0);
  });

  it("uses custom validator when provided", () => {
    const validator = (id) => id.length === 24;
    expect(() => normalizeJournalLine({ accountId: "short" }, 0, validator)).toThrow(
      "Journal line 1 has an invalid account reference.",
    );
  });
});

describe("normalizeOnboardingOpeningCapitalPayload", () => {
  it("normalizes a basic payload", () => {
    const result = normalizeOnboardingOpeningCapitalPayload({ amount: 50000, date: "2024-01-01" });
    expect(result.totalAmount).toBe(50000);
    expect(result.date).toBe("2024-01-01");
    expect(result.splitBank).toBe(false);
    expect(result.cashAmount).toBe(50000);
    expect(result.bankAmount).toBe(0);
  });

  it("accepts totalAmount as alternative to amount", () => {
    const result = normalizeOnboardingOpeningCapitalPayload({ totalAmount: 10000, date: "2024-01-01" });
    expect(result.totalAmount).toBe(10000);
  });

  it("throws for zero amount", () => {
    expect(() => normalizeOnboardingOpeningCapitalPayload({ amount: 0, date: "2024-01-01" })).toThrow(
      "Opening capital amount must be greater than zero.",
    );
  });

  it("throws for negative amount", () => {
    expect(() => normalizeOnboardingOpeningCapitalPayload({ amount: -100, date: "2024-01-01" })).toThrow(
      "Opening capital amount must be greater than zero.",
    );
  });

  it("handles split bank correctly", () => {
    const result = normalizeOnboardingOpeningCapitalPayload({
      amount: 10000,
      date: "2024-01-01",
      splitBank: true,
      cashAmount: 3000,
      bankAmount: 7000,
    });
    expect(result.splitBank).toBe(true);
    expect(result.cashAmount).toBe(3000);
    expect(result.bankAmount).toBe(7000);
  });

  it("throws when split amounts don't add up", () => {
    expect(() =>
      normalizeOnboardingOpeningCapitalPayload({
        amount: 10000,
        date: "2024-01-01",
        splitBank: true,
        cashAmount: 3000,
        bankAmount: 5000,
      }),
    ).toThrow("Cash and bank amounts must add up to the total opening capital.");
  });

  it("throws for negative split amounts", () => {
    expect(() =>
      normalizeOnboardingOpeningCapitalPayload({
        amount: 10000,
        date: "2024-01-01",
        splitBank: true,
        cashAmount: -1000,
        bankAmount: 11000,
      }),
    ).toThrow("Cash and bank amounts must be zero or greater.");
  });
});

describe("normalizeOnboardingInitialPurchasePayload", () => {
  it("normalizes a valid payload", () => {
    const result = normalizeOnboardingInitialPurchasePayload({
      description: "Laptop",
      amount: 1500,
      date: "2024-06-01",
    });
    expect(result.description).toBe("Laptop");
    expect(result.amount).toBe(1500);
    expect(result.date).toBe("2024-06-01");
  });

  it("defaults description to 'Initial purchase'", () => {
    const result = normalizeOnboardingInitialPurchasePayload({ amount: 100, date: "2024-01-01" });
    expect(result.description).toBe("Initial purchase");
  });

  it("throws for zero amount", () => {
    expect(() => normalizeOnboardingInitialPurchasePayload({ amount: 0, date: "2024-01-01" })).toThrow(
      "Purchase amount must be greater than zero.",
    );
  });
});

describe("normalizeQuickTransactionPayload", () => {
  it("normalizes a sale transaction", () => {
    const result = normalizeQuickTransactionPayload(
      { amount: 500, date: "2024-01-01", description: "Product", paymentMethod: "cash" },
      "sale",
    );
    expect(result.amount).toBe(500);
    expect(result.paymentMethod).toBe("cash");
  });

  it("throws for unsupported type", () => {
    expect(() => normalizeQuickTransactionPayload({ amount: 100, date: "2024-01-01" }, "invalid")).toThrow(
      "Unsupported transaction type.",
    );
  });

  it("allows 'other' type", () => {
    expect(() =>
      normalizeQuickTransactionPayload({ amount: 100, date: "2024-01-01", description: "misc" }, "other"),
    ).not.toThrow();
  });

  it("throws for zero amount", () => {
    expect(() => normalizeQuickTransactionPayload({ amount: 0, date: "2024-01-01" }, "sale")).toThrow(
      "Amount must be greater than zero.",
    );
  });

  it("requires description for expense type", () => {
    expect(() =>
      normalizeQuickTransactionPayload({ amount: 100, date: "2024-01-01", paymentMethod: "cash" }, "expense"),
    ).toThrow("What you paid for is required.");
  });

  it("validates sale payment method", () => {
    expect(() =>
      normalizeQuickTransactionPayload(
        { amount: 100, date: "2024-01-01", paymentMethod: "bank" },
        "sale",
      ),
    ).toThrow("Choose cash or credit for this sale.");
  });

  it("validates expense payment method", () => {
    expect(() =>
      normalizeQuickTransactionPayload(
        { amount: 100, date: "2024-01-01", description: "food", paymentMethod: "credit" },
        "expense",
      ),
    ).toThrow("Choose how you paid for this expense.");
  });

  it("defaults paymentMethod to cash", () => {
    const result = normalizeQuickTransactionPayload(
      { amount: 100, date: "2024-01-01", description: "food" },
      "expense",
    );
    expect(result.paymentMethod).toBe("cash");
  });
});

describe("buildQuickTransactionDescription", () => {
  it("joins prefix and description", () => {
    expect(buildQuickTransactionDescription("Sale", { description: "Widget" })).toBe("Sale — Widget");
  });

  it("joins prefix, description, and party name", () => {
    const result = buildQuickTransactionDescription("Sale", { description: "Widget", partyName: "ACME" });
    expect(result).toBe("Sale — Widget — ACME");
  });

  it("returns prefix alone when no description/partyName", () => {
    expect(buildQuickTransactionDescription("Sale", {})).toBe("Sale");
  });
});

describe("deriveBillExpenseAccountName", () => {
  it("prefixes description with 'Expense - '", () => {
    expect(deriveBillExpenseAccountName("Office supplies")).toBe("Expense - Office supplies");
  });

  it("falls back to 'Expense - Supplier Bill'", () => {
    expect(deriveBillExpenseAccountName("")).toBe("Expense - Supplier Bill");
    expect(deriveBillExpenseAccountName(null)).toBe("Expense - Supplier Bill");
  });

  it("truncates long descriptions", () => {
    const long = "a".repeat(100);
    const result = deriveBillExpenseAccountName(long);
    expect(result.length).toBeLessThanOrEqual(80);
  });
});
