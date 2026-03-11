/* eslint-disable consistent-return */
import React, {
   useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import Crop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getInitialCropSize } from 'components/modules/S3Upload/helpers';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import getCroppedImg from 'components/modules/S3Upload/getCroppedImage';
import { generateFileName, getS3Url, isVideoFile } from 'utils/mediaLibrary';
import { useSelector } from 'react-redux';
import { getStorageFreeSize, isOneTimeUser } from 'utils/storage';
import init from 'components/modules/uploadWithoutS3/evaporate';
import './index.scss';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import LoaderMini from '../loaderMini';

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


const CropImage = ({
   cropSrc: cropUrl, onChange, cropSize: cropR, isAmazonFile, fileRef: fileRef2, onCancel, onChangeCrop,
}) => {
   const [crop, setCrop] = useState(null);
   const [cropSrc, setCropSrc] = useState(cropUrl);
   const cropReady = useRef(false);
   const imageRef = useRef(null);
   const [imageStyle, setImageStyle] = useState({});
   const originalImageRef = useRef(null);
   const cropImageRef = useRef(null);
   const fileRef = useRef(fileRef2);
   const [progress, setProgress] = useState(0);
   const uploadApiRef = useRef(null);
   const [isProgress, setIsProgress] = useState(false);
   const [isLoadedImage, setIsLoadedImage] = useState(false);
   const { aspect } = useMemo(() => getRatio(cropR), [cropR]);
   const {
      mainApp: { plan_name: planName, uuid },
      app: { storage_limit: storageLimit, unlimited_storage: unlimitedStorage },
      settings: { fileSizeInfo: { size: videoStorageSize } },
   } = useSelector(state => {
      const {
         common: { app, mainApp }, settings,
      } = state;
      return {
         app, mainApp, settings,
      };
   });
   useEffect(() => {
      if (isAmazonFile) {
         init()
            .then(evarporate => uploadApiRef.current = evarporate);
      }
   }, []);
   function onCropChange(newCrop) {
      if (cropReady.current === true) {
         setCrop(newCrop);

         if (onChangeCrop) {
            onChangeCrop();
         }
      }
   }
   function clearUploadState() {
      setCrop('');
      setIsProgress(true);
      setCropSrc('');
   }
   function onFileReady(awsKey, originalName, file) {
      onChange(getS3Url(awsKey), originalName, file);
      setCropSrc(getS3Url(awsKey));
   }
   const handleFileSelect = async ({
      file, fileBlob, fileOptions, onCropStarter,
   }) => {
      if (isAmazonFile) {
         const uploadedFile = file || new File([fileBlob], fileOptions.name, fileOptions);
         const fileName = generateFileName(uploadedFile.type);
         const filePath = `${ uuid }/${ fileName }`;
         const freeVideoStorage = getStorageFreeSize(planName, storageLimit, videoStorageSize);
         if (isVideoFile(uploadedFile.type)
      && isOneTimeUser(planName) && !unlimitedStorage && uploadedFile.size > freeVideoStorage) {
            if (isPrint('You reached your plan limit!')) {
               return toast.error('You reached your plan limit!');
            }
         }

         if (uploadedFile.size > 2147483648) {
            if (isPrint('Size Limit Exceeded')) {
               return toast.error('Size Limit Exceeded');
            }
         }
         if (typeof onCropStarter === 'function') {
            return onCropStarter();
         }
         try {
            clearUploadState();
            const config = {
               file: uploadedFile,
               name: filePath,
               xAmzHeadersAtInitiate: { 'x-amz-acl': 'public-read', 'Content-Type': uploadedFile.type },
               progress: (progressPercent) => setProgress(progressPercent),
               complete: (_xhr, awsKey) => onFileReady(awsKey, uploadedFile.name, uploadedFile),

            };
            uploadApiRef.current.add(config);
         } catch (reason) {
         }
         return true;
      }
      onChange(file);
   };
   function onImageLoaded(img) {
      cropImageRef.current = img;
      setIsLoadedImage(true);
      const { width, height } = originalImageRef.current || {};
      const imageHeight = img.height > 360 ? 360 : img.height;
      const imageWidth = img.height > 360 ? 360 * (width / height) : img.width;
      if (img.height > 360) {
         setImageStyle({ width: `${ imageWidth }px`, height: imageHeight });
      }


      const [cw, ch] = typeof cropRatio === 'string' ? cropR.split('x').map(n => +n) : [];
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
      const fileBlob = await getCroppedImg(originalImageRef.current, pixelCrop, type);

      const fileOptions = {
         type,
         lastModified,
         name,
      };
      return handleFileSelect({ fileBlob, fileOptions });
   }
   function onCropCancel() {
      setCrop(null);
      onCancel();
      setCropSrc(null);
   }
   return (
      <div className='cropArea2'>
         {isProgress ? (
            <div className='upload__view__center'>
               <div />
               <div style={ { width: 50, height: 50 } }>
                  <div style={ { width: 50, height: 50 } } className='CircularProgressbarWithChildren'>
                     <CircularProgressbarWithChildren
                        value={ parseInt(progress * 100, 10) }
                        styles={ buildStyles({
                           trailColor: '#E7E9E9',
                           backgroundColor: '#E7E9E9',
                           pathColor: '#24554E',
                           textColor: '#24554E',
                           textSize: '24px',
                           text: {
                              color: 'black',
                           },
                        }) }
                     >

                        <Text
                           inner={ parseInt(progress * 100, 10) }
                           type={ textTypes.mediumLargeGrey }
                           size={ textSizes.large }
                           className='CircularProgressbarWithChildren__text'
                           style={ { color: '#24554e' } }
                        />
                     </CircularProgressbarWithChildren>
                  </div>
               </div>
               <div />
            </div>
         ) : (
            <div className=' justify-center'>
               <Crop
                  src={ cropSrc }
                  crop={ crop }
                  onChange={ onCropChange }
                  ref={ imageRef }
                  imageStyle={ imageStyle }
                  onImageLoaded={ onImageLoaded }
               />
               {isLoadedImage ? (
                  <div className='crop__functions__content'>
                     <Text
                        inner='Free cropping'
                        type={ textTypes.regularDefault }
                        size={ textSizes.small }
                     />
                     <div className='crop__functions__content__buttons'>
                        <BaseButton
                           text='Cancel'
                           theme={ btnTheme.secondary }
                           style={ { minWidth: 'min-content' } }
                           onClick={ onCropCancel }
                        />
                        <BaseButton
                           text='Save Photo'
                           style={ { minWidth: 'min-content' } }
                           onClick={ handleCropSave }
                        />
                     </div>
                  </div>
               ) : (
                  <LoaderMini color='#131f1e' />
               )}
            </div>
         )}
         <img className='originalImage' crossOrigin='anonymous' src={ cropSrc } ref={ originalImageRef } alt='' />
      </div>
   );
};

CropImage.propTypes = {
   cropSrc: PropTypes.string,
   onChange: PropTypes.func,
   cropSize: PropTypes.any,
   onCancel: PropTypes.func,
   isAmazonFile: PropTypes.bool,
   fileRef: PropTypes.object,
   onChangeCrop: PropTypes.func,
};

export default CropImage;
