const mysql = require("mysql");

require("dotenv").config();

// We abstract the Database in an agnotisc class
class DatabaseLayer {
  database = process.env.DBdatabase;

  _connection = mysql.createConnection({
    host: process.env.DBhost,
    port: process.env.DBport,
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBdatabase,
  });

  constructor() {
    this.initConnection();
  }

  initConnection() {
    this._connection.connect((err) => {
      if (err) {
        console.log(err);
      }
      console.log("MYSQL Connected");
    });
  }

  async query(sql) {
    return await new Promise((resolve, reject) => {
      console.log("Executing query:", sql);
      this._connection.query(sql, (err, results, fields) => {
        if (err !== null) reject(err);
        console.log("[RESULT]", results);
        resolve(results);
      });
    });
  }

  async getAll(table) {
    try {
      console.log("Getting all records for table " + table);
      const sql = `SELECT * FROM \`${table}\``;
      return await this.query(sql);
    } catch (err) {
      console.error(err);
    } finally {
      // await this.close();
    }
  }

  close() {
    this._connection.end();
  }
}

const dbInstance = new DatabaseLayer();
module.exports = dbInstance;
