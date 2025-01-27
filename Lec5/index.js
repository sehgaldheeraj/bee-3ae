//importing module
const express = require("express");
//import express from "express";
//initializing server-creating a server instance
const app = express();
app.use("/", (request, response) => {
  response.send("Hello World");
}); //args: Route , CB
//starting a server
app.listen(3000, () => {
  console.log("Server Started Successfully");
});
//Set-ExecutionPolicy RemoteSigned
