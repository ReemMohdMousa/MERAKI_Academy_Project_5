const { pool } = require("../models/db");

const createNewComment = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.token.userId;

  const { content, image, video } = req.body;

  const query = `INSERT INTO comments (post_id, user_id, content, image, video) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const data = [post_id, user_id, content, image, video];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getCommentsByPostId = (req, res) => {
  const post_id = req.params.id;

  const query = `SELECT comments.content, comments.image, comments.video, users.firstname, users.lastname 
    FROM comments 
    INNER JOIN users ON comments.user_id = users.user_id
    WHERE comments.is_deleted=0 AND comments.post_id = $1
    `;

  const data = [post_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for post: ${post_id}`,
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

const UpdateCommentById = (req, res) => {
  const comment_id = req.params.id;
  const user_id = req.token.userId;

  let { content, image, video } = req.body;

  const query = `UPDATE comments 
  SET content = COALESCE($1,content), 
  image = COALESCE($2, image), 
  video = COALESCE($3, video)
  WHERE comment_id=$4, user_id=$5 AND is_deleted = 0  RETURNING *;`;
  const data = [content, image, video, comment_id, user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The comment with id: ${comment_id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Comment with id: ${comment_id} updated successfully `,
          comment: result.rows[0],
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

const deleteCommentById = (req, res) => {
  const comment_id = req.params.id;
  const user_id = req.token.userId;

  pool
    .query(
      `SELECT * FROM comments WHERE comments.is_deleted=0 AND comments.comment_id = $1
    `,
      [comment_id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: `The comment with id: ${comment_id} is not found`,
        });
      } else {
        const query = `UPDATE comments SET is_deleted=1 WHERE comment_id=$1 AND user_id= $2`;
        const data = [comment_id, user_id];

        pool.query(query, data).then((result) => {
          res.status(200).json({
            success: true,
            message: `Comment with id: ${comment_id} deleted successfully`,
          });
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
  createNewComment,
  getCommentsByPostId,
  UpdateCommentById,
  deleteCommentById,
};