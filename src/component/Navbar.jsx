import { NavLink, useNavigate } from "react-router-dom";
import { FaBlog, FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const userData = JSON.parse(localStorage.getItem("authData"));

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
          <FaBlog className="logo-icon" />
          <span className="logo-text">BlogPost</span>
        </div>

        <div className="navbar-links">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              isActive ? "navbar-item active" : "navbar-item"
            }
          >
            <FaHome className="nav-icon" /> Home
          </NavLink>

          <NavLink 
            to="/create-post" 
            className={({ isActive }) => 
              isActive ? "navbar-item active" : "navbar-item"
            }
          >
            <FaPlusSquare className="nav-icon" /> Create Post
          </NavLink>
        </div>

        <div className="navbar-actions">
          <span className="user-name">
            Hi, {userData?.username || loginData?.email?.split('@')[0] || 'User'}
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;