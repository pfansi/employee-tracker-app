require("dotenv").config();
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
require("console.table");

// create the connection to database via env
const connection = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
