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
  isTheUserIsFriend,
} from "../redux/reducers/friends/index";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
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
        response.data.result &&
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
        //response.data.result => array of received requests
        response.data.result &&
          response.data.result.map((element, i) => {
            if (element.sender_id == id) {
              setisReqReceived(true);
            }
          });
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    checkIfReqWasSent();
    checkIfReqWasReceived();
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
        console.log(response.data.result);
        response.data.result.map((element, i) => {
          if (element.sender_id == userId) {
            setIsReqAdded(true);
          }
        });
      })
      .catch(function (error) {
        throw error;
      });
  };

  //!BUG
  const acceptFriendReq = () => {
    axios
      .post(
        `http://localhost:5000/friends/accept`,
        { user2_id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        let friendId = response.data.result[0].user1_id;

        //get the friend info to push it to friends state, so i could rerender the friends array
        axios
          .get(`http://localhost:5000/users/others/info/${friendId}`)
          .then((response) => {
            console.log(response.data.result);
            //add the new friend to the friends array state
            dispatch(acceptFriendRequest(response.data.result));

            //change isFriend state
            dispatch(isTheUserIsFriend(response.data.result.user_id));
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch(function (error) {
        throw error;
      });
  };

  //cancel friend request
  const cancelFriendReqFun = () => {
    axios
      .delete(`http://localhost:5000/friends/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        response.data.result.map((element, i) => {
          if (element.receiver_id == id) {
            setIsReqAdded(false);
          }
        });
      })
      .catch(function (error) {
        throw error;
      });
  };

  //decline the friend request
  // when the receiver delete or decline the request
  const declineFriendReqFun = () => {
    axios
      .delete(`http://localhost:5000/friends/decline/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data.result);
        response.data.result.map((element, i) => {
          if (element.sender_id == id && element.receiver_id == userId) {
            setisReqReceived(false);
          }
        });
      })
      .catch(function (error) {
        throw error;
      });
  };

  console.log("isReqAdded", isReqAdded);
  console.log("isReqReceived", isReqReceived);

  return (
    <div>
      {userId == id || isFriend ? (
        ""
      ) : isReqAdded ? (
        <MDBBtn color="danger" onClick={cancelFriendReqFun}>
          Cancel Request
        </MDBBtn>
      ) : isReqReceived ? (
        <MDBDropdown>
          <MDBDropdownToggle color="success">
            Respond to request
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={acceptFriendReq}>
              Accept
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={declineFriendReqFun}>
              Decline
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      ) : (
        <MDBBtn
          color="primary"
          onClick={() => {
            addFriendFun(id);
          }}
        >
          Add Friend
        </MDBBtn>
      )}
    </div>
  );
};

export default FriendRequests;
