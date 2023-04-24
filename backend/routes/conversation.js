const express = require("express");
const {
  createNewConversation,
  getAllConversationsByUserId,
  getAConversationOfTheUserAndHisFriend,
  checkIfThereAreNewMsgs,
} = require("../controllers/conversation");

const authentication = require("../middlewares/authentication");
const conversationRouter = express.Router();

conversationRouter.post("/", authentication, createNewConversation);
conversationRouter.get("/", authentication, getAllConversationsByUserId);
conversationRouter.get(
  "/chat/:friend_id",
  getAConversationOfTheUserAndHisFriend
);
conversationRouter.get(
  "/new/messages/:conversationId/:receiverId",
  checkIfThereAreNewMsgs
);

module.exports = conversationRouter;
