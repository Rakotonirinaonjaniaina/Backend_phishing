const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost:5432', 
  user: 'postgres', 
  password: 'postgres', 
  database: 'express', 
});


db.connect((err) => {
if (err) {
  console.error('Error connecting to MySQL: ', err);
} else {
  console.log('Connected to MySQL database');
}
});
