import { useEffect, useState } from "react";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import Stats from "./components/Stats";

import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const [editingTask, setEditingTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasks();

      // newest first sorting
      setTasks(
        res.data.sort(
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
        )
      );
    } catch (err) {
      setError(
        "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask =
    async (task) => {
      const res =
        await createTask(task);

      setTasks((prev) => [
        res.data,
        ...prev,
      ]);
    };

  // Delete Task
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this task?"
        );

      if (!confirmDelete)
        return;

      await deleteTask(id);

      setTasks((prev) =>
        prev.filter(
          (task) =>
            task.id !== id
        )
      );
    };

  // Toggle Complete
  const handleToggle =
    async (id) => {
      const res =
        await toggleTask(id);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? res.data
            : task
        )
      );
    };

  // Update Task
  const handleUpdateTask =
    async (
      id,
      updatedTask
    ) => {
      const res =
        await updateTask(
          id,
          updatedTask
        );

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? res.data
            : task
        )
      );

      setEditingTask(null);
    };

  // Filter + Search
  const filteredTasks =
    tasks
      .filter((task) => {
        if (
          filter === "active"
        )
          return !task.completed;

        if (
          filter ===
          "completed"
        )
          return task.completed;

        return true;
      })
      .filter((task) =>
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

  return (
    <div className="container">
      <div className="app-card">
        <h1 className="title">
          Task Manager
        </h1>

        <TaskForm
          onAddTask={
            handleAddTask
          }
          editingTask={
            editingTask
          }
          onUpdateTask={
            handleUpdateTask
          }
        />

        {/* Search */}
        <input
          className="search-box"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <FilterBar
          filter={filter}
          setFilter={
            setFilter
          }
        />

        <Stats tasks={tasks} />

        {loading ? (
          <p className="message">
            Loading...
          </p>
        ) : error ? (
          <p className="error">
            {error}
          </p>
        ) : (
          <TaskList
            tasks={
              filteredTasks
            }
            onDelete={
              handleDelete
            }
            onToggle={
              handleToggle
            }
            onEdit={
              setEditingTask
            }
          />
        )}
      </div>
    </div>
  );
}

export default App;