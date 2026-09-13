import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavorites } from '../utils/favorites.js'

export default function About() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  return (
    <section aria-labelledby="sobre-titulo">
      <h1 id="sobre-titulo">Sobre o CineApp</h1>
      <p className="page-intro">
        O CineApp é um catálogo de filmes e séries com busca, filtros e detalhes de cada
        produção, consumindo dados da TVMaze API. Seus favoritos ficam salvos neste
        navegador.
      </p>

      <h2 className="section-subtitle">Meus favoritos</h2>

      {favorites.length === 0 ? (
        <p className="empty-state">
          Você ainda não adicionou nenhuma produção aos favoritos.{' '}
          <Link to="/">Explore o catálogo</Link> e clique em "Adicionar aos favoritos" na
          página de detalhes.
        </p>
      ) : (
        <div className="catalog-grid">
          {favorites.map((show) => (
            <Link to={`/item/${show.id}`} key={show.id} className="card-item">
              <div className="card-item__poster">
                {show.image?.medium ? (
                  <img src={show.image.medium} alt={`Pôster de ${show.name}`} />
                ) : (
                  <div className="card-item__poster card-item__poster--empty">
                    Sem imagem
                  </div>
                )}
                {show.rating?.average && (
                  <span className="card-item__badge">★ {show.rating.average}</span>
                )}
              </div>
              <div className="card-item__body">
                <h2 className="card-item__title">{show.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
