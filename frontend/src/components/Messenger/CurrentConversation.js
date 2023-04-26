import React from "react";
import "./messenger.css";
import Message from "./Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Outlet } from "react-router-dom";

const CurrentConversation = ({ messages, conversations, setMessages }) => {
    const params = useParams();
    const user_id = params.userId;
    const Fid = params.FriendId;
//   <Outlet />;

// const conversation = conversations.map(())


console.log(user_id);
console.log(Fid);

  const { userId } = useSelector((state) => {
    return {
      userId: state.auth.userId,
    };
  });

  return (
    <div>
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
  );
};

export default CurrentConversation;
