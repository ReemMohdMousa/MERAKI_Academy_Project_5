import React from "react";
import Sidebar from "./Sidebar";
import "./style.css";
import Widget from "./Widget";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
           <Widget type="posts" />
         <Widget type="likes" />
           {/*<Widget type="balance" /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
