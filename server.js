const express = require("express");
const { PORT } = require("./utils/server-utils");
const connectMongo = require("./db/mongo");
const app = express();

const startServer = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

module.exports = app;
