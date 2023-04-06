const express = require("express");
const {
  createNewComment,
  getCommentsByPostId,
  UpdateCommentById,
  deleteCommentById,
} = require("../controllers/comments");

const commentsRouter = express.Router();

commentsRouter.post("/comments/:id", createNewComment);
commentsRouter.get("/comments/:id", getCommentsByPostId)
commentsRouter.put("/comments/:id", UpdateCommentById)
commentsRouter.delete("/comments/:id", deleteCommentById)


module.exports = commentsRouter;
