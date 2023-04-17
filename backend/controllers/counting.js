const { pool } = require("../models/db");

const userCount = (req,res) => {
  pool
    .query(`SELECT COUNT(user_id) FROM users WHERE is_deleted=0`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {userCount};
