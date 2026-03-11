import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import DropTriggle from 'components/elements/newDropTriggle';
import CheckBox from 'components/elements/form/CheckBoxNew';
import SliceAndConnectText from 'utils/getSplitedText';
import Input from 'components/elements/inputNew';
import IconButton from 'components/elements/buttons/IconButton';
import toast from 'utils/toast';

export const MediaFolderVersionFirst = ({
   folderData, isActive, onSelect, onSingleRemove, onDuplicate, updateFolderName,
}) => {
   const [isRename, setIsRename] = useState(false);
   const [newName, setNewName] = useState(folderData.name);
   const inputRef = useRef(null);

   useEffect(() => {
      if (isRename && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isRename, inputRef.current]);
   const getOptons = () => {
      const op = [
         {
            trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => onDuplicate(),
         },
         // {
         //    trash: false, iconName: 'TagMediaM', name: 'Add Tags', onClick: () => {},
         // },
         // {
         //    trash: false, iconName: 'MoreMediaM', name: 'More Info', onClick: () => {},
         // },
      ];
      if (!folderData.is_default) {
         op.unshift({
            trash: false, iconName: 'EditMediaM', name: 'Rename', onClick: () => setIsRename(true),
         });
         if (!isActive) {
            op.push({
               trash: true, iconName: 'DeleteMediaM', name: 'Delete', onClick: () => onSingleRemove(),
            });
         }
      }
      return op;
   };
   return (
      <div
         className={ `media__folder__version__first${ isActive ? ' media__folder__version__first__active' : '' }` }
         onClick={ () => {
            if (isRename) return;
            onSelect(folderData.id);
         } }
         role='presentation'
      >
         <div className='media__folder__version__first__right'>
            <IconNew name='MediaFolderM' />
            <div>
               {
                  isRename ? (
                     <div className='media__folder__version__first__right__rename'>
                        <Input
                           inputRef={ inputRef }
                           value={ newName }
                           onChange={ (name, value) => setNewName(value) }
                           onBlur={ () => {
                              if (newName.length === 0) {
                                 toast.error('The name field is required');
                                 // setIsRename(false);
                              }
                              // if (newName === folderData.name) {
                              // setIsRename(false);
                              // }
                              // updateFolderName(folderData.id, newName, () => {
                              //    setIsRename(false);
                              // });
                           } }
                        />
                        <div className='media__folder__version__first__right__rename__btns'>
                           <IconButton
                              onClick={ () => setIsRename(false) }
                              theme='light'
                              name='cancel'
                           />
                           <IconButton
                              name='BulletCheck'
                              theme='primary'
                              onClick={ () => {
                                 if (newName === folderData.name) {
                                    setIsRename(false);
                                    return;
                                 }
                                 updateFolderName(folderData.id, newName, () => {
                                    setIsRename(false);
                                 });
                              } }
                           />
                        </div>
                     </div>
                  ) : (
                     <Text
                        inner={ SliceAndConnectText(folderData.name, 25) }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: isActive ? '#fff' : '#131F1E', cursor: 'pointer' } }
                     />
                  )
               }
            </div>
         </div>
         <div className='media__folder__version__first__left'>
            <DropTriggle
               options={ getOptons() }
            />
         </div>
      </div>
   );
};

export const MediaFolderVersionSecond = ({
   folderData, onSelect, isChecked, onCheck, onSingleRemove, onDuplicate,
}) => {
   const getOptons = () => {
      const op = [
         // {
         //    trash: false, iconName: 'EditMediaM', name: 'Rename', onClick: () => {},
         // },
         {
            trash: false, iconName: 'DuplicateMediaM', name: 'Duplicate', onClick: () => onDuplicate(),
         },
         // {
         //    trash: false, iconName: 'TagMediaM', name: 'Add Tags', onClick: () => {},
         // },
         // {
         //    trash: false, iconName: 'MoreMediaM', name: 'More Info', onClick: () => {},
         // },
      ];
      if (!folderData.is_default) {
         op.push({
            trash: true, iconName: 'DeleteMediaM', name: 'Delete', onClick: () => onSingleRemove(),
         });
      }
      return op;
   };
   return (
      <div className='media__folder__version__first'>
         <div className='media__folder__version__first__right'>
            <CheckBox
               disabled={ folderData.is_default }
               checked={ isChecked }
               onChange={ () => onCheck(folderData.id, 'folder', isChecked ? 'delete' : '') }
            />
            <Text
               inner={ SliceAndConnectText(folderData.name, 25) }
               type={ types.regularDefault }
               onClick={ () => onSelect(folderData.id) }
               size={ sizes.small }
               style={ { cursor: 'pointer' } }
            />
         </div>
         <div className='media__folder__version__first__left'>
            <DropTriggle
               options={ getOptons() }
            />
         </div>
      </div>
   );
};

MediaFolderVersionFirst.propTypes = {
   onSelect: PropTypes.func,
   isActive: PropTypes.bool,
   onDuplicate: PropTypes.func,
   folderData: PropTypes.object,
   onSingleRemove: PropTypes.func,
   updateFolderName: PropTypes.func,
};


MediaFolderVersionSecond.propTypes = {
   onSelect: PropTypes.func,
   isChecked: PropTypes.bool,
   onCheck: PropTypes.func,
   onDuplicate: PropTypes.func,
   folderData: PropTypes.object,
   onSingleRemove: PropTypes.func,
};
