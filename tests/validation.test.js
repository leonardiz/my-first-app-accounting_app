const { createHttpError, parseNumberField } = require("../lib/validation");

describe("createHttpError", () => {
  it("returns an Error with status and message", () => {
    const err = createHttpError(400, "bad request");
    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(400);
    expect(err.message).toBe("bad request");
  });

  it("works with different status codes", () => {
    expect(createHttpError(404, "not found").status).toBe(404);
    expect(createHttpError(500, "server error").status).toBe(500);
  });
});

describe("parseNumberField", () => {
  it("returns 0 for empty string", () => {
    expect(parseNumberField("", "test")).toBe(0);
  });

  it("returns 0 for null", () => {
    expect(parseNumberField(null, "test")).toBe(0);
  });

  it("returns 0 for undefined", () => {
    expect(parseNumberField(undefined, "test")).toBe(0);
  });

  it("parses valid integers", () => {
    expect(parseNumberField(42, "test")).toBe(42);
    expect(parseNumberField("100", "test")).toBe(100);
    expect(parseNumberField(-5, "test")).toBe(-5);
  });

  it("parses valid decimals", () => {
    expect(parseNumberField(3.14, "test")).toBe(3.14);
    expect(parseNumberField("99.99", "test")).toBe(99.99);
  });

  it("parses zero", () => {
    expect(parseNumberField(0, "test")).toBe(0);
    expect(parseNumberField("0", "test")).toBe(0);
  });

  it("throws for NaN values", () => {
    expect(() => parseNumberField("abc", "Amount")).toThrow("Amount must be a valid number.");
    expect(() => parseNumberField(NaN, "Price")).toThrow("Price must be a valid number.");
  });

  it("throws for Infinity", () => {
    expect(() => parseNumberField(Infinity, "Total")).toThrow("Total must be a valid number.");
    expect(() => parseNumberField(-Infinity, "Total")).toThrow("Total must be a valid number.");
  });

  it("thrown error has status 400", () => {
    try {
      parseNumberField("xyz", "Field");
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });
});
