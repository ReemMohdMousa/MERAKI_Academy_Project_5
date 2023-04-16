const express = require("express");
const { getAllFriendsPosts } = require("../controllers/home");

const authentication = require("../middlewares/authentication");

const homeRouter = express.Router();

homeRouter.get("/", authentication, getAllFriendsPosts);

module.exports = homeRouter;
