import React from "react";
import { FaBlog, FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <FaBlog className="logo-icon" />
            <span className="logo-text">BlogPost</span>
          </div>

          <div className="navbar-links">
            <NavLink to="/dashboard" className="nav-item">
              <FaHome className="nav-icon" />
              Home
            </NavLink>

            <NavLink to="/create-post" className="nav-item">
              <FaPlusSquare className="nav-icon" />
              Craeate Post
            </NavLink>
          </div>
          <div className="navbar-actions">
            <span className="user-name">Hi, User</span>

            <button className="logout-btn">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;