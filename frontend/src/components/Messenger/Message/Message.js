import React, { useState, useEffect } from "react";
import "./message.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Messages = ({ mine, message }) => {
  // console.log("************", message);
  const [friendInfo, setFriendInfo] = useState(null);

  const { userinfo, token, userId } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
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
          setFriendInfo(response.data.result);
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
      {/* <div>
        <h5>{friendInfo && friendInfo.firstname + " " +friendInfo.lastname}</h5>
      </div> */}
      <div className={mine ? "my message" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src={
              mine
                ? userinfo.avatar
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
