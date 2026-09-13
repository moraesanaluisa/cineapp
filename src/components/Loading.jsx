export default function Loading({ label = 'Carregando...' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__reel" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
