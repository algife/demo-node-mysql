const mysql = require("mysql");
const { parseSqlValue, parseSqlColumnName } = require("./sql-scripts");

require("dotenv").config();

// We abstract the Database in an agnotisc class
class DatabaseLayer {
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

  async getOne(table, filterKey, filterValue) {
    try {
      console.log("Getting ONE record from table " + table);
      const sql = `SELECT * FROM \`${table}\` WHERE ${filterKey} = '${filterValue}' LIMIT 1;`;
      // TODO We can select EXCLUSIVELY the specific fields we want to retrieve for the front-end

      const items = await this.query(sql);

      if (items.length < 1) {
        console.log("Error - User not found");
        return null;
      } else if (items.length > 1) {
        throw new Error(
          "Error - The SQL statement to retrieve one user is retrieving more than one"
        );
      } else return items[0];
    } catch (err) {
      console.error(err);
    } finally {
      // await this.close();
    }
  }

  async getMany(table, filterKey, filterValue) {
    try {
      console.log("Getting MANY records from table " + table);
      const sql = `SELECT * FROM \`${table}\` WHERE ${filterKey} = '${filterValue}';`;
      return await this.query(sql);
    } catch (err) {
      console.error(err);
    } finally {
      // await this.close();
    }
  }

  async createOne(table, details) {
    try {
      console.log("Inserting ONE record into table " + table);

      const columnsSql = Object.keys(details)
        .map((c) => parseSqlColumnName(c))
        .join(", ");
      const valuesSql = Object.values(details)
        .map((v) => parseSqlValue(v))
        .join(", ");

      const sql = `INSERT INTO \`${table}\` (${columnsSql}) VALUES (${valuesSql})`;
      return await this.query(sql);
    } catch (err) {
      console.error(err);
    } finally {
      // await this.close();
    }
  }

  async updateOne(table, filterKey, filterValue, details) {
    try {
      console.log("Updating ONE record from table " + table);
      const sql =
        `UPDATE \`${table}\` SET ` +
        Object.keys(details).map((key) => {
          const value = details[key];
          return `${key} = ${parseSqlValue(value)} `;
        }) +
        `WHERE ${filterKey} = ${parseSqlValue(filterValue)} LIMIT 1`;

      return await this.query(sql);
    } catch (err) {
      console.error(err);
    } finally {
      // await this.close();
    }
  }

  async deleteOne(table, filterKey, filterValue) {
    try {
      console.log("Deleting ONE record from table " + table);
      const sql = `DELETE FROM \`${table}\` WHERE ${filterKey} = '${filterValue}' LIMIT 1;`;
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
