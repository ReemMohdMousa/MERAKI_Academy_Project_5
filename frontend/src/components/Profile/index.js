import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FriendRequests from "./FriendRequests";

const Profile = () => {
  const params = useParams();
  const id = params.id;


  return (
    <div>
      <FriendRequests id={id}/>



        
    </div>
  )
}

export default Profile