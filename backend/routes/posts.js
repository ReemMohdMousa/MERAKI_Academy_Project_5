const express = require("express");
const {
  createNewPost,
  getAllPosts,
  getPostsByUser,
  getPostById,
  updatePostById,
  deletePostById,
  deletePostsByuserId,
} = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post("/", createNewPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/search_1", getPostsByUser);
postsRouter.get("/search_2/:id", getPostById);
postsRouter.put("/:id", updatePostById);
postsRouter.delete("/:id", deletePostById);
postsRouter.delete("/user/:id", deletePostsByuserId);

module.exports = postsRouter;
