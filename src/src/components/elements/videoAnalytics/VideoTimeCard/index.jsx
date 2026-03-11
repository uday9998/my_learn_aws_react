import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import slider from 'assets/images/slider.png';

const style = {
   boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
};

const VideoTimeCard = () => {
   return (
      <ItemWrapper style={ style }>
         <div className='videoTimeCard'>
            <Text
               type={ TextType.normal }
               size={ TextSize.extraSmall }
               inner='Length'
            />
            <div className='videoTimeCard__line'>
               <img src={ slider } alt='' />
            </div>
            <div className='videoTimeCard__txt'>
               <Text
                  style={ { fontSize: '10px' } }
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='Start'
                  color='rgba(51, 51, 51, 0.5)'
               />
               <Text
                  style={ { fontSize: '10px' } }
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='End'
                  color='rgba(51, 51, 51, 0.5)'
               />
            </div>
            <div className='videoTimeCard__txt'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='0'
               />
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='1:45:05'
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

export default VideoTimeCard;
