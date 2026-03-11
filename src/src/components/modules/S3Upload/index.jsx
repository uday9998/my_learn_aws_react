import React, { useEffect, useRef, useState } from 'react';
import UploadProgress from 'components/modules/mediaLibrary/UploadProgress';
import { generateFileName, getS3Url, isVideoFile } from 'utils/mediaLibrary';
import { useSelector } from 'react-redux';
import { getStorageFreeSize, isOneTimeUser } from 'utils/storage';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import init from './evaporate';
import UploadView from './UploadView';


const useS3Upload = (Button, options, onWidgetMount) => {
   const [progress, setProgress] = useState(0);
   const [uploadInProgress, setUploadInProgress] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const awsKeyRef = useRef(null);
   const uploadApiRef = useRef(null);
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
   const {
      onChange = () => {},
      onError = () => {},
      onLoadingStart,
      onLoadingEnd,
      acceptFilesExtentions = '',
      fileLessonFormat = '',
      cropRatio,
      buttonProps = {},
      fixedProgressBar,
   } = options;

   useEffect(() => {
      init()
         .then(evarporate => uploadApiRef.current = evarporate);
      if (typeof onWidgetMount === 'function') {
         onWidgetMount({
            openWidget: () => {
               setModalOpen(true);
            },
         });
      }
   }, []);

   async function cancelUpload(key, isAbort = false) {
      if (!isAbort) {
         setUploadInProgress(false);
      }
      setProgress(0);
      const cancel = await uploadApiRef.current.cancel(`${ process.env.REACT_APP_AWS_BUCKET }/${ key }`);
      awsKeyRef.current = null;
      return cancel;
   }

   function clearUploadState() {
      setUploadInProgress(true);
      setProgress(0);
      setModalOpen(false);
   }

   async function onUploadStart() {
      clearUploadState();
      if (typeof onLoadingStart === 'function') {
         onLoadingStart();
      }
      if (awsKeyRef.current) {
         return cancelUpload(awsKeyRef.current, true);
      }
      return {};
   }

   function onFileReady(awsKey, originalName, file) {
      onChange(getS3Url(awsKey), originalName, file);
      if (typeof onLoadingEnd === 'function') {
         onLoadingEnd();
      }
      setUploadInProgress(false);
      awsKeyRef.current = null;
   }

   function onUploadComplete(awsKey, originalName, file) {
      onFileReady(awsKey, originalName, file);
   }


   async function onFileSelect({
      file, fileBlob, fileOptions, onCropStart,
   }) {
      const uploadedFile = file || new File([fileBlob], fileOptions.name, fileOptions);
      const fileName = generateFileName(uploadedFile.type);
      const filePath = `${ uuid }/${ fileName }`;
      const freeVideoStorage = getStorageFreeSize(planName, storageLimit, videoStorageSize);
      // handle can user upload file

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

      if (typeof onCropStart === 'function') {
         return onCropStart();
      }

      try {
         try {
            await onUploadStart();
         } finally {
            awsKeyRef.current = filePath;
            const config = {
               file: uploadedFile,
               name: filePath,
               xAmzHeadersAtInitiate: { 'x-amz-acl': 'public-read', 'Content-Type': uploadedFile.type },
               progress: (progressPercent) => setProgress(progressPercent),
               complete: (_xhr, awsKey) => onUploadComplete(awsKey, uploadedFile.name, uploadedFile),

            };
            uploadApiRef.current.add(config);
         }
      } catch (reason) {
         onError(reason);
      }
      return true;
   }

   const progressEL = (
      uploadInProgress
      && (
         <UploadProgress
            fixed={ fixedProgressBar }
            className='full-uploadprogress'
            progress={ progress }
            showCancel={ progress !== 1 }
            onCancel={ () => { cancelUpload(awsKeyRef.current); } }
         />
      )
   );
   const uploadButton = (
      <UploadView
         open={ modalOpen }
         onClose={ () => setModalOpen(false) }
         onOpen={ () => setModalOpen(true) }
         cropRatio={ cropRatio }
         fileLessonFormat={ fileLessonFormat }
         onFileSelect={ onFileSelect }
         acceptFilesExtentions={ acceptFilesExtentions }
      >
         {Button ? (
            <Button { ...buttonProps } onClick={ () => setModalOpen(true) } />
         ) : (null)}
      </UploadView>
   );
   return { progressEL, uploadButton, uploadInProgress };
};


export default useS3Upload;
