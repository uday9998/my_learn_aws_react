import React, { useEffect, useState } from 'react';
import './firstCard.scss';
import firstCardPhone from 'assets/images/appBuilder/firstCardPhone.png';
import firstCardPhoneMobile from 'assets/images/appBuilder/firstCardPhone-mobile.png';
import Text, { SIZES as sizes, TYPES as types } from '../../../elements/TextNew';
import BaseButton, { SIZES as btnSize } from '../../../elements/buttons/BaseButtonNew';

const FirstCard = () => {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const handleOpenSupportChat = () => {
      // document.querySelector('body>#ap3-talk-widget-ui').shadowRoot.querySelector('#__root').querySelector('div').click();
      // document.querySelector('.circleRollButton').click();
      // window.open('https://support.miestro.com', '_blank');
      if (window.OpenWidget) {
         window.OpenWidget.call('maximize');
      } 
   };

   const isMobileMode = windowWidth < 1024;
   const isLowerThen1350 = windowWidth < 1350;

   return (
      <div className='appBuilder__firstCard'>
         <div className='firstCard__info__container'>
            <div className='firstCard__info'>
               <div className='text__info'>
                  <Text
                     inner='Let Us Help You Set Up A Mobile & TV App'
                     type={ isLowerThen1350 ? types.bold133 : types.very_bold133 }
                     size={ isLowerThen1350 ? sizes.xlarge : sizes.new_size_28 }
                  />
                  <Text
                     inner='Contact Us To Help You Set Up A Mobile App For Your Business'
                     type={ types.regularDefaultGrey }
                     size={ sizes.small_14 }
                  />
               </div>
               <BaseButton
                  text='Contact Us'
                  size={ btnSize.new_small_weight44 }
                  onClick={ handleOpenSupportChat }
               />
            </div>
         </div>
         <div className='firstCard__phone'>
            <img
               src={ isMobileMode ? firstCardPhoneMobile : firstCardPhone }
               alt=''
            />
         </div>
      </div>
   );
};

export default FirstCard;
