import React, { useEffect, useState } from 'react';
import Tabs from 'components/elements/tabs';
import PropTypes from 'prop-types';
import './index.scss';
import { connect } from 'react-redux';
import { getFoldersData } from 'state/modules/mediaLibrary/operations';
import { foldersSelector } from 'state/modules/mediaLibrary/selectors';
import { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Upload from 'components/modules/uploadWithoutS3';
import VideoCode from 'components/elements/VideoCode';
import UploadWithMediaView from '../../UploadWithMedia/UploadWithMediaView';
import IconNew from '../../iconsSize';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';

const UploadVideoWithMedia = ({
   init, folders, onChange, onSaveEmbed, onSaveIframeUrl,
}) => {
   const tabVariants = [
      { value: 'upload', key: 'Upload', iconName: 'UploadMediaFirstM' },
      { value: 'media', key: 'Media Library', iconName: 'UploadMediaSecondM' },
      { value: 'code', key: 'Insert Link', iconName: 'UploadMediaThirdM' },
   ];
   
   useEffect(() => {
      init('video');
   }, []);
   
   const [selectedTab, setSelectedTab] = useState('upload');
   const [selectedFolder, setSelectedFolder] = useState(folders.length ? folders[0] : null);
   
   // New state for unpublished video
   const [pendingVideo, setPendingVideo] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   
   useEffect(() => {
      if (folders.length) {
         setSelectedFolder(folders[0]);
      }
   }, [folders]);

   // Function to handle video upload completion but without publishing
   const handleVideoUpload = (url, originalName, file, files) => {
      // Store the video info but don't publish it yet
      setPendingVideo({ url, originalName, file, files });
      setIsUploading(false);
   };

   // Function to handle upload loading state
   const handleUploadLoading = (isLoading) => {
      setIsUploading(isLoading);
   };

   // Function to publish the pending video
   const publishVideo = () => {
      if (pendingVideo) {
         // Now call the original onChange to publish
         onChange(pendingVideo.url, pendingVideo.originalName, pendingVideo.file, pendingVideo.files);
         
         // Reset pending state
         setPendingVideo(null);
      }
   };

   // Function to discard the pending video and return to upload state
   const discardVideo = () => {
      setPendingVideo(null);
   };

   return (
      <div className='upload__with__media'>
         <div
            className='upload__with__media__tab'
            style={{ marginBottom: selectedTab === 'upload' ? '-8px' : '0px' }}
         >
            <Tabs
               variants={tabVariants}
               selectedVariant={selectedTab}
               isButton={false}
               onSelect={(value) => setSelectedTab(value)}
               hasIcon={true}
            />
         </div>
         {selectedTab !== 'media' ? (
            <div className='upload__with__media__content'>
               <div className='upload__with__media__content__icon'>
                  <IconNew name='VideoMediaM' />
               </div>
               
               {selectedTab === 'code' ? (
                  <VideoCode
                     onSaveEmbed={(embed) => onSaveEmbed(embed)}
                     onSaveUrl={(url) => onSaveIframeUrl(url)}
                  />
               ) : (
                  <>
                     {/* Main Upload Section */}
                     <div className={`upload-container ${pendingVideo ? 'with-preview' : ''}`}>
                        {!pendingVideo ? (
                           <Upload
                              isHaveRecomenededText={true}
                              bottomText='You can upload video file with the extensions: mp4, mov, webm. Max size is 2GB. Please use HandBrake to compress your videos to that size before uploading!'
                              text='Video'
                              onChange={handleVideoUpload}
                              onLoadingChange={handleUploadLoading}
                              fileLessonFormat='video'
                              isAmazonFile={true}
                              generalButtonProps={{
                                 theme: themes.primary,
                                 text: 'Upload Video',
                                 iconName: 'uploadVideoM',
                              }}
                           />
                        ) : (
                           <div className="upload-preview">
                              <div className="upload-preview-header">
                                 <div className="upload-success-icon">
                                    <IconNew name="CheckCircle" />
                                 </div>
                                 <div className="upload-preview-content">
                                    <Text
                                       inner="Video uploaded successfully"
                                       type={textTypes.mediumLargeGrey}
                                       size={textSizes.medium}
                                       style={{ color: '#24554e' }}
                                    />
                                    <Text
                                       inner={pendingVideo.originalName || "Video file"}
                                       type={textTypes.regularDefault}
                                       size={textSizes.small}
                                       style={{ color: '#727978', marginTop: '4px' }}
                                    />
                                 </div>
                              </div>
                              
                              <div className="upload-preview-message">
                                 <Text
                                    inner="This video has been uploaded but not published yet."
                                    type={textTypes.regularDefault}
                                    size={textSizes.small}
                                    style={{ color: '#444C4B' }}
                                 />
                              </div>
                              
                              <div className="upload-preview-actions">
                                 <BaseButton
                                    text="Upload Different Video"
                                    theme={themes.secondary}
                                    onClick={discardVideo}
                                 />
                                 <BaseButton
                                    text="Publish Video"
                                    theme={themes.primary}
                                    onClick={publishVideo}
                                 />
                              </div>
                           </div>
                        )}
                     </div>
                  </>
               )}
            </div>
         ) : (
            <div className='upload__with__media__files'>
               <UploadWithMediaView
                  data={folders}
                  onSelectFile={(url, file) => {
                     onChange(url, file.name, file);
                  }}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
               />
            </div>
         )}

         {/* Add styles for the upload preview */}
         <style jsx>{`
            .upload-container {
               width: 100%;
            }
            
            .upload-container.with-preview {
               max-width: 100%;
            }
            
            .upload-preview {
               background-color: #f5f7f7;
               border: 1px solid #e7e9e9;
               border-radius: 4px;
               padding: 20px;
               display: flex;
               flex-direction: column;
               width: 100%;
            }
            
            .upload-preview-header {
               display: flex;
               align-items: center;
               margin-bottom: 16px;
            }
            
            .upload-success-icon {
               color: #24554e;
               margin-right: 12px;
            }
            
            .upload-preview-content {
               flex: 1;
            }
            
            .upload-preview-message {
               margin-bottom: 20px;
               padding-left: 36px;
            }
            
            .upload-preview-actions {
               display: flex;
               gap: 12px;
               justify-content: flex-end;
            }
         `}</style>
      </div>
   );
};

UploadVideoWithMedia.propTypes = {
   onChange: PropTypes.func,
   init: PropTypes.func,
   folders: PropTypes.array,
   onSaveEmbed: PropTypes.func,
   onSaveIframeUrl: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideoWithMedia);