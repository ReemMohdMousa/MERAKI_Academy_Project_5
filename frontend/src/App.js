import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/index";

import NavBar from "./components/NavBar";
import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Search from "./components/Search";
import NavFriendReq from "./components/NavBar/NavFriendReq";
import Dashboard from "./components/Dashboard";
import UserTable from "./components/Dashboard/UserTable";
import NewUsers from "./components/Dashboard/NewUsers";

const clientId =
  "780019151998-ei1sl1vhch8egbkuff1ibrshuo1h68nd.apps.googleusercontent.com";

function App() {
  //redux states
  const {  roleId } = useSelector((state) => {
    //return object contains the redux states
    return {
      userId: state.auth.userId,
      roleId: state.auth.roleId,
      isLoggedIn: state.auth.isLoggedIn,
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

          {roleId == 1 ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/users" element={<UserTable />} />
              <Route path="/dashboard/newusers" element={<NewUsers />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
