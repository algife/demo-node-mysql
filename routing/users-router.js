const db = require("../database/db");
const router = require("express").Router();

// ! Router
router
  // BASIC CRUD OPERATIONS IN MYSQL (CRUD = CREATE, READ, UPDATE, DELETE)
  // In an enterprise-grade app It should be split in Microservices or similar

  // CREATE
  .post("/", (req, res) => {})

  // READ
  .get("/", async (req, res) => {
    const { table } = req.body; // TODO escape here with external function

    const result = await db.getAll(table);
    return res.json(result);
  })
  // UPDATE
  .put("/", (req, res) => {
    return res.send("Placeholder update");
  })
  // UPDATE OR CREATE IF IT DOES NOT EXISTS
  .patch("/", (req, res) => {
    return res.send("Placeholder update");
  })
  // DELETE
  .delete("/", (req, res) => {
    return res.send("Placeholder delete");
  });

// --------------------------------------
// ! Exports
module.exports = router;
