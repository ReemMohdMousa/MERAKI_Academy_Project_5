import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";

const FriendRequests = ({ id }) => {
  //componant states and variables
  let isFriend = false;

  //dispatch
  const dispatch = useDispatch();

  //redux states
  const { token, userId, isLoggedIn, friends } = useSelector((state) => {
    //return object contains the redux states
    return {
      userId: state.auth.userId,
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      friends: state.friends.friends,
    };
  });

  //get user info
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data.info);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //!check if the visited profile user is friend of the logged user, ERROR with useEffect
  const checkIfUser = () => {
    friends.forEach((element) => {
      if (element.user_id == userId) {
        isFriend = true;
      }
    });
  };
  checkIfUser();

  const checkIfReqWasSent = () => {
    axios
      .get(`http://localhost:5000/friends/sent/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  checkIfReqWasSent();

  //add friend request
  const addFriendFun = ({ user2_id }) => {
    axios
      .post(
        `http://localhost:5000/friends/add`,
        { user2_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
        dispatch(addFriend(response.data));
      })
      .catch(function (error) {
        throw error;
      });
  };

  //cancel friend request
  //! i need the request id as a params
  const cancelFriendReqFun = () => {
    axios
      .delete(
        `http://localhost:5000/friends/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  //decline the friend request
  // when the receiver delete or decline the request
  //! i need the request id as a params
  const declineFriendReqFun = () => {
    axios
      .delete(`http://localhost:5000/friends/remove/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      {userId == id || isFriend ? (
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
