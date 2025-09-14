const { AppError } = require("../models/app-error");

// Global error handling middleware
function errorHandler(error, req, res, next) {
  let errorInstance;

  if (error instanceof AppError) {
    errorInstance = { status: error.statusCode, message: error.message };
  } else {
    errorInstance = { status: 500, message: error.message };
  }
  const response = {
    error: errorInstance,
    ok: false,
  };

  res.status(errorInstance.status).json(response);
}

module.exports = { errorHandler };
