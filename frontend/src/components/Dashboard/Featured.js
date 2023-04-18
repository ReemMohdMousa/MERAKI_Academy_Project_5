import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const [val, setval] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/count/newpost`)
      .then((result) => {
        const value = result.data.reduce((acc, elem) => {
          return (acc + elem.count) / result.data.length;
        }, 0);
        setval(value);
      })
      .catch((error) => {
         console.log(error);
      });
  }, []);
  if (!val) {
    return <h1><div class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
  </div></h1>;
  }
  return (
    <div className="featured">
      <div className="f-top">
        <h1 className="f-title">Post Precentege</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="f-bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={val * 100}
            text={val * 100}
            strokeWidth={5}
          />
        </div>
        <p className="f-title">Average posts per day</p>
        <p className="f-amount">{val}</p>
      </div>
    </div>
  );
};

export default Featured;
