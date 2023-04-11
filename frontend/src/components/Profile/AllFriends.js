import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const AllFriends = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //redux states
  const { friends } = useSelector((state) => {
    return {
      friends: state.friends.friends,
    };
  });

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body className="friend-list-body">
          {friends &&
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
                  <Button className="remove-btn" variant="danger">
                    Remove
                  </Button>
                </div>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllFriends;
