const { sanitizeText, parseNumberField } = require("./sanitize");
const { createHttpError } = require("./errors");

function normalizeDocumentLine(line, index, entityLabel) {
  const description = sanitizeText(line?.description || "", 240);
  const quantity = parseNumberField(line?.quantity, `${entityLabel} line ${index + 1} quantity`);
  const unitPrice = parseNumberField(line?.unitPrice, `${entityLabel} line ${index + 1} unit price`);
  const amount = quantity * unitPrice;

  if (!description) {
    throw createHttpError(400, `${entityLabel} line ${index + 1} description is required.`);
  }

  if (quantity <= 0) {
    throw createHttpError(400, `${entityLabel} line ${index + 1} quantity must be greater than zero.`);
  }

  if (unitPrice < 0) {
    throw createHttpError(400, `${entityLabel} line ${index + 1} unit price must be zero or greater.`);
  }

  return {
    description,
    quantity,
    unitPrice,
    amount,
  };
}

async function generateNextDocumentNumber(Model, numberField, prefix, userId, companyId) {
  const latestDoc = await Model.findOne({ userId, companyId })
    .sort({ createdAt: -1, [numberField]: -1 })
    .lean();

  const lastSequenceMatch = latestDoc?.[numberField]?.match(/(\d+)$/);
  const nextSequence = lastSequenceMatch ? Number(lastSequenceMatch[1]) + 1 : 1;
  return `${prefix}-${String(nextSequence).padStart(4, "0")}`;
}

function serializeLineItems(lineItems) {
  return (lineItems || []).map((line) => ({
    description: line.description || "",
    quantity: Number(line.quantity) || 0,
    unitPrice: Number(line.unitPrice) || 0,
    amount: Number(line.amount) || 0,
  }));
}

module.exports = {
  normalizeDocumentLine,
  generateNextDocumentNumber,
  serializeLineItems,
};
