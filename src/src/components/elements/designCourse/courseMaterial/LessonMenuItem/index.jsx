import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';

const LessonMenuItem = ({
   text, icon, style, onClick,
}) => {
   return (
      <div
         className='lessonMenuItem'
         style={ style }
         onClick={ (e) => {
            e.stopPropagation();
            onClick();
         } }
         role='presentation'
      >
         <div className='lessonMenuItem__content'>
            <Icon
               name={ icon }
               className='lessonMenuItem__svg'
               color='#A9A8A8'
            />
            <Text
               size={ txtSizes.extraSmall }
               type={ txtType.normal }
               inner={ text }
            />
         </div>
      </div>
   );
};

LessonMenuItem.propTypes = {
   text: PropTypes.string,
   icon: PropTypes.string,
   style: PropTypes.object,
   onClick: PropTypes.func,
};

LessonMenuItem.defaultProps = {
   text: 'Audio',
   icon: 'Audio',
};

export default LessonMenuItem;
