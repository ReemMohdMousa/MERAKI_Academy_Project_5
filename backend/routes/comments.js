const express = require("express");

const {
  createNewComment,
  getCommentsByPostId,
  UpdateCommentById,
  deleteCommentById,
} = require("../controllers/comments");

const commentsRouter = express.Router();

const authentication = require("../middlewares/authentication");

commentsRouter.post("/:id", authentication, createNewComment);
commentsRouter.get("/:id", authentication, getCommentsByPostId);
commentsRouter.put("/:id", authentication, UpdateCommentById);
commentsRouter.delete("/:id", authentication, deleteCommentById);

module.exports = commentsRouter;
