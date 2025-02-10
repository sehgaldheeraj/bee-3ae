const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Todo = require("./models/todos.model");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
/**
 * TODO 1: GET base view
 *
 */
//'/sehgaldheeraj/bee-3ae'
app.get("/", async (req, res) => {
  try {
    const todos = await Todo.getTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
app.get("/addTodo", (req, res) => res.render("addTodo"));

/**
 * TODO 2: APIs that deal with TODO creation
 */
app.post("/todos", async (req, res) => {
  try {
    const { name, type, status } = req.body;
    if (!name || !type || !status) {
      return res.status(404).send({ message: "Enter all details" });
    }
    //Addition to DB
    await Todo.addTodo(name, type, status);
    //send response
    res.status(201).send({ message: "Todo Added Successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.patch("/todos/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  //await Todo.updateTodo(id, status);
});
/**
 * 200 - 299: Success codes
 * 300 - 399: Default codes
 * 400 - 499: Client side error codes
 * 500 - bey: Server side error codes
 */
const URL = "";
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
