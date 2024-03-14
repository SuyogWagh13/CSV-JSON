const { Pool } = require('pg');


const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'csvtojson',
  password: '1321',
  port: 5432, 
};

// Create a PostgreSQL connection pool
const pool = new Pool(dbConfig);

module.exports = pool;
