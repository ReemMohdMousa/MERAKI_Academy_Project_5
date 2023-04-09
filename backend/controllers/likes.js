const { pool } = require("../models/db");

const addLike = (req, res) => {
  const { post_id } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO likes (user_id, post_id) VALUES ($1,$2) RETURNING *;`;
  const data = [user_id, post_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Like added successfully",
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

const getLikesByUser = (req, res) => {
  const user_id = req.token.userId;
  const query = `SELECT * FROM likes WHERE user_id = $1 AND is_deleted=0;`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no likes`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All likes for the user: ${user_id}`,
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

const getLikesByPost = (req, res) => {
  const post_id = req.params.id;

  const query = `SELECT users.firstname, users.lastname, likes.post_id
    FROM likes 
    INNER JOIN users ON likes.user_id = users.user_id
    WHERE likes.is_deleted=0 AND likes.post_id = $1
    `;

  const data = [post_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All likes for post: ${post_id}`,
        likesNo: result.rowCount,
        result: result.rows,
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

//hard delete
const removeLike = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.token.userId;
  const query = `DELETE FROM likes WHERE user_id=$1 AND post_id = $2`;
  const data = [user_id, post_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no likes on this post`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Like of user: ${user_id} removed successfully`,
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
  addLike,
  getLikesByUser,
  getLikesByPost,
  removeLike,
};
