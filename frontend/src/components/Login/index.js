import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin, setUserId } from "../redux/reducers/auth";
import { GoogleLogin } from "@react-oauth/google";


import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  } from 'mdb-react-ui-kit';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const state = useSelector((state) => {
      return {
        auth: state.auth,
      };
    });

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
     
const login =()=>{}
  return (
    <div className='cont'> 
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

            <h2 className="fw-bold mb-2">Sign to your account</h2>
        <br/>
        <br/>


            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"  onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

            
            <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={(e) => {
              login(e);
            }}>
              Login
            </MDBBtn>

            <div className='d-flex flex-row mt-3 mb-5'>
              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='facebook-f' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='twitter' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                <MDBIcon fab icon='google' size="lg"/>
              </MDBBtn>
            </div>

            <div>
              <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>

            </div>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  </div>
  )
}

export default Login