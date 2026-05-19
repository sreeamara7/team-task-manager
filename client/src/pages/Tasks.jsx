import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const Tasks = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch {}
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data.filter((u) => u.role === "member"));
    } catch {}
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", formData);

      toast.success("Task created");

      setFormData({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        dueDate: "",
      });

      fetchTasks();
    } catch {
      toast.error("Task creation failed");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}/status`, { status });
      toast.success("Status updated");
      fetchTasks();
    } catch {
      toast.error("Status update failed");
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const getStatusClass = (status) => {
    if (status === "pending") return "status-pill status-pending";
    if (status === "in-progress") return "status-pill status-progress";
    return "status-pill status-completed";
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Task Management</h1>

        <select
          style={{ width: "220px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {user.role === "admin" && (
        <div className="card form-card">
          <h3 style={{ marginBottom: "20px" }}>Create New Task</h3>

          <form className="grid" onSubmit={createTask}>
            <input
              placeholder="Task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Task description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              required
            />

            <select
              value={formData.project}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  project: e.target.value,
                })
              }
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>

            <select
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedTo: e.target.value,
                })
              }
              required
            >
              <option value="">Assign Member</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dueDate: e.target.value,
                })
              }
            />

            <button className="primary-btn" type="submit">
              Create Task
            </button>
          </form>
        </div>
      )}

      <div className="grid task-grid">
        {filteredTasks.length === 0 ? (
          <div className="card">
            <h3>No tasks found</h3>
            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
              }}
            >
              Tasks assigned to you will appear here.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>{task.title}</h3>

                <span className={getStatusClass(task.status)}>
                  {task.status}
                </span>
              </div>

              <p
                style={{
                  color: "#cbd5e1",
                  marginTop: "12px",
                }}
              >
                {task.description}
              </p>

              <div className="task-meta">
                {task.project && (
                  <div>📁 Project: {task.project.name}</div>
                )}

                {task.assignedTo && (
                  <div>👤 Assigned: {task.assignedTo.name}</div>
                )}

                {task.dueDate && (
                  <div>
                    📅 Due:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {user.role === "member" && (
                <select
                  className="status-select"
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;