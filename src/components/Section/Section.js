import React from 'react';
import PropTypes from 'prop-types';
import { SectionWrapper, SectionTitle } from './Section.styles';

const Section = ({ title, children }) => {
  return (
    <SectionWrapper>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </SectionWrapper>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
