import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import './index.scss';
import { toast } from 'react-toastify';
import Crop from 'react-image-crop';
import PricingPopup from 'components/elements/PricingPopup';
import Icon from 'components/elements/Icon';
import ProgressBar from '@ramonak/react-progress-bar';
import { fileToDataUrl, generateFileName, getInputAllowedExtensionsAndMimeTypes, getS3Url, isVideoFile } from 'utils/mediaLibrary';
import { getStorageFreeSize, isOneTimeUser } from 'utils/storage';
import IconNew from 'components/elements/iconsSize';
import { useSelector } from 'react-redux';
import isPrint from 'state/modules/designCourse/edit/Error';
import getCroppedImage from 'components/modules/S3Upload/getCroppedImage';
import { getFileSizeSelector } from 'state/modules/settings/selectors';
import init from './evaporate';
import { getInitialCropSize } from './helpers';
import 'react-image-crop/dist/ReactCrop.css';

function gcd(a, b) {
  a = Math.abs(Math.floor(a));
  b = Math.abs(Math.floor(b));
  return b === 0 ? a : gcd(b, a % b);
}
function getRatio(ratioStr) {
  const acceptRatios = ['1:1', '5:4', '4:3', '3:2', '5:3', '16:9', '3:1'];
  const result = {};
  if (typeof ratioStr === 'string') {
    const [width, height] = ratioStr.split('x').map(Number);
    if (width > 0 && height > 0 && Number.isInteger(width) && Number.isInteger(height)) {
      const r = gcd(width, height);
      result.aspect = width / height;
      result.ratio = acceptRatios.includes(`${width / r}:${height / r}`) ? `${width / r}:${height / r}` : '';
    }
  }
  return result;
}

