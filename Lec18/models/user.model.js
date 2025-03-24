const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
