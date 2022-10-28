import IconButton from '@mui/material/IconButton';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export const Searchbar = () => {
  return (
    <div className="Searchbar">
      <form className="SearchForm">
        <label className="SearchForm-button-label">
          <IconButton type="submit" aria-label="image search icon">
            <ImageSearchIcon />
          </IconButton>
          <input
            type="text"
            name="name"
            className="SearchForm-input"
            placeholder="Search images and photos"
          />
        </label>
      </form>
    </div>
  );
};
