import React from "react";
import "./messenger.css";
import Conversation from "./Conversation/Conversation";
import Messages from "./Messages/Messages";

const Messenger = () => {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation />
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
                <button className="chatSubmitButton" 
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
