import { Searchbar } from './Searchbar/Searchbar';

import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    search: '',
    searchGallery: null,
    loading: false,
    error: null,
  };
  async componentDidUpdate() {
    try {
      if (!this.state.search) {
        return;
      }

      const response = await axios.get('', {
        params: {
          key: process.env.REACT_APP_API_KEY,
          q: this.state.search,
          per_page: 12,
        },
      });
      console.log(response.data);
      if (response.data.total === 0) {
        this.setState({ searchGallery: null, loading: false });
        return;
      }
      this.setState({
        searchGallery: response.data.hits,
        search: null,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: 'Sorry, please reload' });
    }
  }
  formSubmitHandler = data => {
    if (!data) {
      this.setState({ loading: false, searchGallery: null });
      return;
    }

    this.setState({ search: data, loading: true });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
        {this.state.loading && <Loader visible={this.state.loading} />}
        {this.state.searchGallery && (
          <div>
            <ImageGallery searchGallery={this.state.searchGallery} />
            <LoadMoreBtn>Load more</LoadMoreBtn>
          </div>
        )}

        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}
