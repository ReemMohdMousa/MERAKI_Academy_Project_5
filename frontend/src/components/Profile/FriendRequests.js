import React from "react";
import { useDispatch, useSelector } from "react-redux";

//import reducer's functions
import {
  getAlluserFriends,
  getAlluserSentReq,
  getAlluserReceivedReq,
  addFriend,
  acceptFriendRequest,
  cancelFriendReq,
  declineFriendReq,
  removeFriend,
} from "../redux/reducers/friends/index";

const FriendRequests = ({ id }) => {
  //redux states
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      userId: state.auth.userId,
    };
  });

  
  const addFriendFun = ()=>{
    axios.post(
        `http://localhost:5000/courses/${id}/lectures`,
        { title, description, videoId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.message) {
          setResponse(response.data.message);
        } else {
          setHideSaveBtn(true);
          setResponse("Lecture Created!");
          let newLecture = response.data;
          setLectures([...lectures, newLecture]);
        }
      })
      .catch(function (error) {
        throw error;
      });
  }

  return (
    <div>
      {userId == id ? (
        ""
      ) : (
        <button
          onClick={() => {
            addFriendFun(id);
          }}
        >
          Add Friend
        </button>
      )}
    </div>
  );
};

export default FriendRequests;
