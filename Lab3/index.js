const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));
// app.get("/styles.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/styles.css"));
// });

app.listen(3000, () => {
  console.log("learning templating engines at port 3000");
});
