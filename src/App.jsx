import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login";
import CreatePoll from "./pages/CreatePoll/CreatePoll.jsx";
import PollDetail from "./pages/PollDetails/PollDetail.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePoll />} />
          <Route path="/poll/:id" element={<PollDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </AuthProvider>{" "}
    </Router>
  );
}

export default App;
