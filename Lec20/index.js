const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const memoryStore = require("memorystore")(session);
const path = require("path");

const passport = require("./authentication/passport");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expess.static(path.join(__dirname, "public")));

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

app.use("/v1", require("./routes/index"));

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
