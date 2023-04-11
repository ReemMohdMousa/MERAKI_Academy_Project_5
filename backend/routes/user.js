const express = require("express");


const authentication = require("../middlewares/authentication");
const { register, login, checkGoogleUser, profileInfo } = require("../controllers/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.get("/info",authentication,profileInfo)
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);
usersRouter.get("/info", profileInfo);

module.exports = usersRouter;
