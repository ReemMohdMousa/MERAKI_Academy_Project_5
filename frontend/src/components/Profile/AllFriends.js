import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

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

const AllFriends = ({ id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //dispatch
  const dispatch = useDispatch();

  //redux states
  const { token, userId, isLoggedIn, friends } = useSelector((state) => {
    return {
      friends: state.friends.friends,
      userId: state.auth.userId,
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  //get all friends of the loggedin user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/friends/get/all/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        dispatch(getAlluserFriends(response.data.result));
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //!remove friend function
  // i need the user2_id as a params (the friend id i want to remove)
  const UnFriend = (user2_id) => {
    axios
      .delete(`http://localhost:5000/friends/remove/${user2_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
        dispatch(removeFriend(user2_id));
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Friends
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body className="friend-list-body">
          {friends.length == 0 ? "No Friends" : friends &&
            friends.map((element, i) => {
              return (
                <div className="friend-list">
                  <div className="friend-img-name">
                    <img
                      className="friend-img"
                      src={
                        element.avatar ||
                        "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                      }
                    />

                    <h6>{element.firstname + " " + element.lastname}</h6>
                  </div>
                  {userId == id ? (
                    <Button
                      className="remove-btn"
                      variant="danger"
                      onClick={() => {
                        UnFriend(element.user_id);
                      }}
                    >
                      Remove
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllFriends;
