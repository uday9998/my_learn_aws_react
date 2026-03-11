import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import { SliceAndConnectText } from 'utils/getSplitedText';
import { uniqueId } from 'lodash';
import { getType } from 'views/pages/mediaLibrary/MediaLibraryComponents/MediaLibraryRight';

const UploadWithMediaView = ({
   data, selectedFolder, onSelectFile, setSelectedFolder, type,
}) => {
   let selectedFolderItems = [];
   if (type === 'video') {
      selectedFolderItems = selectedFolder.videos;
   } else {
      selectedFolderItems = selectedFolder.files;
   }
   return (
      <div className='upload__with__media__view'>
         <div className='upload__with__media__view__left'>
            {data.map((folder) => {
               return (
                  <div
                     key={ uniqueId() }
                     className='folder__item'
                     style={ { background: selectedFolder.id === folder.id ? '#36796F' : 'inherit' } }
                  >
                     <div className='folder__item__left'>
                        <IconNew name={ selectedFolder.id !== folder.id ? 'FolderOpenM' : 'FolderCloseM' } />
                     </div>
                     <div className='folder__item__right'>
                        <div
                           className='folder__item__right__top'
                           role='presentation'
                           onClick={ () => setSelectedFolder(folder) }
                        >
                           <Text
                              inner={ SliceAndConnectText(folder.name, 15) }
                              type={ types.regularDefault }
                              size={ sizes.small }
                              style={ { color: selectedFolder.id === folder.id ? '#fff' : '#131F1E' } }
                           />
                        </div>
                        <div className='folder__item__right__bottom'>
                           <Text
                              inner={ `${ folder.files || folder.videos ? ((folder.files ? folder.files.length : 0) + (folder.videos ? folder.videos.length : 0)) : 0 } Items` }
                              type={ types.mediumXSmall }
                              size={ sizes.xx_small }
                              style={ { color: selectedFolder.id === folder.id ? '#F0F2F2' : '#A1A5A5' } }
                           />
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <div className='upload__with__media__view__right'>
            {selectedFolder && (
               <>
                  <div className='upload__with__media__view__right__top'>
                     <Text
                        inner={ SliceAndConnectText(selectedFolder.name, 32) }
                        type={ types.medium150 }
                        miniText={ `${ selectedFolder ? selectedFolderItems.length : 0 }` }
                     />
                  </div>
                  <div className='upload__with__media__view__right__bottom'>
                     {selectedFolderItems.map((file) => {
                        return (
                           <div
                              className='folder__file'
                              key={ uniqueId() }
                           >
                              <div className='folder__file__left'>
                                 <IconNew name='FileMediaM' />
                                 <div
                                    role='presentation'
                                    onClick={ () => onSelectFile(file.src, file) }
                                 >
                                    <Text
                                       inner={ SliceAndConnectText(file.name, 30) }
                                       type={ types.regularDefault }
                                       size={ sizes.small }
                                       style={ { cursor: 'pointer' } }
                                    />
                                 </div>
                              </div>
                              <div className='folder__file__right'>
                                 <Text
                                    inner={ getType(file.src) }
                                    type={ types.mediumLarge }
                                    size={ sizes.small }
                                 />
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

UploadWithMediaView.propTypes = {
   data: PropTypes.array,
   selectedFolder: PropTypes.object,
   onSelectFile: PropTypes.func,
   setSelectedFolder: PropTypes.func,
   type: PropTypes.string,
};

export default UploadWithMediaView;
