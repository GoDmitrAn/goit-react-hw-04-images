import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
const bodyEl = document.body;
export const Modal = ({ onClose, url, alt }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('close modal');

        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    bodyEl.classList.add('no-scroll');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
    bodyEl.classList.toggle('no-scroll');
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
