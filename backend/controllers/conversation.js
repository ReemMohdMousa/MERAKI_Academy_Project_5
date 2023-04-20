const conversationModel = require("../models/conversationSchema");

//create a new conversation
const createNewConversation = (req, res) => {
  const { sender_id, receiver_id } = req.body;

  const newConversation = new conversationModel({
    members: [sender_id, receiver_id],
  });

  newConversation
    .save()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

// get all user's conversations
const getAllConversationsByUserId = (req, res) => {
  const user_id = req.token.userId;

  conversationModel
    .find({ members: { $in: [user_id] } })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

// get all user a specific conversation between the user and his friend
const getAConversationOfTheUserAndHisFriend = (req, res) => {
  const user_id = req.token.userId;
  const friend_id = req.params.friend_id; 

  conversationModel
    .find({
      members: { $all: [user_id, friend_id] },
    })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  createNewConversation,
  getAllConversationsByUserId,
  getAConversationOfTheUserAndHisFriend,
};
