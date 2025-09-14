const { AppError } = require("../models/app-error");
const { User } = require("../models/schema/user-schema");
const argon2 = require("argon2");
const { validateILID } = require("../utils/validation/validate-IL-ID");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EXT_JWT_SECRET } = require("../utils/server-utils");

/**
 *
 *  @param  {req,res,next}  body: { email, password, passwordConfirm, name, id }
 *  @description Register a new user
 *  @route POST /api/auth/register
 *  @access Public
 *  @returns {Promise<{accessToken: string, user: User}>} The access token and user data
 */
exports.register = async (...[req, res, next]) => {
  try {
    const { email, password, passwordConfirm, name, id } = req.body;
    if (password !== passwordConfirm) {
      throw new AppError("Passwords do not match", 400);
    }
    if (!validateILID(id)) {
      throw new AppError("Invalid ID", 400);
    }
    const hashedPassword = await argon2.hash(password);

    const user = await User.create({ ILid: id, email, password: hashedPassword, name });
    const { password: passwordInDb, ...newUser } = user;
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: EXT_JWT_SECRET });
    return { accessToken: token, user: newUser };
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param  {req,res,next} body: { id, password }
 * @description Login a user/login
 * @route POST /api/auth/login
 * @access Public
 * @returns {Promise<{accessToken: string, user: User}>} The access token and user data
 */
exports.login = async (...[req]) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ ILid: id });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: EXT_JWT_SECRET });
    return { accessToken: token, user };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 *
 * @param  {req,res, next} req
 * @description Check if user is logged in by verifying the JWT token
 * @route GET /api/auth/isLoggedIn
 * @access Public
 * @returns {boolean} Whether the user is logged always returns boolean
 */
exports.isLoggedIn = (...[req]) => {
  try {
    const headerAuth = req.headers.authorization;
    console.error(headerAuth);
    if (!headerAuth) {
      return false;
    }
    const accessToken = headerAuth.split(" ")?.[1];
    if (!accessToken) {
      return false;
    }
    const decode = jwt.verify(accessToken, JWT_SECRET);
    req.user = decode.userId;
    return true;
  } catch (err) {
    return false;
  }
};

/**
 *
 * @param  {req,res, next}  req.userId - extracted from auth middleware
 * @description Get the authenticated user's details
 * @route GET /api/users/me
 * @access Private
 * @returns {Promise<User>} The authenticated user's details
 */
exports.getMe = (...[req]) => {
  try {
    const userId = req.user;
    console.log('User ID:', userId);
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }
    const user = User.findById(userId, { password: 0 });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
