function createHttpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function sendServerError(res, error, message, isProduction) {
  console.error(message, error);
  if (error?.status) {
    return res.status(error.status).json({ error: error.message || message });
  }

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    return res.status(400).json({ error: "Invalid request data." });
  }

  const response = { error: message };
  if (!isProduction) {
    response.details = error instanceof Error ? error.message : String(error);
  }

  return res.status(500).json(response);
}

module.exports = {
  createHttpError,
  sendServerError,
};
