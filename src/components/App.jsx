import { Searchbar } from './Searchbar/Searchbar';

import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    search: null,
    searchGallery: null,
    loading: false,
    error: null,
    page: 1,
    showModal: false,
  };

  imageOnModal = null;
  async componentDidUpdate(prevProps, prevState) {
    const { search, page, searchGallery, loading } = this.state;
    if (!search) {
      console.log('no-search');
      return;
    }
    if (prevState.search === search && prevState.page === page) {
      return;
    }

    if (searchGallery & (this.galleryPages === 1)) {
      console.log('no more photos');
      return;
    }
    if (!loading) {
      this.setState({ loading: true });
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
        console.log(this.galleryPages);
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
      console.log(error);
      this.setState({ error: 'Sorry, please reload' });
    }
  }

  galleryPages = 1;
  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    if (!this.state.showModal) {
      console.log(e.target.id);

      this.imageOnModal = this.state.searchGallery.find(
        item => item.id === Number(e.target.id)
      );
      console.log(' imageOnModal', this.imageOnModal);
    }
  };

  formSubmitHandler = data => {
    if (!data) {
      return;
    }
    if (this.state.search === data) {
      return;
    }
    this.setState({
      search: data,
      searchGallery: null,
      page: 1,
    });

    this.galleryPages = 1;
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { loading, searchGallery, error, page, showModal } = this.state;
    return (
      <div>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            url={this.imageOnModal.largeImageURL}
            alt={this.imageOnModal.tags}
          />
        )}

        <Searchbar onSubmitForm={this.formSubmitHandler} />
        {loading && <Loader visible={loading} />}
        {searchGallery && (
          <div>
            <ImageGallery
              searchGallery={searchGallery}
              toggleModal={this.toggleModal}
            />
          </div>
        )}
        {page === this.galleryPages ||
        searchGallery & (searchGallery.length < 12) ? (
          false
        ) : (
          <LoadMoreBtn onLoadMore={this.loadMore}>Load more</LoadMoreBtn>
        )}

        {error && <div>{error}</div>}
      </div>
    );
  }
}
