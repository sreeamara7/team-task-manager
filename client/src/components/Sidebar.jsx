import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkStyle = (path) => ({
    padding: "14px 16px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background:
      location.pathname === path
        ? "#1e40af"
        : "transparent",
    color: "white",
  });

  return (
    <div
      style={{
        width: "260px",
        background: "#0f172a",
        borderRight: "1px solid #1e293b",
        padding: "28px",
        position: "fixed",
        height: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "35px" }}>
        Team Task Manager
      </h2>

      <div
        style={{
          marginBottom: "40px",
          padding: "18px",
          borderRadius: "18px",
          background: "#111827",
        }}
      >
        <div className="sidebar-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div style={{ marginTop: "12px" }}>
          <strong>{user.name}</strong>
          <p style={{ color: "#94a3b8" }}>
            {user.role}
          </p>
        </div>
      </div>

      <nav
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          <FiGrid /> Dashboard
        </Link>

        <Link to="/projects" style={linkStyle("/projects")}>
          <FiFolder /> Projects
        </Link>

        <Link to="/tasks" style={linkStyle("/tasks")}>
          <FiCheckSquare /> Tasks
        </Link>

        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            background: "#dc2626",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FiLogOut />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;