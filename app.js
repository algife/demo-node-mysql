const express = require("express");
const mysql = require("mysql");

const app = express();

app.get("/", (req, res, next) => {
  res.send("ok");
});

app.listen("3000", () => console.log("UP AND RUNNING"));
