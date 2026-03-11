import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const data = [
   ['3', 'Purchases', 'Last 30 Days'],
   ['$365', 'Net Revenue', 'Last 30 Days'],
   ['$6,058', 'Net Revenue', 'All Time'],
];

const VideosAnalyticsCard = () => {
   return (
      <div className='videosAnalyticsCard'>
         <div className='videosAnalyticsCard__title'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Analytics'
            />
            <Icon name='Hint' />
         </div>
         <ItemWrapper secondShadow>
            <div className='videosAnalyticsCard__main'>
               { data.map((item, i) => {
                  return (
                     // eslint-disable-next-line react/no-array-index-key
                     <div className='analytics__item' key={ i }>
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.large }
                           inner={ item[0] }
                        />
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraSmall }
                           inner={ item[1] }
                           color='#333333'
                        />
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraSmall }
                           inner={ item[2] }
                           color='rgba(63, 79, 101, 0.32)'
                        />
                     </div>
                  );
               }) }
            </div>
         </ItemWrapper>
      </div>
   );
};

export default VideosAnalyticsCard;
