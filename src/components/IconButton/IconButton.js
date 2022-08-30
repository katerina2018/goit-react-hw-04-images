import React from 'react';
import propTypes from 'prop-types';
import { IconButtonTag } from './IconButton.styles';

const IconButton = ({ children, onClick, ...allyProps }) => (
  <IconButtonTag type="button" onClick={onClick} {...allyProps}>
    {children}
  </IconButtonTag>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: propTypes.func,
  children: propTypes.node,
  'aria-label': propTypes.string.isRequired,
};

export default IconButton;
