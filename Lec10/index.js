const express = require("express");
const app = express();

/**
 * TODO 1: GET base view
 *
 */

/**
 * TODO 2: APIs that deal with TODO creation
 */
app.post("/todos", (req, res) => {
  const { name, type, status } = req.body;
  //Addition to DB
  //send response
});

app.listen(3000, () => {
  console.log("Learning RESTful CRUD operations on 3000");
});
