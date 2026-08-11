import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TaskInput from './components/TaskInput';
import Column from './components/Column';
import './App.css';

const STORAGE_KEY = 'flowboard-tasks';
const EMPTY_TASKS = { todo: [], inprogress: [], done: [] };

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY_TASKS;

    const parsed = JSON.parse(saved);
    return ['todo', 'inprogress', 'done'].every((key) => Array.isArray(parsed[key])) ? parsed : EMPTY_TASKS;
  } catch {
    return EMPTY_TASKS;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* Storage may be unavailable. */
    }
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return tasks;

    return Object.fromEntries(
      Object.entries(tasks).map(([column, cards]) => [
        column,
        cards.filter((task) => task.text.toLowerCase().includes(term)),
      ]),
    );
  }, [tasks, query]);

  const totalTasks = Object.values(tasks).flat().length;
  const completedTasks = tasks.done.length;
  const activeQuery = query.trim();

  function addTask(text, priority) {
    setTasks((current) => ({
      ...current,
      todo: [...current.todo, { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, priority }],
    }));
  }

  function editTask(column, id, text) {
    setTasks((current) => ({
      ...current,
      [column]: current[column].map((task) => (task.id === id ? { ...task, text } : task)),
    }));
  }

  function deleteTask(column, id) {
    setTasks((current) => ({
      ...current,
      [column]: current[column].filter((task) => task.id !== id),
    }));
  }

  function moveTask(source, destination, id) {
    setTasks((current) => {
      const task = current[source].find((item) => item.id === id);
      if (!task) return current;

      return {
        ...current,
        [source]: current[source].filter((item) => item.id !== id),
        [destination]: [...current[destination], task],
      };
    });
  }

  return (
    <main className="app-shell">
      <Header totalTasks={totalTasks} completedTasks={completedTasks} />

      <div className="content">
        <section className="intro">
          <div>
            <p className="eyebrow">
              TASK MANAGEMENT <span className="live-dot" /> LIVE WORKSPACE
            </p>
            <h2>Make meaningful progress.</h2>
            <p>Plan the work, focus on what matters, and celebrate every finished task.</p>
          </div>

          <SearchBar value={query} onChange={setQuery} />
        </section>

        <TaskInput onAddTask={addTask} />

        <div className="board-heading">
          <div>
            <h3>Your board</h3>
            <p>{activeQuery ? `Showing matches for "${activeQuery}"` : 'A clear view of everything on your plate.'}</p>
          </div>
          <span className="task-total">
            <strong>{totalTasks}</strong> {totalTasks === 1 ? 'task' : 'tasks'} total
          </span>
        </div>

        <section className="board" aria-label="Kanban board">
          <Column
            title="To do"
            column="todo"
            tasks={visibleTasks.todo}
            onEdit={editTask}
            onDelete={deleteTask}
            onMove={moveTask}
            isSearching={Boolean(activeQuery)}
          />
          <Column
            title="In progress"
            column="inprogress"
            tasks={visibleTasks.inprogress}
            onEdit={editTask}
            onDelete={deleteTask}
            onMove={moveTask}
            isSearching={Boolean(activeQuery)}
          />
          <Column
            title="Done"
            column="done"
            tasks={visibleTasks.done}
            onEdit={editTask}
            onDelete={deleteTask}
            onMove={moveTask}
            isSearching={Boolean(activeQuery)}
          />
        </section>
      </div>
    </main>
  );
}
