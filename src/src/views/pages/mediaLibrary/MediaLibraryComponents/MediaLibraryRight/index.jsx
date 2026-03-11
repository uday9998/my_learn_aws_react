import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as types,
   SIZES as sizes,
} from 'components/elements/TextNew';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import moment from 'moment';
import DropTriggle from 'components/elements/newDropTriggle';
import IconNew from 'components/elements/iconsSize';
import DeleteModal from 'components/elements/DeleteModal';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';
import Input from 'components/elements/inputRnew';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { copyToClipBoard } from 'utils/copy';
import {
   changeMediaName,
} from 'api/AuthApi';

export const getType = name => {
   if (name) {
      return name
         .split('.')
         .at(-1)
         .toUpperCase().substring(0, 3);
   }
   return '';
};
const MediaLibraryRight = ({
   folderContent,
   isMulti,
   onCheckFile,
   checkedFiles,
   //  onCheckAllFiles,
   onSingleRemove,
   isOpen,
}) => {
   // const [currentCheckedFiles, setCurrentCheckedFiles] = useState([]);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const [folder, setFolder] = useState(folderContent);
   // const ids = (folder && folder.files && folder.files.map(item => item.id)) || [];
   useEffect(() => {
      setFolder(folderContent);
   },
   [folderContent]
   );

   // useEffect(() => {
   //    const data = new Set(checkedFiles.filter(item => ids.includes(item)));
   //    setCurrentCheckedFiles(Array.from(data));
   // },
   // [folder, checkedFiles]
   // );
   const [selectedIdToRemove, setSelectedIdToRemove] = useState(null);
   const [editableFile, setEditableFile] = useState({});

   const calculateFilesCount = () => {
      let count = 0;
      if (folder.files && Array.isArray(folder.files)) {
         count += folder.files.length;
      }
      if (folder.videos && Array.isArray(folder.videos)) {
         count += folder.videos.length;
      }

      return count;
   };

   const [changeMediaNameFunc, { loading }] = useSubmitForm(changeMediaName, {
      successMessage: 'Name has been changed.',
   });

   const editMediaName = (file) => {
      setEditableFile(file);
   };

   const handleSaveName = (name) => {
      changeMediaNameFunc({ ...editableFile, name }, () => {
         if (editableFile.format === 'video') {
            if (folder.videos && !!folder.videos.length) {
               const newVideo = folder.videos.filter(video => video.id === editableFile.id);
               newVideo[0].name = name;
            }
         }
         if (editableFile.format === 'file') {
            if (folder.files && !!folder.files.length) {
               const newVideo = folder.files.filter(file => file.id === editableFile.id);
               newVideo[0].name = name;
            }
         }
         setFolder(folder);
         setEditableFile({});
         // getFolders();
      });
   };

   const onclose = () => {
      setEditableFile({});
   };

   return (
      <div className='media__library__right'>
         <div className='media__library__right__top'>
            {selectedIdToRemove !== null && (
               <DeleteModal
                  onDelete={ () => onSingleRemove({
                     folders_id: [],
                     files_id: selectedIdToRemove.id,
                     type: selectedIdToRemove.type,
                  }, setSelectedIdToRemove)
                  }
                  onCancel={ () => setSelectedIdToRemove(null) }
                  deleteText='Delete'
                  title='Are you sure you want to delete this file?'
               />
            )}
            <Text
               inner={ folder.name }
               type={ types.regular160 }
               size={ sizes.xlarge }
               miniText={ calculateFilesCount() }
            />
            {/* <TextWithIcon
               iconName='UploadMediaM'
               inner='Upload File'
               type={ types.regularDefaultSmallX }
               size={ sizes.small }
               onClick={ () => onUpload() }
               generalStyles={ { gap: '6px', cursor: 'pointer' } }
               style={ { color: '#24554E', gap: '6px' } }
            /> */}
         </div>
         {(folder.files?.length || folder.videos?.length) ? (
            <div className='media__library__right__table'>
               <div className='media__library__right__table__top'>
                  {/* {isMulti && (
                     <CheckBox
                        checked={
                           currentCheckedFiles.length === folder.files.length
                        }
                        onChange={ () => onCheckAllFiles(
                           ids,
                           currentCheckedFiles.length === ids.length
                              ? 'remove'
                              : 'add'
                        )
                        }
                     />
                  )} */}
                  <div className='media__library__right__table__top__item table-col-1'>
                     <Text
                        inner='Name'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </div>
                  <div className='media__library__right__table__top__item table-col-2'>
                     <Text
                        inner='File Type'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </div>
                  <div className='media__library__right__table__top__item table-col-3'>
                     <Text
                        inner='Date Added'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </div>
               </div>
               <div
                  className='media__library__right__table__bottom'
                  style={ {
                     display: isMobile && isOpen ? 'none' : 'flex',
                  } }>
                  {folder && folder.videos && folder.videos.map(f => {
                     return (
                        <div className='media__library__right__table__bottom__line' key={ uniqueId() }>
                           <div className='media__library__right__table__bottom__item table-col-1'>
                              {!isMulti ? (
                                 <div style={ { width: '20px', height: '20px' } }>
                                    <IconNew name='FileMediaM' />
                                 </div>
                              ) : (
                                 <CheckBox
                                    checked={ checkedFiles.find(checkedFile => checkedFile.id === f.id) }
                                    onChange={ () => {
                                       if (f.is_used) {
                                          toast.error('File is using on a lesson and can not be deleted');
                                          return;
                                       }
                                       onCheckFile({ id: f.id, type: f.extension });
                                    } }
                                 />
                              )}
                              {editableFile.id !== f.id
                               && (
                                  <Text
                                     inner={ f.name?.length > 30 ? `${f.name.slice(0, 30)}...` : f.name || '' }
                                     type={ types.regularDefault }
                                     size={ sizes.small }
                                  />
                               )}

                              {editableFile.id === f.id && !loading

                              && (
                                 <div>
                                    <Input
                                       value={ f.name }
                                       onSave={ handleSaveName }
                                       onclose={ onclose }
                                       name='name'
                                       label=''
                                    />
                                 </div>
                              )}
                           </div>
                           <div
                              style={ { marginLeft: isMulti ? '15px' : '0px' } }
                              className='media__library__right__table__bottom__item item-type table-col-2 table-p'
                           >
                              <Text
                                 inner={ getType(f.src) }
                                 type={ types.mediumLarge }
                                 size={ sizes.small }
                              />
                           </div>
                           <div className='media__library__right__table__bottom__item table-col-3 table-p'>
                              <Text
                                 inner={ moment(f.created_at).format(
                                    'MMMM DD, YYYY, hh:mm A'
                                 ) }
                                 type={ types.mediumSmall }
                                 size={ sizes.small }
                                 style={ { color: '#727978' } }
                              />
                              <DropTriggle
                                 options={ [
                                    {
                                       trash: false,
                                       iconName: 'CopyLandingM',
                                       name: 'Copy Link',
                                       onClick: () => {
                                          copyToClipBoard(f.src);
                                       },
                                    },
                                    {
                                       trash: false,
                                       iconName: 'EditMediaM',
                                       name: 'Rename',
                                       onClick: () => {
                                          editMediaName({ id: f.id, format: 'video', name: f.name });
                                       },
                                    },
                                    {
                                       trash: true,
                                       iconName: 'DeleteMediaM',
                                       name: 'Delete',
                                       onClick: () => {
                                          if (f.is_used) {
                                             toast.error('File is using on a lesson and can not be deleted');
                                             return;
                                          }
                                          setSelectedIdToRemove({ id: f.id, type: f.extension });
                                       },
                                    },
                                 ] }
                              />
                           </div>
                        </div>
                     );
                  })}
                  {folder && folder.files && !!folder.files.length && folder.files.map(f => {
                     if (f.name === null) return null;
                     return (
                        <div className='media__library__right__table__bottom__line' key={ uniqueId() }>
                           <div className='media__library__right__table__bottom__item table-col-1'>
                              {!isMulti ? (
                                 <div style={ { width: '20px', height: '20px' } }>
                                    <IconNew name='FileMediaM' />
                                 </div>
                              ) : (
                                 <CheckBox
                                    checked={ checkedFiles.filter(checkedFile => checkedFile.id === f.id).length > 0 }
                                    onChange={ () => {
                                       if (f.is_used) {
                                          toast.error('File is using on a lesson and can not be deleted');
                                          return;
                                       }
                                       onCheckFile({ id: f.id, type: f.extension });
                                    } }
                                 />
                              )}
                              {editableFile.id !== f.id && !loading
                               && (
                                  <Text
                                     inner={ f.name ? `${ f.name.slice(0, 30) }${ f.name.length > 29 ? '...' : '' }` : '' }
                                     type={ types.regularDefault }
                                     size={ sizes.small }
                                  />
                               )}

                              {editableFile.id === f.id

                              && (
                                 <div>
                                    <Input
                                       value={ f.name }
                                       onSave={ handleSaveName }
                                       onclose={ onclose }
                                       name='name'
                                       label=''
                                    />
                                 </div>
                              )}
                           </div>
                           <div
                              style={ { marginLeft: isMulti ? '15px' : '0px' } }
                              className='media__library__right__table__bottom__item item-type table-col-2 table-p'
                           >
                              <Text
                                 inner={ getType(f.src) }
                                 type={ types.mediumLarge }
                                 size={ sizes.small }
                              />
                           </div>
                           <div className='media__library__right__table__bottom__item table-col-3 table-p'>
                              <Text
                                 inner={ moment(f.created_at).format(
                                    'D MMMM YYYY, hh:mm A'
                                 ) }
                                 type={ types.mediumSmall }
                                 size={ sizes.small }
                                 style={ { color: '#727978' } }
                              />
                              <DropTriggle
                                 options={ [
                                    {
                                       trash: false,
                                       iconName: 'CopyLandingM',
                                       name: 'Copy Link',
                                       onClick: () => {
                                          copyToClipBoard(f.src);
                                       },
                                    },
                                    {
                                       trash: false,
                                       iconName: 'EditMediaM',
                                       name: 'Rename',
                                       onClick: () => {
                                          editMediaName({ id: f.id, format: 'file', name: f.name });
                                       },
                                    },
                                    {
                                       trash: true,
                                       iconName: 'DeleteMediaM',
                                       name: 'Delete',
                                       onClick: () => {
                                          if (f.is_used) {
                                             toast.error('File is using on a lesson and can not be deleted');
                                             return;
                                          }
                                          setSelectedIdToRemove({ id: f.id, type: f.extension });
                                       },
                                    },
                                 ] }
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         ) : (
            <div className='media__library__right__bottom__empty'>
               <IconNew name='FolderMediaL' />
               <Text
                  inner='The folder was empty'
                  type={ types.regularDefault }
                  size={ sizes.medium }
                  style={ { color: '#727978' } }
               />
            </div>
         )}
      </div>
   );
};

MediaLibraryRight.propTypes = {
   checkedFiles: PropTypes.array,
   onCheckFile: PropTypes.func,
   folderContent: PropTypes.object,
   isMulti: PropTypes.bool,
   isOpen: PropTypes.bool,
   onSingleRemove: PropTypes.func,
   // onCheckAllFiles: PropTypes.func,
};

export default MediaLibraryRight;
