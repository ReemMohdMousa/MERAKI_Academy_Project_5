const express = require("express");
const { createNewPost, getAllPosts, getPostsByUser, getPostById, updatePostById, deletePostById } = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post("/", createNewPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/search_1", getPostsByUser);
postsRouter.get("/search_2/:id", getPostById);
postsRouter.put("/:id", updatePostById);
postsRouter.delete("/:id", deletePostById);


module.exports = postsRouter;
