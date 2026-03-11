import React, { useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import cardInfo from 'assets/images/landings/background.png';
import VideoBackground from 'assets/images/landings/video.png';
import VideoPlayer from 'components/modules/videoPlayer';
import ModalNew from 'components/elements/ModalNew';

const LandingCreateVideo = () => {
   const [openLandingVideo, setOpenLandingVideo] = useState(false);
   const videoJsOptions = {
      autoplay: true,
      controls: true,
      poster: '',
      sources: [{
         src: 'https://miestro-production.s3.us-west-2.amazonaws.com/landing/New+Landing+Page+Video+3.0.mp4',
         type: 'video/mp4',
      }],
      controlBar: { liveDisplay: false, pictureInPictureToggle: true },
   };
   return (
      <div className='create__landing__video'>
         <div className='create__landing__video__content'>
            <img src={ cardInfo } className='create__landing__video__content__background' alt='' />
            <div className='create__landing__video__content__image' role='presentation' onClick={ () => setOpenLandingVideo(true) }>
               <img src={ VideoBackground } alt='' />
            </div>
            <div className='create__landing__video__content__texts'>
               <Text
                  inner='See how it works'
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
                  style={ { color: '#FFFFFF' } }
               />
               <div>
                  <Text
                     inner='Choose from a rich selection of ready-made templates to create unique'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#E7E9E9' } }
                  />
                  <br />
                  <Text
                     inner='landing pages for your site or start creating your own from scratch'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#E7E9E9' } }
                  />
               </div>
            </div>
         </div>
         {openLandingVideo && (
            <ModalNew onCloseModal={ () => setOpenLandingVideo(false) }>
               <VideoPlayer videoJsOptions={ videoJsOptions } />
            </ModalNew>
         )}
      </div>
   );
};

LandingCreateVideo.propTypes = {

};

export default LandingCreateVideo;
