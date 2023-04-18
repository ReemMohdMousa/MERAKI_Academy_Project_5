import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";
import { useDispatch, useSelector } from "react-redux";

const Conversation = () => {
  //redux states
  const { friends } = useSelector((state) => {
    return {
      friends: state.friends.friends,
    };
  });

  return (
    <div>
      {friends.map((element) => {
        return (
          <div className="conversation">
            <img
              className="conversationImg"
              src={
                element.avatar ||
                "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
              }
              alt=""
            />
            <span className="conversationName">{`${element.firstname} ${element.lastname}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
