import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/index";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 5 </h1>
      </header>
      <Routes>
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
