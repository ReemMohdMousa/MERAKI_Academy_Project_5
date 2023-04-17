const { pool } = require("../models/db");

const userCount = (req, res) => {
  pool
    .query(`SELECT COUNT(user_id) FROM users WHERE is_deleted=0`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const postCount = (req, res) => {
  pool
    .query(`SELECT COUNT(post_id) FROM posts WHERE is_deleted=0`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};

const likeCount = (req, res) => {
  pool
    .query(`SELECT COUNT(likes_id) FROM likes WHERE is_deleted=0`)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = { userCount, postCount, likeCount };
