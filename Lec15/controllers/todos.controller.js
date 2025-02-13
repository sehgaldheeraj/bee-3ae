//const Todo = require("../models/todo.deprecated");
const Todo = require("../models/todos.model");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.readTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addTodoView = (req, res) => res.render("addTodo");

const addTodo = async (req, res) => {
  try {
    const { name, desc, category, state } = req.body;
    // if (!name) {
    //   return res.status(404).send({ message: "Enter All Details" });
    // }
    //await Todo.addTodo(name, type, status);

    //Create operation using mongoose
    //method 1: create todo instance from Todo class
    const todo = new Todo({ name, desc, category, state });
    await todo.save();

    //method 2: static way of creation
    await Todo.create({ name, desc, category, state });

    return res.status(201).send({ message: "Todo added successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const updateTodoView = (req, res) => res.render("updateTodo");
const updateTodo = async (req, res) => {
  const { id, status } = req.body;
  await Todo.updateTodo(id, status);
  res.status(200).send({ message: "status updated successfully" });
};
module.exports = {
  getAllTodos,
  addTodoView,
  addTodo,
  updateTodoView,
  updateTodo,
};
