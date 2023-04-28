import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MDBFile } from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";

const EditProfileInfoBtn = () => {
  //componant states
  const [userAvatar, setUserAvatar] = useState("");
  const [selectedimage, setSelectedImage] = useState("");

  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //redux states
  const { posts, userinfo, token, userId, friends, sharedPosts } = useSelector(
    (state) => {
      return {
        posts: state.posts.posts,
        userinfo: state.auth.userinfo,
        token: state.auth.token,
        userId: state.auth.userId,
        friends: state.friends.friends,
        sharedPosts: state.posts.sharedPosts,
      };
    }
  );

  //upload pic
  const UploadProfilePic = () => {
    axios
      .get(`http://localhost:5000/users/update/user/info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((Response) => {})
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          style={{
            backgroundColor: "inherit",
            border: "2px solid black",
          }}
        >
          Edit Profile Info
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShow}>
            Upload profile picture
          </Dropdown.Item>
          <Dropdown.Item>Upload cover picture</Dropdown.Item>
          <Dropdown.Item>Edit about</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="modalcontainer">
            <MDBFile
              label=""
              size="sm"
              id="formFileSm"
              accept="image/*"
              onChange={(e) => {
                setUserAvatar(e.target.files[0]);
                setSelectedImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <div className="imgarea">
              <svg
                className="icon bi bi-cloud-arrow-up-fill"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
              </svg>
              <h3>Upload Image</h3>
              <img src={selectedimage} alt="img" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              //   uploadImage();

              handleClose();
            }}
          >
            SelectImage
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProfileInfoBtn;
