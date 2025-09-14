require("dotenv").config();

const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;

const EXT_JWT_SECRET = "1d";

module.exports = {
  PORT,
  JWT_SECRET,
  EXT_JWT_SECRET
};
