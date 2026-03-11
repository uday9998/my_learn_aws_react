import React from 'react';
import './availableApps.scss';
import AvailableAppCard from 'components/elements/availableAppCard/AvailableAppCard';
import Text, { SIZES as sizes, TYPES as types } from '../../../elements/TextNew';
import BaseButton, { SIZES as btnSize } from '../../../elements/buttons/BaseButtonNew';

const AvailableApps = () => {
   const availableAppCardsData = [
      {
         iconName: 'IosLogo',
         text: 'IOS',
      },
      {
         iconName: 'AndroidLogo',
         text: 'Android',
      },
      {
         iconName: 'AppleTVLogo',
         text: 'Apple TV',
      },
      {
         iconName: 'AndroidTVLogo',
         text: 'Android TV',
      },
      {
         iconName: 'RokuLogo',
         text: 'Roku',
      },
      {
         iconName: 'FireStickLogo',
         text: 'Fire Stick',
      },
   ];

   const handleOpenSupportChat = () => {
      // document.querySelector('body>#ap3-talk-widget-ui').shadowRoot.querySelector('#__root').querySelector('div').click();
      // document.querySelector('.circleRollButton').click();
      // window.open('https://support.miestro.com', '_blank');
      if (window.OpenWidget) {
         window.OpenWidget.call('maximize');
      } 
   };

   return (
      <div className='appBuilder__availableApps'>
         <div className='availableApps__text'>
            <Text
               inner='All Available Apps'
               type={ types.regular160 }
               size={ sizes.xlarge_new }
            />
            <Text
               inner='Contact Us To Help You Set Up A Mobile App For Your Business'
               type={ types.regularDefaultGrey }
               size={ sizes.small_14 }
            />
         </div>
         <div className='availableApps__appCards'>
            {
               availableAppCardsData.map(({ iconName, text }) => (
                  <AvailableAppCard iconName={ iconName } text={ text } key={ iconName } />
               ))
            }
         </div>
         <div>
            <BaseButton
               text='Contact Us'
               size={ btnSize.new_small_weight44 }
               onClick={ handleOpenSupportChat }
            />
         </div>
      </div>
   );
};

export default AvailableApps;
