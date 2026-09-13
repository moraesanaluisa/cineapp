import { Link } from 'react-router-dom'

export default function CardItem({ show }) {
  const poster = show.image?.medium
  const rating = show.rating?.average

  return (
    <Link to={`/item/${show.id}`} className="card-item">
      <div className="card-item__poster">
        {poster ? (
          <img src={poster} alt={`Pôster de ${show.name}`} loading="lazy" />
        ) : (
          <div className="card-item__poster card-item__poster--empty">Sem imagem</div>
        )}
        {rating && <span className="card-item__badge">★ {rating}</span>}
      </div>
      <div className="card-item__body">
        <h2 className="card-item__title">{show.name}</h2>
        <p className="card-item__meta">
          {show.genres?.slice(0, 2).join(' · ') || 'Gênero não informado'}
        </p>
      </div>
    </Link>
  )
}
