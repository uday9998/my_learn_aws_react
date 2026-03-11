import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

const ProgressBar = ({ 
   textColor,
   progress,
   barBackground,
   completedBackground,
}) => {
   return (
      <div className='progress'>
         <Text
            inner={ `${ progress }%` }
            style={ { color: textColor } }
            size={ sizes.small }
            type={ types.regularDefault }
         />
         <div className='progress__bar'>
            <div className='progress__bar__background' style={ { background: barBackground } } />
            <div className='progress__bar__line' style={ { background: completedBackground, width: `${ progress }%` } } />
         </div>
      </div>
   );
};

ProgressBar.propTypes = {
   textColor: PropTypes.string,
   progress: PropTypes.string,
   barBackground: PropTypes.string,
   completedBackground: PropTypes.string,
};

export default ProgressBar;
