import styles from './SearchBox.module.css';

const SearchBox = ({ filter, onFilterChange }) => {
  return (
    <div className={styles.search}>
      <label>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={onFilterChange}
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default SearchBox;
