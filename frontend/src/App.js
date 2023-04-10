import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/index";
import Register from "./components/Register";
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 5 </h1>
      </header>
      <Routes>
        <Route path={"/register"} element={<Register/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
