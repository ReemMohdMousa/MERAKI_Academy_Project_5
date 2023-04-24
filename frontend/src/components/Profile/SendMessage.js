import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const SendMessage = () => {
  const sendMessage = () => {
    axios
      .get(`http://localhost:5000/friends/get/all/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        
      })
      .catch(function (error) {
       
      });
  };

  return (
    <div>
      <Button onClick={sendMessage}>Message</Button>
    </div>
  );
};

export default SendMessage;
