import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SendMessage = ({ id }) => {
  const navigate = useNavigate();
  let idd = "643ee8560af7340f6224eb59";
  //redux states
  const { posts, userinfo, token, userId, friends, sharedPosts } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        userId: state.auth.userId,
      };
    }
  );

  const sendMessageFunc = () => {
    navigate(`/messenger/${idd}`);

    // axios
    //   .get(`http://localhost:5000/conversation/new/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then(function (response) {})
    //   .catch(function (error) {});
  };

  return (
    <div>
      <Button onClick={sendMessageFunc}>Message</Button>
    </div>
  );
};

export default SendMessage;
