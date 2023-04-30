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
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const postsRouter = express.Router();

postsRouter.post(
  "/",
  authentication,
  createNewPost
);
postsRouter.get("/", authentication, getAllPosts);

postsRouter.get("/search_1/:id", authentication, getPostsByUser);
postsRouter.get("/search_2/:id", getPostById);
postsRouter.put(
  "/:id",
  authentication,
  updatePostById
);
postsRouter.delete(
  "/:id",
  authentication,
  deletePostById
);
// postsRouter.delete("/", authentication,
// authorization("DELETE_POST"), deletePostsByuserId);
module.exports = postsRouter;
