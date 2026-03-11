import React, {
   useEffect, useMemo, useRef, useState,
} from 'react';

import PropTypes from 'prop-types';
import Crop from 'react-image-crop';
import cx from 'classnames';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import dragImg from 'assets/images/dragndrop.png';
// import BaseButton, { SIZES as btnSize, THEME as btnTheme } from 'components/elements/buttons/BaseButton';
import BaseButton, { SIZES as btnSize, THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import MaterialModal from 'components/elements/MaterialModal';
// import 'react-image-crop/lib/ReactCrop.scss';
import 'react-image-crop/dist/ReactCrop.css';
import './style.scss';
import { getInputAllowedExtensionsAndMimeTypes, fileToDataUrl } from 'utils/mediaLibrary';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import getCroppedImage from './getCroppedImage';
import { getInitialCropSize } from './helpers';


function gcd(a, b) {
   return (b === 0) ? a : gcd(b, a % b);
}

function getRatio(ratioStr) {
   const acceptRatios = ['1:1', '5:4', '4:3', '3:2', '5:3', '16:9', '3:1'];
   const result = {};
   if (typeof ratioStr === 'string') {
      const [width, height] = ratioStr.split('x').map(numStr => +numStr);

      if (typeof width === 'number' && typeof height === 'number') {
         const r = gcd(width, height);
         result.aspect = width / height;
         result.ratio = acceptRatios.includes(`${ width / r }:${ height / r }`) ? `${ width / r }:${ height / r }` : '';
      }
   }

   return result;
}

const UploadView = ({
   children, open, onClose, cropRatio, fileLessonFormat, acceptFilesExtentions,
   onFileSelect,
}) => {
   const inputRef = useRef(null);
   const fileRef = useRef(null);
   const imageRef = useRef(null);
   const cropImageRef = useRef(null);
   const originalImageRef = useRef(null);
   const cropReady = useRef(false);
   const [isDragging, setIsDragging] = useState(false);
   const [crop, setCrop] = useState(null);
   const [cropSrc, setCropSrc] = useState(null);
   const [extensions, mimetypes] = getInputAllowedExtensionsAndMimeTypes({
      allowedExtensions: acceptFilesExtentions,
      format: fileLessonFormat,
   });
   const [imageStyle, setImageStyle] = useState({});
   const { ratio, aspect } = useMemo(() => getRatio(cropRatio), [cropRatio]);
   useEffect(() => {
      if (!open) {
         setCrop(null);
         setCropSrc(null);
      }
   }, [open]);

   function onDragLeave(evt) {
      evt.preventDefault();
      setIsDragging(false);
   }
   function allowDrop(evt) {
      evt.preventDefault();
      if (!isDragging) {
         setIsDragging(true);
      }
   }

   async function onCropStart(file) {
      const blob = await fileToDataUrl(file);
      setCropSrc(blob);
      cropReady.current = false;
      setCrop({
         aspect,
      });
   }


   function handleFileSelect(files) {
      fileRef.current = files[0];
      setImageStyle({});
      if (!mimetypes.includes(files[0].type)) {
         if (isPrint('Invalid File')) {
            return toast.error('Invalid File');
         }
      }
      if (!cropRatio) {
         onFileSelect({ file: files[0] });
      } else {
         onFileSelect({
            file: files[0],
            onCropStart: () => {
               onCropStart(files[0]);
            },
         });
      }

      return true;
   }

   function onImageLoaded(img) {
      cropImageRef.current = img;
      const { width, height } = originalImageRef.current || {};
      const imageHeight = img.height > 360 ? 360 : img.height;
      const imageWidth = img.height > 360 ? 360 * (width / height) : img.width;
      if (img.height > 360) {
         setImageStyle({ width: `${ imageWidth }px`, height: imageHeight });
      }


      const [cw, ch] = typeof cropRatio === 'string' ? cropRatio.split('x').map(n => +n) : [];
      const { width: cropWidth, height: cropHeight } = getInitialCropSize(ch / cw, imageWidth, imageHeight, typeof cropRatio === 'boolean');

      let x = 0;
      let y = 0;
      if (imageHeight === cropHeight && imageWidth === cropWidth) {
         x = 0;
         y = 0;
      } else if (cropWidth === imageWidth) {
         x = 0;
         y = (imageHeight / 2) - (cropHeight / 2);
      } else if (imageHeight === cropHeight) {
         y = 0;
         x = (imageWidth / 2) - (cropWidth / 2);
      }

      const newCrop = {
         aspect,
         height: cropHeight,
         unit: 'px',
         width: cropWidth,
         x,
         y,
      };
      setTimeout(() => {
         cropReady.current = true;
      }, 200);
      setCrop(newCrop);
   }


   async function handleCropSave() {
      const { name, type, lastModified } = fileRef.current;
      const image = imageRef.current.imageRef;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      if (crop.height === 0 || crop.width === 0) {
         if (isPrint('Please Crop The Image First')) {
            toast.error('Please Crop The Image First');
         }
         return onImageLoaded(cropImageRef.current);
      }
      const pixelCrop = {
         x: crop.x * scaleX,
         y: crop.y * scaleY,
         width: crop.width * scaleX,
         height: crop.height * scaleY,
      };
      const fileBlob = await getCroppedImage(originalImageRef.current, pixelCrop, type);

      const fileOptions = {
         type,
         lastModified,
         name,
      };
      return onFileSelect({ fileBlob, fileOptions });
   }

   function onDrop(evt) {
      evt.preventDefault();
      setIsDragging(false);
      if (mimetypes.includes(evt.dataTransfer.files[0].type)) {
         handleFileSelect(evt.dataTransfer.files);
      } else {
         toast.error('Invalid File');
      }
   }

   function onCropCancel() {
      setCrop(null);
      setCropSrc(null);
   }

   function handleClose() {
      onCropCancel();
      onClose();
      fileRef.current = null;
   }

   function onCropChange(newCrop) {
      if (cropReady.current === true) {
         setCrop(newCrop);
      }
   }
   return (
      <div>
         <MaterialModal open={ open } onClose={ handleClose }>
            <div
               className={ cx({ 'uploadModalWrapper': true, 'centered empty': !crop || !cropSrc }) }
            >
               {(!crop && !cropSrc) && (
                  <div
                     onDragLeave={ onDragLeave }
                     onDrop={ onDrop }
                     onDragOver={ allowDrop }
                     onDragEnter={ allowDrop }
                     className={ `uploadArea ${ cx({ dragging: isDragging }) }` }
                  >
                     <div className='uploadAreaInner'>
                        <div className='dragInnerFooter'>

                           <div className='m-t-m'>
                              <input accept={ extensions } ref={ inputRef } type='file' onChange={ ({ target: { files } }) => handleFileSelect(files) } />
                              <BaseButton
                                 size={ btnSize.full }
                                 theme={ btnTheme.secondary }
                                 text='Choose a Local File'
                                 onClick={ () => inputRef.current.click() }
                              />
                              <Text
                                 size={ TextSize.small }
                                 type={ TextType.regular }
                                 inner='Drag and drop files or'
                                 color='#3f4f65'
                                 className='text__drop'
                              />
                           </div>

                        </div>
                     </div>
                  </div>
               )}
               {(crop && cropSrc) && (
                  <>
                     <div className='cropArea'>
                        <div className='flex justify-center'>
                           <Crop
                              src={ cropSrc }
                              crop={ crop }
                              onChange={ onCropChange }
                              ref={ imageRef }
                              imageStyle={ imageStyle }
                              onImageLoaded={ onImageLoaded }
                           />
                        </div>
                        <img className='originalImage' src={ cropSrc } ref={ originalImageRef } alt='' />
                     </div>
                     <div className='flex justify-between m-t-m'>
                        <div>
                           <BaseButton
                              size={ btnSize.medium }
                              theme={ btnTheme.grey }
                              text='Cancel'
                              onClick={ onCropCancel }
                           />
                        </div>
                        <div className='flex align-center'>{
                           typeof cropRatio === 'string'
                              ? (ratio)
                              : (
                                 <Text
                                    size={ TextSize.small }
                                    type={ TextType.bold }
                                    inner='Free cropping'
                                    color='#3f4f65'
                                 />
                              )
                        }
                        </div>
                        <div>
                           <BaseButton
                              size={ btnSize.medium }
                              theme={ btnTheme.darkGreen }
                              text='Save'
                              onClick={ handleCropSave }
                           />
                        </div>
                     </div>
                  </>
               )}
            </div>

         </MaterialModal>
         {children}
      </div>
   );
};

UploadView.propTypes = {
   children: PropTypes.node,
   open: PropTypes.bool,
   cropRatio: PropTypes.string,
   onClose: PropTypes.func,
   acceptFilesExtentions: PropTypes.string,
   onFileSelect: PropTypes.func,
   fileLessonFormat: PropTypes.string,
};

export default UploadView;
