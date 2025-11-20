import style from '@components/Header/Header.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '@components/SearchBar/SearchBar';

type Props = {
  mode: 'complete' | 'partial';
  showSearchBar?: boolean;
  showButton?: boolean;
  searchFunction?: (searchItem: string) => void;
};

const Header: React.FC<Props> = ({
                                   mode,
                                   searchFunction,
                                   showSearchBar = true,
                                   showButton = true,
                                 }) => {
  return (
    <header
      className={`${style.header}  ${mode === 'partial' ? style.partial : ''}`}
    >
      {mode === 'complete' ? (
        <>
          <Link to={'/'} className={`${style.titleLink}`} title="Go home">
            <h1 className={`${style.title}`}>Pokedex</h1>
          </Link>
          {showSearchBar && (
            <SearchBar
              searchFunction={searchFunction ?? (() => {})}
              showButton={showButton}
            />
          )}
          <Link
            to={'/create-team'}
            className={`${style.button}`}
            title={`Create a Pokémon team`}
          >
            Create Team
          </Link>{' '}
        </>
      ) : (
        <>
          {/* Logo a la izquierda (intocable) */}
          <Link to={'/'} className={style.titleLink} title="Go home">
            <h1 className={style.title}>Pokedex</h1>
          </Link>

          {/* Navegación a la derecha */}
          <nav className={style.nav}>
            <Link to="/search/pokemon" className={style.navLink}>
              Buscar Pokemon
            </Link>
            <Link to="/search/type" className={style.navLink}>
              Buscar Tipo
            </Link>
            <Link to="/search/region" className={style.navLink}>
              Buscar Region
            </Link>
            <Link to="/search/item" className={style.navLink}>
              Buscar Item
            </Link>
            <Link to="/pokemons" className={style.navLink}>
              Todos los Pokemon
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
