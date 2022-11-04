import PropTypes from 'prop-types';
export const GalleryItem = ({ id, src, alt, toggleOnBigImage }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        id={id}
        onClick={toggleOnBigImage}
      />
    </li>
  );
};
GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  toggleOnBigImage: PropTypes.func.isRequired,
};
