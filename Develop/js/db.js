const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wy!Qa8090!AqW',
  database: 'employee_tracker'
});

module.exports = connection;