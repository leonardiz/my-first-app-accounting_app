const {
  serializeUser,
  serializeCompany,
  serializeAccount,
  serializeJournalEntry,
  serializeInvoice,
  serializeBill,
} = require("../lib/serialize");

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

describe("serializeUser", () => {
  it("serializes user fields", () => {
    const user = {
      _id: { toString: () => "user123" },
      name: "Alice",
      email: "alice@test.com",
      activeCompanyId: { toString: () => "comp456" },
      createdAt: new Date("2024-01-01"),
    };
    const result = serializeUser(user);
    expect(result.id).toBe("user123");
    expect(result.name).toBe("Alice");
    expect(result.email).toBe("alice@test.com");
    expect(result.activeCompanyId).toBe("comp456");
    expect(result.createdAt).toEqual(new Date("2024-01-01"));
  });

  it("returns empty string for missing activeCompanyId", () => {
    const user = {
      _id: { toString: () => "user123" },
      name: "Bob",
      email: "bob@test.com",
      activeCompanyId: null,
      createdAt: new Date(),
    };
    expect(serializeUser(user).activeCompanyId).toBe("");
  });
});

describe("serializeCompany", () => {
  it("returns defaults for null company", () => {
    const result = serializeCompany(null);
    expect(result.id).toBe("");
    expect(result.name).toBe("");
    expect(result.currency).toBe("NGN");
    expect(result.billApprovalThreshold).toBe(100000);
    expect(result.onboardingComplete).toBe(false);
  });

  it("serializes a valid company", () => {
    const company = {
      _id: { toString: () => "comp1" },
      name: "ACME Corp",
      industry: "Tech",
      businessType: "LLC",
      address: "123 Main St",
      phone: "555-1234",
      email: "info@acme.com",
      currency: "USD",
      country: "US",
      stateProvince: "CA",
      city: "San Francisco",
      financialYearStart: "2024-01-01",
      billApprovalThreshold: 50000,
      onboardingComplete: true,
    };
    const result = serializeCompany(company);
    expect(result.id).toBe("comp1");
    expect(result.name).toBe("ACME Corp");
    expect(result.currency).toBe("USD");
    expect(result.billApprovalThreshold).toBe(50000);
    expect(result.onboardingComplete).toBe(true);
  });

  it("defaults missing optional fields", () => {
    const company = {
      _id: { toString: () => "comp2" },
    };
    const result = serializeCompany(company);
    expect(result.name).toBe("");
    expect(result.currency).toBe("NGN");
  });

  it("handles non-finite billApprovalThreshold", () => {
    const company = {
      _id: { toString: () => "comp3" },
      billApprovalThreshold: "abc",
    };
    expect(serializeCompany(company).billApprovalThreshold).toBe(100000);
  });
});

describe("serializeAccount", () => {
  it("serializes account fields", () => {
    const account = {
      _id: { toString: () => "acc1" },
      code: "1000",
      name: "Cash",
      type: "Asset",
      openingBalance: 5000,
    };
    const result = serializeAccount(account);
    expect(result.id).toBe("acc1");
    expect(result.code).toBe("1000");
    expect(result.name).toBe("Cash");
    expect(result.type).toBe("Asset");
    expect(result.openingBalance).toBe(5000);
  });

  it("defaults openingBalance to 0 for non-numeric", () => {
    const account = {
      _id: { toString: () => "acc2" },
      code: "2000",
      name: "AP",
      type: "Liability",
      openingBalance: "abc",
    };
    expect(serializeAccount(account).openingBalance).toBe(0);
  });
});

describe("serializeJournalEntry", () => {
  it("serializes entry with lines", () => {
    const entry = {
      _id: { toString: () => "je1" },
      date: "2024-01-15",
      description: "Test entry",
      sourceType: "manual",
      sourceId: "src1",
      lines: [
        { accountId: { toString: () => "acc1" }, debit: 100, credit: 0 },
        { accountId: { toString: () => "acc2" }, debit: 0, credit: 100 },
      ],
    };
    const result = serializeJournalEntry(entry);
    expect(result.id).toBe("je1");
    expect(result.date).toBe("2024-01-15");
    expect(result.lineItems).toHaveLength(2);
    expect(result.lineItems[0]).toEqual({ accountId: "acc1", debit: 100, credit: 0 });
  });

  it("handles empty lines", () => {
    const entry = {
      _id: { toString: () => "je2" },
      date: "2024-01-15",
      description: "Empty",
      lines: [],
    };
    expect(serializeJournalEntry(entry).lineItems).toEqual([]);
  });

  it("defaults sourceType and sourceId", () => {
    const entry = {
      _id: { toString: () => "je3" },
      date: "2024-01-15",
      description: "No source",
      lines: [],
    };
    const result = serializeJournalEntry(entry);
    expect(result.sourceType).toBe("");
    expect(result.sourceId).toBe("");
  });
});

