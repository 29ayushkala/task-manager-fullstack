const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(
  __dirname,
  "../data/tasks.json"
);

// Read Tasks
const readTasks = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  const data = fs.readFileSync(
    filePath,
    "utf-8"
  );

  return JSON.parse(data || "[]");
};

// Write Tasks
const writeTasks = (tasks) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2)
  );
};

// GET TASKS
exports.getTasks = (req, res) => {
  try {
    const tasks = readTasks();

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// CREATE TASK
exports.createTask = (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message:
          "Title is required",
      });
    }

    const tasks = readTasks();

    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt:
        new Date().toISOString(),
    };

    tasks.push(newTask);

    writeTasks(tasks);

    res.status(201).json(
      newTask
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to create task",
    });
  }
};

// UPDATE TASK
exports.updateTask = (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      dueDate,
    } = req.body;

    const tasks = readTasks();

    const index =
      tasks.findIndex(
        (task) =>
          task.id === id
      );

    if (index === -1) {
      return res.status(404).json({
        message:
          "Task not found",
      });
    }

    tasks[index] = {
      ...tasks[index],
      title,
      description,
      dueDate,
    };

    writeTasks(tasks);

    res.status(200).json(
      tasks[index]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to update task",
    });
  }
};

// DELETE TASK
exports.deleteTask = (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const tasks = readTasks();

    const filtered =
      tasks.filter(
        (task) =>
          task.id !== id
      );

    writeTasks(filtered);

    res.status(200).json({
      message:
        "Task deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to delete task",
    });
  }
};

// TOGGLE TASK
exports.toggleTask = (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const tasks = readTasks();

    const task =
      tasks.find(
        (task) =>
          task.id === id
      );

    if (!task) {
      return res.status(404).json({
        message:
          "Task not found",
      });
    }

    task.completed =
      !task.completed;

    writeTasks(tasks);

    res.status(200).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to toggle task",
    });
  }
};