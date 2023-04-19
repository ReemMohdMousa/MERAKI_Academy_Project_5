import React, { useState, useEffect } from "react";
import "./messenger.css";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Messenger = () => {
  //componant states
  const [conversations, setConversations] = useState([]);
  const [theOpenedConversation, setTheOpenedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const { userinfo, token, userId } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });

  //get all user's conversations
  const getAllUserConversations = () => {
    axios
      .get(`http://localhost:5000/conversation/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response.data);
        setConversations(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  //get the conversation messages
  const getAllConversationMessages = () => {
    theOpenedConversation &&
      axios
        .get(`http://localhost:5000/messages/${theOpenedConversation._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response.data);
          setMessages(response.data);
        })
        .catch(function (error) {
          throw error;
        });
  };

  useEffect(() => {
    getAllUserConversations();
    getAllConversationMessages();
  }, [theOpenedConversation]);

  console.log(theOpenedConversation);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            {conversations.map((element) => {
              return (
                <div
                  key={element._id}
                  onClick={() => {
                    // console.log(element);
                    setTheOpenedConversation(element);
                  }}
                >
                  <Conversation Oneconversation={element} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              {theOpenedConversation ? (
                <div>
                  <div className="chatBoxTop">
                    {messages.map((element) => {
                      return (
                        <div>
                          <Message
                            message={element}
                            mine={element.sender == userId ? true : false}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      // onChange={(e) => setNewMessage(e.target.value)}
                      // value={newMessage}
                    ></textarea>
                    <button
                      className="chatSubmitButton"
                      // onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                "no conversations open"
              )}
            </>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
