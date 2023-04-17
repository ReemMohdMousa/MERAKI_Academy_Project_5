const express = require("express");
const { userCount, postCount, likeCount } = require("../controllers/counting");

const countingRouter = express.Router();
countingRouter.get("/user", userCount)
countingRouter.get("/post", postCount)
countingRouter.get("/like", likeCount)



module.exports = countingRouter;
