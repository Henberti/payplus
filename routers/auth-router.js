const router = require("express").Router();
const { register, login, isLoggedIn } = require("../controllers/user-controller");

const {asyncHandler} = require('../handlers/async-handler') 
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/isLoggedIn", asyncHandler(isLoggedIn));



module.exports = {
  authRouter: router,
};
