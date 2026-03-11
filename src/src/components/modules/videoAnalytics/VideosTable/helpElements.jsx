import React from 'react';
import './index.scss';
import up from 'assets/images/promotions/up.png';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import videoImage from 'assets/images/video-image.png';

export const TitleLength = () => {
   return (
      <span className='flex align-center'>
         <Text
            type={ TextType.normal }
            size={ TextSize.extraSmall }
            inner='Length'
            color='rgba(51, 51, 51, 0.5)'
         />
         <img src={ up } alt='' className='m-l-exs' />
      </span>
   );
};

export const titleWithImage = (text) => {
   return (
      <span className='flex align-center'>
         <img src={ videoImage } alt='' style={ { marginRight: '12px' } } />
         <Text
            type={ TextType.regular }
            size={ TextSize.extraSmall }
            inner={ text }
         />
      </span>
   );
};
