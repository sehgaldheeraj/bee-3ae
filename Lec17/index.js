const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/user.model");

const app = express();
app.use(express.json());

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
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ msg: "Kindly register" });
    }
    if (user.password != password) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
    res.status(200).send({ msg: "Login successful" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

function isAuthenticated(req, res, next) {}

app.get("/profile", (req, res) => {
  res.send({ msg: "Welcome" });
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
