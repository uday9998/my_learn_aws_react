import React from 'react';
import PropTypes from 'prop-types';

import Text, { SIZES as sizes } from 'components/elements/TextNew';

import './index.scss';

const ProgressBar = ({ progressData }) => {
   return (
      <div className='global__wrapper'>
         <Text 
            inner={ `${ progressData }% Complete` }
            size={ sizes.small14_500 }
            style={ {
               color: '#24554E',
            } }
         />
         <div className='progress__background__wrapper'>
            <div
               className='inner__progress'
               style={ {
                  width: `${ progressData }%`,
               } } />
         </div>
      </div>
   );
};

ProgressBar.propTypes = {
   progressData: PropTypes.number,
};

export default ProgressBar;