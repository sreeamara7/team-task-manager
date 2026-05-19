import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <h2>Team Task Manager</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
      </div>

      <div className="user-section">
        <span>
          {user.name} ({user.role})
        </span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;