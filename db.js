const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'express',
  password: 'postgres',
  port: 5432, // Port par défaut pour PostgreSQL
});

module.exports = pool;
