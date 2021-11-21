const mysql = require("mysql2");
require('dotenv').config();

const sql = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
  });

sql.connect((err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log("Connection established");
});

module.exports = sql;