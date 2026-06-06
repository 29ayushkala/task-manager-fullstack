import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Tasks Found</h3>
        <p>
          Add a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;