import React, { useEffect } from "react";
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
  const socket=useSocket(io)
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

  useEffect(() => {
    getAllHomePosts();
  }, []);

  return (
    <div>
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
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

                          return <HomePosts post={elem} socket={socket}/>;

                        })}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Home;
