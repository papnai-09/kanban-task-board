import { useState } from "react";

export default function TaskCard({
  task,
  column,
  deleteTask,
  moveTask,
  updateTask,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const getBorder = () => {
    if (task.priority === "High") return "red";
    if (task.priority === "Medium") return "orange";
    return "green";
  };

  return (
    <div className="task" style={{ borderLeft: `5px solid ${getBorder()}` }}>
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            updateTask(column, task.id, text);
            setEditing(false);
          }}
          autoFocus
        />
      ) : (
        <p onClick={() => setEditing(true)}>{task.text}</p>
      )}

      <div className="buttons">
        {column !== "todo" && (
          <button onClick={() => moveTask(column, "todo", task)}>
            To Do
          </button>
        )}

        {column !== "inprogress" && (
          <button onClick={() => moveTask(column, "inprogress", task)}>
            In Progress
          </button>
        )}

        {column !== "done" && (
          <button onClick={() => moveTask(column, "done", task)}>
            Done
          </button>
        )}

        <button onClick={() => deleteTask(column, task.id)}>X</button>
      </div>
    </div>
  );
}