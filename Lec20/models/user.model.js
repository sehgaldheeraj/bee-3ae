const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "buyer" },
});

userSchema.methods.verifyPassword = async (password) => {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

module.exports = mongoose.model("User", userSchema);
