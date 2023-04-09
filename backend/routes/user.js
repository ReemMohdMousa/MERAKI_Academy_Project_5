const express = require("express");

const { register, login,checkGoogleUser, addLike, getLikesByUser } = require("../controllers/user");
const authentication = require("../middlewares/authentication");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);
usersRouter.post("/like", authentication,addLike);
usersRouter.get("/like", authentication,getLikesByUser);


module.exports = usersRouter;
