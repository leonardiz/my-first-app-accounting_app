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

function calculateJournalLineTotals(lines = []) {
  return (lines || []).reduce(
    (sum, line) => ({
      debits: sum.debits + (Number(line.debit) || 0),
      credits: sum.credits + (Number(line.credit) || 0),
    }),
    { debits: 0, credits: 0 },
  );
}

function isJournalEntryBalanced(entry) {
  const totals = calculateJournalLineTotals(entry?.lines || []);
  return Math.abs(totals.debits - totals.credits) < 0.005;
}

function calculateAccountClosingBalance(accountType, openingBalance, postingTotals) {
  if (accountType === "Asset" || accountType === "Expense") {
    return openingBalance + postingTotals.debits - postingTotals.credits;
  }

  return openingBalance + postingTotals.credits - postingTotals.debits;
}

function getJournalPostingTotals(journalEntries, accountId) {
  return (journalEntries || [])
    .flatMap((entry) => entry.lines || [])
    .filter((line) => String(line.accountId) === String(accountId))
    .reduce(
      (sum, line) => ({
        debits: sum.debits + (Number(line.debit) || 0),
        credits: sum.credits + (Number(line.credit) || 0),
      }),
      { debits: 0, credits: 0 },
    );
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
  calculateJournalLineTotals,
  isJournalEntryBalanced,
  calculateAccountClosingBalance,
  getJournalPostingTotals,
  formatCurrencyAmount,
};
