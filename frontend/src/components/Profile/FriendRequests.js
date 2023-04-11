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

  //get all friends of the loggedin user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/friends/get/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(
        //   "*************************************************************************"
        // );
        // console.log(response.data);
        dispatch(getAlluserFriends(response.data.result));
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

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

        //
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

  //remove friend function
  //! i need the user2_id as a params (the friend id i want to remove)
  const UnFriend = () => {
    axios
      .delete(`http://localhost:5000/friends/decline/`, {
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
