import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
const Widget = ({ type }) => {
  const [userNo, setUserNo] = useState();
  const [postNo, setPostNo] = useState();
  const [likeNo, setLikeNo] = useState();

  let data;

  const diff = 20;
  switch (type) {
    case "user":
      axios
        .get(`http://localhost:5000/count/user`)
        .then((result) => {
          setUserNo(result.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });

      data = {
        title: "Users",
        amount: userNo,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "white",
              backgroundColor: "rgba(88, 88, 226, 0.971)",
            }}
          />
        ),
      };
      break;
    case "posts":
      axios
        .get(`http://localhost:5000/count/post`)
        .then((result) => {
          setPostNo(result.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
      data = {
        title: "Posts",
        amount: postNo,
        icon: (
          <FeedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "likes":
      axios
        .get(`http://localhost:5000/count/like`)
        .then((result) => {
          setLikeNo(result.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
      data = {
        title: "Likes",
        amount: likeNo,

        icon: (
          <ThumbUpAltIcon
            className="icon"
            style={{
              color: "white",
              backgroundColor: "blue",
            }}
          />
        ),
      };
      break;
      case "likes":
      axios
        .get(`http://localhost:5000/count/like`)
        .then((result) => {
          setLikeNo(result.data[0].count);
        })
        .catch((error) => {
          console.log(error);
        });
      data = {
        title: "Likes",
        amount: likeNo,

        icon: (
          <ThumbUpAltIcon
            className="icon"
            style={{
              color: "white",
              backgroundColor: "blue",
            }}
          />
        ),
      };
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
