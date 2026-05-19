import React, { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    { name: "Pending", value: stats.pendingTasks },
    { name: "In Progress", value: stats.inProgressTasks },
    { name: "Completed", value: stats.completedTasks },
    { name: "Overdue", value: stats.overdueTasks },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
    "#ef4444",
  ];

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p style={{ color: "#94a3b8" }}>
            Welcome back, {user.name}
          </p>
        </div>
      </div>

      <div className="grid stats-grid">
        <StatCard title="Total Tasks" value={stats.totalTasks} />
        <StatCard title="Pending" value={stats.pendingTasks} />
        <StatCard title="In Progress" value={stats.inProgressTasks} />
        <StatCard title="Completed" value={stats.completedTasks} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "20px" }}>Task Analytics</h3>

          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "20px" }}>Performance</h3>

          <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
            Task Completion Rate
          </p>

          <div
            style={{
              height: "14px",
              background: "#1e293b",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: `${completionRate}%`,
                height: "100%",
                background:
                  "linear-gradient(135deg, #2563eb, #10b981)",
              }}
            />
          </div>

          <h1>{completionRate}%</h1>

          <p style={{ color: "#94a3b8", marginTop: "20px" }}>
            Overdue Tasks: {stats.overdueTasks}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;