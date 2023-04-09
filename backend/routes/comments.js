const express = require("express");
const {
  createNewComment,
  getCommentsByPostId,
  UpdateCommentById,
  deleteCommentById,
} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/:id", authentication, createNewComment);
commentsRouter.get("/:id", getCommentsByPostId);
commentsRouter.put("/comment/:id",authentication,authorization("UPDATE_COMMENT"), UpdateCommentById);
commentsRouter.delete("/comment/:id", authentication,authorization("DELETE_COMMENT"),deleteCommentById);

module.exports = commentsRouter;
