import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";
import User from "../../assets/user.svg"

function Header() {
  const { user, logout } = useAuth(); // get logout from context
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null); // Ref for sidebar
  const navbarRef = useRef(null);

  function logoutFnc() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false); // Close sidebar
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="navbarContainer">
      <div
        className={`navbar ${showSidebar ? "navDirection" : ""}`}
        ref={navbarRef}
      >
        <p className="logo">Polynomial Polls</p>

        {user && (
          <div className={`navLinks navLinksHide`}>
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
          <>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <img
                src={User}
                style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
              />
              <Link className="link navLinksHide" onClick={logoutFnc}>
                Logout
              </Link>
            </div>

            <Button
              className="menuBtn"
              text={"Menu"}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </>
        ) : (
          <Link to="/login" className="link">
            Login
          </Link>
        )}
      </div>
      <div
        className={`sidebarMenu ${showSidebar ? "displaySidebar" : ""}`}
        ref={sidebarRef}
      >
        <p className="sidebarlogo logo">Polynomial Polls</p>
        {user && (
          <div className="sidebarLinks">
            <Link to={`/`} className="sidebarlink">
              Home
            </Link>
            <Link to={`/create`} className="sidebarlink">
              Create Poll
            </Link>
            <Link to={`/profile/${user._id}`} className="sidebarlink">
              View Profile
            </Link>
          </div>
        )}
        {user ? (
          <Link className="sidebarlink" onClick={logoutFnc}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="sidebarlink">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
