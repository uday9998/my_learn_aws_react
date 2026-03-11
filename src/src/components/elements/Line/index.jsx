import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Line = ({
   background,
}) => {
   return (
      <div 
         className='line__custom__css'
         style={ {
            background,
         } }
      />
   );
};

Line.defaultProps = {
   background: '#E7E9E9',
};

Line.propTypes = {
   background: PropTypes.string,
};

export default Line;
