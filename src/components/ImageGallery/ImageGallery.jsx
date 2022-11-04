import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ searchGallery, toggleModal }) => {
  return (
    <ul className="ImageGallery">
      {searchGallery.map(item => {
        return (
          <GalleryItem
            key={item.id}
            src={item.webformatURL}
            alt={item.tags}
            id={item.id}
            toggleOnBigImage={toggleModal}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  searchGallery: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),

  toggleModal: PropTypes.func.isRequired,
};
