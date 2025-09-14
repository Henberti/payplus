const { AppError } = require("../models/app-error");
const { Customer } = require("../models/schema/customer-schema");

/**
 *
 * @param  {req, res, next} req.userId has to be set by auth middleware
 * @description Get all customers for the authenticated user
 * @route GET /api/customers
 * @access Private
 * @returns {Promise<Array>} List of customers
 */
exports.getAllCustomers = async (...[req]) => {
  try {
    const { user: userId } = req;
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }
    return Customer.find({ userId });
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param  {req, res, next} req.userId has to be set by auth middleware
 * @description Create a new customer for the authenticated user
 * @route POST /api/customers
 * @access Private
 * @returns
 */
exports.createCustomer = async (req, res, next) => {
  try {
    const { user: userId } = req;
    console.log("Creating customer for userId:", userId);
    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }
    const { name, email, phone_number, birth_date } = req.body;

    const response = await Customer.create({ name, email, phone_number, birth_date, userId });
    res.status(201).json({ data: response, ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message, ok: false });
  }
};

/**
 *
 * @param  {req,res, next}  req.userId has to be set by auth middleware
 * @param req.params.id Customer ID to fetch
 * @description Get a customer by ID for the authenticated user
 * @route GET /api/customers/:id
 * @access Private
 * @returns
 */
exports.getCustomerById = async (...[req]) => {
  try {
    const { user: userId } = req;

    const { id } = req.params;
    if (!userId) {
      console.log("No userId found in request", userId);
      throw new AppError("Unauthorized", 401);
    }
    if (!id) {
      throw new AppError("Customer ID is required", 400);
    }
    const customer = await Customer.findOne({ userId });
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    return customer;
  } catch (err) {
    throw err;
  }
};
