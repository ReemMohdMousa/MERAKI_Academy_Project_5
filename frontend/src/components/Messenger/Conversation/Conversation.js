import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";
import { useDispatch, useSelector } from "react-redux";

const Conversation = ({ Oneconversation }) => {
  const [theFriendId, setTheFriendId] = useState("");
  const [friendInfo, setFriendInfo] = useState({});

  const { userinfo, token, userId } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
      friendInfo: state.messenger.friendInfo,
    };
  });

  //render the friend name and picture
  const getFriendId = () => {
    let userFriendId = Oneconversation.members.find((element) => {
      // console.log("*************", element);
      return element != userId;
    });
    setTheFriendId(userFriendId);
  };

  const getFriendInfo = () => {
    theFriendId &&
      axios
        .get(`http://localhost:5000/users/others/info/${theFriendId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          // console.log(response.data);
          // dispatch(setFriendInfo(response.data.result));
          setFriendInfo(response.data.result);
        })
        .catch(function (error) {
          throw error;
        });
  };

  useEffect(() => {
    getFriendId();
    getFriendInfo();
  }, [theFriendId]);

  // console.log(friendInfo);
  return (
    <div>
      {friendInfo ? (
        <div className="conversation">
          <img
            className="conversationImg"
            src={
              (friendInfo && friendInfo.avatar) ||
              "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
            }
            alt=""
          />
          <span className="conversationName">{`${
            friendInfo && friendInfo.firstname
          } ${friendInfo.lastname}`}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Conversation;
