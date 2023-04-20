const express = require("express");
const { createSharedPost } = require("../controllers/sharedPost");
const authentication = require("../middlewares/authentication");


const shareRouter = express.Router();
shareRouter.get("/",authentication,createSharedPost)
 



module.exports = shareRouter;
