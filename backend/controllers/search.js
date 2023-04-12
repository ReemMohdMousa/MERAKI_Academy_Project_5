const { pool } = require("../models/db");

const mainSearch = (req, res) => {
  const value = req.query;

  const a = Object.keys(value).join().replaceAll('"', "");
  const b = Object.values(value).join().toString();

  const query = `SELECT firstName, lastName, avatar, coverImg, bio,content, video, image, post_id, likes FROM users
    INNER JOIN posts ON users.user_id=posts.user_id  
         WHERE to_tsvector(${a}) @@ to_tsquery($1)`;

  pool
    .query(query, [b])
    .then((result) => {
      console.log(result);
      res.status(201).json({
        success: true,
        message: "Results",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

module.exports = { mainSearch };
