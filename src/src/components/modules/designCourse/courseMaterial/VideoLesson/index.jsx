import React, { useState, useEffect, useRef } from 'react';

import './index.scss';
import PropTypes from 'prop-types';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import TextArea from 'components/elements/form/TextArea';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';
import EditorConvertToHTML from 'components/modules/editor';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import classNames from 'classnames';
import useS3Upload from 'components/modules/S3Upload';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import UploadImg from './UploadImg';

const VideoLesson = ({
   title, src, handleSave, type, description, autoplay, openSelectVideoModal, setActiveName,
   embedSrc, posterImg, lessonContent, lessonContentId, handleSaveVideoLessonImg,
}) => {
   const [videoTitle, setVideoTitle] = useState(title);
   const [videoDescription, setVideoDescription] = useState(description);
   const [videoSrc, setVideoSrc] = useState(src);
   const [posterImgSrc, setPosterImgSrc] = useState(posterImg);
   const [videoEmbedSrc, setVideoEmbedSrc] = useState(embedSrc);
   const [videoType, setVideoType] = useState(type);
   const [videoUrl, setVideoUrl] = useState('');
   const [videoCoverLoading, setVideoCoverLoading] = useState(false);
   const [videoEmbed, setVideoEmbed] = useState('');
   const [videoData, setVideoData] = useState({});
   const [showInsertUrl, setShowInsertUrl] = useState(false);

   const [activeTab, setActiveTab] = useState('url');
   const [charectersLimit, setCharectersLimit] = useState(11);
   const [isCancel, setIsCancel] = useState(false);

   const getCharectersLength = (l) => setCharectersLimit(l);


   useEffect(() => {
      setVideoTitle(title);
      setActiveName(title);
      setShowInsertUrl(false);
      setVideoSrc(src);
      setVideoEmbedSrc(embedSrc);
      setVideoType(type);
      setVideoUrl('');
      setVideoEmbed('');
   }, [title, src, type]);

   const inputRef = useRef(null);

   const onClick = () => {
      if (inputRef && inputRef.current) {
         setVideoDescription(inputRef.current.initialValue);
         inputRef.current.reload();
      }
   };

   function autoSaveLesson(vsrc, vtype, info) {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = videoDescription;
      }
      if (vsrc) {
         if (vtype === 'video') {
            handleSave({
               type: 'video',
               video_name: videoTitle,
               video_src: vsrc,
               video_length: 0,
               description: videoDescription,
               size: info.size,
               mime_type: info.mimeType,
               original_name: info.name,
            });
            setPosterImgSrc(null);
         } else {
            handleSave({
               type: 'video-url',
               video_name: videoTitle,
               video_src_type: [vtype, vsrc],
               video_length: 0,
               description: videoDescription,
            });
         }
      } else if (!videoSrc) {
         handleSave({
            name: videoTitle,
            description: videoDescription,
            draft: true,
            lesson_visiblity: 1,
         });
      }
   }

   function autoSaveVideoLessonImg(imgSrc) {
      handleSaveVideoLessonImg(lessonContentId, imgSrc);
   }

   const handleInsertSrc = (value) => {
      let match;
      setVideoUrl(value);
      if (value.match(/vimeo.*(?:\/|clip_id=)([0-9a-z]*)/)) {
         let newValue = value;
         if (newValue[newValue.length - 1] === '/') {
            newValue = newValue.slice(0, newValue.length - 1);
         }
         match = newValue.match(/vimeo.*(?:\/|clip_id=)([0-9a-z]*)/);
         setVideoType('vimeo');
         setVideoSrc(match[1]);
         autoSaveLesson(match[1], 'vimeo');
      } else if (value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)) {
         match = value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
         setVideoType('youtube');
         setVideoSrc(match[1]);
         autoSaveLesson(match[1], 'youtube');
      } else if (value.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/(.*)/)) {
         match = value.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/(.*)/);
         setVideoType('wistia');
         setVideoSrc(match[4]);
         autoSaveLesson(match[4], 'wistia');
      } else {
         setVideoUrl(value);
      }
   };


   const handleInsertEmbed = (value) => {
      if (value.match(/<embed>*([0-9a-z]*)/) || value.match(/<iframe>*([0-9a-z]*)/)) {
         handleSave({
            type: 'video-embed',
            video_name: videoTitle,
            video_embed: value,
            video_length: 0,
            description: videoDescription,
         });
         setShowInsertUrl(false);
         setVideoType('embed');
      }
      setVideoEmbedSrc(value);
   };

   const saveLesson = () => {
      if (inputRef && inputRef.current) {
         inputRef.current.initialValue = videoDescription;
      }
      if (videoSrc) {
         const {
            size, src: fileSrc, name,
         } = lessonContent;
         if (videoType === 'video') {
            handleSave({
               type: 'video',
               video_name: videoTitle,
               video_src: fileSrc,
               video_length: 0,
               description: videoDescription,
               size,
               mime_type: videoData.mimeType,
               original_name: name,
            });
         } else {
            handleSave({
               type: 'video-url',
               video_name: videoTitle,
               video_src_type: [videoType, videoSrc],
               video_length: 0,
               description: videoDescription,
            });
         }
      } else if (!videoSrc) {
         if (videoType === 'video-embed') {
            handleSave({
               name: videoTitle,
               description: videoDescription,
            });
         } else {
            handleSave({
               name: videoTitle,
               description: videoDescription,
               draft: true,
               lesson_visiblity: 1,
            });
         }
      }
   };


   const { progressEL, uploadButton, uploadInProgress } = useS3Upload(BaseButton, {
      buttonProps: {
         text: 'Upload',
         theme: buttonTheme.lightGreen,
         size: buttonSizes.large,
      },
      onChange: (fileSrc, name, file) => {
         const info = {
            cdnUrl: fileSrc,
            mimeType: file.type,
            name,
            size: file.size,
         };
         setVideoSrc(`${ info.cdnUrl }`);
         setVideoType('video');
         setVideoData(info);
         autoSaveLesson(`${ info.cdnUrl }`, 'video', info);
      },
      fileLessonFormat: 'video',
   });

   const fileLoading = uploadInProgress || videoCoverLoading;

   return (
      <ItemWrapper>
         <div className='videoLesson'>
            <div className='videoLesson__fields'>
               <Text
                  type={ textType.bold }
                  size={ textSize.medium }
                  inner={ videoTitle }
                  style={ { marginBottom: '36px' } }
               />
               <TextInput
                  placeholder='Video Title'
                  rightLabel={ `${ charectersLimit }/150` }
                  label='Lesson Title'
                  id='videoTitle'
                  name='videoTitle'
                  value={ videoTitle }
                  onChange={ (name, value) => {
                     if (value.length < 151) {
                        setVideoTitle(value);
                        setActiveName(value);
                        getCharectersLength(value.length);
                     } else if (isPrint('You have reached the character limitation')) {
                        toast.error('You have reached the character limitation');
                     }
                  } }
               />
            </div>
            <div className='m-t-m'>
               {
                  showInsertUrl ? (
                     <div className='videoLesson__Url'>
                        <div className='videoLesson_tabs'>
                           <div
                              role='presentation'
                              onClick={ () => setActiveTab('url') }
                              className={
                                 classNames(
                                    'videoLesson_tab',
                                    {
                                       'active': activeTab === 'url',
                                    }
                                 )
                              }
                           >
                              <span>Video Url</span>
                           </div>
                           <div
                              role='presentation'
                              onClick={ () => setActiveTab('embed') }
                              className={
                                 classNames(
                                    'videoLesson_tab',
                                    {
                                       'active': activeTab === 'embed',
                                    }
                                 )
                              }
                           >
                              <span>Embed Code / Iframe </span>
                           </div>
                        </div>
                        <div className='videoLesson__insertUrl'>
                           {
                              activeTab === 'url' ? (
                                 <TextInput
                                    placeholder='Video Url'
                                    label="You can set video's URL only from Wistia, Vimeo, Youtube"
                                    id='videoUrl'
                                    name='videoUrl'
                                    value={ videoUrl }
                                    onChange={ (name, value) => handleInsertSrc(value) }
                                 />
                              ) : (
                                 <TextArea
                                    placeholder='Video Embed'
                                    label=''
                                    id='videoEmbed'
                                    name='videoEmbed'
                                    value={ videoEmbed }
                                    onChange={ (name, value) => handleInsertEmbed(value) }
                                 />
                              )
                           }
                           <div className='videoLesson__return'>
                              <BaseButton
                                 theme={ buttonTheme.darkBlue }
                                 size={ buttonSizes.large }
                                 text='Cancel'
                                 onClick={ () => {
                                    setShowInsertUrl(false);
                                    setVideoSrc(src);
                                    setVideoEmbedSrc(embedSrc);
                                    setVideoEmbed('');
                                    setVideoUrl('');
                                    setActiveTab('url');
                                 } }
                              />
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className='videoLesson__description'>
                        <Text
                           type={ textType.regular }
                           size={ textSize.small }
                           inner={ [
                              'To host your videos with the Miestro player please',
                              <span style={ { color: '#006dff' } }> Upload A Video </span>,
                              'of the following types: mp4,webm,mov. Max size is 2GB. Please use',
                              <span style={ { color: '#006dff' } }> HandBrake </span>,
                              'to compress your videos to that size before uploading!',
                           ] }
                           color='#8a94a2'
                           bold
                        />
                        <Text
                           type={ textType.regular }
                           size={ textSize.small }
                           inner='To use a hosted file from Wistia, Vimeo, Or Youtube please click to set a video URL below and add the video link to Miestro.'
                           color='#8a94a2'
                           style={ { marginTop: '16px' } }
                           bold
                        />
                     </div>
                  )

               }
            </div>
            {
               type === 'video-embed' ? (
                  <>
                     {
                        videoEmbedSrc && !fileLoading && (
                           // eslint-disable-next-line react/no-danger
                           <div dangerouslySetInnerHTML={ { __html: videoEmbedSrc } } className='video_embed' />
                        )
                     }
                  </>
               ) : (
                  <>
                     {
                        videoSrc && !fileLoading && (
                           <VideoItem
                              src={ videoSrc }
                              type={ videoType }
                              isLoading={ fileLoading }
                              autoplay={ autoplay }
                              posterImgSrc={ posterImgSrc }
                           />
                        )
                     }
                  </>
               )
            }
            {videoType === 'video' && (
               <div>
                  <UploadImg
                     title=''
                     size=''
                     crop='1920x1080'
                     img={ posterImgSrc }
                     setFileLoading={ setVideoCoverLoading }
                     isCoursePic={ true }
                     autoSaveVideoLessonImg={ autoSaveVideoLessonImg }
                     setPosterImgSrc={ setPosterImgSrc }
                     onChange={ (imgUrl) => { setPosterImgSrc(imgUrl); autoSaveVideoLessonImg(imgUrl); } }
                     disabled={ !videoSrc }
                  />
               </div>
            )}
            <DynamicWrapper
               isOpen={ true }
               title={ ['Video Content', <span style={ { color: '#a3a3a3', paddingLeft: '5px', fontStyle: 'italic' } }> optional  </span>] }
               borderColor='#cddaf1'
               style={ { marginTop: '24px' } }
            >
               <div className='video_fieldsDescription'>
                  {/* <Text
                     size={ textSize.extraSmall }
                     type={ textType.normal }
                     inner='Video Content'
                  /> */}
                  <EditorConvertToHTML
                     ref={ inputRef }
                     onClick={ () => { onClick(); } }
                     description={ description }
                     isCancel={ isCancel }
                     initial={ description }
                     data={ videoDescription || '' }
                     onChange={ (data) => {
                        setVideoDescription(data);
                     } }
                  />
               </div>
            </DynamicWrapper>
            {progressEL}
            {
               !(videoSrc && !uploadInProgress)
                  && (
                     <Text
                        type={ textType.regular }
                        size={ textSize.small }
                        inner='You can upload video file with the extensions: mp4, mov, webm'
                        color='#8a94a2'
                        style={ { marginTop: '24px' } }
                        bold
                     />
                  )
            }
            <div className='videoLesson__buttons'>
               <div className='m-r-m'>
                  {((((videoDescription && videoDescription.replace(/(\r\n|\n|\r)/gm, '')) === description) || !videoDescription) && videoTitle === title && videoSrc === src) ? null : (
                     <BaseButton
                        theme={ buttonTheme.grey }
                        size={ buttonSizes.large }
                        text='Cancel'
                        onClick={ () => {
                           setVideoTitle(title);
                           setVideoSrc(null);
                           setVideoDescription(description);
                           onClick();
                           setActiveTab('url');
                           setIsCancel(!isCancel);
                           setVideoEmbedSrc(null);
                           setTimeout(() => {
                              setVideoSrc(src);
                              setVideoEmbedSrc(embedSrc);
                           }, 0);
                        } }
                     />
                  )}

               </div>
               <div className='m-r-m margin__none'>
                  <BaseButton
                     theme={ buttonTheme.lightGreen }
                     size={ buttonSizes.large }
                     text='Insert'
                     onClick={ () => {
                        document.querySelector('.content_right').scrollTop = 0;
                        setShowInsertUrl(true);
                     } }
                  />
               </div>
               <div className='m-r-m'>
                  {uploadButton}
               </div>
               <div className='m-r-m'>
                  <BaseButton
                     theme={ buttonTheme.lightGreen }
                     size={ buttonSizes.large }
                     text='Library'
                     onClick={ () => {
                        openSelectVideoModal();
                        setPosterImgSrc(null);
                     } }
                  />
               </div>
               <div>
                  <BaseButton
                     theme={ buttonTheme.darkGreen }
                     size={ buttonSizes.large }
                     text='Save'
                     className='save-lesson'
                     onClick={ () => saveLesson() }

                  />
               </div>
            </div>
         </div>
      </ItemWrapper>
   );
};

export default VideoLesson;

VideoLesson.propTypes = {
   title: PropTypes.string,
   src: PropTypes.string,
   embedSrc: PropTypes.string,
   handleSave: PropTypes.func,
   type: PropTypes.string,
   description: PropTypes.string,
   autoplay: PropTypes.any,
   openSelectVideoModal: PropTypes.func,
   setActiveName: PropTypes.func,
   posterImg: PropTypes.string,
   lessonContentId: PropTypes.number,
   lessonContent: PropTypes.object,
   handleSaveVideoLessonImg: PropTypes.func,
};
