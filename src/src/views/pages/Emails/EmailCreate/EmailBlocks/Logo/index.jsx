import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import emailImg from 'assets/images/contents.png';

const ImageLesson = ({
   block,
}) => {
   const styles = block.css_attributes;
   const buttonStyle = {
      width: `${ styles.width }px`,
   };
   return (
      <div className='image__lesson'>
         <img src={ (block.email_files && block.email_files[0] && block.email_files[0].src) || emailImg } alt='email' style={ buttonStyle } />
      </div>
   );
};

ImageLesson.propTypes = {
   block: PropTypes.object,
};

export default ImageLesson;
