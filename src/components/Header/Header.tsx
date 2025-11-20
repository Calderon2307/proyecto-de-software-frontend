import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from '@components/Header/Header.module.css';

const Header: FC = () => {
  return (
    <header className={style.header}>
      <Link to="/" className={style.titleLink} title="Ir al inicio">
        <h1 className={style.title}>Pokedex</h1>
      </Link>

      <nav className={style.nav}>
        <Link to="/search-pokemon" className={style.navLink}>
          Buscar Pokemon
        </Link>
        <Link to="/search-type" className={style.navLink}>
          Buscar Tipo
        </Link>
        <Link to="/search-region" className={style.navLink}>
          Buscar Region
        </Link>
        <Link to="/search-item" className={style.navLink}>
          Buscar Item
        </Link>
        <Link to="/pokedex/pokemon/all" className={style.navLink}>
          Todos los Pokemon
        </Link>
      </nav>
    </header>
  );
};

export default Header;
