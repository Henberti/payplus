const appRouter = require("express").Router();
const { errorHandler } = require("../handlers/error-handler");
const { userRouter } = require("./user-router");
const { authRouter } = require("../routers/auth-router");
const { customerRouter } = require("../routers/customer-router");


appRouter.use("/auth", authRouter);
appRouter.use("/users", userRouter);
appRouter.use("/customers", customerRouter);

appRouter.use(errorHandler);

module.exports = {
  appRouter,
};
