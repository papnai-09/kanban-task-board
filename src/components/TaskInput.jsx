import { useState } from "react";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text, priority);
    setText("");
  };

  return (
    <div className="task-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task..."
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}