const pg = require('pg');
 const { Pool } = require("pg");


 const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "peliculas",
  password: "bionicle2006",
  // password: "L1nk3d",
  port: 5432,
});  

 /* const pool= new pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV==='production'
})  */




/* const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // requerido para Supabase
  },
});
 */

/* require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool; */


module.exports = pool;
