const express = require("express");
const {
  createNewConversation,
  getAllConversationsByUserId,
  getAConversationOfTheUserAndHisFriend,
} = require("../controllers/conversation");

const authentication = require("../middlewares/authentication");
const conversationRouter = express.Router();

conversationRouter.post("/", authentication, createNewConversation);
conversationRouter.get("/", authentication, getAllConversationsByUserId);
conversationRouter.get("/chat/:friend_id", getAConversationOfTheUserAndHisFriend);


module.exports = conversationRouter;
