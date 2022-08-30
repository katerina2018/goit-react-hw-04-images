import PropTypes from 'prop-types';
import { MdImageSearch } from 'react-icons/md';

import s from './Searchbar.module.css';

const Searchbar = ({ handleFormSubmit, handleSetQuery, inputValue }) => {
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleFormSubmit}>
        <input
          name="inputValue"
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSetQuery}
          value={inputValue}
        />
        <button type="submit" className={s.SearchFormButton}>
          <MdImageSearch style={{ width: 20, height: 20 }} />
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSetQuery: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Searchbar;
