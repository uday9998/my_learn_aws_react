import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ChangeButton from 'components/elements/buttons/ChangeButton';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Upload from 'components/modules/uploadWithoutS3';
import UploadWithMedia from './UploadWithMedia';
import FileLoading from './FileLoading';

import './index.scss';

const UploadMediaView = ({ 
   quizz, 
   src, 
   onResourcesChange = () => {}, 
   existingResources = [],
   ...rest 
}) => {
   const [isHidenUpload, setIsHidenUpload] = useState(true);
   const [showResourceSelector, setShowResourceSelector] = useState(false);
   const [additionalBlocks, setAdditionalBlocks] = useState([]);
   const [uploadingBlockId, setUploadingBlockId] = useState(null);
   
   // Ref for the resource selector to scroll to
   const resourceSelectorRef = useRef(null);

   const resourceTypes = [
      { name: 'Video', icon: 'videoM', value: 'Video', format: 'video' },
      { name: 'Audio', icon: 'audioM', value: 'Audio', format: 'audio' },
      { name: 'PDF', icon: 'pdfM', value: 'Pdf', format: 'pdf' },
      { name: 'PowerPoint', icon: 'PptM', value: 'Ppt', format: 'ppt' },
      { name: 'Image', icon: 'ImageM', value: 'Image', format: 'image' },
   ];

   useEffect(() => {
      setIsHidenUpload(!!src);
   }, [src]);

   useEffect(() => {
      if (rest.type === 'Video-embed' || rest.type === 'Video') {
         setIsHidenUpload(!!rest.videoEmbed);
      }
   }, [rest.videoEmbed]);

   useEffect(() => {
      if (rest.type === 'Video-url' || rest.type === 'Video') {
         setIsHidenUpload(!!rest.videoSrctype && !!rest.videoSrctype.length);
      }
   }, [rest.videoSrctype]);

   // Initialize with existing resources
   useEffect(() => {
      if (existingResources.length > 0) {
          const existingBlocks = existingResources.map((resource, index) => ({
              id: resource.id || `existing_${Date.now()}_${index}`,
              type: resource.type,
              format: resource.format,
              order: index + 1,
              src: resource.src,
              uploading: false,
              fileName: resource.fileName || '',
              content: {
                  file_src: resource.src,
                  file_name: resource.fileName || ''
              },
              isExisting: true
          }));
          
          setAdditionalBlocks(existingBlocks);
      } else {
          setAdditionalBlocks([]);
      }
  }, [existingResources]);

   // Scroll to resource selector when it opens
   useEffect(() => {
      if (showResourceSelector && resourceSelectorRef.current) {
         setTimeout(() => {
            resourceSelectorRef.current.scrollIntoView({ 
               behavior: 'smooth', 
               block: 'nearest' 
            });
         }, 100); // Small delay to ensure DOM is updated
      }
   }, [showResourceSelector]);

   const handlePlusButtonClick = () => {
      setShowResourceSelector(!showResourceSelector);
   };

   const handleAddResource = (resourceType) => {
      const newBlock = {
         id: Date.now(),
         type: resourceType.value,
         format: resourceType.format,
         order: additionalBlocks.length + 1,
         src: null,
         uploading: false,
         fileName: '',
         content: {},
         isExisting: false
      };

      setAdditionalBlocks(prev => [...prev, newBlock]);
      setShowResourceSelector(false);
   };

   const handleBlockUpload = (blockId, src, fileName, fileData) => {
      const updatedBlocks = additionalBlocks.map(block =>
         block.id === blockId
            ? { 
               ...block, 
               src, 
               fileName, 
               uploading: false, 
               content: { 
                  ...block.content, 
                  file_src: src, 
                  file_name: fileName, 
                  ...fileData 
               } 
            }
            : block
      );
      
      setAdditionalBlocks(updatedBlocks);
      setUploadingBlockId(null);
      triggerResourceChange(updatedBlocks);
   };

   const handleBlockLoadingChange = (blockId, isLoading) => {
      setAdditionalBlocks(blocks =>
         blocks.map(block =>
            block.id === blockId
               ? { ...block, uploading: isLoading }
               : block
         )
      );
      if (isLoading) {
         setUploadingBlockId(blockId);
      } else if (uploadingBlockId === blockId) {
         setUploadingBlockId(null);
      }
   };

   const handleDeleteBlock = (blockId) => {
      const filtered = additionalBlocks.filter(b => b.id !== blockId);
      setAdditionalBlocks(filtered);
      triggerResourceChange(filtered);
   };
   
   const triggerResourceChange = (blocks) => {
      const allResources = blocks
         .filter(b => !!b.src)
         .map(b => ({
            id: b.id,
            type: b.type,
            format: b.format,
            src: b.src,
            fileName: b.fileName,
            isExisting: b.isExisting || false
         }));
      
      onResourcesChange(allResources);
   };

   const renderBlockContent = (block) => {
      // Show preview for existing resources with replace option
      if (block.isExisting && block.src) {
         return (
            <div className="existing-resource-preview">
               <div className="existing-resource-info">
                  <Text inner={block.fileName || 'Uploaded file'} type={txtTypes.regularDefault} size={txtSizes.small} />
                  <Text inner={`Type: ${block.type}`} type={txtTypes.regularDefault} size={txtSizes.small} />
               </div>
               <div className="existing-resource-actions">
                  <ChangeButton
                     text="Replace"
                     iconName="ChangeImageM"
                     onClick={() => {
                        setAdditionalBlocks(prev => 
                           prev.map(b => 
                              b.id === block.id 
                                 ? { ...b, isExisting: false, src: null, uploading: false }
                                 : b
                           )
                        );
                     }}
                     withText={true}
                  />
               </div>
            </div>
         );
      }

      // Show upload interface for new resources
      return (
         <Upload
            onChange={(src, fileName, fileData) => {
               handleBlockUpload(block.id, src, fileName, fileData);
            }}
            onLoadingChange={(isLoading) => handleBlockLoadingChange(block.id, isLoading)}
            fileLessonFormat={block.format}
            isAmazonFile={true}
            text={block.type}
            isHaveRecomenededText={true}
            iconName={resourceTypes.find(r => r.value === block.type)?.icon}
            cropRatio={block.type === 'Image' ? '1920x1080' : null}
            disabled={uploadingBlockId && uploadingBlockId !== block.id}
         />
      );
   };

   let videoStyle = {};
   if (['Video-url', 'Video-embed', 'Video', 'video'].includes(rest.type)) {
      if (rest.block?.css_attributes?.width === 1) {
         videoStyle = { maxWidth: '420px' };
      } else if (rest.block?.css_attributes?.width === 0) {
         videoStyle = { maxWidth: '100%' };
      } else if (rest.block?.css_attributes?.width === 2) {
         videoStyle = { maxWidth: '640px' };
      }
   }

   return (
      <>
         <div className={rest.className || 'block__upload__media__view'}>
            {isHidenUpload ? (
               <>
                  {!rest.openSettings && (
                     <div className='upload__media__image__view__button'>
                        <ChangeButton
                           text={`Change ${rest.buttonText}`}
                           iconName='ChangeImageM'
                           onClick={() => setIsHidenUpload(false)}
                           withText={true}
                        />
                     </div>
                  )}
                  <div
                     className={
                        ['audio', 'video', 'image'].includes(rest.type)
                           ? 'upload__media__image__view__change'
                           : 'upload__media__image__view__change embed-container'
                     }
                     style={videoStyle}
                  >
                     {quizz && <span role='presentation' onClick={() => setIsHidenUpload(false)}>X</span>}
                     <FileLoading src={src} type={rest.type} view={rest.view} style={rest.style} />
                  </div>
               </>
            ) : (
               <UploadWithMedia
                  {...rest}
                  onFinish={() => setIsHidenUpload(true)}
                  setIsHidenUpload={setIsHidenUpload}
                  src={src}
               />
            )}
         </div>

         {/* Add Resource Button */}
         <div className='upload__media__add__container'>
            <div className='upload__media__add__divider'>
               <div className='upload__media__add__line'></div>
               <div className='upload__media__add__text__and__button'>
                  <Text 
                     inner='Add Resource' 
                     type={txtTypes.regularDefault} 
                     size={txtSizes.small} 
                     className='upload__media__add__text'
                  />
                  <div 
                     className='upload__media__add__button'
                     onClick={handlePlusButtonClick}
                     role='presentation'
                  >
                     <IconNew name='PlusL' color='white' />
                  </div>
               </div>
               <div className='upload__media__add__line'></div>
            </div>

            {showResourceSelector && (
               <div className='upload__media__resource__selector' ref={resourceSelectorRef}>
                  <div className='upload__media__resource__selector__header'>
                     <Text inner='Add Resource' type={txtTypes.regularDefault} size={txtSizes.medium} />
                     <div 
                        className='upload__media__resource__selector__close'
                        onClick={() => setShowResourceSelector(false)}
                        role='presentation'
                     >
                        <IconNew name='CloseM' />
                     </div>
                  </div>
                  <div className='upload__media__resource__selector__grid'>
                     {resourceTypes.map(resource => (
                        <div
                           key={resource.value}
                           className='upload__media__resource__item'
                           onClick={() => handleAddResource(resource)}
                           role='presentation'
                        >
                           <div className='upload__media__resource__item__icon'>
                              <IconNew name={resource.icon} />
                           </div>
                           <Text inner={resource.name} type={txtTypes.regularDefault} size={txtSizes.small} />
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         {/* Resource Blocks */}
         {additionalBlocks.length > 0 && (
            <div className='upload__media__additional__blocks'>
               {additionalBlocks.map((block, index) => (
                  <div key={block.id} className='upload__media__additional__block'>
                     <div className='upload__media__additional__block__header'>
                        <Text 
                           inner={`${block.type} ${index + 1}${block.isExisting ? ' (Existing)' : ''}`} 
                           type={txtTypes.regularDefault} 
                           size={txtSizes.small} 
                        />
                        <div 
                           className='upload__media__additional__block__remove'
                           onClick={() => handleDeleteBlock(block.id)}
                           role='presentation'
                        >
                           <IconNew name='DeleteMediaM' />
                        </div>
                     </div>
                     <div className='upload__media__additional__block__content'>
                        {renderBlockContent(block)}
                     </div>
                  </div>
               ))}
            </div>
         )}
      </>
   );
};

UploadMediaView.propTypes = {
   src: PropTypes.string,
   quizz: PropTypes.bool,
   onResourcesChange: PropTypes.func,
   existingResources: PropTypes.array,
};

export default UploadMediaView;