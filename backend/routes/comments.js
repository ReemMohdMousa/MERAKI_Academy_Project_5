const express = require("express");
const {
  createNewComment,
  getCommentsByPostId,
  UpdateCommentById,
  deleteCommentById,
} = require("../controllers/comments");
const authentication = require("../middlewares/authentication");

const commentsRouter = express.Router();

commentsRouter.post("/:id", authentication,createNewComment);
commentsRouter.get("/:id", getCommentsByPostId)
commentsRouter.put("/comment/:id", UpdateCommentById)
commentsRouter.delete("/comment/:id",authentication, deleteCommentById)


module.exports = commentsRouter;
