const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const memoryStore = require("memorystore")(session);

const User = require("./models/user.model");

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "pow###pow",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000, httpOnly: true, secure: false },
    store: new memoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);

const URI = "mongodb://localhost:27017/ecomAE";
//POST /register
app.post("/register", async (req, res) => {
  const { fullname, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds

    await User.create({ fullname, email, password: hashedPassword, phone });
    res.status(201).send({ msg: "Account created successfully" });
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
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
    //res.cookie("userIdCard", user);
    req.session.user = user;
    res.status(200).send({ msg: "Login successful" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  next();
}

app.get("/profile", isAuthenticated, (req, res) => {
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
