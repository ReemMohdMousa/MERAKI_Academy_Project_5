import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const { userinfo, token, userId } = useSelector((state) => {
    return {
      userinfo: state.auth.userinfo,
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Menu</span>
      </div>

      <div className="center">
        <div className="widget">
          <img
            src={
              userinfo.avatar
                ? userinfo.avatar
                : "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
            }
            alt=""
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
          ></img>

          <span
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
            style={{marginTop:"1.8rem",marginRight:".5rem" }}
          >
            {userinfo.firstname}
            {"  "}
            {userinfo.lastname}
          </span>
        </div>
      </div>

      <div className="bottom">hgjk</div>
    </div>
  );
};

export default Sidebar;
