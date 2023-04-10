const express = require("express");

const { profileInfo,register, login,checkGoogleUser, addLike, getLikesByUser, getLikesByPost, removeLike } = require("../controllers/user");
const authentication = require("../middlewares/authentication");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.get("/info",authentication,profileInfo)
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);



module.exports = usersRouter;
