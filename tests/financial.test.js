const {
  roundMoney,
  calculateTaxAmount,
  calculateJournalLineTotals,
  isJournalEntryBalanced,
  calculateAccountClosingBalance,
  getJournalPostingTotals,
  formatCurrencyAmount,
} = require("../lib/financial");

describe("roundMoney", () => {
  it("rounds to 2 decimal places", () => {
    expect(roundMoney(1.006)).toBe(1.01);
    expect(roundMoney(1.004)).toBe(1);
    expect(roundMoney(100.999)).toBe(101);
    expect(roundMoney(99.995)).toBe(100);
    expect(roundMoney(3.456)).toBe(3.46);
  });

  it("handles zero", () => {
    expect(roundMoney(0)).toBe(0);
  });

  it("handles negative values", () => {
    expect(roundMoney(-1.555)).toBe(-1.55);
  });

  it("returns 0 for NaN/undefined", () => {
    expect(roundMoney(NaN)).toBe(0);
    expect(roundMoney(undefined)).toBe(0);
    expect(roundMoney(null)).toBe(0);
  });

  it("handles string numbers", () => {
    expect(roundMoney("3.456")).toBe(3.46);
  });
});

describe("calculateTaxAmount", () => {
  it("returns 0 when tax percentage is zero", () => {
    expect(calculateTaxAmount(100, 100, 0)).toBe(0);
  });

  it("returns 0 when tax percentage is negative", () => {
    expect(calculateTaxAmount(100, 100, -5)).toBe(0);
  });

  it("returns difference when total > subtotal and tax > 0", () => {
    expect(calculateTaxAmount(100, 110, 10)).toBe(10);
  });

  it("calculates from percentage when total <= subtotal", () => {
    expect(calculateTaxAmount(100, 100, 10)).toBe(10);
    expect(calculateTaxAmount(200, 200, 7.5)).toBe(15);
  });

  it("handles zero subtotal", () => {
    expect(calculateTaxAmount(0, 0, 10)).toBe(0);
  });

  it("handles non-numeric inputs gracefully", () => {
    expect(calculateTaxAmount("abc", "def", 10)).toBe(0);
  });
});

describe("calculateJournalLineTotals", () => {
  it("sums debits and credits", () => {
    const lines = [
      { debit: 100, credit: 0 },
      { debit: 0, credit: 50 },
      { debit: 25, credit: 25 },
    ];
    expect(calculateJournalLineTotals(lines)).toEqual({ debits: 125, credits: 75 });
  });

  it("returns zeros for empty array", () => {
    expect(calculateJournalLineTotals([])).toEqual({ debits: 0, credits: 0 });
  });

  it("returns zeros for no argument", () => {
    expect(calculateJournalLineTotals()).toEqual({ debits: 0, credits: 0 });
  });

  it("handles null/undefined line values", () => {
    const lines = [{ debit: null, credit: undefined }];
    expect(calculateJournalLineTotals(lines)).toEqual({ debits: 0, credits: 0 });
  });

  it("handles string numbers in lines", () => {
    const lines = [{ debit: "50", credit: "30" }];
    expect(calculateJournalLineTotals(lines)).toEqual({ debits: 50, credits: 30 });
  });
});

describe("isJournalEntryBalanced", () => {
  it("returns true for balanced entry", () => {
    const entry = {
      lines: [
        { debit: 100, credit: 0 },
        { debit: 0, credit: 100 },
      ],
    };
    expect(isJournalEntryBalanced(entry)).toBe(true);
  });

  it("returns false for unbalanced entry", () => {
    const entry = {
      lines: [
        { debit: 100, credit: 0 },
        { debit: 0, credit: 50 },
      ],
    };
    expect(isJournalEntryBalanced(entry)).toBe(false);
  });

  it("allows small rounding differences (< 0.005)", () => {
    const entry = {
      lines: [
        { debit: 100.001, credit: 0 },
        { debit: 0, credit: 100.004 },
      ],
    };
    expect(isJournalEntryBalanced(entry)).toBe(true);
  });

  it("returns true for null/undefined entry", () => {
    expect(isJournalEntryBalanced(null)).toBe(true);
    expect(isJournalEntryBalanced(undefined)).toBe(true);
  });

  it("returns true for entry with no lines", () => {
    expect(isJournalEntryBalanced({ lines: [] })).toBe(true);
  });
});

describe("calculateAccountClosingBalance", () => {
  it("adds debits and subtracts credits for Asset", () => {
    expect(calculateAccountClosingBalance("Asset", 1000, { debits: 500, credits: 200 })).toBe(1300);
  });

  it("adds debits and subtracts credits for Expense", () => {
    expect(calculateAccountClosingBalance("Expense", 0, { debits: 300, credits: 50 })).toBe(250);
  });

  it("adds credits and subtracts debits for Liability", () => {
    expect(calculateAccountClosingBalance("Liability", 500, { debits: 100, credits: 300 })).toBe(700);
  });

  it("adds credits and subtracts debits for Revenue", () => {
    expect(calculateAccountClosingBalance("Revenue", 0, { debits: 50, credits: 200 })).toBe(150);
  });

  it("adds credits and subtracts debits for Equity", () => {
    expect(calculateAccountClosingBalance("Equity", 1000, { debits: 200, credits: 500 })).toBe(1300);
  });
});

describe("getJournalPostingTotals", () => {
  const entries = [
    {
      lines: [
        { accountId: "acc1", debit: 100, credit: 0 },
        { accountId: "acc2", debit: 0, credit: 100 },
      ],
    },
    {
      lines: [
        { accountId: "acc1", debit: 50, credit: 0 },
        { accountId: "acc2", debit: 0, credit: 50 },
      ],
    },
  ];

  it("sums debits and credits for a specific account", () => {
    expect(getJournalPostingTotals(entries, "acc1")).toEqual({ debits: 150, credits: 0 });
    expect(getJournalPostingTotals(entries, "acc2")).toEqual({ debits: 0, credits: 150 });
  });

  it("returns zeros for unknown account", () => {
    expect(getJournalPostingTotals(entries, "unknown")).toEqual({ debits: 0, credits: 0 });
  });

  it("returns zeros for empty entries", () => {
    expect(getJournalPostingTotals([], "acc1")).toEqual({ debits: 0, credits: 0 });
  });

  it("returns zeros for null entries", () => {
    expect(getJournalPostingTotals(null, "acc1")).toEqual({ debits: 0, credits: 0 });
  });
});

describe("formatCurrencyAmount", () => {
  it("formats USD amounts", () => {
    const result = formatCurrencyAmount(1234.56, "USD");
    expect(result).toContain("1,234.56");
    expect(result).toContain("$");
  });

  it("formats NGN amounts", () => {
    const result = formatCurrencyAmount(5000, "NGN");
    expect(result).toContain("5,000");
  });

  it("defaults to NGN when no currency code provided", () => {
    const result = formatCurrencyAmount(100);
    expect(result).toContain("100");
  });

  it("handles zero amount", () => {
    const result = formatCurrencyAmount(0, "USD");
    expect(result).toContain("0");
  });

  it("handles non-numeric values gracefully", () => {
    const result = formatCurrencyAmount("abc", "USD");
    expect(result).toContain("0");
  });

  it("falls back for invalid currency code", () => {
    const result = formatCurrencyAmount(100, "INVALID");
    expect(result).toContain("100");
  });
});
