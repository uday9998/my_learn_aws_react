import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
// import thumbnail from 'assets/images/certificateVideo.png';
import IconNew from 'components/elements/iconsSize';
// import YoutubeVideoPlayer from 'components/elements/YoutubeVideoPlayer';

const EmptyCertificates = ({ certificateInfoModalToggle }) => {
   // const [isOpenVideoPlay, setIsOpenVideoPlayer] = useState(false);

   return (
      <div className='certificate__empty'>
         <div className='certificate__empty__bottom'>
            <div className='certificate__empty__bottom__left'>
               <div className='certificate__empty__bottom__icon'>
                  <IconNew name='CertificatesLogoXL' />
               </div>
               <div className='certificate__empty__bottom__flex'>
                  <Text
                     inner='Create Digital Certificates'
                     type={ TextType.regularDefault }
                     size={ TextSize.size_28 }
                  />
                  <Text
                     inner='Engagement is all about rewarding your students. Miestro gives you the ability to issue certificates upon course completion.'
                     type={ TextType.regularDefault }
                     size={ TextSize.medium }
                     style={ { color: '#727978' } }
                  />
               </div>
            </div>
            <BaseButton
               text='Create Certificate'
               onClick={ certificateInfoModalToggle }
            />
         </div>
      </div>
   );
};

EmptyCertificates.propTypes = {
   certificateInfoModalToggle: PropTypes.func,
};

export default EmptyCertificates;
