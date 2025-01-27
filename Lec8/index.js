const express = require("express");
const app = express();
const pets = ["dog", "cat", "perry"];
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Views                         
    <ul>
    ${pets.map((pet) => `<li>${pet}</li>`)}
    </ul>                         
    `);
});
app.listen(3000, () => {
  console.log("Learning views at 3000");
});
