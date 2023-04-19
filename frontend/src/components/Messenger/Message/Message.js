import React, { useState, useEffect } from "react";
import "./message.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriendInfo } from "../../redux/reducers/Messenger/index";

const Messages = ({ mine, message }) => {
  // console.log("************", message);
  // const [friendInfo, setFriendInfo] = useState(null);

  //dispatch
  const dispatch = useDispatch();

  const { userinfo, token, userId, friendInfo } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
      friendInfo: state.messenger.friendInfo,
    };
  });

  const getFriendInfo = () => {
    if (message.sender != userId) {
      axios
        .get(`http://localhost:5000/users/others/info/${message.sender}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response.data);
          dispatch(setFriendInfo(response.data.result));

          // setFriendInfo(response.data.result);
        })
        .catch(function (error) {
          throw error;
        });
    }
  };

  useEffect(() => {
    getFriendInfo();
  }, [message]);

  console.log(friendInfo);

  return (
    <div>
      <div className={mine ? "my message" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src={
              mine
                ? userinfo
                  ? userinfo.avatar
                  : friendInfo
                  ? friendInfo.avatar
                  : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
            }
            alt=""
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom"> {message.createdAt}</div>
      </div>
    </div>
  );
};

export default Messages;
