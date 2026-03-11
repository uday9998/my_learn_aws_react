import BaseButton, {
   THEME as btnTheme,
   SIZES as btnSize,
} from 'components/elements/buttons/BaseButton';
import uploadSign from 'assets/images/uploadSign.svg';
import useS3Upload from 'components/modules/S3Upload';
import React, { useEffect } from 'react';
import './index.scss';

const UploadSignatureButton = ({ onChange, getUploadProgress }) => {
   const { uploadButton, progressEL } = useS3Upload(BaseButton, {
      buttonProps: {
         text: <img src={ uploadSign } alt='upload' />,
         theme: btnTheme.lightBlue,
         size: btnSize.small,
         style: { marginRight: '5px' },
      },
      onChange: (src) => {
         onChange(src);
      },
      acceptFilesExtentions: 'png jpg',
   });
   useEffect(() => {
      getUploadProgress(progressEL);
   }, [getUploadProgress, progressEL]);
   return (
      <div className='signUploadBtn'>
         {uploadButton}
      </div>
   );
};

export default UploadSignatureButton;
