const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const memoryStore = require("memorystore")(session);

const User = require("./models/user.model");
const passport = require("./authentication/passport");

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
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

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
  passport.authenticate("local");
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
