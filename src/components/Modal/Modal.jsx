import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
const bodyEl = document.body;
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    bodyEl.classList.add('no-scroll');
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('close modal');
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
    bodyEl.classList.toggle('no-scroll');
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.url} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
