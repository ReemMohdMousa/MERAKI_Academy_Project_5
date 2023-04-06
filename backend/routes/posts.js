const express = require("express");
const { createNewPost } = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post("/", createNewPost);

module.exports = postsRouter;
