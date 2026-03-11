import React, { useState } from 'react';

import Text, { TextWithIcon, SIZES as sizes, TYPES as types } from 'components/elements/TextNew';
import dotIcon from 'assets/images/dot__icon.png';
import ModalNew from 'components/elements/ModalNew';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';

import './index.scss';


const YourProductEmptyState = () => {
   const [openModal, setIsOpenModal] = useState(false);

   const handleToggleModal = () => {
      setIsOpenModal(prevState => !prevState);
   };

   return (
      <div className='empty__state__wrapper'>
         <div className='text__wrapper'>
            <Text 
               inner='Create Digital Products'
               size={ sizes.xxlarge_new }
               style={ {
                  marginBottom: '20px',
               } }
            />
            <div>
               <div className='icon__and__text__wrapper'>
                  <img src={ dotIcon } alt='dot icon' />
                  <Text 
                     inner='Design a Video Membership for exclusive content,'
                     size={ sizes.small14 }
                     style={ {
                        color: '#444c4b',
                     } }
                  />
               </div>
               <div className='icon__and__text__wrapper'>
                  <img src={ dotIcon } alt='dot icon' />
                  <Text 
                     inner='Craft an enriching Online Course,'
                     size={ sizes.small14 }
                     style={ {
                        color: '#444c4b',
                     } }
                  />
               </div>
               <div className='icon__and__text__wrapper'>
                  <img src={ dotIcon } alt='dot icon' />
                  <Text 
                     inner='Or foster connections with a vibrant Community.'
                     size={ sizes.small14 }
                     style={ {
                        color: '#444c4b',
                     } }
                  />
               </div>
            </div>
            <div className='footer__wrapper'>
               <Text 
                  inner='Your journey starts with your choices.'
                  size={ sizes.small14 }
                  style={ {
                     color: 'rgba(114, 121, 120, 1)',
                  } }
               />
            </div>
            <div className='button__wrapper' onClick={ handleToggleModal } role='presentation'>
               <TextWithIcon
                  type={ types.regularDefaultSmallX }
                  size={ sizes.small }
                  iconName='PlayL'
                  inner='See how it works'
                  style={ { color: 'rgba(36, 85, 78, 1)', cursor: 'pointer' } }
               />
            </div>
         </div>
         {openModal && (
            <ModalNew onCloseModal={ handleToggleModal } className='dashboard_video'>
               <VideoItem
                  type='video'
                  autoplay={ true }
                  videoElementAutoPlay={ true }
                  isDashboardVideo={ true }
                  src='https://miestro-production.s3.us-west-2.amazonaws.com/videos/yourProductEmptyVideo.mp4'
               />
            </ModalNew>
         )}
      </div>
   );
};

export default YourProductEmptyState;