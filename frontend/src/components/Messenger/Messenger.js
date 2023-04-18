import React, { useState, useEffect } from "react";
import "./messenger.css";
import Conversation from "./Conversation/Conversation";
import Messages from "./Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Messenger = () => {
  //componant states
  const [conversations, setConversations] = useState([]);

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

  useEffect(() => {
    getAllUserConversations();
  }, []);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            {conversations.map((element) => {
              return (
                <div>
                  <Conversation Oneconversation={element} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              <div className="chatBoxTop">
                <Messages />
                <Messages own={true} />
                <Messages />
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
