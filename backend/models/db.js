const { Pool, Client } = require("pg");

<<<<<<< HEAD
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

pool.connect((err, pool) => {
  if (err) {
    console.log("ERROR", err.message);
    return;
  }
  console.log("connected to", pool.user);
});

/* const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "project5_Reem", // create the database before connect
  password: "admin",
  port: "5432",
});

pool.connect((err, pool) => {
  if (err) {
=======
 const pool = new Pool({
   connectionString: process.env.CONNECTION_STRING,
 });

 pool.connect((err, pool) => {
   if (err) {
>>>>>>> ddc7af66d88ab6b9ba05a8e6385df0ee549daa7e
    console.log("ERROR", err.message);
    return;
  }
  console.log("connected to", pool.user);
<<<<<<< HEAD
}); */
=======
 });

// const pool = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "project5_Reem", // create the database before connect
//   password: "admin",
//   port: "5432",
// });

// pool.connect((err, pool) => {
//   if (err) {
//     console.log("ERROR", err.message);
//     return;
//   }
//   console.log("connected to", pool.user);
// });
>>>>>>> ddc7af66d88ab6b9ba05a8e6385df0ee549daa7e

module.exports = { pool };
