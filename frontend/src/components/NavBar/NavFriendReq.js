import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./syle.css";
// import { Modal, Button, Form } from "react-bootstrap";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //componants state
  const [sentReq, setSentReq] = useState([]);
  const [ReceivedReq, setReceivedReq] = useState([]);

  //redux states
  const { token, userId, isLoggedIn, friends, isFriend } = useSelector(
    (state) => {
      //return object contains the redux states
      return {
        userId: state.auth.userId,
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        friends: state.friends.friends,
        isFriend: state.friends.isFriend,
      };
    }
  );

  const ReceivedRequests = () => {
    //*ME => receiver_id

    axios
      .get(`http://localhost:5000/friends/received/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);

        //response.data.result => array of received requests
        setReceivedReq(response.data.result);
      })
      .catch(function (error) {
        throw error;
      });
  };

  const SentRequests = () => {
    //*ME => sender_id

    axios
      .get(`http://localhost:5000/friends/sent/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    SentRequests();
    ReceivedRequests();
  }, []);

  console.log(ReceivedReq);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Friend Requests
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ width: "500rem" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Tabs
          defaultActiveKey="Add Requests"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Add Requests" title="Add Requests">
            <div className="friend-list-body">
              {ReceivedReq &&
                ReceivedReq.map((element) => {
                  return (
                    <div key={element.request_id}>
                      <div className="friend-list">
                        <div className="friend-img-name">
                          <img
                            className="friend-img"
                            src={
                              element.avatar ||
                              "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                            }
                          />

                          <p>{element.firstname + " " + element.lastname}</p>
                        </div>
                        <div className="buttons">
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Tab>
          <Tab eventKey="Sent Requests" title="Sent Requests">
            2
          </Tab>
        </Tabs>

        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
