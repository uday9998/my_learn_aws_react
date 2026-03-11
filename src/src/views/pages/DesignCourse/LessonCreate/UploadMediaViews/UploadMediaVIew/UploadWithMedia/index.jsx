import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

// Components
import Tabs from 'components/elements/tabs';
import Upload from 'components/modules/uploadWithoutS3';
import Text, { TYPES, SIZES } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
import CropImage from 'components/elements/cropImage';
import Button from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import PricingPopup from 'components/elements/PricingPopup';
import UploadWithMediaView from './UploadWithMediaView';

// Redux
import { getFoldersData } from 'state/modules/mediaLibrary/operations';
import { foldersSelector, folderWithTypesSelector } from 'state/modules/mediaLibrary/selectors';
import { siteInfoSelector } from 'state/modules/common/selectors';

// Utils
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

// Styles
import './index.scss';

const UploadWithMedia = ({
  type,
  uploadProps,
  buttonText,
  init,
  onFinish,
  isHaveRecomenededTex,
  changeBlockFormat,
  blockType,
  changeBlock,
  setIsHidenUpload,
  folderWithTypes,
  videoSrctype,
  videoEmbed,
  bottomText,
  iconName,
}) => {
  const { permissions } = useSelector(siteInfoSelector);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const wrapperRef = useRef(null);
  
  // Tab configuration
  const uploadTab = { value: 'upload', key: 'Upload', iconName: 'UploadMediaFirstM' };
  const mediaLibraryTab = { value: 'media', key: 'Media Library', iconName: 'UploadMediaSecondM' };
  const linkTab = { value: 'link', key: 'Insert Link', iconName: 'InsertLinkM' };
  
  const tabVariants = type === 'video' 
    ? [uploadTab, mediaLibraryTab, linkTab]
    : [uploadTab, mediaLibraryTab];

  // States
  const isVideoUrl = blockType === 'Video-url';
  const isVideoEmbed = blockType === 'Video-embed';
  const isVideoType = isVideoUrl || isVideoEmbed;
  
  const [selectedTab, setSelectedTab] = useState(isVideoType ? 'link' : 'upload');
  const [isLibraryInited, setIsLibraryInited] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isOpenedCroping, setIsOpenedCroping] = useState(false);
  const [toCropSrc, setToCropSrc] = useState('');
  const [isCropChanged, setIsCropChanged] = useState(false);
  
  const fileRef = useRef(null);

  // Initialize selected folder
  useEffect(() => {
    if (folderWithTypes[type]?.length) {
      setSelectedFolder(folderWithTypes[type][0]);
    }
  }, [folderWithTypes, type]);

  // Initialize media library
  useEffect(() => {
    if (selectedTab === 'media') {
      init(type, () => setIsLibraryInited(true));
    }
  }, [selectedTab, init, type]);

  const handleTabChange = (value) => {
    // Check permissions for media library
    if (value === 'media' && permissions && !permissions.media_library) {
      setShowPopup(true);
      setPopupTitle('Media library');
      return;
    }
    
    setSelectedTab(value);
    
    // Handle video type changes
    if (value === 'link') {
      changeBlockFormat('Video-url');
    } else if (value === 'upload' && isVideoType) {
      changeBlockFormat('Video');
    }
  };

  const validateAndSaveVideo = () => {
    if (isVideoUrl && videoSrctype && !Array.isArray(videoSrctype)) {
      // Validate video URL
      const isVimeo = videoSrctype.match(/vimeo.*(?:\/|clip_id=)([0-9a-z]*)/);
      const isYouTube = videoSrctype.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      const isWistia = videoSrctype.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/(.*)/);
      
      if (isVimeo || isYouTube || isWistia) {
        setIsHidenUpload(true);
      } else {
        toast.error('URL must be a valid URL.');
      }
    } else if (isVideoEmbed && videoEmbed) {
      // Validate iframe
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(videoEmbed, 'text/html');
        const iframeElement = doc.querySelector('iframe');
        
        if (!iframeElement) {
          throw new Error('Invalid iframe string');
        }
        
        setIsHidenUpload(true);
      } catch (error) {
        toast.error('Iframe must be a valid.');
      }
    }
  };

  const handleSelectFile = (url, file) => {
    if (uploadProps.cropRatio) {
      setIsOpenedCroping(true);
      setToCropSrc(url);
      fileRef.current = file;
      return;
    }
    
    uploadProps.onChange(
      url,
      file.name,
      { type: file.extension },
      {
        mediaId: file.id,
        isMediaLibrary: true,
      },
      file
    );
    
    setIsHidenUpload(true);
  };

  const handleCropChange = (url, file, data) => {
    uploadProps.onChange(
      url,
      fileRef.current.name,
      { type: fileRef.current.extension },
      !isCropChanged ? {
        mediaId: fileRef.current.id,
        isMediaLibrary: true,
      } : {}
    );
    
    setIsOpenedCroping(false);
    onFinish();
  };

  return (
    <div className="upload-media-container" ref={wrapperRef}>
      {/* Pricing Popup */}
      {showPopup && createPortal(
        <PricingPopup
          popupTitle={popupTitle}
          handleClosePopup={() => setShowPopup(false)}
        />,
        document.body
      )}

      {/* Crop Image Interface */}
      {isOpenedCroping && type === 'image' ? (
        <CropImage
          cropSrc={toCropSrc}
          cropSize={uploadProps.cropRatio}
          onChange={handleCropChange}
          fileRef={fileRef}
          isAmazonFile={true}
          onCancel={() => setIsOpenedCroping(false)}
          onChangeCrop={() => setIsCropChanged(true)}
        />
      ) : (
        <>
          {/* Tabs Navigation */}
          <div className="upload-media-tabs">
            <Tabs
              variants={tabVariants}
              selectedVariant={selectedTab}
              isButton={false}
              onSelect={handleTabChange}
              hasIcon={true}
            />
          </div>

          {/* Upload Tab Content */}
          {selectedTab === 'upload' && (
            <div className="upload-media-content">
              <Upload
                {...uploadProps}
                isHaveRecomenededText={!isHaveRecomenededTex}
                text={buttonText}
                bottomText={bottomText}
                iconName={iconName || `${buttonText}M` || 'ImageM'}
              />
            </div>
          )}

          {/* Link Tab Content */}
          {selectedTab === 'link' && (
            <div className="upload-media-link">
              <Tabs
                variants={[
                  { value: 'Video-url', key: 'Video URL' },
                  { value: 'Video-embed', key: 'Embed Code / Iframe' }
                ]}
                selectedVariant={blockType}
                onSelect={(value) => changeBlockFormat(value)}
              />
              
              {isVideoUrl && (
                <div className="upload-media-link-url">
                  <TextInput
                    placeholder="Video URL"
                    value={Array.isArray(videoSrctype) ? '' : videoSrctype}
                    label=""
                    id="videoUrl"
                    name="video_src_type"
                    onChange={changeBlock}
                  />
                  
                  <Button
                    text="Insert Video"
                    onClick={validateAndSaveVideo}
                    className="primary-button"
                  />
                  
                  <div className="upload-media-link-desc">
                    <Text
                      type={TYPES.regularDefaultGrey}
                      size={SIZES.small}
                      inner="Only enter URLs from Wistia, Vimeo, YouTube"
                      color="#8a94a2"
                      bold
                    />
                  </div>
                </div>
              )}
              
              {isVideoEmbed && (
                <div className="upload-media-link-embed">
                  <TextInput
                    type="textarea"
                    value={videoEmbed}
                    name="video_embed"
                    placeholder="Video Embed"
                    onChange={(name, value) => changeBlock(name, value)}
                  />
                  
                  <Button
                    text="Insert Video"
                    onClick={validateAndSaveVideo}
                    className="primary-button"
                  />
                  
                  <div className="upload-media-link-desc">
                    <Text
                      type={TYPES.regularDefaultGrey}
                      size={SIZES.small}
                      inner="We currently accept iFrame embed codes for this block"
                      color="#8a94a2"
                      bold
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Media Library Tab Content */}
          {selectedTab === 'media' && !isLibraryInited && (
            <div className="upload-media-loading">
              <LoaderSpinner width={150} heigth={150} />
            </div>
          )}
          
          {selectedTab === 'media' && folderWithTypes[type]?.length > 0 && (
            <div className="upload-media-files">
              <UploadWithMediaView
                data={folderWithTypes[type]}
                onSelectFile={handleSelectFile}
                selectedFolder={selectedFolder || folderWithTypes[type][0]}
                setSelectedFolder={setSelectedFolder}
                type={type}
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
  uploadProps: PropTypes.object,
  buttonText: PropTypes.string,
  init: PropTypes.func,
  onFinish: PropTypes.func,
  isHaveRecomenededTex: PropTypes.bool,
  changeBlockFormat: PropTypes.func,
  blockType: PropTypes.string,
  changeBlock: PropTypes.func,
  setIsHidenUpload: PropTypes.func,
  folderWithTypes: PropTypes.object,
  videoSrctype: PropTypes.any,
  videoEmbed: PropTypes.string,
  bottomText: PropTypes.any,
  iconName: PropTypes.string,
};

const mapStateToProps = (state) => ({
  folders: foldersSelector(state),
  folderWithTypes: folderWithTypesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  init: (type, callback) => dispatch(getFoldersData(type, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadWithMedia);