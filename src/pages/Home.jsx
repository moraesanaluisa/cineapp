import { useEffect, useMemo, useState } from 'react'
import CardItem from '../components/CardItem.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Loading from '../components/Loading.jsx'

export default function Home() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('todos')
  const [sortBy, setSortBy] = useState('relevancia')

  useEffect(() => {
    let cancelled = false

    async function fetchShows() {
      try {
        setLoading(true)
        const response = await fetch('https://api.tvmaze.com/shows?page=0')
        if (!response.ok) throw new Error('Não foi possível carregar o catálogo.')
        const data = await response.json()
        if (!cancelled) setShows(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchShows()
    return () => {
      cancelled = true
    }
  }, [])

  const genres = useMemo(() => {
    const set = new Set()
    shows.forEach((show) => show.genres?.forEach((g) => set.add(g)))
    return ['todos', ...Array.from(set).sort()]
  }, [shows])

  const visibleShows = useMemo(() => {
    let result = shows.filter((show) =>
      show.name.toLowerCase().includes(search.trim().toLowerCase()),
    )

    if (genre !== 'todos') {
      result = result.filter((show) => show.genres?.includes(genre))
    }

    if (sortBy === 'avaliacao') {
      result = [...result].sort(
        (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
      )
    } else if (sortBy === 'nome') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [shows, search, genre, sortBy])

  return (
    <section aria-labelledby="catalogo-titulo">
      <h1 id="catalogo-titulo">Catálogo de Filmes & Séries</h1>
      <p className="page-intro">
        Explore produções por nome, filtre por gênero e ordene pela avaliação.
      </p>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />

        <div className="toolbar__controls">
          <label className="select-field">
            <span>Gênero</span>
            <select value={genre} onChange={(event) => setGenre(event.target.value)}>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g === 'todos' ? 'Todos os gêneros' : g}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Ordenar por</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="relevancia">Relevância</option>
              <option value="avaliacao">Avaliação (maior primeiro)</option>
              <option value="nome">Nome (A-Z)</option>
            </select>
          </label>
        </div>
      </div>

      {loading && <Loading />}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <p className="results-count">
            {visibleShows.length} produção(ões) encontrada(s)
          </p>
          <div className="catalog-grid">
            {visibleShows.map((show) => (
              <CardItem key={show.id} show={show} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
