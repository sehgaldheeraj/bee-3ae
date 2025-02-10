const fs = require("fs/promises");
const path = require("path");

const todosDB = path.join(__dirname, "todos.json");
class Todo {
  static addTodo = (name, type, status) => {
    return new Promise(async (resolve, reject) => {
      try {
        //existing todos
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data);
        //new todo add
        const newTodo = {
          id: todos.length + 1,
          name: name,
          type: type,
          status: status,
        };
        todos.push(newTodo);
        //todos save
        await fs.writeFile(todosDB, JSON.stringify(todos));
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  static getTodos = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data);
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  // static updateTodo = (id, status) => {};
  // static deleteTodo = (id) => {};
}
module.exports = Todo;
