import React from 'react';
import './index.scss';
import liveStreamMain from 'assets/images/liveStream/liveStream-main.png';
import dots from 'assets/images/liveStream/dots.png';

import IconNew from 'components/elements/iconsSize';
import BaseButton, {
   SIZES as btnSize,
} from 'components/elements/buttons/BaseButtonNew';
import Text, {
   SIZES as sizes,
   TYPES as types,
} from 'components/elements/TextNew';

const LiveStreamView = () => {
   const handleOpenSupportChat = () => {
      document
         .querySelector('body>#ap3-talk-widget-ui')
         .shadowRoot.querySelector('#__root')
         .querySelector('div')
         .click();
   };

   return (
      <div className='liveStream__view'>
         <div className='info__card'>
            <div className='into__part'>
               <div className='info'>
                  <Text
                     inner='Start Live Streaming With Miestro'
                     type={ types.bold133 }
                     size={ sizes.xxlarge }
                  />
                  <Text
                     inner='Stream live events that will engage your audience and help grow your business.'
                     type={ types.regularDefaultGrey }
                     size={ sizes.small_14 }
                  />
               </div>
               <img src={ dots } alt='dots-1' className='dots' />
               <img src={ dots } alt='dots-2' className='dots' />
            </div>
            <div className='main__image'>
               <img src={ liveStreamMain } alt='' />
            </div>
         </div>
         <div className='no__streams'>
            <div className='info'>
               <div className='icon__back'>
                  <IconNew name='LiveStream' />
               </div>
               <div className='info__text'>
                  <Text
                     inner="You don't have any live streams yet"
                     type={ types.very_bold133 }
                     size={ sizes.small }
                  />
                  <Text
                     inner='Lets start creating you first live stream'
                     type={ types.regularDefaultGrey }
                     size={ sizes.small_14 }
                  />
               </div>
            </div>
            <BaseButton
               text='Contact Us To Activate'
               size={ btnSize.new_small_weight44 }
               onClick={ handleOpenSupportChat }
            />
         </div>
      </div>
   );
};

export default LiveStreamView;
