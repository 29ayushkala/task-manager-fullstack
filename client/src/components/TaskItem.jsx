function TaskItem({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) <
      new Date();

  return (
    <div
      className={`task-card ${
        task.completed
          ? "completed"
          : ""
      } ${
        isOverdue
          ? "overdue"
          : ""
      }`}
    >
      <div className="task-top">
        <div>
          <h3>{task.title}</h3>

          <p>
            {task.description}
          </p>

          {task.dueDate && (
            <small>
              Due:{" "}
              {new Date(
                task.dueDate
              ).toLocaleDateString()}
            </small>
          )}

          {isOverdue && (
            <div className="overdue-tag">
              Overdue
            </div>
          )}
        </div>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            onToggle(task.id)
          }
        />
      </div>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() =>
            onEdit(task)
          }
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(task.id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;