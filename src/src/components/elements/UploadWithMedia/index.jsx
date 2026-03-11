import React, { useEffect, useRef, useState } from 'react';
import Tabs from 'components/elements/tabs';
import PropTypes from 'prop-types';
import './index.scss';
import Upload from 'components/modules/uploadWithoutS3';
import { connect, useSelector } from 'react-redux';
import { getFoldersData } from 'state/modules/mediaLibrary/operations';
import { foldersSelector } from 'state/modules/mediaLibrary/selectors';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import UploadWithMediaView from './UploadWithMediaView';
import CropImage from '../cropImage';
import IconNew from '../iconsSize';
import PricingPopup from '../PricingPopup';

const UploadWithMedia = ({
   type, uploadProps, buttonText, init,
   folders, onFinish, bottomText, isHaveFileIcon, generalButtonProps,
   isBulk, hideMediaLibrary, isImageUpload,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const tabVariants = [
      { value: 'upload', key: 'Upload', iconName: 'UploadMediaFirstM' },
   ];
   if (!hideMediaLibrary) {
      tabVariants.push({ value: 'media', key: 'Media Library', iconName: 'UploadMediaSecondM' });
   }
   useEffect(() => {
      init(type);
   }, []);
   const [selectedTab, setSelectedTab] = useState('upload');
   const fileRef = useRef(null);
   const [selectedFolder, setSelectedFolder] = useState(folders.length ? folders[0] : null);
   useEffect(() => {
      if (folders.length) {
         setSelectedFolder(folders[0]);
      }
   }, [folders]);
   const [isOpenedCroping, setIsOpenedCroping] = useState(false);
   const [toCropSrc, setToCropSrc] = useState('');
 
   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='upload__with__media'>
         {
            showPopup && createPortal(<PricingPopup 
               popupTitle={ popupTitle }
               handleClosePopup={ handleClosePopup }
            />, document.body)
         }
         {isOpenedCroping ? (
            <CropImage
               cropSrc={ toCropSrc }
               cropSize={ uploadProps.cropRatio }
               onChange={ (url, file, data) => {
                  uploadProps.onChange(url, file, data);
                  setIsOpenedCroping(false);
                  onFinish();
               } }
               fileRef={ fileRef }
               isAmazonFile={ true }
               onCancel={ () => setIsOpenedCroping(false) }
            />
         ) : (
            <>
               <div
                  className='upload__with__media__tab'
                  style={ { marginBottom: selectedTab === 'upload' ? '-8px' : '0px' } }
               >
                  <Tabs
                     variants={ tabVariants }
                     selectedVariant={ selectedTab }
                     isButton={ false }
                     onSelect={ (value) => {
                        if (Array.isArray(permissions)) {
                           setSelectedTab(value);
                        } else if (permissions.media_library) {
                           setSelectedTab(value);
                        } else {
                           setShowPopup(true);
                           setPopupTitle('Media Library');
                        }
                     } }
                     hasIcon={ true }
                  />
               </div>
               {selectedTab === 'upload' ? (
                  <div className='upload__with__media__content'>
                     {isHaveFileIcon && (
                        <>
                           <div className='upload__with__media__content__icon'>
                              {type ? (
                                 <>
                                    {type === 'image' && (
                                       <IconNew name='ImageUploadM' />
                                    )}
                                 </>
                              ) : (
                                 <IconNew name='allFiles' />
                              )}
                           </div>
                        </>
                     )}

                     <Upload
                        { ...uploadProps }
                        isHaveRecomenededText={ true }
                        bottomText={ bottomText }
                        text={ buttonText }
                        generalButtonProps={ generalButtonProps }
                        isBulk={ isBulk }
                        isImageUpload={ isImageUpload }
                     />
                     {/* {uploadProps.cropRatio && (
                        <div className='upload__with__media__content__crop' style={ { zIndex: '4' } }>
                           <Text
                              inner={ `Recommended size ${ uploadProps.cropRatio }` }
                              type={ types.regularDefault }
                              style={ { color: '#727978' } }
                              size={ sizes.small }
                           />
                        </div>
                     )} */}
                  </div>
               ) : (
                  <div className='upload__with__media__files'>
                     <UploadWithMediaView
                        data={ folders }
                        onSelectFile={ (url, file) => {
                           // if (uploadProps.cropRatio) {
                           //    setIsOpenedCroping(true);
                           //    setToCropSrc(url);
                           //    fileRef.current = file;
                           //    return;
                           // }
                           uploadProps.onChange(url, file.name, file);
                        } }
                        selectedFolder={ selectedFolder }
                        setSelectedFolder={ setSelectedFolder }
                     />
                  </div>
               )}
            </>
         )}
      </div>
   );
};

UploadWithMedia.propTypes = {
   type: PropTypes.string,
   onChange: PropTypes.func,
   src: PropTypes.string,
   uploadProps: PropTypes.object,
   init: PropTypes.func,
   folders: PropTypes.array,
   onFinish: PropTypes.func,
   buttonText: PropTypes.string,
   bottomText: PropTypes.string,
   isHaveFileIcon: PropTypes.bool,
   generalButtonProps: PropTypes.func,
   isBulk: PropTypes.bool,
   isImageUpload: PropTypes.bool,
   hideMediaLibrary: PropTypes.bool,
};

const mapStateToProps = (state) => {
   return {
      folders: foldersSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: (type) => dispatch(getFoldersData(type)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadWithMedia);
