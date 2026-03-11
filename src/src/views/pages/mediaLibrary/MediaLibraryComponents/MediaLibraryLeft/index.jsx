import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import { v4 as uuidv4 } from 'uuid';
import DeleteModal from 'components/elements/DeleteModal';
import IconNew from 'components/elements/iconsSize';
import { MediaFolderVersionFirst, MediaFolderVersionSecond } from '../MediaLibraryFolderVersion';

const MediaLibraryLeft = ({
   data, isMulti, selectedFolderId, onAdd, checkedFoldersIds, onSelect, onCheck, onSingleRemove,
   onDuplicate, updateFolderName, isMobile,
   isOpen, setIsOpen,
}) => {
   const [selectedIdToRemove, setSelectedIdToRemove] = useState(null);
   return (
      <div
         className={ `media__library__left ${ isOpen ? 'opened' : 'closed' }` }
      >
         {selectedIdToRemove !== null && (
            <DeleteModal
               onDelete={ () => onSingleRemove({
                  folders_id: [selectedIdToRemove],
                  files_id: [],
               }, setSelectedIdToRemove) }
               onCancel={ () => setSelectedIdToRemove(null) }
               deleteText='Delete'
               title='Are you sure you want to delete the folder ?'
            />
         )}
         <div className='media__library__left__top'>
            <Text
               inner='Folders'
               type={ types.regular160 }
               size={ sizes.xlarge }
               miniText={ `${ data.length }` }
            />
            <div role='presentation' onClick={ () => onAdd() } style={ { cursor: 'pointer' } }>
               <TextWithIcon
                  iconName='plus'
                  inner='Add New Folder'
                  type={ types.regularDefaultSmallX }
                  size={ sizes.small }
                  generalStyles={ { gap: '6px' } }
                  style={ { color: '#24554E', gap: '6px' } }
               />
            </div>
            {
               isMobile && (
                  <div
                     className='media__library__left__top__switcher'
                     role='presentation'
                     onClick={ () => setIsOpen(!isOpen) }
                  >
                     <IconNew name='ChevronLeftL' style={ !isOpen ? { transform: 'rotate(180deg)' } : {} } />
                  </div>
               )
            }
         </div>
         <div className='media__library__left__folders'>
            {data.map((item) => {
               return (
                  <div
                     key={ uuidv4() }
                  >
                     {isMulti ? (
                        <MediaFolderVersionSecond
                           isActive={ selectedFolderId === item.id }
                           folderData={ item }
                           isChecked={ !!checkedFoldersIds.includes(item.id) }
                           onCheck={ onCheck }
                           onSelect={ (id) => {
                              onSelect(id);
                              setIsOpen(false);
                           } }
                           onDuplicate={ () => onDuplicate(item.id) }
                           onSingleRemove={ () => setSelectedIdToRemove(item.id) }
                        />
                     ) : (
                        <MediaFolderVersionFirst
                           isActive={ selectedFolderId === item.id }
                           folderData={ item }
                           onDuplicate={ () => onDuplicate(item.id) }
                           onSingleRemove={ () => setSelectedIdToRemove(item.id) }
                           onSelect={ (id) => {
                              onSelect(id);
                              setIsOpen(false);
                           } }
                           updateFolderName={ updateFolderName }
                        />
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

MediaLibraryLeft.propTypes = {
   data: PropTypes.array,
   onCheck: PropTypes.func,
   onSingleRemove: PropTypes.func,
   isMulti: PropTypes.bool,
   onSelect: PropTypes.func,
   onAdd: PropTypes.func,
   checkedFoldersIds: PropTypes.array,
   onDuplicate: PropTypes.func,
   selectedFolderId: PropTypes.number || PropTypes.string,
   updateFolderName: PropTypes.func,
   isMobile: PropTypes.bool,
   isOpen: PropTypes.bool,
   setIsOpen: PropTypes.func,
};

export default MediaLibraryLeft;
