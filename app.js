const express = require("express");
const usersRouter = require("./routing/users-router");
const app = express();

const bodyParser = require("body-parser");

app
  // ! === Middleware ===
  // -- parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ extended: true }))
  // -- parse application/json
  .use(bodyParser.json());

app
  // ! === API Routes ===
  .use("/api/users/", usersRouter)
  .all("/**", (req, res, next) => {
    res.send("API is working at /api/");
  });

app.listen("3000", () => console.log("UP AND RUNNING"));
