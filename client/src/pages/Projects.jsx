import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const Projects = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch {
      toast.error("Failed to fetch projects");
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", formData);

      toast.success("Project created");

      setFormData({
        name: "",
        description: "",
      });

      fetchProjects();
    } catch {
      toast.error("Project creation failed");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p style={{ color: "#94a3b8" }}>
            Organize and manage project workspaces
          </p>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="card form-card">
          <h3 style={{ marginBottom: "20px" }}>Create New Project</h3>

          <form className="grid" onSubmit={createProject}>
            <input
              placeholder="Project name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              required
            />

            <button className="primary-btn" type="submit">
              Create Project
            </button>
          </form>
        </div>
      )}

      <div className="grid stats-grid">
        {projects.length === 0 ? (
          <div className="card">
            <h3>No projects yet</h3>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
              }}
            >
              Create your first project to start collaborating.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="card">
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "14px",
                }}
              >
                📁
              </div>

              <h3 style={{ marginBottom: "10px" }}>
                {project.name}
              </h3>

              <p style={{ color: "#cbd5e1" }}>
                {project.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;