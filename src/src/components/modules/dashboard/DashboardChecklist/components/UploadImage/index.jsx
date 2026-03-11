import React from 'react';
import PropTypes from 'prop-types';
import UploadImage from 'components/modules/uploadImage';

const NewUploadImage = ({
   handleInputChange, uploadedImage,
}) => {
   return (
      <div className='upload__image__wrapper'>
         <div>
            <UploadImage
               name='thumbnail_image'
               onChange={ handleInputChange }
               src={ uploadedImage }
               otherProps={ {
                  cropRatio: '1920x1080',
               } }
               size='full'
               cropRatio={ true }
               recomendation='100x100'
               recomenededText='Recommended size 100x100'
               isImageUpload={ true }
            />
         </div>
      </div> 
   );
};

NewUploadImage.propTypes = {
   handleInputChange: PropTypes.func,
   uploadedImage: PropTypes.string,
};

export default NewUploadImage;