import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUserInfo } from "../redux/reducers/auth/index";
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
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
const AddPost = () => {
  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => {
    return { userinfo: state.auth.userinfo };
  });
  return (
    userinfo && (
      <div className="posts">
        <div className="container">
          <div className="user">
            <div className="userInfo">
              <img
                src={ 
                  userinfo.avatar
                    ? userinfo.avatar
                    : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                }
                alt=""
              />
              <div className="details">
                <Link
                  to={"/profile"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">
                    {userinfo.firstname} {userinfo.lastname}
                  </span>
                </Link>
                <span className="date">imin</span>
              </div>
            </div>
          </div>
          <div className="contant" style={{ height: "300px" }}>
            {/* input post  */}
            <section className="vh-100" style={{ marginTop: "-70px" }}>
              <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol xl="10">
                    <MDBCard className="mb-5" style={{ borderRadius: "15px" }}>
                      <MDBCardBody className="p-4">
                        <MDBInput
                          style={{ height: "90px" }}
                          wrapperClass="mb-4"
                          placeholder="whats in your mind"
                          id="form1"
                          type="text"
                          onChange={(e) => {
                            //   setAddUser((firstName) => {
                            //     return { ...firstName, firstName: e.target.value };
                            //   });
                          }}
                        />
                        <hr className="my-4" />
                        <div className="d-flex justify-content-start align-items-center">
                          <MDBCardText className="text-uppercase mb-0">
                            <MDBIcon fas icon="cog me-2" />
                            {/* Adding image */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="70"
                              height="30"
                              color="gray"
                              fill="currentColor"
                              class="bi bi-file-image"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
                            </svg>
                          </MDBCardText>
                          <MDBCardText className="text-uppercase mb-0">
                            <span className="ms-3 me-4">|</span>
                          </MDBCardText>

                          {/* adding video */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="70"
                            height="30"
                            color="gray"
                            fill="currentColor"
                            class="bi bi-camera-reels"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                            <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                          </svg>

                          <MDBBtn
                            outline
                            color="dark"
                            floating
                            size="sm"
                            style={{ width: "25%", marginLeft: "50px" }}
                          >
                            post
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </div>

          {/*condition comments  */}
        </div>
      </div>
    )
  );
};

export default AddPost;
