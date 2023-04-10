import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  const createAccount = () => {
    if (firstName && lastName && email && password && age && repassword) {
      if (repassword === password) {
        if (!document.getElementById("agree").checked) {
            setShow(true)
          setMessage("If you agree with the terms, check the Agree check box");
        } else {
          axios
            .post("http://localhost:5000/users/register", {
              firstName,
              lastName,
              email,
              password,
              age,
            })
            .then((result) => {
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("userId", result.data.userId);
              localStorage.setItem("isLoggedIn", true);
            })
            .catch((error) => {
                setShow(true)
              setMessage(error.response.data.message);
            });
        }
      } else {
        setShow(true)
        setMessage("Password and Confirm password doesn't match");
      }
    } else {
        setShow(true)
      setMessage("Please Enter all fields");
    }
  };
console.log(message)
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-center mb-5">Create an account</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="First Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Last Name"
            size="lg"
            id="form12"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Age"
            size="lg"
            id="form2"
            type="number"
            onChange={(e) => setAge(e.target.value)}
          />

          <MDBInput
            wrapperClass="mb-4"
            label=" Email"
            size="lg"
            id="form2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form3"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Repeat your password"
            size="lg"
            id="form4"
            type="password"
            onChange={(e) => setRePassword(e.target.value)}
          />
          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="agree"
              label="I agree all statements in Terms of service"
            />
          </div>
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={createAccount}
            
            
          >
            Register
          </MDBBtn>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
    
        </Modal.Footer>
      </Modal>
        </MDBCardBody>
      </MDBCard>
       
    </MDBContainer>
  );
};

export default Register;
