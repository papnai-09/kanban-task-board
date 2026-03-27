import TaskCard from "./TaskCard";

export default function Column({
  title,
  tasks,
  column,
  deleteTask,
  moveTask,
  updateTask,
}) {
  return (
    <div className="column">
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          column={column}
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}