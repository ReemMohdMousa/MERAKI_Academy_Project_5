import React, { useEffect, useState } from "react";
import "./style.css";
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
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "../Posts";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/reducers/posts/index";
import AddPost from "../AddPost";

import { MDBFile } from "mdb-react-ui-kit";

import { useNavigate, useParams } from "react-router-dom";
import FriendRequests from "./FriendRequests";
import AllFriends from "./AllFriends";

const Profile = () => {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const getuserdata = () => {
    axios
      .get(`http://localhost:5000/users/others/info/${id}`)
      .then((Response) => {
        console.log(Response.data.result);
        setUser((firstname)=>{
          return {...firstname,firstname:Response.data.result.firstname}
        })
        setUser((lastname)=>{
          return {...lastname,lastname:Response.data.result.lastname}
        })
        //setUser(())
        //dispatch(setPosts(Response.data.posts));
        //setAppointments(Response.data.appointment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //redux states
  const { posts, userinfo, token, userId, friends } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
      friends: state.friends.friends,
    };
  });
  const getAllPostsByUserId = () => {
    axios
      .get(`http://localhost:5000/posts/search_1/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((Response) => {
        dispatch(setPosts(Response.data.posts));
        //setAppointments(Response.data.appointment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getuserdata();
    getAllPostsByUserId();
  }, []);

  return (
    <div>
      <FriendRequests id={id} />
      <AllFriends id={id} />
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={
                        userinfo.avatar
                          ? userinfo.avatar
                          : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                      }
                      alt=""
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    ></MDBCardImage>


                    <MDBBtn
                      outline
                      color="dark"
                      style={{ height: "36px", overflow: "visible" }}
                    >
                      Change photo Edit profile
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">{user.firstname}{"  "}{user.lastname}</MDBTypography>
                    <MDBCardText>New York</MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">253</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">1026</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">478</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <MDBCardText className="font-italic mb-1">
                        Web Developer
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        Lives in New York
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-0">
                        Photographer
                      </MDBCardText>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">
                      Recent photos
                    </MDBCardText>
                    <MDBCardText className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </MDBCardText>
                  </div>
                  <MDBRow className="g-2">
                    <MDBCol className="mb-2">
                      {id===userId &&<AddPost />}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol className="mb-2">
                      {/* dispaly the posts */}
                      {posts &&
                        posts.map((elem) => {
                          return <Posts post={elem} firstname={user.firstname} lastname={user.lastname} key={elem.post_id}/>;
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

export default Profile;