describe("serializeInvoice", () => {
  it("returns null for null invoice", () => {
    expect(serializeInvoice(null)).toBeNull();
  });

  it("serializes a Paid invoice", () => {
    const invoice = {
      _id: { toString: () => "inv1" },
      invoiceNumber: "INV-0001",
      clientName: "Client A",
      clientEmail: "a@test.com",
      invoiceDate: "2024-01-01",
      dueDate: pastDate(),
      lineItems: [{ description: "Widget", quantity: 2, unitPrice: 50, amount: 100 }],
      subtotal: 100,
      taxPercentage: 0,
      totalAmount: 100,
      status: "Paid",
    };
    const result = serializeInvoice(invoice);
    expect(result.status).toBe("Paid");
    expect(result.id).toBe("inv1");
    expect(result.lineItems).toHaveLength(1);
  });

  it("derives Overdue status for Sent invoice with past due date", () => {
    const invoice = {
      _id: { toString: () => "inv2" },
      invoiceNumber: "INV-0002",
      clientName: "Client B",
      invoiceDate: "2024-01-01",
      dueDate: pastDate(),
      lineItems: [],
      subtotal: 0,
      totalAmount: 0,
      status: "Sent",
    };
    expect(serializeInvoice(invoice).status).toBe("Overdue");
  });

  it("keeps Sent status for future due date", () => {
    const invoice = {
      _id: { toString: () => "inv3" },
      invoiceNumber: "INV-0003",
      clientName: "Client C",
      invoiceDate: "2024-01-01",
      dueDate: futureDate(),
      lineItems: [],
      subtotal: 0,
      totalAmount: 0,
      status: "Sent",
    };
    expect(serializeInvoice(invoice).status).toBe("Sent");
  });

  it("keeps Draft status regardless of due date", () => {
    const invoice = {
      _id: { toString: () => "inv4" },
      invoiceNumber: "INV-0004",
      clientName: "Client D",
      invoiceDate: "2024-01-01",
      dueDate: pastDate(),
      lineItems: [],
      subtotal: 0,
      totalAmount: 0,
      status: "Draft",
    };
    expect(serializeInvoice(invoice).status).toBe("Draft");
  });
});

describe("serializeBill", () => {
  it("returns null for null bill", () => {
    expect(serializeBill(null)).toBeNull();
  });

  it("serializes a Paid bill", () => {
    const bill = {
      _id: { toString: () => "bill1" },
      billNumber: "BILL-0001",
      supplierName: "Supplier A",
      supplierEmail: "a@supplier.com",
      billDate: "2024-01-01",
      dueDate: pastDate(),
      lineItems: [{ description: "Materials", quantity: 1, unitPrice: 200, amount: 200 }],
      subtotal: 200,
      taxPercentage: 0,
      totalAmount: 200,
      status: "Paid",
      approvalStatus: "Approved",
    };
    const result = serializeBill(bill);
    expect(result.status).toBe("Paid");
    expect(result.approvalStatus).toBe("Approved");
  });

  it("derives Overdue status for Received bill with past due date", () => {
    const bill = {
      _id: { toString: () => "bill2" },
      billNumber: "BILL-0002",
      supplierName: "Supplier B",
      billDate: "2024-01-01",
      dueDate: pastDate(),
      lineItems: [],
      subtotal: 0,
      totalAmount: 0,
      status: "Received",
    };
    expect(serializeBill(bill).status).toBe("Overdue");
  });

  it("keeps Received for future due date", () => {
    const bill = {
      _id: { toString: () => "bill3" },
      billNumber: "BILL-0003",
      supplierName: "Supplier C",
      billDate: "2024-01-01",
      dueDate: futureDate(),
      lineItems: [],
      subtotal: 0,
      totalAmount: 0,
      status: "Received",
    };
    expect(serializeBill(bill).status).toBe("Received");
  });

  it("defaults approvalStatus to Not Required", () => {
    const bill = {
      _id: { toString: () => "bill4" },
      billNumber: "BILL-0004",
      supplierName: "Supplier D",
      billDate: "2024-01-01",
      dueDate: futureDate(),
      lineItems: [],
      subtotal: 0,
      totalAmount: 0,
      status: "Draft",
    };
    expect(serializeBill(bill).approvalStatus).toBe("Not Required");
  });
});
