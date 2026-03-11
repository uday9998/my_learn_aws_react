import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const EmptyBlockEmail = ({
   block,
}) => {
   return (
      <div style={ { height: `${ block.css_attributes.height }px` } } />
   );
};

EmptyBlockEmail.defaultProps = {
   block: {
      css_attributes: {},
   },
};

EmptyBlockEmail.propTypes = {
   block: PropTypes.object,
};

export default EmptyBlockEmail;
