import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';

const LessonModule = ({ lesson }) => {
   return (
      <div className='lesson'>
         <div className='lesson__left'>
            <Icon name='LessonFile' />
            <Text
               inner={ lesson.name }
               type={ txtTypes.regularDefault }
               size={ txtSizes.small }
            />
         </div>
         {/* <div className='lesson__right'>
            <div className='lesson__progress'>
               <Text
                  inner='50%'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: '#24554E' } }
               />
               <div className='module__progress__wrapper'>
                  <div className='module__progress__prsentage' style={ { width: '50%' } } />
               </div>
            </div>
         </div> */}
      </div>
   );
};

LessonModule.propTypes = {
   lesson: PropTypes.object,
};

export default LessonModule;
