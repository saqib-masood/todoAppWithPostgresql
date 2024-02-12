const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Delhi@2001',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'todo'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};