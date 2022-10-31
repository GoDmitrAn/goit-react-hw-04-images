export const GalleryItem = ({ id, src, alt }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={src} alt={alt} id={id} />
    </li>
  );
};
