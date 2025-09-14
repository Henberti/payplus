const router = require("express").Router();
const { getMe } = require("../controllers/user-controller");
const { authMiddleware } = require('../middleware/auth-middleware');
const {asyncHandler} = require('../handlers/async-handler')
router.use(authMiddleware);

router.get("/me", asyncHandler(getMe));

module.exports = {
  userRouter: router,
};
