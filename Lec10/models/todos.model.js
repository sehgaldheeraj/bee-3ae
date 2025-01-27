const fs = require("fs/promises");
const path = require("");

const todosDB = path.join(__dirname, ".", "todos.model.js");
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
}
