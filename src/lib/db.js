const { Pool } = require('pg');

const pool = new Pool({
  user: 'bruna',
  host: '72.60.68.33',
  database: 'escola',
  password: '32080910@Eu',
  port: 5432,
});

module.exports = pool;
