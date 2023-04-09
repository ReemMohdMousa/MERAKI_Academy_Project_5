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
  authorization("CREATE_POST"),
  createNewPost
);
postsRouter.get("/", authentication, getAllPosts);
postsRouter.get("/search_1", getPostsByUser);
postsRouter.get("/search_2/:id", getPostById);
postsRouter.put("/:id",  authentication,
authorization("UPDATE_POST"), updatePostById);
postsRouter.delete("/:id", authentication,
authorization("DELETE_POST"), deletePostById);
postsRouter.delete("/", authentication,
authorization("DELETE_POST"), deletePostsByuserId);

module.exports = postsRouter;

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOjIsImlhdCI6MTY4MDk5MTk5NSwiZXhwIjoxNjgxMDc4Mzk1fQ.TnymjFLxZsDa7WUBZ93vDgu-8ZkKBmPv6H51U1sQDXY */
