import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const ProgressLine = ({
   style, progress, color, height,
}) => {
   const validProgress = progress >= 0 && progress <= 100 ? progress : 0;
   return (
      <div className='progress-bar' style={ { ...style, height } }>
         <div className='progress-bar__outside' style={ { backgroundColor: '#EAEbF2', height } } />
         <div className='progress-bar__line' style={ { width: `${ validProgress }%`, backgroundColor: '#24554e', height } } />
      </div>
   );
};

ProgressLine.propTypes = {
   progress: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
   color: PropTypes.string,
   style: PropTypes.object,
   height: PropTypes.string,
};

ProgressLine.defaultProps = {
   progress: 79,
   color: '#7cb740',
   height: '8px',
};

export default ProgressLine;
