import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created");
      navigate("/dashboard");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h1 className="auth-title">Create Account 🚀</h1>
        <p className="auth-subtitle">
          Start collaborating with your team
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            placeholder="Full name"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
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
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            required
          />

          <select
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>

          <button className="primary-btn" type="submit">
            Register
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            color: "#94a3b8",
          }}
        >
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;