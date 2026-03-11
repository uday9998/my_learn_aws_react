import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import thumbnail from 'assets/images/mediaLibraryvideothumbnail.png';
import WorkPoints from 'components/elements/WorkPoints';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { MediaUploadVideo } from 'components/modules/mediaLibrary/UploadFile';

const MediaEmpty = ({ handleOpenCreateFolderPopup, onUpload }) => {
   const points = useRef([
      'Create a folder or folders',
      'Upload the files there',
      'If necessary, you can add a tag',
      "File management with 'More info'",
   ]);
   return (
      <div className='media__empty__view'>
         <WorkPoints points={ points.current } thumbnail={ thumbnail } videoUrl='https://www.youtube.com/embed/RVjxFLTCngw' />
         <div className='media__empty__view__folder'>
            <div style={ { display: 'flex', alignItems: 'center', gap: '16px' } }>
               <div className='media__empty__view__folder__icon'>
                  <IconNew name='MediaFolderL' />
               </div>
               <div className='media__empty__view__folder__text'>
                  <Text
                     inner='Manage your files'
                     type={ TextType.regularLarge }
                     size={ TextSize.medium }
                  />
                  <Text
                     inner='We recommend creating folders to better manage your media files'
                     type={ TextType.regularDefaultGrey145 }
                     size={ TextSize.small }
                  />
               </div>
            </div>
            <BaseButton
               text='Add Folder'
               onClick={ () => handleOpenCreateFolderPopup() }
            />
         </div>
         <MediaUploadVideo onChange={ (url, name, file) => onUpload({ url, name, file }) } />
      </div>
   );
};

MediaEmpty.propTypes = {
   handleOpenCreateFolderPopup: PropTypes.func,
   onUpload: PropTypes.func,
};

export default MediaEmpty;
