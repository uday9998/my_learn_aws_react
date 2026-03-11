import Upload from 'components/modules/uploadWithoutS3';
import React from 'react';
import PropTypes from 'prop-types';

export const MediaUploadVideo = ({ onChange }) => {
   return (
      <div style={ {
         background: '#fff', padding: '20px', border: '1px solid #E7E9E9', borderRadius: '12px',
      } }
      >
         <Upload
            fileLessonFormat='media'
            isWithoutModal={ true }
            isAmazonFile={ true }
            text='Files'
            onChange={ (url, name, file) => { onChange(url, name, file); } }
         />
      </div>
   );
};

MediaUploadVideo.propTypes = {
   onChange: PropTypes.func,
};
