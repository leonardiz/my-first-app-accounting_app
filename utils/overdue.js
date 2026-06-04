function isOverdue(dueDate) {
  if (!dueDate) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10);
  return dueDate < today;
}

function getDaysOverdue(dueDate) {
  if (!dueDate) {
    return 0;
  }

  const due = new Date(`${dueDate}T00:00:00`);
  const today = new Date();
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - due.getTime();
  if (diffMs <= 0) {
    return 0;
  }

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function deriveDocumentStatus(doc, activeStatusLabel) {
  if (!doc) {
    return "Draft";
  }

  if (doc.status === "Paid") {
    return "Paid";
  }

  if (doc.status === "Draft") {
    return "Draft";
  }

  return isOverdue(doc.dueDate) ? "Overdue" : activeStatusLabel;
}

function shouldResetOverdueNotification(docLike) {
  const normalizedStatus = String(docLike?.status || "").trim();
  if (normalizedStatus === "Draft" || normalizedStatus === "Paid") {
    return true;
  }

  return !isOverdue(docLike?.dueDate || "");
}

module.exports = {
  isOverdue,
  getDaysOverdue,
  deriveDocumentStatus,
  shouldResetOverdueNotification,
};
