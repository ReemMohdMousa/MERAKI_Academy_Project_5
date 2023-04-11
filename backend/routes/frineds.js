const express = require("express");

const {
  AddFriendRequest,
  acceptFriendRequest,
  CancelFriendRequest,
  declineTheFriendReq,
  RemoveFriend,
  getAllSentRequestByUserId,
  getAllReceivedRequestByUserId,
  getAllFriendsByUserId,
  acceptRequestOnce
} = require("../controllers/friends");

const authentication = require("../middlewares/authentication");

const friendsRouter = express.Router();

friendsRouter.post("/add", authentication, AddFriendRequest);
friendsRouter.post("/accept", authentication, acceptRequestOnce, acceptFriendRequest);


friendsRouter.delete("/cancel/:request_id", authentication, CancelFriendRequest);
friendsRouter.delete("/decline/:request_id", authentication, declineTheFriendReq);
friendsRouter.delete("/remove/:user2_id", authentication, RemoveFriend);


friendsRouter.get("/sent/requests", authentication, getAllSentRequestByUserId);

friendsRouter.get("/received/requests", authentication, getAllReceivedRequestByUserId);

friendsRouter.get("/get/all/:id", authentication, getAllFriendsByUserId);


module.exports = friendsRouter;
