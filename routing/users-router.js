const UserDAL = require("../database/dal/user-dal");
const router = require("express").Router();

// ! Router
router
  // BASIC CRUD OPERATIONS IN MYSQL (CRUD = CREATE, READ, UPDATE, DELETE)
  // In an enterprise-grade app It should be split in Microservices or similar

  // CREATE
  .post("/", async (req, res) => {
    const userInfo = req.body; // TODO ESCAPE It TO AVOID XSS attacks

    const result = await UserDAL.createOne(userInfo);
    return res.json(result);
  })

  // READ
  .get("/", async (req, res) => {
    const result = await UserDAL.getAll();
    return res.json(result);
  })

  .get("/:username", async (req, res) => {
    const { username } = req.params; // TODO ESCAPE It TO AVOID XSS attacks

    const result = await UserDAL.getOne(username);
    return res.json(result);
  })

  // UPDATE
  // -- using PATCH to update certain fields but not overwrite the entire object
  .put("/:username", async (req, res) =>
    res.send("Use PATCH method instead to update certain fields only")
  )
  .patch("/:username", async (req, res) => {
    const { username } = req.params; // TODO ESCAPE It TO AVOID XSS attacks
    const { activate } = req.query; // TODO ESCAPE It TO AVOID XSS attacks
    const updateInfo = req.body; // TODO ESCAPE It TO AVOID XSS attacks

    if (updateInfo.username || updateInfo.isActivated)
      res.status(400).send("Invalid request data body");

    if (activate === "1") updateInfo.isActivated = 1;

    const result = await UserDAL.updateOne(username, updateInfo);
    return res.json(result);
  })

  // DELETE
  .delete("/:username", async (req, res) => {
    try {
      const { username } = req.params; // TODO ESCAPE It TO AVOID XSS attacks
      const deletedUser = await UserDAL.deleteOne(username);

      if (deletedUser) {
        return res.json({ ...deletedUser, isDeleted: 1 });
      }
    } catch (err) {
      return res.json({
        error: {
          errorCode: err.code,
          message: err.message,
        },
      });
    }
  });

// --------------------------------------
// ! Exports
module.exports = router;
