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

module.exports = {
  createSharedPost,
};
