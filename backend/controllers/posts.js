const { pool } = require("../models/db");

const createNewPost = (req, res) => {
  const { content, image, video } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO posts (content, image, video, user_id) VALUES ($1,$2,$3,$4) RETURNING *;`;
  const data = [content, image, video, user_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllPosts = (req, res) => {
  const query = `SELECT * FROM posts WHERE is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the posts",
        result: result.rows,
        //userId: req.token.userId,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = {
  createNewPost,
  getAllPosts,
};
