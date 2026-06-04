function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeRequestBody(req, res, next) {
  try {
    req.body = sanitizeValue(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid request payload." });
  }
}

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === "object") {
    const sanitized = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      if (key.includes("$") || key.includes(".")) {
        const { createHttpError } = require("./errors");
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
  const { createHttpError } = require("./errors");
  const normalized = sanitizeRawString(value).trim();
  if (!normalized) {
    return "";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw createHttpError(400, "Date must be in YYYY-MM-DD format.");
  }

  return normalized;
}

function parseNumberField(value, fieldName) {
  if (value === "" || value === null || typeof value === "undefined") {
    return 0;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    const { createHttpError } = require("./errors");
    throw createHttpError(400, `${fieldName} must be a valid number.`);
  }

  return number;
}

module.exports = {
  escapeHtml,
  sanitizeRequestBody,
  sanitizeValue,
  sanitizeRawString,
  sanitizeText,
  sanitizeEmail,
  sanitizeUppercaseCode,
  sanitizeDateInput,
  parseNumberField,
};
