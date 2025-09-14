const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    ILid: { type: String, required: true, unique: true }, // Using provided ID as _id
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = {
  User,
};
