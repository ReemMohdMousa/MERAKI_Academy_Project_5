const { pool } = require("../models/db");
const createSharedPost = (req, res) => {
  const { sharedPost_content, post_id } = req.body;
  const sharedPost_user_id = req.token.userId;
  const query = `INSERT INTO sharedPost1 (sharedPost_content,sharedPost_user_id,post_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [sharedPost_content, sharedPost_user_id, post_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Post shared successfully",
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

const getSharedPostsByUser = (req, res) => {
    const sharedPost_user_id = req.token.userId;

  const query = `SELECT * FROM sharedPost1 
    WHERE sharedPost_user_id = $1 AND is_deleted=0
    ORDER BY created_at DESC
  `;
  const data = [sharedPost_user_id];

  pool
    .query(query, data)
    .then((result) => {
      pool
        .query(
          `SELECT * FROM posts 
          WHERE user_id = $1 AND is_deleted=0
          ORDER BY created_at DESC
        `,
          data
        )
        .then((result1) => {
          res.status(200).json({
            success: false,
            message: `The user: ${sharedPost_user_id} has shared posts`,
            posts: result1.rows,
            shared:result.rows,
          });
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
  createSharedPost,
  getSharedPostsByUser,
};
