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
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { search, page, searchGallery } = this.state;
    if (!search) {
      return;
    }
    if (prevState.search === search && prevState.page === page) {
      console.log('prevState.search', prevState.search);
      console.log('search', search);
      console.log('prevState.page', prevState.page);
      console.log('page', page);
      return;
    }
    if (searchGallery && searchGallery.length < 12) {
      return;
    }

    try {
      const response = await axios.get('', {
        params: {
          key: process.env.REACT_APP_API_KEY,
          q: this.state.search,
          per_page: 12,
          page: this.state.page,
        },
      });

      console.log(response.data);
      if (response.data.total === 0) {
        this.setState({ searchGallery: null, loading: false });
        return;
      }
      this.setState({ searchGallery: response.data.hits, loading: false });
    } catch (error) {
      this.setState({ error: 'Sorry, please reload' });
    }
  }

  formSubmitHandler = data => {
    if (!data) {
      this.setState({ loading: false, searchGallery: null });
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
    return (
      <div>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
        {this.state.loading && <Loader visible={this.state.loading} />}
        {this.state.searchGallery && (
          <div>
            <ImageGallery searchGallery={this.state.searchGallery} />
            <LoadMoreBtn onLoadMore={this.loadMore}>Load more</LoadMoreBtn>
          </div>
        )}

        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}
