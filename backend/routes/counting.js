const express = require("express");
const { userCount, postCount, likeCount, registeredUserPerDay, addedPostPerDay } = require("../controllers/counting");

const countingRouter = express.Router();
countingRouter.get("/user", userCount)
countingRouter.get("/newuser", registeredUserPerDay)

countingRouter.get("/post", postCount)
countingRouter.get("/newpost", addedPostPerDay)

countingRouter.get("/like", likeCount)



module.exports = countingRouter;
