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
          <Link to={'/home'} className={`${style.titleLink}`} title="Go home">
            <h1 className={`${style.title}`}>Pokedex</h1>
          </Link>
          {showSearchBar && (
            <SearchBar
              searchFunction={searchFunction ?? (() => {})}
              showButton={showButton}
            />
          )}
          <Link
            to={'/entrenador-profile'}
            className={`${style.button}`}
            title={`Go to your profile`}
          >
            Perfil
          </Link>{' '}
        </>
      ) : (
        <>

          <Link to={'/home'} className={style.titleLink} title="Go home">
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
            <Link to="/entrenador-profile" className={style.navLink}>
              Perfil
            </Link>
          </nav>

        </>
      )}
    </header>
  );
};

export default Header;
