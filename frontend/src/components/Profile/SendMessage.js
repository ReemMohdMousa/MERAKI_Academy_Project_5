import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const SendMessage = ({ id }) => {
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
    axios
      .get(`http://localhost:5000/conversation/new/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {})
      .catch(function (error) {});
  };

  return (
    <div>
      <Button onClick={sendMessageFunc}>Message</Button>
    </div>
  );
};

export default SendMessage;
