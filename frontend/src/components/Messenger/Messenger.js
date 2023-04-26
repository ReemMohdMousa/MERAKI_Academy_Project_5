import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriendInfo } from "../redux/reducers/Messenger/index";
import { io } from "socket.io-client";
import { useNavigate, useParams, Outlet } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";

//connect to the backend server
// const socket = io.connect(ENDPOINT);

const Messenger = () => {
  const navigate = useNavigate();

  //componant states
  const [conversations, setConversations] = useState([]);
  const [theOpenedConversation, setTheOpenedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newWrittenMessage, setNewWrittenMessage] = useState("");
  const [socket, setSocket] = useState(io(ENDPOINT, { autoConnect: false }));
  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const scrollRef = useRef();

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
    socket.connect();
    socket.emit("ADD_USER", userId);
  }, []);

  useEffect(() => {
    socket?.on("GET_MESSAGE", (data) => {
      console.log(data);
      setMessages([
        ...messages,
        {
          sender: data.sender_id,
          text: data.text,
          createdAt: Date.now(),
        },
      ]);
    });
    setReceiving(true);
  }, [messages]);

  // useEffect(() => {
  //   arrivedMessage &&
  //     theOpenedConversation?.members.includes(arrivedMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivedMessage]);
  // }, [arrivedMessage, theOpenedConversation]);

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
    const receiver_id = theOpenedConversation?.members.find(
      (member) => member != userId
    );

    theOpenedConversation &&
      axios
        .get(
          `http://localhost:5000/messages/${theOpenedConversation._id}/${receiver_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(function (response) {
          // console.log(response.data);
          setMessages(response.data);
          setSending(true);
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
    // setCurrentUserId(userId);
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
        // console.log(response.data);
        const receiver_id = theOpenedConversation.members.find(
          (member) => member != userId
        );
        // console.log(theOpenedConversation);
        // console.log(receiver_id);
        socket.emit("SEND_MESSAGE", {
          sender_id: userId,
          receiver_id: receiver_id,
          text: newWrittenMessage,
        });
        setNewWrittenMessage("");
        // setMessages([...messages, response.data]);
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    getAllUserConversations();
    getAllConversationMessages();
  }, [theOpenedConversation, sending, receiving]);

  useEffect(() => {
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

  // useEffect(() => {
  //   scrollRef?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // console.log(messages);
  // console.log(theOpenedConversation);

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
                    navigate(`/messenger/${element._id}`);
                  }}
                >
                  <Conversation
                    Oneconversation={element}
                    theOpenedConversation={theOpenedConversation}
                  />
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
                      // console.log(element);
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
