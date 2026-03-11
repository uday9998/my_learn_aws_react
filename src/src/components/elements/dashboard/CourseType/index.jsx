import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';

const CourseType = ({
   img, title, text, btnText, onButtonClick,
}) => {
   return (
      <div className='courseType'>
         <div className='flex justify-center'>
            <img src={ img } alt='class' />
         </div>
         <Text
            type={ TextType.normal }
            size={ TextSize.small }
            inner={ title }
         />
         <Text
            style={ { fontSize: '12px' } }
            type={ TextType.regular }
            inner={ text }
         />
         <div className='btnWrapper'>
            <BaseButton
               theme={ btnTheme.lightGreen }
               size={ btnSize.medium }
               text={ btnText }
               onClick={ onButtonClick }
            />
         </div>
      </div>
   );
};

CourseType.propTypes = {
   img: PropTypes.string,
   title: PropTypes.string,
   text: PropTypes.string,
   btnText: PropTypes.string,
   onButtonClick: PropTypes.func,
};

CourseType.defaultProps = {
   img: '',
   title: 'Title',
   text: 'text',
   btnText: '',
   onButtonClick: () => {},
};

export default CourseType;
