// const createTableIfDoesNotExist = (databaseName, tableName) =>
//   //    `USE ${databaseName};` +
//   /*`CREATE TABLE IF NOT EXISTS test.users(username VARCHAR(70) NOT NULL,email VARCHAR(200) NOT NULL,isActivated BOOLEAN NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;*/
//  ;

/*
    INSERT INTO `table` (`value1`, `value2`) 
    SELECT 'stuff for value1', 'stuff for value2' FROM DUAL 
    WHERE NOT EXISTS (SELECT * FROM `table` 
    WHERE `value1`='stuff for value1' AND `value2`='stuff for value2' LIMIT 1) 
    */

const parseSqlColumnName = (value) => `\`${value}\``;
const parseSqlValue = (value) =>
  typeof value === "string" ? `\'${value}\'` : value;

module.exports = {
  parseSqlValue,
  parseSqlColumnName,
};
