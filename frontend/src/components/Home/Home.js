import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBCardTitle,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

import Comments from "../Comments";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "../Posts/index";
import { useDispatch, useSelector } from "react-redux";
import { setHomePosts } from "../redux/reducers/posts/index";
import AddPost from "../AddPost";
import { MDBFile } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import HomePosts from "./HomePosts";
import { io } from "socket.io-client";
import { useSocket } from "../../App";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useSocket(io);
  //redux states
  const { posts, userinfo, token, userId, friends, homePosts } = useSelector(
    (state) => {
      return {
        posts: state.posts.posts,
        userinfo: state.auth.userinfo,
        token: state.auth.token,
        userId: state.auth.userId,
        friends: state.friends.friends,
        homePosts: state.posts.homePosts,
      };
    }
  );

  // get all the user's and his friends posts orderd DESC
  const getAllHomePosts = () => {
    axios
      .get(`http://localhost:5000/home/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log("*******", response.data.result);
        dispatch(setHomePosts(response.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAllHomePosts();

    socket.connect();
    socket.emit("NEW_USER", userId);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    console.log(socket);
    socket.on("RECEIVE_NOTIFICATION", (data) => {
      console.log("HI", data);
      setNotification((current) => {
        return { ...current, data };
      });
      socket.on("eee", (data) => {
        console.log(data);
      });

      // setNotification((pre)=>
      // {return [
      //   ...pre,
      //  data
      // ]});
    });
  }, []);
  const notify = () =>
    toast(`${notification.avatar} ${notification.messagecontent}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  notification !== null && notify();

  return (
    <div>
    {/*  <MDBCard className="home-card">
      <MDBCardImage position='top' alt='...'  src={ userinfo &&
                      userinfo.avatar
                        ? userinfo.avatar
                        : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                    } />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#'>Card link</MDBCardLink>
        <MDBCardLink href='#'>Card link</MDBCardLink>
      </MDBCardBody>
    </MDBCard>  */}
      <div className="gradient-custom-2" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <MDBCardBody className="text-black p-4">
                  <MDBRow className="g-2">
                    <MDBCol className="mb-2">
                      <AddPost />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol className="mb-2">
                      {/* dispaly the posts */}
                      {homePosts &&
                        homePosts.map((elem) => {
                          return (
                            <HomePosts
                              post={elem}
                              socket={socket}
                              key={elem.post_id}
                            />
                          );
                        })}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div>
        {" "}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Home;
