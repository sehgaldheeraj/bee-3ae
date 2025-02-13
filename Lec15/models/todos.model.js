const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  category: { type: String, default: "Others" },
  state: { type: String, default: "pending" },
  time: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);
//plural lowercased collection: todos

module.exports = Todo;
