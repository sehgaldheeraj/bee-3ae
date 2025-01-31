const express = require("express");
const Todo = require("./models/todos.model");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
/**
 * TODO 1: GET base view
 *
 */
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
/**
 * 200 - 299: Success codes
 * 300 - 399: Default codes
 * 400 - 499: Client side error codes
 * 500 - bey: Server side error codes
 */
app.listen(3000, () => {
  console.log("Learning RESTful CRUD operations on 3000");
});
