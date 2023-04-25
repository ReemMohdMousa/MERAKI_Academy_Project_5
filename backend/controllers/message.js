const messageModel = require("../models/messageSchema");

const SendNewMessage = (req, res) => {
  const { text, sender, conversationId } = req.body;

  const newMessage = new messageModel({
    text,
    sender,
    conversationId,
  });

  newMessage
    .save()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getAllMessagesByConversationId = (req, res) => {
  const conversationId = req.params.conversationId;
  messageModel
    .find({ conversationId })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  SendNewMessage,
  getAllMessagesByConversationId,
};
