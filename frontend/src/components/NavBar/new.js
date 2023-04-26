import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout } from "../redux/reducers/auth";
import NavFriendReq from "./NavFriendReq";
import SocketNotifications from "./SocketNotifications"
import Notifications from "./Notifications"
import { io } from "socket.io-client";
import { useSocket } from "../../App";

import { FaBars } from "react-icons/fa";
const NavBar1 = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const socket=useSocket(io)
  //useNavigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //redux login states
  const { token, userId, isLoggedIn, roleId, newMsg } = useSelector((state) => {
    //return object contains the redux states
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
      roleId: state.auth.roleId,
      newMsg: state.messenger.newMsg,
    };
  });

  //get user info, so i could use user info, such as name and pic
  //! to be used in advance
  useEffect(() => {
  
    axios
      .get(`http://localhost:5000/users/info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response.data.info);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  //navigations functions
  const goToMyProfile = () => {
    navigate(`/profile/${userId}`);
    setShowBasic(false);
  };

  const login = () => {
    navigate(`/login`);
    setShowBasic(false);
  };

  const register = () => {
    navigate(`/register`);
    setShowBasic(false);
  };

  const goToHome = () => {
    navigate(`/home`);
    setShowBasic(false);
  };

  const searchNow = () => {
    navigate(`/home/${searchValue}`);
    setShowBasic(false);

  };

  const goToMessenger = () => {
    navigate(`/messenger`);
    setShowBasic(false);
  };

  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
 
  <div class="container-fluid">
   
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <FaBars/>
    </button>

 
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
          height="15"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
 
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Team</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Projects</a>
        </li>
      </ul>
 
    </div>
 

 
    <div class="d-flex align-items-center">
 
      <a class="text-reset me-3" href="#">
        <i class="fas fa-shopping-cart"></i>
      </a>

   
      <div class="dropdown">
        <a
          class="text-reset me-3 dropdown-toggle hidden-arrow"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fas fa-bell"></i>
          <span class="badge rounded-pill badge-notification bg-danger">1</span>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <a class="dropdown-item" href="#">Some news</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another news</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
       
      <div class="dropdown">
        <a
          class="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            class="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <a class="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  
  </div>
   
</nav>
    </div>
  );
};

export default NavBar1;
