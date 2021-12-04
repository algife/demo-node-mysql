const db = require("../db");

class UserDAL {
  static table = "users";
  static identifierPK = "username";

  // CRUD
  static async createOne(details) {
    const { username } = details;
    const dbOp = await db.createOne(UserDAL.table, details);

    // WRONG BEHAVIOUR
    if (dbOp.affectedRows !== 1) {
      throw new Error(
        "Some error happened creating a record in the users table"
      );
    }

    // SUCCESS
    const resourcesAffected = await UserDAL.getOne(username);
    return resourcesAffected;
  }

  static async getAll() {
    return await db.getAll(UserDAL.table);
  }

  static async updateOne(username, details) {
    const dbOp = await db.updateOne(
      UserDAL.table,
      UserDAL.identifierPK,
      username,
      details
    );

    // WRONG BEHAVIOUR
    if (dbOp.affectedRows !== 1) {
      throw new Error(
        "Some error happened updating a record in the users table"
      );
    }

    // SUCCESS
    const resourcesAffected = await UserDAL.getOne(username);
    return resourcesAffected;
  }

  static async deleteOne(username) {
    // Retrieve the user before is deleted
    const resourcesAffected = await UserDAL.getOne(username);

    if (resourcesAffected === null) {
      // Not found
      throw new Error(
        `The user ${username} cannot be found and consequently cannot be deleted`
      );
    }

    const dbOp = await db.deleteOne(
      UserDAL.table,
      UserDAL.identifierPK,
      username
    );

    // WRONG BEHAVIOUR
    if (dbOp.affectedRows !== 1) {
      throw new Error(
        "Some error happened deleting a record in the users table"
      );
    }

    // SUCCESS
    return resourcesAffected;
  }

  static async getOne(username) {
    return await db.getOne(UserDAL.table, UserDAL.identifierPK, username);
  }

  static async activate(username) {
    const details = {
      isActivated: 1,
    };
    return await USERDAL.updateOne(username, details);
  }
}

module.exports = UserDAL;
