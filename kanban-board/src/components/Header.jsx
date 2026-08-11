export default function Header({ totalTasks, completedTasks }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>
        <div>
          <p className="eyebrow">WORKSPACE</p>
          <h1>Flowboard</h1>
        </div>
      </div>
      <div className="progress-summary" aria-label={`${completedTasks} of ${totalTasks} tasks completed`}>
        <div className="progress-copy">
          <span>Progress</span>
          <strong>{completedTasks} / {totalTasks} done</strong>
        </div>
        <div className="progress-track"><span style={{ width: totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%' }} /></div>
      </div>
      <div className="avatar" title="Your workspace">FH</div>
    </header>
  );
}
