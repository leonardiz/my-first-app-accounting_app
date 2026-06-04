function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseNumberField(value, fieldName) {
  if (value === "" || value === null || typeof value === "undefined") {
    return 0;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw createHttpError(400, `${fieldName} must be a valid number.`);
  }

  return number;
}

module.exports = {
  createHttpError,
  parseNumberField,
};
