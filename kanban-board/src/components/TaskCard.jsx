import { useEffect, useState } from 'react';

const labels = { todo: 'To do', inprogress: 'In progress', done: 'Done' };

export default function TaskCard({ task, column, onEdit, onDelete, onMove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  useEffect(() => setDraft(task.text), [task.text]);

  const destinations = column === 'todo' ? ['inprogress'] : column === 'inprogress' ? ['todo', 'done'] : ['inprogress'];

  function saveEdit() {
    if (!draft.trim()) return;
    onEdit(column, task.id, draft.trim());
    setIsEditing(false);
  }

  return (
    <article className="task-card">
      <div className="card-topline">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <button className="icon-button" onClick={() => onDelete(column, task.id)} aria-label={`Delete ${task.text}`}>
          ×
        </button>
      </div>

      {isEditing ? (
        <div className="edit-wrap">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoFocus
            aria-label="Edit task title"
            onKeyDown={(event) => event.key === 'Enter' && saveEdit()}
          />
          <div className="edit-actions">
            <button className="small-button primary" onClick={saveEdit}>
              Save
            </button>
            <button
              className="small-button"
              onClick={() => {
                setDraft(task.text);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <h3>{task.text}</h3>
      )}

      {!isEditing && (
        <div className="card-actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {destinations.map((destination) => (
            <button key={destination} className="move-button" onClick={() => onMove(column, destination, task.id)}>
              Move to {labels[destination]} <span>→</span>
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
