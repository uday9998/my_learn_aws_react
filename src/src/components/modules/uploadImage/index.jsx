import React, { useState } from 'react';
import ImageView from 'components/elements/ImageView';
import Upload from 'components/modules/uploadWithoutS3';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import UploadModal from '../UploadModal';


const UploadImage = ({
   isOptional, label, src, onChange, name, size, otherProps, recomendation, cropRatio,
   isPageBuilder, textsize, isHaveRecomenededText, recomenededText, isOpen, changeClose, disabled, btnText,
   fileLessonFormat, fileType, recomendationLeft, recomendedTextTop, imgText, bottomText, isImageUpload,
}) => {
   const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);
   return (
      <div className={ `uploadImg_${ size }` }>
         {(isOpenChangeModal || isOpen) && (
            <UploadModal
               { ...otherProps }
               fileLessonFormat={ fileLessonFormat || 'image' }
               isAmazonFile={ true }
               text={ fileLessonFormat ? 'Image Or Video' : imgText || 'Image' }
               isUpload={ true }
               isWithoutModal={ true }
               cropRatio={ cropRatio }
               onChange={ (url, e, file) => {
                  onChange(name, url, file);
                  setIsOpenChangeModal(false);
               } }
               onCloseModal={ () => setIsOpenChangeModal(false) }
            />
         )}
         {!src && (
            <div className={ `uploadImg_${ size }_upload` }>
               <Upload
                  { ...otherProps }
                  isOptional={ isOptional }
                  isUpload={ true }
                  label={ label }
                  textsize={ textsize }
                  isHaveRecomenededText={ isHaveRecomenededText }
                  recomendedTextTop={ recomendedTextTop }
                  recomenededText={ recomenededText }
                  isWithoutModal={ true }
                  fileLessonFormat={ fileLessonFormat || 'image' }
                  cropRatio={ cropRatio }
                  isAmazonFile={ true }
                  disabled={ disabled }
                  bottomText={ bottomText }
                  text={ btnText || 'Image' }
                  onChange={ (url, e, file) => { onChange(name, url, file); } }
                  isImageUpload={ isImageUpload }
               />
            </div>
         )}
         {!!src && (
            <div className={ `uploadImg_${ size }_upload` }>
               {label && (
                  <Text
                     inner={ label }
                     type={ textTypes.mediumLarge }
                     size={ textsize ? textSizes[`${ textsize }`] : textSizes.small }
                  />
               ) }
               <ImageView
                  src={ src }
                  setIsOpenChangeModal={ () => {
                     if (isPageBuilder) {
                        onChange(name, null);
                        return;
                     }
                     setIsOpenChangeModal(true);
                  } }
                  clear={ () => { onChange(name, null); } }
                  onChange={ (url) => { onChange(name, url); } }
                  changeClose={ changeClose }
                  fileType={ fileType }
                  name={ name }
               />
            </div>
         )}
         {recomendation && (
            <Text
               inner={ `Recommended size – ${ recomendation }` }
               type={ textTypes.regular148 }
               size={ textSizes.xsmall }
               style={ {
                  color: '#727978', marginTop: '8px', display: 'flex', flexDirection: 'column',
               } }
               innerStyle={ recomendationLeft ? {} : { textAlign: 'center' } }
            />
         )}
      </div>
   );
};

UploadImage.propTypes = {
   label: PropTypes.string,
   otherProps: PropTypes.any,
   isOptional: PropTypes.bool,
   src: PropTypes.string,
   onChange: PropTypes.func,
   name: PropTypes.string,
   recomendation: PropTypes.string,
   size: PropTypes.string,
   cropRatio: PropTypes.string,
   fileLessonFormat: PropTypes.string,
   isWithoutModal: PropTypes.bool,
   isPageBuilder: PropTypes.bool,
   textsize: PropTypes.string,
   isHaveRecomenededText: PropTypes.bool,
   recomenededText: PropTypes.string,
   isOpen: PropTypes.bool,
   changeClose: PropTypes.string,
   disabled: PropTypes.bool,
   btnText: PropTypes.string,
   fileType: PropTypes.string,
   recomendationLeft: PropTypes.bool,
   recomendedTextTop: PropTypes.bool,
   isImageUpload: PropTypes.bool,
   imgText: PropTypes.string,
   bottomText: PropTypes.string,
};

UploadImage.defaultProps = {
   isOptional: false,
   size: 'medium',
};


export default UploadImage;
