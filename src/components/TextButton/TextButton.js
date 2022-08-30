import PropTypes from 'prop-types';
import s from './TextButton.module.css';

const TextButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" className={s.Button} onClick={onClick} {...allyProps}>
    {children}
  </button>
);

TextButton.defaultProps = {
  onClick: () => null,
  children: null,
};

TextButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default TextButton;
