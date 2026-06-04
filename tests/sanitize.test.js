const {
  escapeHtml,
  sanitizeRawString,
  sanitizeText,
  sanitizeEmail,
  sanitizeUppercaseCode,
  sanitizeDateInput,
  sanitizeValue,
} = require("../lib/sanitize");

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("A & B")).toBe("A &amp; B");
  });

  it("escapes angle brackets", () => {
    expect(escapeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;",
    );
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  it("handles null/undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("passes through safe strings unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });
});

describe("sanitizeRawString", () => {
  it("removes control characters", () => {
    expect(sanitizeRawString("hello\x00world")).toBe("helloworld");
    expect(sanitizeRawString("foo\x1Fbar")).toBe("foobar");
    expect(sanitizeRawString("a\x7Fb")).toBe("ab");
  });

  it("removes angle brackets", () => {
    expect(sanitizeRawString("<script>")).toBe("script");
    expect(sanitizeRawString("a > b")).toBe("a  b");
  });

  it("normalizes Unicode to NFKC", () => {
    const result = sanitizeRawString("\ufb01");
    expect(result).toBe("fi");
  });

  it("preserves normal text", () => {
    expect(sanitizeRawString("hello world 123!@#")).toBe("hello world 123!@#");
  });
});

describe("sanitizeText", () => {
  it("trims whitespace", () => {
    expect(sanitizeText("  hello  ")).toBe("hello");
  });

  it("enforces max length", () => {
    expect(sanitizeText("abcdefghij", 5)).toBe("abcde");
  });

  it("uses default max length of 160", () => {
    const long = "a".repeat(200);
    expect(sanitizeText(long)).toHaveLength(160);
  });

  it("strips control characters and trims", () => {
    expect(sanitizeText("  \x00hello\x01  ")).toBe("hello");
  });
});

describe("sanitizeEmail", () => {
  it("lowercases email", () => {
    expect(sanitizeEmail("User@Example.COM")).toBe("user@example.com");
  });

  it("trims whitespace", () => {
    expect(sanitizeEmail("  foo@bar.com  ")).toBe("foo@bar.com");
  });

  it("enforces 254 character limit", () => {
    const long = "a".repeat(300) + "@test.com";
    expect(sanitizeEmail(long).length).toBeLessThanOrEqual(254);
  });

  it("strips control characters", () => {
    expect(sanitizeEmail("user\x00@test.com")).toBe("user@test.com");
  });
});

describe("sanitizeUppercaseCode", () => {
  it("uppercases the value", () => {
    expect(sanitizeUppercaseCode("usd")).toBe("USD");
  });

  it("trims whitespace", () => {
    expect(sanitizeUppercaseCode("  ngn  ")).toBe("NGN");
  });

  it("enforces max length", () => {
    expect(sanitizeUppercaseCode("abcdefghij", 3)).toBe("ABC");
  });

  it("uses default max length of 24", () => {
    const long = "a".repeat(30);
    expect(sanitizeUppercaseCode(long)).toHaveLength(24);
  });
});

describe("sanitizeDateInput", () => {
  it("returns empty string for empty input", () => {
    expect(sanitizeDateInput("")).toBe("");
  });

  it("accepts valid YYYY-MM-DD format", () => {
    expect(sanitizeDateInput("2024-01-15")).toBe("2024-01-15");
  });

  it("throws for invalid date format", () => {
    expect(() => sanitizeDateInput("01-15-2024")).toThrow("Date must be in YYYY-MM-DD format.");
    expect(() => sanitizeDateInput("2024/01/15")).toThrow("Date must be in YYYY-MM-DD format.");
    expect(() => sanitizeDateInput("January 15")).toThrow("Date must be in YYYY-MM-DD format.");
  });

  it("trims whitespace before validating", () => {
    expect(sanitizeDateInput("  2024-06-01  ")).toBe("2024-06-01");
  });

  it("thrown error has status 400", () => {
    try {
      sanitizeDateInput("bad");
    } catch (err) {
      expect(err.status).toBe(400);
    }
  });
});

describe("sanitizeValue", () => {
  it("sanitizes strings by removing control characters", () => {
    expect(sanitizeValue("hello\x00")).toBe("hello");
  });

  it("recursively sanitizes arrays", () => {
    expect(sanitizeValue(["a\x00", "b\x01"])).toEqual(["a", "b"]);
  });

  it("recursively sanitizes object values", () => {
    expect(sanitizeValue({ name: "test\x00" })).toEqual({ name: "test" });
  });

  it("passes through numbers unchanged", () => {
    expect(sanitizeValue(42)).toBe(42);
  });

  it("passes through booleans unchanged", () => {
    expect(sanitizeValue(true)).toBe(true);
    expect(sanitizeValue(false)).toBe(false);
  });

  it("passes through null unchanged", () => {
    expect(sanitizeValue(null)).toBeNull();
  });

  it("rejects keys containing $", () => {
    expect(() => sanitizeValue({ $gt: 5 })).toThrow("Invalid request payload.");
  });

  it("rejects keys containing .", () => {
    expect(() => sanitizeValue({ "a.b": 1 })).toThrow("Invalid request payload.");
  });

  it("handles nested objects", () => {
    expect(
      sanitizeValue({
        outer: { inner: "val\x00" },
      }),
    ).toEqual({
      outer: { inner: "val" },
    });
  });

  it("handles nested arrays in objects", () => {
    expect(
      sanitizeValue({
        items: ["a\x01", "b"],
      }),
    ).toEqual({
      items: ["a", "b"],
    });
  });
});
