import TaskCard from './TaskCard';

const descriptions = {
  todo: 'Ready when you are',
  inprogress: 'Keep the momentum going',
  done: 'Celebrate the wins',
};

export default function Column({ title, column, tasks, onEdit, onDelete, onMove, isSearching }) {
  return (
    <section className={`column column-${column}`}>
      <div className="column-header">
        <div>
          <p>{title}</p>
          <span>{descriptions[column]}</span>
        </div>
        <b>{tasks.length}</b>
      </div>

      <div className="task-list">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} column={column} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
          ))
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">◌</span>
            <p>{isSearching ? 'No matching tasks' : 'Nothing here yet'}</p>
            <small>{isSearching ? 'Try a different search term.' : 'Add a task above to get started.'}</small>
          </div>
        )}
      </div>
    </section>
  );
}
