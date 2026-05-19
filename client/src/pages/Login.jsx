import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2
          style={{
            color: "#60a5fa",
            marginBottom: "10px",
            fontSize: "16px",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Team Task Manager
        </h2>

        <h1 className="auth-title">Welcome 👋</h1>

        <p className="auth-subtitle">
          Sign in to manage projects, tasks, and team collaboration
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
          />

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            color: "#94a3b8",
          }}
        >
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;