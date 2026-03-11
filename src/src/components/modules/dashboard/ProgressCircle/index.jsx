import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const ProgressCircle = ({
   size, text, stpesCount, passStepsCount,
}) => {
   const percentageComplete = size.replace('%', '');
   let strokeDashOffsetValue = 100;
   strokeDashOffsetValue = 100 - percentageComplete;
   return (
      <div className='progressCircle__dashboard'>
         <div className='progressCircle__icon'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               viewBox='-1 -1 34 34'
            >

               <circle
                  cx='16'
                  cy='16'
                  r='15.4'
                  stroke='rgba(124, 183, 64, 0.27)'
                  className='progress-bar__background'
               />

               <circle
                  cx='16'
                  cy='16'
                  r='15.4'
                  style={ {
                     strokeDashoffset: strokeDashOffsetValue,
                  } }
                  stroke='#7CB740'
                  className='progress-bar__progress'
               />
            </svg>
         </div>
         <Text
            type={ TextType.normal }
            size={ TextSize.medium }
            inner={ `${ passStepsCount }/${ stpesCount }` }
            color='#333333'
         />
         <Text
            type={ TextType.normal }
            size={ TextSize.medium }
            inner={ text }
            color='#333333'
         />
      </div>
   );
};

ProgressCircle.propTypes = {
   size: PropTypes.string,
   text: PropTypes.string,
   stpesCount: PropTypes.any,
   passStepsCount: PropTypes.any,
};

ProgressCircle.defaultProps = {
   size: 'Size',
   text: 'Text',
   passStepsCount: 0,
   stpesCount: 3,
};

export default ProgressCircle;
