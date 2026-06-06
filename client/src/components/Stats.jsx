function Stats({ tasks }) {
  const total =
    tasks.length;

  const completed =
    tasks.filter(
      (task) => task.completed
    ).length;

  const active =
    total - completed;

  return (
    <div className="stats">
      <div className="stat-card">
        <h2>{total}</h2>
        <p>Total</p>
      </div>

      <div className="stat-card">
        <h2>{active}</h2>
        <p>Active</p>
      </div>

      <div className="stat-card">
        <h2>{completed}</h2>
        <p>Completed</p>
      </div>
    </div>
  );
}

export default Stats;