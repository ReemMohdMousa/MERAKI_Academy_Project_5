const express = require("express");
const { createNewPost, getAllPosts } = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post("/", createNewPost);
postsRouter.get("/", getAllPosts);


module.exports = postsRouter;
