import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ pictures, handleModalToggle }) => {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(picture => {
        return (
          <ImageGalleryItem
            handleModalToggle={handleModalToggle}
            key={picture.id}
            tags={picture.tags}
            pictureUrl={picture.webformatURL}
            largePicture={picture.largeImageURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  picture: PropTypes.array,
  handleModalToggle: PropTypes.func.isRequired,
};

export default ImageGallery;
