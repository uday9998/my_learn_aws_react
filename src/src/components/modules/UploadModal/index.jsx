import React from 'react';
import ClickOutside from 'views/layout/DesignCourse/CourseHeader/OutsideClick';
import './index.scss';
import PropTypes from 'prop-types';
import Upload from '../uploadWithoutS3';

const UploadModal = (props) => {
   const { onCloseModal } = props;
 
   return (
      <div className='upload__modal'>
         <div role='presentation' className='upload__modal__background' onClick={ onCloseModal } />
         <ClickOutside onClick={ () => {
            onCloseModal();
         } }>
            <div className='upload__modal__content'>
               <Upload
                  { ...props }
                  isImageUpload={ true }
               />
            </div>
         </ClickOutside>
      </div>
   );
};

UploadModal.propTypes = {
   onCloseModal: PropTypes.func,
};

export default UploadModal;
