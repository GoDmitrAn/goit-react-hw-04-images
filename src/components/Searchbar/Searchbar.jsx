import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Component } from 'react';

export class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const userSearch = event.target.elements.search.value;
    this.props.onSubmitForm(userSearch);
  };
  render() {
    return (
      <div className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
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
  }
}
Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
