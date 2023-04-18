import React from "react";
import "./message.css";

const Messages = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
          alt=""
        />
        <p className="messageText">Hello :))</p>
      </div>
      <div className="messageBottom"> 1 hr ago</div>
    </div>
  );
};

export default Messages;
