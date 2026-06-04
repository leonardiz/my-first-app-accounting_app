function roundMoney(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function calculateTaxAmount(subtotal, totalAmount, taxPercentage) {
  const normalizedSubtotal = Number(subtotal) || 0;
  const normalizedTotal = Number(totalAmount) || 0;
  const normalizedTaxPercentage = Number(taxPercentage) || 0;
  if (normalizedTaxPercentage <= 0) {
    return 0;
  }

  const difference = roundMoney(normalizedTotal - normalizedSubtotal);
  if (difference > 0) {
    return difference;
  }

  return roundMoney(normalizedSubtotal * (normalizedTaxPercentage / 100));
}

function formatCurrencyAmount(value, currencyCode = "NGN") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "NGN",
    }).format(Number(value) || 0);
  } catch {
    return `${currencyCode || "NGN"} ${Number(value) || 0}`;
  }
}

module.exports = {
  roundMoney,
  calculateTaxAmount,
  formatCurrencyAmount,
};
