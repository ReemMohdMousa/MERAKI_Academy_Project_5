const express = require("express");

const { register, login,checkGoogleUser } = require("../controller/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);


module.exports = usersRouter;
