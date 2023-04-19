import React, { useState, useEffect } from "react";
import "./messenger.css";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriendInfo } from "../redux/reducers/Messenger/index";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

//connect to the backend server
// const socket = io.connect(ENDPOINT);

const Messenger = () => {
  //componant states
  const [conversations, setConversations] = useState([]);
  const [theOpenedConversation, setTheOpenedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newWrittenMessage, setNewWrittenMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const { userinfo, token, userId, conversationFriendInfo } = useSelector(
    (state) => {
      return {
        userinfo: state.auth.userinfo,
        token: state.auth.token,
        userId: state.auth.userId,
        conversationFriendInfo: state.messenger.conversationFriendInfo,
      };
    }
  );

  //connect to the backend server
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);

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
          // console.log(response.data);
          setMessages(response.data);
        })
        .catch(function (error) {
          throw error;
        });
  };

  // const getFriendInfo = () => {
  //   if (message.sender != userId) {
  //     axios
  //       .get(`http://localhost:5000/users/others/info/${message.sender}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then(function (response) {
  //         console.log(response.data);
  //         // dispatch(setFriendInfo(response.data.result));

  //         setFriendInfo(response.data.result);
  //       })
  //       .catch(function (error) {
  //         throw error;
  //       });
  //   }
  // };

  const SendNewMsg = () => {
    axios
      .post(
        `http://localhost:5000/messages`,
        {
          text: newWrittenMessage,
          sender: userId,
          conversationId: theOpenedConversation._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        messages.push(response.data);
        setMessages(messages);
        setNewWrittenMessage("");
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    getAllUserConversations();
    getAllConversationMessages();
  }, [theOpenedConversation]);

  useEffect(() => {
    socket?.emit("ADD_USER", userId);
    socket?.on("GET_USERS", (users) => {
      console.log(users);
    });
  }, [userId]);

  // console.log(theOpenedConversation);

  // useEffect(() => {
  //   socket?.on("welcome", (msg) => {
  //     console.log(msg);
  //   });
  // }, [socket]);

  // // console.log(socket);

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
            {/* <div>
              <h5>
                {theOpenedConversation &&
                  conversationFriendInfo.firstname +
                    " " +
                    conversationFriendInfo.lastname}
              </h5>
            </div> */}
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
                    <input
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => {
                        // console.log(e.target.value);
                        setNewWrittenMessage(e.target.value);
                      }}

                      // value={newMessage}
                    ></input>
                    <button className="chatSubmitButton" onClick={SendNewMsg}>
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
