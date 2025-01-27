const path = require("path");
const fs = require("fs");
path.join(__dirname, "db.json");
fs.writeFile("text.txt", "Hello World", (err, data) => {
  if (err) {
    console.log(err);
  }
  //console.log(data);
});
fs.readFile("text.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
