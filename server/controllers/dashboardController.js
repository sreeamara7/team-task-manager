const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query);

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;

    const overdueTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "completed"
    ).length;

    res.status(200).json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};