import "./App.css";
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
import Messenger from "./components/Messenger/Messenger";

const clientId =
  "780019151998-ei1sl1vhch8egbkuff1ibrshuo1h68nd.apps.googleusercontent.com";

function App() {
  //redux states
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      userId: state.auth.userId,
    };
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <NavBar />

        <header className="App-header">
          <h1>Project 5 </h1>
        </header>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/home/:user" element={<Search />} />
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
