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

export const App = () => {
  const [search, setSearch] = useState(null);
  const [searchGallery, setSearchGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const galleryPages = useRef(1);

  // state = {
  //   search: null,
  //   searchGallery: null,
  //   loading: false,
  //   error: null,
  //   page: 1,
  //   showModal: false,
  // };

  let imageOnModal = null;
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
        setSearchGallery(response.data.hits);
        setLoading(false);
        if (response.data.totalHits > 12) {
          galleryPages.current = Math.ceil(response.data.totalHits / 12);
          console.log(galleryPages.current);
        }
      } catch (error) {
        console.log(error);
        // this.setState({ error: 'Sorry, please reload' });
        setError('Sorry, please reload');
      }
    }
    fetchData();
  }, [search, page, loading]);
  // useEffect(() => {
  //   if (!search) {
  //     console.log('no-search');
  //     return;
  //   }

  //   async function fetchData() {
  //     try {
  //       const response = await axios.get('/?', {
  //         params: {
  //           key: process.env.REACT_APP_API_KEY,
  //           q: search,
  //           page: page,
  //           per_page: 12,
  //         },
  //       });

  //       if (response.data.total === 0) {
  //         // this.setState({ searchGallery: null, loading: false });
  //         setLoading(false);
  //         setSearchGallery(null);
  //         return;
  //       }
  //       if (response.data.totalHits > 12) {
  //         galleryPages.current = Math.ceil(response.data.totalHits / 12);
  //         console.log(galleryPages.current);
  //       }

  //       if (page > 1) {
  //         // this.setState(prevState => {
  //         //   return {
  //         //     searchGallery: [
  //         //       ...prevState.searchGallery,
  //         //       ...response.data.hits,
  //         //     ],
  //         //     loading: false,
  //         //   };
  //         // });
  //         setSearchGallery(prevState => [...prevState, ...response.data.hits]);
  //         setLoading(false);
  //         return;
  //       }
  //       // this.setState({ searchGallery: response.data.hits, loading: false });
  //       setSearchGallery(response.data.hits);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       // this.setState({ error: 'Sorry, please reload' });
  //       setError('Sorry, please reload');
  //     }
  //   }
  //   fetchData();
  // }, [search, page, searchGallery, error, loading, galleryPages]);

  // async function componentDidUpdate(prevProps, prevState) {
  //   const { search, page, searchGallery, loading } = this.state;
  //   if (!search) {
  //     console.log('no-search');
  //     return;
  //   }
  //   if (prevState.search === search && prevState.page === page) {
  //     return;
  //   }

  //   if (searchGallery & (this.galleryPages === 1)) {
  //     console.log('no more photos');
  //     return;
  //   }
  //   if (!loading) {
  //     this.setState({ loading: true });
  //   }
  //   try {
  //     const response = await axios.get('/?', {
  //       params: {
  //         key: process.env.REACT_APP_API_KEY,
  //         q: this.state.search,
  //         page: this.state.page,
  //         per_page: 12,
  //       },
  //     });

  //     if (response.data.total === 0) {
  //       this.setState({ searchGallery: null, loading: false });
  //       return;
  //     }
  //     if (response.data.totalHits > 12) {
  //       this.galleryPages = Math.ceil(response.data.totalHits / 12);
  //       console.log(this.galleryPages);
  //     }

  //     if (this.state.page > 1) {
  //       this.setState(prevState => {
  //         return {
  //           searchGallery: [...prevState.searchGallery, ...response.data.hits],
  //           loading: false,
  //         };
  //       });
  //       return;
  //     }
  //     this.setState({ searchGallery: response.data.hits, loading: false });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ error: 'Sorry, please reload' });
  //   }
  // }

  // let galleryPages = 1;
  const toggleModal = e => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    setShowModal(prevState => !prevState);

    if (!showModal) {
      console.log(e.target.id);

      imageOnModal = searchGallery.find(
        item => item.id === Number(e.target.id)
      );
      console.log(' imageOnModal', this.imageOnModal);
    }
  };

  const formSubmitHandler = data => {
    if (!data) {
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
    setSearchGallery(null);
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
      {page === galleryPages.current ||
      searchGallery & (searchGallery.length < 12) ? (
        false
      ) : (
        <LoadMoreBtn onLoadMore={loadMore}>Load more</LoadMoreBtn>
      )}

      {error && <div>{error}</div>}
    </div>
  );
};
