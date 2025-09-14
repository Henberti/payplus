
// standard error class for operational errors
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.statusCode = statusCode || 500;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = {
    AppError,
};