import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  pictureUrl,
  largePicture,
  tags,
  handleModalToggle,
}) => {
  return (
    <li
      onClick={() => handleModalToggle(largePicture)}
      className={s.ImageGalleryItem}
    >
      <img className={s.ImageGalleryImage} src={pictureUrl} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  largePicture: PropTypes.string.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
