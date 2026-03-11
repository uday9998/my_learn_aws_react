import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import up from 'assets/images/up.png';

export const TitleCourse = () => {
   return (
      <div className='flex align-center'>
         <Text
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner='Class'
            color='rgba(51, 51, 51, 0.5)'
         />
         <img src={ up } alt='' />
      </div>
   );
};

export const TitleAmount = () => {
   return (
      <Text
         type={ TextType.normal }
         size={ TextSize.extraSmall }
         inner='Amount'
         color='#4b74ff'
      />
   );
};

export const StatusActive = () => {
   const ovalStyle = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#0edd4d',
      marginTop: '-4px',
   };
   return (
      <div className='flex align-center'>
         <div style={ ovalStyle } className='m-r-exs' />
         <Text
            type={ TextType.regular }
            size={ TextSize.extraSmall }
            inner='Refunded'
         />
      </div>
   );
};
