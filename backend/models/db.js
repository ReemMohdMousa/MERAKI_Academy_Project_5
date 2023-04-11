const { Pool, Client } = require("pg");

//  const pool = new Pool({
//    connectionString: process.env.CONNECTION_STRING,
//  });

//  pool.connect((err, pool) => {
//    if (err) {
//     console.log("ERROR", err.message);
//     return;
//   }
//   console.log("connected to", pool.user);
//  });

 const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "project5_Reem", // create the database before connect
  password: "admin",
  port: "5432",
});  

pool.connect((err, pool) => {
  if (err) {
    console.log("ERROR", err.message);
    return;
  }
  console.log("connected to", client.user);
});


module.exports = { pool };
