import  {  useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';



const Modal= ({handleModalToggle, children, image})=> {

useEffect(() => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      handleModalToggle('');
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => {  window.removeEventListener('keydown', handleKeyDown);};
}, [handleModalToggle]);




  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      handleModalToggle('');
    }
  };


    return (
    
      <div className={s.modalBackdrop} onClick={handleBackDropClick}>
        <div className={s.modalContent}>
          {children}
          <img src={image} alt="" />
        </div>
      </div>
     
   )
  
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
};

export default Modal;
