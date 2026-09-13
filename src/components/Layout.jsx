import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <span className="brand">
            Cine<span className="brand__accent">App</span>
          </span>
          <nav className="main-nav" aria-label="Navegação principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              Sobre / Favoritos
            </NavLink>
          </nav>
        </div>
        <div className="filmstrip" aria-hidden="true" />
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Dados fornecidos pela TVMaze API. Projeto desenvolvido para fins de estudo.</p>
      </footer>
    </div>
  )
}
