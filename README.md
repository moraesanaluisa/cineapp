# CineApp — Filmes & Séries

SPA em React que consome a [TVMaze API](https://www.tvmaze.com/api) para exibir um
catálogo de filmes e séries, com busca em tempo real, filtro por gênero, ordenação
por avaliação/nome, página de detalhes e favoritos salvos no navegador.

## Estrutura

```
src/
  components/
    Layout.jsx      -> header, navegação e <Outlet />
    CardItem.jsx     -> card de cada produção no catálogo
    SearchBar.jsx    -> input de busca controlado
    Loading.jsx      -> indicador de carregamento
  pages/
    Home.jsx         -> Catálogo: busca, filtro por gênero, ordenação
    ItemDetails.jsx  -> Detalhes da produção (/item/:id) + favoritar
    About.jsx        -> Sobre o app + lista de favoritos
  utils/
    favorites.js     -> leitura/escrita de favoritos no localStorage
  App.jsx            -> definição das rotas (React Router)
  main.jsx           -> ponto de entrada
  index.css          -> estilos globais
```

## Rotas

- `/` — Catálogo (Home)
- `/item/:id` — Detalhes de uma produção
- `/sobre` — Sobre o app e lista de favoritos

## Requisitos atendidos

- **Roteamento**: 3 rotas com `react-router-dom`, layout com `NavLink` e `<Outlet />`.
- **Componentização**: Layout, CardItem, SearchBar, Loading como peças reutilizáveis.
- **API**: `fetch` dentro de `useEffect`, estado de carregamento ("Carregando...").
- **Interatividade**: busca em tempo real por nome, filtro por gênero e ordenação por
  avaliação/nome via `<select>`.
- **Responsividade**: grid fluido (`auto-fill`) e layout de detalhes que empilha em
  telas estreitas.
