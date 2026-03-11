import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import BaseButton, { SIZES as btnSize, THEME as btnTheme } from 'components/elements/buttons/BaseButton';
import dragImg from 'assets/images/dragndrop.png';

import { fileToDataUrl } from 'utils/mediaLibrary';
import './index.scss';
import useS3Upload from '../S3Upload';

function DragAndDropUploadImage({
   src, onChange, crop, btnText, recText,
}) {
   const [imageDataUrl, setImageDataUrl] = useState('');
   useEffect(() => {
      setImageDataUrl(src);
   }, [src]);
   const { progressEL, uploadButton } = useS3Upload(BaseButton, {
      buttonProps: {
         text: btnText,
         theme: btnTheme.blueBordered,
         size: btnSize.full,
         margin: true,
         style: {
            borderRadius: '4px', width: '200px', fontFamily: 'Avenir Next DemiBold',
         },
      },
      onChange: async (image, _, file) => {
         const dataUrl = await fileToDataUrl(file);
         setImageDataUrl(dataUrl);
         onChange(image);
      },
      fileLessonFormat: 'image',
      cropRatio: crop,
   });


   return (
      <div className='drag-and-drop-container'>
         {crop && (
            <div className='m-b-exs'>
               <Text
                  size={ txtSizes.extraSmall }
                  type={ txtType.regular }
                  inner={ `${ recText } ${ crop }` }
                  color='#8a94a2'
                  bold
               />
            </div>
         )}
         <div className='drag-and-drop-image'>
            {src && !progressEL && <img src={ imageDataUrl || src } alt='Class cover' />}
            {!progressEL && (
               <div className='btn_upload'>
                  {uploadButton}
               </div>
            )}
         </div>
         <div className={ src ? 'flex justify-center' : 'flex justify-center drag-and-drop-container__bordered' }>
            <div className='inner'>
               <div className={ `progress__bar ${ !progressEL && 'progress__bar__off' }` }>
                  {progressEL}
               </div>
               {

                  !src && (
                  <>
                     <div className='flex justify-center'>
                        <img src={ dragImg } className='dragImage' alt='Drag a file to upload' />

                     </div>

                  </>
                  )
               }
            </div>
         </div>
      </div>
   );
}

DragAndDropUploadImage.propTypes = {
   src: PropTypes.string,
   crop: PropTypes.string,
   onChange: PropTypes.func,
   btnText: PropTypes.string,
   recText: PropTypes.string,
};

DragAndDropUploadImage.defaultProps = {
   btnText: 'Upload',
   recText: 'Recommended Size',
};

export default DragAndDropUploadImage;
