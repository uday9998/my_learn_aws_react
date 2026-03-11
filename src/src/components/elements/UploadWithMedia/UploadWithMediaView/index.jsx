import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import { SliceAndConnectText } from 'utils/getSplitedText';
import { uniqueId } from 'lodash';
import { getType } from 'views/pages/mediaLibrary/MediaLibraryComponents/MediaLibraryRight';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const UploadWithMediaView = ({
   data, selectedFolder, onSelectFile, setSelectedFolder,
}) => {
   const { location: { hash } } = useHistory();

   const calculateFilesCount = (folder) => {
      let count = 0;
      if (!folder) return count;
      if (folder.files && Array.isArray(folder.files)) {
         count += folder.files.length;
      }
      if (folder.videos && Array.isArray(folder.videos)) {
         count += folder.videos.length;
      }

      return count;
   };

   return (
      <div className='upload__with__media__view'>
         <div className='upload__with__media__view__left'>
            {data && data.length > 0 && data.map((folder) => {
               return (
                  <div
                     key={ uniqueId() }
                     className='folder__item'
                     style={ { background: selectedFolder?.id === folder.id ? '#36796F' : 'inherit' } }
                  >
                     <div className='folder__item__left'>
                        <IconNew name={ selectedFolder?.id !== folder.id ? 'FolderOpenM' : 'FolderCloseM' } />
                     </div>
                     <div className='folder__item__right'>
                        <div
                           className='folder__item__right__top'
                           role='presentation'
                           onClick={ () => setSelectedFolder(folder) }
                        >
                           <Text
                              inner={ SliceAndConnectText(folder.name, 13) }
                              type={ types.regularDefault }
                              size={ sizes.small }
                              style={ { color: selectedFolder?.id === folder.id ? '#fff' : '#131F1E' } }
                           />
                        </div>
                        <div className='folder__item__right__bottom'>
                           <Text
                              inner={ `${ calculateFilesCount(folder) } Items` }
                              type={ types.mediumXSmall }
                              size={ sizes.xx_small }
                              style={ { color: selectedFolder?.id === folder.id ? '#F0F2F2' : '#A1A5A5', whiteSpace: 'nowrap' } }
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
                        miniText={ calculateFilesCount(selectedFolder) }
                     />
                  </div>
                  <div className='upload__with__media__view__right__bottom'>
                     {selectedFolder.files && selectedFolder.files.map((file) => {
                        if (!file.name) return null;
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
                                       inner={ SliceAndConnectText(file.name, 15) }
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
                     {selectedFolder?.videos && !hash.includes('program-information') && selectedFolder.videos.map((file) => {
                        if (!file.name) return null;
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

UploadWithMediaView.defaultProps = {
   selectedFolder: {},
};

UploadWithMediaView.propTypes = {
   data: PropTypes.array,
   selectedFolder: PropTypes.object,
   onSelectFile: PropTypes.func,
   setSelectedFolder: PropTypes.func,
};

export default UploadWithMediaView;
