const express = require("express");
const { createNewPost, getAllPosts, getPostsByUser } = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post("/", createNewPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/search_1", getPostsByUser);


module.exports = postsRouter;
