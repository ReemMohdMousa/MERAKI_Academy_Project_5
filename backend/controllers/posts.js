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
        posts: result.rows,
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

const getPostsByUser = (req, res) => {
  const user_id = req.query.user;
  const query = `SELECT * FROM posts WHERE user_id = $1 AND is_deleted=0;`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no posts`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All posts for the user: ${user_id}`,
          posts: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getPostById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT content,image, video, likes,firstName,lastName,users.user_id FROM users INNER JOIN posts ON users.user_id=posts.user_id WHERE posts.post_id=$1 AND posts.is_deleted=0;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The post with id: ${id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `The post with id: ${id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updatePostById = (req, res) => {
  const post_id = req.params.id;
  let { content, image, video, likes } = req.body;

  const query = `UPDATE posts SET content = COALESCE($1,content), image = COALESCE($2, image), video = COALESCE($3, video), likes = COALESCE($4, likes)
  WHERE post_id=$5 AND is_deleted = 0  RETURNING *;`;
  const data = [content, image, video, likes, post_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The post with id: ${post_id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Post with id: ${post_id} updated successfully `,
          post: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deletePostById = (req, res) => {
  const post_id = req.params.id;
  const query = `UPDATE posts SET is_deleted=1 WHERE post_id=$1;`;
  const data = [post_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `The post with id: ${post_id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Post with id: ${post_id} deleted successfully`,
        });
      }
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
  getPostsByUser,
  getPostById,
  updatePostById,
  deletePostById,
};
