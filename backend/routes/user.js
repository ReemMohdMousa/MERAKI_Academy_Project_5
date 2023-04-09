const express = require("express");

const { register, login,checkGoogleUser, addLike, getLikesByUser, getLikesByPost, removeLike } = require("../controllers/user");
const authentication = require("../middlewares/authentication");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);
usersRouter.post("/like", authentication,addLike);
usersRouter.get("/like", authentication,getLikesByUser);
usersRouter.get("/like/:id",getLikesByPost);
usersRouter.delete("/like/:id",authentication,removeLike);


module.exports = usersRouter;
