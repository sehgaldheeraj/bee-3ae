const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/user.model");

const app = express();
const URI = "localhost:27017/testecom";
//POST /register
app.post("/register", async (req, res) => {
  const newUser = req.body;
  try {
    await User.create(newUser);
  } catch (err) {
    res.send({ msg: err.message });
  }
});
async function dbconnection() {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err.message);
  }
}

dbconnection();

app.listen(3000, () => {
  console.log("Learning cookies @ 3000");
});
