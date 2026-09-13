export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="visually-hidden">
        Buscar por nome
      </label>
      <input
        id="search-input"
        type="search"
        placeholder="Buscar por título..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
