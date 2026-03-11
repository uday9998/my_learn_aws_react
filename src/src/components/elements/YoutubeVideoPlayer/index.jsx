import React from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import './index.scss';

const YoutubeVideoPlayer = ({ src, onClose }) => {
   return (
      <div className='video__player'>
         <ClickOutside onClick={ onClose }>
            <iframe
               src={ src }
               title='YouTube video player'
               frameBorder='0'
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
               allowFullScreen
            />
         </ClickOutside>
      </div>
   );
};

YoutubeVideoPlayer.propTypes = {
   src: PropTypes.string,
   onClose: PropTypes.func,
};

export default YoutubeVideoPlayer;
