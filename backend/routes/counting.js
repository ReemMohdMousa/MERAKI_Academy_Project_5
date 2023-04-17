const express = require("express");
const { userCount, postCount, likeCount, registeredUserPerDay, addedPostPerDay, registeredUserDetailWithin24h, postsEveryHour, activeUserOrNot } = require("../controllers/counting");

const countingRouter = express.Router();
countingRouter.get("/user", userCount)
countingRouter.get("/newuser", registeredUserPerDay)
countingRouter.get("/newuser/details", registeredUserDetailWithin24h)
countingRouter.get("/active", activeUserOrNot)


countingRouter.get("/post", postCount)
countingRouter.get("/newpost", addedPostPerDay)
countingRouter.get("/num", postsEveryHour)

countingRouter.get("/like", likeCount)



module.exports = countingRouter;
