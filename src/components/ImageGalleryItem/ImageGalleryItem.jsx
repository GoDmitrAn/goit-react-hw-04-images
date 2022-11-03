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
