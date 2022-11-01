import { Searchbar } from './Searchbar/Searchbar';

import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    search: '',
    searchGallery: null,
    loading: false,
    error: null,
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { search, page, searchGallery } = this.state;
    if (!search) {
      return;
    }
    if (prevState.search === search && prevState.page === page) {
      return;
    }
    if (searchGallery && searchGallery.length < 12) {
      return;
    }

    try {
      const response = await axios.get('/?', {
        params: {
          key: process.env.REACT_APP_API_KEY,
          q: this.state.search,
          page: this.state.page,
          per_page: 12,
        },
      });

      if (response.data.total === 0) {
        this.setState({ searchGallery: null, loading: false });
        return;
      }
      if (response.data.totalHits > 12) {
        this.galleryPages = Math.ceil(response.data.totalHits / 12);
      }

      if (this.state.page > 1) {
        this.setState(prevState => {
          return {
            searchGallery: [...prevState.searchGallery, ...response.data.hits],
            loading: false,
          };
        });
        return;
      }
      this.setState({ searchGallery: response.data.hits, loading: false });
    } catch (error) {
      this.setState({ error: 'Sorry, please reload' });
    }
  }
  galleryPages = 1;
  formSubmitHandler = data => {
    if (!data) {
      this.setState({ loading: false, searchGallery: null });
      return;
    }
    if (this.state.search === data) {
      return;
    }
    this.setState({ search: data, loading: true, page: 1 });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { loading, searchGallery, error, page } = this.state;
    return (
      <div>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
        {loading && <Loader visible={loading} />}
        {searchGallery && (
          <div>
            <ImageGallery searchGallery={searchGallery} />
          </div>
        )}
        {searchGallery && page < this.galleryPages ? (
          <LoadMoreBtn onLoadMore={this.loadMore}>Load more</LoadMoreBtn>
        ) : (
          false
        )}

        {error && <div>{error}</div>}
      </div>
    );
  }
}
