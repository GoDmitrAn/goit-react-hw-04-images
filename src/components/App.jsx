import { Searchbar } from './Searchbar/Searchbar';

import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useEffect } from 'react';
import { useRef } from 'react';

axios.defaults.baseURL = 'https://pixabay.com/api';
let imageOnModal;
export const App = () => {
  const [search, setSearch] = useState(null);
  const [searchGallery, setSearchGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const galleryPages = useRef(1);
  useEffect(() => {
    setSearchGallery([]);
  }, []);

  useEffect(() => {
    if (!search) {
      console.log('no-search');
      return;
    }

    async function fetchData() {
      try {
        const response = await axios.get('/?', {
          params: {
            key: process.env.REACT_APP_API_KEY,
            q: search,
            page: page,
            per_page: 12,
          },
        });
        setSearchGallery(s => [...s, ...response.data.hits]);
        setLoading(false);
        if (response.data.totalHits > 12) {
          galleryPages.current = Math.ceil(response.data.totalHits / 12);
        }
      } catch (error) {
        console.log(error);

        setError('Sorry, please reload');
      }
    }
    fetchData();
  }, [search, page, loading]);

  const toggleModal = e => {
    setShowModal(prevState => !prevState);

    if (!showModal) {
      imageOnModal = searchGallery.find(
        item => item.id === Number(e.target.id)
      );
    }
  };

  const formSubmitHandler = data => {
    if (!data) {
      setSearchGallery([]);
      setSearch(null);
      setLoading(false);
      return;
    }
    if (search === data) {
      return;
    }
    // this.setState({
    //   search: data,
    //   searchGallery: null,
    //   page: 1,
    // });
    setSearch(data);
    setSearchGallery([]);
    setPage(1);
    galleryPages.current = 1;
  };
  const loadMore = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    setPage(page + 1);
  };

  // const { loading, searchGallery, error, page, showModal } = this.state;
  return (
    <div>
      {showModal && (
        <Modal
          onClose={toggleModal}
          url={imageOnModal.largeImageURL}
          alt={imageOnModal.tags}
        />
      )}

      <Searchbar onSubmitForm={formSubmitHandler} />
      {loading && <Loader visible={loading} />}
      {searchGallery && (
        <div>
          <ImageGallery
            searchGallery={searchGallery}
            toggleModal={toggleModal}
          />
        </div>
      )}
      {page === galleryPages.current || searchGallery.length < 12 ? (
        false
      ) : (
        <LoadMoreBtn onLoadMore={loadMore}>Load more</LoadMoreBtn>
      )}

      {error && <div>{error}</div>}
    </div>
  );
};
