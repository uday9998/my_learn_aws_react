import React, { useState, useEffect } from 'react';

import './index.scss';
import PropTypes from 'prop-types';
import VideoItem from 'components/elements/designCourse/courseMaterial/VideoItem';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import UploadMediaView from 'views/pages/DesignCourse/LessonCreate/UploadMediaViews/UploadMediaVIew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { sendAwsFile, saveLessonSettings } from 'api/AuthApi';
import ProgressBar from '@ramonak/react-progress-bar';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';

const VideoLesson = ({ onChange, block, videoOptimizing, lesson }) => {
   const [videoUrl, setVideoUrl] = useState('');
   const [videoEmbed, setVideoEmbed] = useState('');
   const [sendAwsFileFunc] = useSubmitForm(sendAwsFile);
   const [videoWaiting, setVideoWaiting] = useState(false);

   const startOptimizationTimeout = () => {
      setTimeout(() => {
         setVideoWaiting(false);
         toast.info('Video processing will continue in the background');
      }, 10000);
   };

   useEffect(() => {
   }, [block]);

   useEffect(() => {
      if (videoOptimizing.uploadingStatus === 'ready' && videoOptimizing.percentage === 100) {
         setVideoWaiting(false);
      }
   }, [videoOptimizing]);

   const handleChangeVideoUrl = (_, value) => {
      setVideoUrl(value);
   };

   const handleInsertSrc = (name, value) => {
      let match;
      setVideoUrl(value);
      if (value.match(/vimeo.*(?:\/|clip_id=)([0-9a-z]*)/)) {
         let newValue = value;
         if (newValue[newValue.length - 1] === '/') {
            newValue = newValue.slice(0, newValue.length - 1);
         }
         match = newValue.match(/vimeo.*(?:\/|clip_id=)([0-9a-z]*)/);
         onChange('video_src_type', ['vimeo', match[1]], true);
      } else if (value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)) {
         match = value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
         onChange('video_src_type', ['youtube', match[1]], true);
      } else if (value.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/(.*)/)) {
         match = value.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/(.*)/);
         onChange('video_src_type', ['wistia', match[1]], true);
      } else {
         setVideoUrl(value);
         if (isPrint('URL must be a valid URL.')) {
            toast.error('URL must be a valid URL.');
         }
      }
   };

   const handleInsertIframe = (name, value) => {
      setVideoEmbed(value);
      try {
         const parser = new DOMParser();
         const doc = parser.parseFromString(value, 'text/html');
         const iframeElement = doc.querySelector('iframe');
         if (!iframeElement) throw new Error('Invalid iframe string');
         onChange(name, value, true);
      } catch (error) {
         if (isPrint('Iframe must be a valid.')) {
            toast.error('Iframe must be a valid.');
         }
      }
   };

   const changeBlockFormat = (value) => {
      onChange('lesson_format', value, true);
   };

   const changeBlock = (name, value) => {
      if (name === 'video_src_type') {
         handleInsertSrc(name, value);
      } else if (name === 'video_embed') {
         handleInsertIframe(name, value);
      } else {
         if (!value) setVideoUrl(value);
         onChange(name, value, true);
      }

      onChange('video_length', 0, true);
   };

   const changeLesson = (name, value, originalName, file = {}, options, videos) => {
      if (value.split) {
         onChange(name, value, true, originalName, file.type, options);
         onChange('video_length', 0, true);
         const videoName = value?.split('/').pop();
         if (name === 'video_src' && !options?.isMediaLibrary) {
            setVideoWaiting(true);
            startOptimizationTimeout();

            const payload = {
               file,
               src: value,
               original_name: originalName,
               name: videoName,
               subtitle: block.css_attributes.subtitle ? 1 : 0,
               slug: block.slug,
               ...(block.id && { block_id: block.id }),
            };

            sendAwsFileFunc(payload, (res) => {
               onChange('videos', [res.video], true);
            });
         } else if (name === 'video_src' && options?.isMediaLibrary && videos) {
            onChange('videos', [videos]);
         }
      }
   };

   const getExistingResources = () => {
      if (block.css_attributes?.video_resources?.length > 0) {
          return block.css_attributes.video_resources;
      }
      
      if (block.video?.resources?.length > 0) {
          return block.video.resources;
      }
      
      return [];
  };

  const handleUpdateResources = async (resources) => {
   const existingResources = getExistingResources();
   
   const newResources = resources
      .filter(r => !r.isExisting)
      .map(r => ({
         id: r.id,
         type: r.type,
         format: r.format,
         src: r.src,
         fileName: r.fileName
      }));
   
   const allResources = [...existingResources];
   
   newResources.forEach(newResource => {
      const exists = allResources.some(existing => 
         existing.src === newResource.src || existing.id === newResource.id
      );
      
      if (!exists) {
         allResources.push(newResource);
      }
   });

   const existingResourcesFromInput = resources.filter(r => r.isExisting);
   const finalResources = [
      ...existingResourcesFromInput,
      ...newResources.filter(newRes => 
         !existingResourcesFromInput.some(existing => existing.id === newRes.id)
      )
   ];
   
   const updatedCssAttributes = {
      ...(block.css_attributes || {}),
      video_resources: finalResources
   };
   
   onChange('css_attributes', updatedCssAttributes, true);
   
   try {
      const pathParts = window.location.pathname.split('/');
      const courseId = pathParts[3];
      const sectionId = pathParts[5];
      const lessonId = block.id;

      const updatedBlock = {
         ...block,
         css_attributes: updatedCssAttributes
      };

      const savePayload = {
         name: block?.name || '',
         blocks: [updatedBlock]
      };
      
      await saveLessonSettings(courseId, sectionId, lessonId, savePayload);
      toast.success('Resources saved automatically');
   } catch (error) {
      toast.error('Auto-save failed. Please save manually.');
   }
};

   const videoView = (videoType) => {
      switch (videoType) {
         case 'Video-url':
            return (
               <VideoItem
                  src={block.video_src_type?.[1]}
                  type={block.video_src_type?.[0]}
                  block={block}
               />
            );
         case 'Video-embed':
            return (
               <div
                  dangerouslySetInnerHTML={{ __html: block.video_embed }}
                  className='video_embed embed-container'
               />
            );
         case 'Video':
            return (
               <VideoItem
                  src={block.video_src}
                  block={block}
                  type='video'
                  posterImgSrc={block.css_attributes?.image_src}
               />
            );
         default:
            return null;
      }
   };

   const handleOpenHandBrake = () => {
      window.open('https://handbrake.fr/downloads.php', '_blank');
   };

   return (
      <div className='pdf__lesson'>
         {videoWaiting ? (
            <div className='video_optimizing'>
               <div className='CircularProgressbarWithChildren' style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                     <ProgressBar
                        completed={100}
                        bgColor='#24554e'
                        height={12}
                        labelSize={12}
                        isLabelVisible={false}
                        isIndeterminate={true}
                     />
                     <Text
                        inner='Optimizing...'
                        type={textTypes.mediumLargeGrey}
                        size={textSizes.large}
                        className='CircularProgressbarWithChildren__text'
                        style={{ color: '#24554e' }}
                     />
                  </div>
               </div>
            </div>
         ) : (
            <UploadMediaView
               src={block.video_src}
               videoSrctype={videoUrl || block.video_src_type}
               videoEmbed={videoEmbed || block.video_embed}
               block={block}
               type='video'
               blockType={block.lesson_format}
               isHaveRecomenededText={true}
               buttonText='Video'
               bottomText={[
                  'You can upload video files in MP4, MOV, or WEBM formats, with a maximum size of 2GB. To ensure your videos meet this requirement, please use ',
                  <span onClick={handleOpenHandBrake} style={{ color: '#006dff', cursor: 'pointer' }} role='presentation'>HandBrake</span>,
                  ' to compress them before uploading.',
               ]}
               uploadProps={{
                  fileLessonFormat: 'video',
                  isAmazonFile: true,
                  onChange: (value, originalName, file, options, videos) => {
                     changeLesson('video_src', value, originalName, file, options, videos);
                  }
               }}
               view={videoView(block.lesson_format)}
               changeBlockFormat={changeBlockFormat}
               changeBlock={changeBlock}
               handleChangeVideoUrl={handleChangeVideoUrl}
               existingResources={getExistingResources()}
               onResourcesChange={handleUpdateResources}
            />
         )}
      </div>
   );
};

VideoLesson.defaultProps = {
   videoOptimizing: {},
};

VideoLesson.propTypes = {
   block: PropTypes.object,
   onChange: PropTypes.func,
   videoOptimizing: PropTypes.object,
};

export default VideoLesson;