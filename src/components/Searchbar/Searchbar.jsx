import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export const Searchbar = ({ onSubmitForm }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const userSearch = event.target.elements.search.value;

    onSubmitForm(userSearch);
  };

  return (
    <div className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <label className="SearchForm-button-label">
          <IconButton type="submit" aria-label="image search icon">
            <ImageSearchIcon />
          </IconButton>
          <input
            type="text"
            name="search"
            className="SearchForm-input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </label>
      </form>
    </div>
  );
};
Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
