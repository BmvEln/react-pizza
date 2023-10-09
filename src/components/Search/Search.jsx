import styles from './Search.module.scss';
import { SearchContext } from '../../App';
import { useContext } from 'react';
import { useRef } from 'react';

const Search = () => {
  const { searchText, setSearchText } = useContext(SearchContext);
  const inputRef = useRef();

  const clearInput = () => {
    setSearchText('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.search}>
      <svg
        className={styles.searchIcon}
        height="512px"
        id="Layer_1"
        enableBackground="new 0 0 512 512"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Ввести название пиццы..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <svg
          className={styles.clearIcon}
          onClick={clearInput}
          enableBackground="new 0 0 26 26"
          id="Слой_1"
          version="1.1"
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.0605469,13L24.7802734,2.2802734c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469  s-0.7675781-0.2929688-1.0605469,0L13,11.9394531L2.2802734,1.2197266c-0.2929688-0.2929688-0.7675781-0.2929688-1.0605469,0  s-0.2929688,0.7675781,0,1.0605469L11.9394531,13L1.2197266,23.7197266c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266L13,14.0605469l10.7197266,10.7197266  C23.8662109,24.9267578,24.0576172,25,24.25,25s0.3837891-0.0732422,0.5302734-0.2197266  c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469L14.0605469,13z"
            fill="#1D1D1B"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
