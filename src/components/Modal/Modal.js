import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleModalToggle('');
    }
  };
  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.handleModalToggle('');
    }
  };

  render() {
    return createPortal(
      <div className={s.modalBackdrop} onClick={this.handleBackDropClick}>
        <div className={s.modalContent}>
          {this.props.children}
          <img src={this.props.image} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
};

export default Modal;
