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
  const [isReqAdded, setIsReqAdded] = useState(false);
  const [isReqReceived, setisReqReceived] = useState(false);

  //dispatch
  const dispatch = useDispatch();

  //redux states
  const { token, userId, isLoggedIn, friends, isFriend } = useSelector(
    (state) => {
      //return object contains the redux states
      return {
        userId: state.auth.userId,
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        friends: state.friends.friends,
        isFriend: state.friends.isFriend,
      };
    }
  );

  // change the isReqAdded state
  const checkIfReqWasSent = () => {
    axios
      .get(`http://localhost:5000/friends/sent/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data.result);

        //response.data.result => array of add requests
        response.data.result.map((element, i) => {
          if (element.receiver_id == id) {
            setIsReqAdded(true);
          }
        });
      })
      .catch(function (error) {
        throw error;
      });
  };

  const checkIfReqWasReceived = () => {
    axios
      .get(`http://localhost:5000/friends/received/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data.result);

        //response.data.result => array of add requests
        response.data.result.map((element, i) => {
          if (element.receiver_id == id) {
            setIsReqAdded(true);
          }
        });
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    checkIfReqWasSent();
  }, []);

  //add friend request
  const addFriendFun = (id) => {
    axios
      .post(
        `http://localhost:5000/friends/add`,
        { user2_id: id },
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

  console.log("ffffff", isFriend);

  return (
    <div>
      {userId == id || isFriend ? (
        ""
      ) : isReqAdded ? (
        <button>Cancel Request</button>
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
