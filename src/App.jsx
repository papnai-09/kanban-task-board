import { useState, useEffect } from "react";
import Column from "./components/Column";
import TaskInput from "./components/TaskInput";

const initialData = {
  todo: [],
  inprogress: [],
  done: [],
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
    };
    setTasks({ ...tasks, todo: [...tasks.todo, newTask] });
  };

  const deleteTask = (column, id) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].filter((t) => t.id !== id),
    });
  };

  const moveTask = (from, to, task) => {
    setTasks({
      ...tasks,
      [from]: tasks[from].filter((t) => t.id !== task.id),
      [to]: [...tasks[to], task],
    });
  };

  const updateTask = (column, id, newText) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].map((t) =>
        t.id === id ? { ...t, text: newText } : t
      ),
    });
  };

  const filterTasks = (list) => {
    if (!search.trim()) return list;
    return list.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase().trim())
    );
  };

  return (
    <div className="app">
      <div className="navbar">
        <h1>Kanban Board</h1>

        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />
      </div>

      <TaskInput addTask={addTask} />

      <div className="board">
        <Column
          title="To Do"
          tasks={filterTasks(tasks.todo)}
          column="todo"
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
        />

        <Column
          title="In Progress"
          tasks={filterTasks(tasks.inprogress)}
          column="inprogress"
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
        />

        <Column
          title="Done"
          tasks={filterTasks(tasks.done)}
          column="done"
          deleteTask={deleteTask}
          moveTask={moveTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}