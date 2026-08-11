import { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  function submitTask(event) {
    event.preventDefault();
    if (!text.trim()) {
      setError('Add a task title to continue.');
      return;
    }
    onAddTask(text.trim(), priority);
    setText('');
    setPriority('Medium');
    setError('');
  }

  return (
    <form className="task-input" onSubmit={submitTask}>
      <div className="input-group">
        <label htmlFor="task-title">What needs to be done?</label>
        <input id="task-title" value={text} onChange={(event) => { setText(event.target.value); setError(''); }} placeholder="e.g. Prepare project proposal" />
        {error && <span className="field-error">{error}</span>}
      </div>
      <div className="select-group">
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
      </div>
      <button className="add-button" type="submit"><span>+</span> Add task</button>
    </form>
  );
}
