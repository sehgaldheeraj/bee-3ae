const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Todo = require("./models/todos.model");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/v1", routes);

/**
 * 200 - 299: Success codes
 * 300 - 399: Default codes
 * 400 - 499: Client side error codes
 * 500 - bey: Server side error codes
 */
const URL = "mongodb://localhost:27017/todos.db";

async function connection() {
  try {
    await mongoose.connect(URL);
    console.log("Connection with DB established successfully");
  } catch (err) {
    console.log(err.message);
  }
}
connection();
app.listen(3000, () => {
  console.log("Learning RESTful CRUD operations on 3000");
});
//sehgaldheeraj/bee-3ae
b;