const Upload = ({
  onChange,
  fileTypes,
  isAmazonFile,
  label,
  isOptional,
  fileLessonFormat,
  text,
  cropRatio,
  isWithoutModal,
  isHaveRecomenededText,
  bottomText,
  generalButtonProps,
  isBulk,
  onLoadingChange,
  onClickCancel,
  textsize,
  recomenededText,
  disabled,
  secondaryText,
  recomenededTextTop,
  iconName,
  isImageUpload,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const { gbDefaultSize, size } = useSelector(getFileSizeSelector);
  const [isDragover, setIsDragOver] = useState(false);
  const inputRef = useRef();
  const fileRef = useRef(null);
  const uploadApiRef = useRef(null);
  const cropReady = useRef(false);
  const cropImageRef = useRef(null);
  const originalImageRef = useRef(null);
  const imageRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [imageStyle, setImageStyle] = useState({});
  const [isProgress, setIsProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const { aspect } = useMemo(() => getRatio(cropRatio), [cropRatio]);
  const [extensions, mimetypes] = getInputAllowedExtensionsAndMimeTypes({
    allowedExtensions: fileTypes,
    format: fileLessonFormat,
  });

  useEffect(() => {
    if (isAmazonFile) {
      init().then((evaporate) => {
        uploadApiRef.current = evaporate;
      });
    }
  }, [isAmazonFile]);

  function onImageLoaded(img) {
    cropImageRef.current = img;
    const { width, height } = originalImageRef.current || {};
    const imageHeight = img.height > 360 ? 360 : img.height;
    const imageWidth = img.height > 360 ? 360 * (width / height) : img.width;
    if (img.height > 360) setImageStyle({ width: `${imageWidth}px`, height: imageHeight });
    const [cw, ch] = typeof cropRatio === 'string' ? cropRatio.split('x').map(Number) : [];
    const { width: cropWidth, height: cropHeight } = getInitialCropSize(ch / cw, imageWidth, imageHeight, typeof cropRatio === 'boolean');
    const x = imageWidth === cropWidth ? 0 : (imageWidth - cropWidth) / 2;
    const y = imageHeight === cropHeight ? 0 : (imageHeight - cropHeight) / 2;
    setTimeout(() => {
      cropReady.current = true;
    }, 200);
    setCrop({ aspect, height: cropHeight, unit: 'px', width: cropWidth, x, y });
  }

  const {
    mainApp: { plan_name: planName, uuid },
    app: { storage_limit: storageLimit, unlimited_storage: unlimitedStorage },
    settings: { fileSizeInfo: { size: videoStorageSize } },
  } = useSelector((state) => {
    const { common: { app, mainApp }, settings } = state;
    return { app, mainApp, settings };
  });

  function handlePromise(p) {
    if (p && typeof p.finally === 'function') {
      p.finally(() => setIsProgress(false));
    } else {
      setIsProgress(false);
    }
  }

  function onFileReady(awsKey, originalName, file, files) {
    const ret = onChange(getS3Url(awsKey), originalName, file, files);
    onLoadingChange(false);
    handlePromise(ret);
  }

  function onCropCancel() {
    setCrop(null);
    setCropSrc(null);
  }
  function onCropChange(newCrop) {
    if (cropReady.current) setCrop(newCrop);
  }
  async function onCropStart(file) {
    const blob = await fileToDataUrl(file);
    setCropSrc(blob);
    cropReady.current = false;
    setCrop({ aspect });
  }

  function onUploadComplete(awsKey, originalName, file, files) {
    onFileReady(awsKey, originalName, file, files);
  }
  function clearUploadState() {
    setCrop('');
    setCropSrc('');
    setIsProgress(true);
  }

  const handleFileSelect = async ({ file, fileBlob, fileOptions, onCropStarter, files }) => {
    if (showPopup) setShowPopup(false);
    if (isAmazonFile) {
      const uploadedFile = file || new File([fileBlob], fileOptions.name, fileOptions);
      const fileName = generateFileName(uploadedFile.type);
      const filePath = `${uuid}/${fileName}`;
      const freeVideoStorage = getStorageFreeSize(planName, storageLimit, videoStorageSize);
      if (isVideoFile(uploadedFile.type) && isOneTimeUser(planName) && !unlimitedStorage && uploadedFile.size > freeVideoStorage) {
        if (isPrint('You reached your plan limit!')) toast.error('You reached your plan limit!');
        return true;
      }
      if (uploadedFile.size > 2147483648) {
        if (isPrint('Size Limit Exceeded')) toast.error('Size Limit Exceeded');
        return true;
      }
      if (typeof onCropStarter === 'function') return onCropStarter();
      try {
        clearUploadState();
        onLoadingChange(true);
        uploadApiRef.current.add({
          file: uploadedFile,
          name: filePath,
          xAmzHeadersAtInitiate: { 'x-amz-acl': 'public-read', 'Content-Type': uploadedFile.type },
          progress: (p) => setProgress(p),
          complete: (_xhr, awsKey) => onUploadComplete(awsKey, uploadedFile.name, uploadedFile, files),
        });
      } catch (err) {
      }
      return true;
    }
    const ret = onChange(file);
    handlePromise(ret);
  };

  function onFileSelectFunction(files) {
    fileRef.current = files[0];
    setImageStyle({});
    if (!mimetypes.includes(files[0].type)) {
      if (isPrint('Invalid File')) toast.error('Invalid File');
      return true;
    }
    if (!cropRatio) {
      handleFileSelect({ file: files[0] });
    } else {
      handleFileSelect({ file: files[0], onCropStarter: () => onCropStart(files[0]) });
    }
    return true;
  }

  const handleAddFile = (files) => {
    const fileData = files[0] || files;
    const fileSizeGB = (fileData.size / 1024 ** 3).toFixed(5);
    if (!fileData.type.includes('video')) {
      onFileSelectFunction(files);
    } else if (fileSizeGB < gbDefaultSize - size && fileData.type.includes('video')) {
      onFileSelectFunction(files);
    } else {
      setShowPopup(true);
      setPopupTitle('Storage Limit');
    }
  };

  function onFileSelectFunctionMany(files) {
    const arr = Array.from(files);
    arr.forEach((e, i) => {
      fileRef.current = e;
      setImageStyle({});
      if (!mimetypes.includes(e.type)) {
        if (isPrint('Invalid File')) toast.error('Invalid File');
        return;
      }
      if (!cropRatio) {
        handleFileSelect({ file: e, files: arr.length - 1 === i });
      } else {
        handleFileSelect({ file: e, onCropStarter: () => onCropStart(e), files: arr.length - 1 === i });
      }
    });
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (!mimetypes.includes(e.dataTransfer.files[0].type)) {
      if (isPrint('Invalid File')) toast.error('Invalid File');
    } else {
      onFileSelectFunction(e.dataTransfer.files);
    }
  }

  function dragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }
  function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }

  async function handleCropSave() {
    const { name, type, lastModified } = fileRef.current;
    const image = imageRef.current.imageRef;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    if (crop.height === 0 || crop.width === 0) {
      if (isPrint('Please Crop The Image First')) toast.error('Please Crop The Image First');
      onImageLoaded(cropImageRef.current);
      return;
    }
    const pixelCrop = { x: crop.x * scaleX, y: crop.y * scaleY, width: crop.width * scaleX, height: crop.height * scaleY };
    const fileBlob = await getCroppedImage(originalImageRef.current, pixelCrop, type);
    const fileOptions = { type, lastModified, name };
    handleFileSelect({ fileBlob, fileOptions });
  }

  function handleClosePopup() {
    setShowPopup(false);
  }
  function handleChangeVideo() {
    inputRef.current.click();
  }

  return (
    <div className="upload">
      {isProgress && !isImageUpload && (
        <div className="dont__close__message">
          <div className="loader__icon__wrapper">
            <div>
              <Icon name="ToolTipI" />
            </div>
            <span>Please don`t close this tab to not lose your progress.</span>
          </div>
        </div>
      )}
      {showPopup && <PricingPopup handleClosePopup={handleClosePopup} isUpload handleChangeVideo={handleChangeVideo} popupTitle={popupTitle} />}
      <div className="upload__top">
        {label ? <Text inner={label} type={textTypes.select} size={textsize ? textSizes[textsize] : textSizes.small} /> : <div />}
        {isOptional && <Text inner="Optional" type={textTypes.regular148} size={textSizes.xsmall} style={{ color: '#727978' }} />}
      </div>
      {!crop && !cropSrc && (
        <div
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={onDrop}
          className={`upload__view${progress && progress !== 1 ? ' upload__view__progress' : ''}${isDragover ? ' upload__view__active' : ''}`}
        >
          {iconName && (
            <div className="icon__wrapper">
              <IconNew name={iconName} />
            </div>
          )}
          {!crop && isProgress && progress !== 1 ? (
            <div className="upload__view__center">
              <div />
              <div style={{ width: '100%', marginTop: 0, padding: '0 10px' }} className="CircularProgressbarWithChildren progress__text">
                <ProgressBar
                  completed={!isImageUpload ? parseInt(progress * 100, 10) : ''}
                  bgColor="#24554e"
                  height={12}
                  labelSize={12}
                  isIndeterminate={isImageUpload || progress === 1}
                  isLabelVisible={!isImageUpload}
                />
              </div>
              {onClickCancel ? (
                <BaseButton
                  isIconRight
                  text="Cancel"
                  onClick={() => {
                    if (uploadApiRef.current) uploadApiRef.current.cancel();
                    onClickCancel();
                  }}
                />
              ) : (
                <div />
              )}
            </div>
          ) : (
            <>
              {!isDragover ? (
                <div className="upload__view__center">
                  <input
                    multiple={isBulk}
                    accept={extensions}
                    style={{ display: 'none' }}
                    ref={inputRef}
                    type="file"
                    onChange={({ target: { files } }) => {
                      if (isBulk) {
                        onFileSelectFunctionMany(files);
                      } else {
                        handleAddFile(files);
                      }
                    }}
                  />
                  <div />
                  <div className="upload__view__center__middle">
                    {recomenededTextTop && isHaveRecomenededText && (cropRatio || bottomText || recomenededText) && (
                      <Text
                        className="upload__view__center__recomended"
                        inner={bottomText || `Recommended size: ${cropRatio || recomenededText}`}
                        type={textTypes.regularDefault}
                        style={{ color: '#727978' }}
                        size={textSizes.small14_500}
                      />
                    )}
                    <BaseButton
                      onDragOver={dragOver}
                      isIconRight
                      onClick={() => inputRef.current.click()}
                      text={`Upload ${text || 'File'}`}
                      theme={btnTheme.secondary}
                      {...generalButtonProps}
                      iconName="DefaultUpload"
                      disabled={disabled}
                      iconColor={generalButtonProps && generalButtonProps.theme === 'primary' ? '#fff' : '#24554E'}
                    />
                    <div className="textBasic_size_small textBasic textBasic_type_regular160" style={{ color: '#444C4B' }}>
                      or drop a file
                    </div>
                  </div>
                  <div className="upload__view__center__messages">
                    {!recomenededTextTop && isHaveRecomenededText && (cropRatio || bottomText || recomenededText) && (
                      <Text
                        className="upload__view__center__recomended"
                        inner={bottomText || `Recommended size: ${cropRatio || recomenededText}`}
                        type={textTypes.regularDefault}
                        style={{ color: '#727978' }}
                        size={textSizes.small14_500}
                      />
                    )}
                    {secondaryText && (
                      <Text inner={secondaryText} type={textTypes.regularDefault} style={{ color: '#727978' }} size={textSizes.small14_500} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="upload__view__center">
                  <div className="textBasic_size_large textBasic textBasic_type_regularLarge" style={{ color: '#24554E' }}>
                    Drop files here
                  </div>
                  <div className="textBasic_size_xsmall textBasic textBasic_type_regular148" style={{ color: '#24554E' }}>
                    1 file at a time
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {crop && cropSrc && (
        <div className="cropArea inline-crop">
          <div className="justify-center">
            <Crop src={cropSrc} crop={crop} onChange={onCropChange} ref={imageRef} imageStyle={imageStyle} onImageLoaded={onImageLoaded} />
            <div className="crop__functions__content">
              <Text inner="Free cropping" type={textTypes.regularDefault} size={textSizes.small} />
              <div className="crop__functions__content__buttons">
                <BaseButton text="Cancel" theme={btnTheme.secondary} style={{ minWidth: 'min-content' }} onClick={onCropCancel} />
                <BaseButton text="Save Photo" style={{ minWidth: 'min-content' }} onClick={handleCropSave} />
              </div>
            </div>
          </div>
          <img className="originalImage" src={cropSrc} ref={originalImageRef} alt="" />
        </div>
      )}
      <style jsx>{`
        .dont__close__message {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid #e7e9e9;
          margin-bottom: 20px;
          padding: 12px;
          border-radius: 4px;
        }
        .inline-crop {
          border: 1px solid #e7e9e9;
          border-radius: 4px;
          padding: 20px;
          background-color: #f5f7f7;
        }
      `}</style>
    </div>
  );
};

Upload.defaultProps = { onLoadingChange: () => {} };

Upload.propTypes = {
  onChange: PropTypes.func,
  text: PropTypes.string,
  isAmazonFile: PropTypes.bool,
  label: PropTypes.string,
  fileLessonFormat: PropTypes.string,
  isOptional: PropTypes.bool,
  cropRatio: PropTypes.any,
  fileTypes: PropTypes.string,
  isWithoutModal: PropTypes.bool,
  isHaveRecomenededText: PropTypes.bool,
  isImageUpload: PropTypes.bool,
  bottomText: PropTypes.string,
  generalButtonProps: PropTypes.object,
  isBulk: PropTypes.bool,
  onLoadingChange: PropTypes.func,
  onClickCancel: PropTypes.func,
  textsize: PropTypes.string,
  recomenededText: PropTypes.string,
  disabled: PropTypes.bool,
  secondaryText: PropTypes.string,
  recomenededTextTop: PropTypes.bool,
  iconName: PropTypes.string,
};

export default Upload;