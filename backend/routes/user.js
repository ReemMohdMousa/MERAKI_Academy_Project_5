const express = require("express");

const { register, login, checkGoogleUser, profileInfo } = require("../controllers/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);
usersRouter.get("/info", profileInfo);

module.exports = usersRouter;
