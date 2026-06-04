const { createHttpError } = require("./validation");

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

module.exports = {
  escapeHtml,
  sanitizeRawString,
  sanitizeText,
  sanitizeEmail,
  sanitizeUppercaseCode,
  sanitizeDateInput,
  sanitizeValue,
};
