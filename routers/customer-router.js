const router = require("express").Router();
const { createCustomer, getAllCustomers, getCustomerById } = require("../controllers/customer-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const { asyncHandler } = require("../handlers/async-handler");

router.use(authMiddleware);

router.get("/:id", asyncHandler(getCustomerById));
router.get("/", asyncHandler(getAllCustomers));
router.post("/", createCustomer);

module.exports = {
  customerRouter: router,
};
