import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/index";

import NavBar from "./components/NavBar";
import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Search from "./components/Search";
import NavFriendReq from "./components/NavBar/NavFriendReq";
import SocketNotifications from "./components/NavBar/SocketNotifications";


const ENDPOINT = "http://localhost:5000";
//custom hook to use socket because its not works with redux 
export const useSocket = (io) => {
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      userId: state.auth.userId,
      //Socket: state.posts.Socket,
    };
  });
  const [socket, setSocket] =React.useState(io(ENDPOINT, { autoConnect: false }));
  
  React.useEffect(() => {
    socket.connect();
    socket.emit("NEW_USER", userId);

    return () => { 
      socket.close()
      
      } 
  }, []); 

  return socket;
}





function App() {

  //const ENDPOINT = "http://localhost:5000";

  const dispatch = useDispatch();

  //const [socket, setSocket] = useState(io(ENDPOINT, { autoConnect: false }));
  //redux states
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      userId: state.auth.userId,
      //Socket: state.posts.Socket,
    };
  });

  useEffect(() => {
    //Socket.connect();
   // dispatch(setSocket(io.connect("http://localhost:5000",{autoConnect:false})))
    // SetSocket=io.connect("http://localhost:5000")
    //  dispatch(setSocket(io.connect({Endpoint:"http://localhost:5000",autoConnect:false})));
    //Socket && Socket.emit("NEW_USER",userId)
  }, []);
  const clientId =
    "780019151998-ei1sl1vhch8egbkuff1ibrshuo1h68nd.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <NavBar />

        <header className="App-header"></header>
         <SocketNotifications />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/home/:user" element={<Search />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

