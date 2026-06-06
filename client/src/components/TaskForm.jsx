import { useEffect, useState } from "react";

function TaskForm({
  onAddTask,
  editingTask,
  onUpdateTask,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    if (editingTask) {
      onUpdateTask(
        editingTask.id,
        form
      );
    } else {
      onAddTask(form);
    }

    setForm({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Task title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description:
              e.target.value,
          })
        }
      />

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) =>
          setForm({
            ...form,
            dueDate:
              e.target.value,
          })
        }
      />

      <button type="submit">
        {editingTask
          ? "Update Task"
          : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;