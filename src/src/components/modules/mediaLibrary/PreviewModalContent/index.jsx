import React from 'react';
import PropTypes from 'prop-types';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';
import './index.scss';

function PreviewModalContent({
   type, src,
}) {
   const storageManager = src && src.substring(
      src.lastIndexOf('//') + 1,
      src.lastIndexOf('.com')
   );
   return (
      <div className='previewModalContent__'>
         { type === 'audio' && <Audio src={ src } /> }
         { type === 'image' && <img src={ src } alt='media item' /> }
         { type === 'ppt' && <iframe src={ `https://view.officeapps.live.com/op/embed.aspx?src=${ src }&embedded=true` } width='100%' height='600px' frameBorder='0' title={ src } /> }
         { type === 'pdf' && <iframe width={ 500 } height={ 500 } src={ storageManager === '/ucarecdn' ? `${ src }-/inline/yes/` : src } frameBorder='0' title={ src } /> }
         { type === 'video' && <VideoItem src={ src } type='video' /> }
      </div>
   );
}

function Audio({ src }) {
   return (
      <audio controls src={ src }>
         <source type='audio/wav' />
         <track src='captions_en.vtt' kind='captions' srcLang='en' label='english_captions' />
      </audio>
   );
}

PreviewModalContent.propTypes = {
   type: PropTypes.string,
   src: PropTypes.string,
};

export default PreviewModalContent;
