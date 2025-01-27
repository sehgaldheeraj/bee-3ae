const express = require("express");
const app = express();

//middlewares
app.use(express.json());
//Body parsing middleware
//app.use(bodyParser.json()); -> when sending data in json format

/**
 * TODO 1: User Registration API
 * REQ ->user = {name, age, email, phone, password}
 * RES ->users [], message
 */
const users = [];
app.post("/users", (req, res) => {
  //extract user data from request
  const { name, age, email, phone, password } = req.body;
  //data validation
  if (!email || !password) {
    res.status(404).send({ message: "Enter all required fields" });
  }
  //add data to database
  users.push(req.body);
  //send appropriate response
  res
    .status(201)
    .send({ users: users, message: "account creation successful" });
});
app.listen(3000, () => {
  console.log("Server Started on PORT 3000");
});
