const { AppError } = require("../models/app-error");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/server-utils");

// Authentication middleware to protect routes
exports.authMiddleware = (req, res, next) => {

  const headerAuth = req.headers.authorization;
  console.log('Header Auth:', headerAuth);
  if (!headerAuth) {
    throw new AppError("authorization required", 401);
  }
  const accessToken = headerAuth.split(" ")?.[1];
  if (!accessToken) {
    throw new AppError("malformed access token", 401);
  }
  try {
    const decode = jwt.verify(accessToken, JWT_SECRET);
    req.user = decode.userId;
    return next();
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError("invalid access token", 401);
  }
};
