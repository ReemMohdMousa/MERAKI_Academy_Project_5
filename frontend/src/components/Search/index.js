import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLogout } from "../redux/reducers/auth";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  //useNavigate
  const navigate = useNavigate();

  //useDispatch
  const dispatch = useDispatch();

  //redux login states
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });
  const { user } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/search?firstName=${user}`)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
   <div>""hello from search result</div>
  );
};

export default Search;
