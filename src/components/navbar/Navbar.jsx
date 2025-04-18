import React from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth(); // get logout from context
  const navigate = useNavigate();

  function logoutFnc() {
    logout();
    navigate("/");
  }

  return (
    <div className="navbar">
      <p className="logo">Polynomial Polls</p>

      {user && (
        <div className="navLinks">
          <Link to={`/`} className="link">
            Home
          </Link>
          <Link to={`/create`} className="link">
            Create Poll
          </Link>
          <Link to={`/profile/${user._id}`} className="link">
            View Profile
          </Link>
        </div>
      )}
      {user ? (
        <Link className="link" onClick={logoutFnc}>
          Logout
        </Link>
      ) : (
        <Link to="/login" className="link">
          Login
        </Link>
      )}
    </div>
  );
}

export default Header;
