import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading.jsx'
import { isFavorite, toggleFavorite } from '../utils/favorites.js'

export default function ItemDetails() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchShow() {
      try {
        setLoading(true)
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
        if (!response.ok) throw new Error('Não foi possível carregar os detalhes.')
        const data = await response.json()
        if (!cancelled) {
          setShow(data)
          setFavorite(isFavorite(data.id))
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchShow()
    return () => {
      cancelled = true
    }
  }, [id])

  function handleToggleFavorite() {
    if (!show) return
    toggleFavorite({
      id: show.id,
      name: show.name,
      image: show.image,
      rating: show.rating,
    })
    setFavorite((prev) => !prev)
  }

  if (loading) return <Loading />
  if (error) return <p className="error-message">{error}</p>
  if (!show) return null

  const summaryText = show.summary?.replace(/<[^>]+>/g, '') ?? 'Sinopse não disponível.'

  return (
    <article className="item-details">
      <Link to="/" className="back-link">
        ← Voltar ao catálogo
      </Link>

      <div className="item-details__grid">
        <div className="item-details__poster">
          {show.image?.original ? (
            <img src={show.image.original} alt={`Pôster de ${show.name}`} />
          ) : (
            <div className="card-item__poster card-item__poster--empty">Sem imagem</div>
          )}
        </div>

        <div className="item-details__info">
          <h1>{show.name}</h1>

          <div className="item-details__tags">
            {show.genres?.map((g) => (
              <span key={g} className="tag">
                {g}
              </span>
            ))}
            {show.rating?.average && (
              <span className="tag tag--rating">★ {show.rating.average}</span>
            )}
          </div>

          <dl className="item-details__facts">
            <div>
              <dt>Status</dt>
              <dd>{show.status || 'Não informado'}</dd>
            </div>
            <div>
              <dt>Estreia</dt>
              <dd>{show.premiered || 'Não informado'}</dd>
            </div>
            <div>
              <dt>Duração média</dt>
              <dd>{show.runtime ? `${show.runtime} min` : 'Não informado'}</dd>
            </div>
          </dl>

          <p className="item-details__summary">{summaryText}</p>

          <button
            type="button"
            className={favorite ? 'favorite-btn favorite-btn--active' : 'favorite-btn'}
            onClick={handleToggleFavorite}
          >
            {favorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    </article>
  )
}
