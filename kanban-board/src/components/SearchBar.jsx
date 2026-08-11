export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
      {value && (
        <button type="button" className="clear-search" onClick={() => onChange('')} aria-label="Clear search">
          ×
        </button>
      )}
    </label>
  );
}
