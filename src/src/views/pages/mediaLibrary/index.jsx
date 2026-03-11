import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getFilesCount } from 'utils/mediaLibrary';
import './index.scss';
import FilterWrapper from 'components/modules/newFilter';
import SortButton from 'components/elements/buttons/SortButton';
import DeleteModal from 'components/elements/DeleteModal';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import MediaLibraryLeft from './MediaLibraryComponents/MediaLibraryLeft';
import MediaLibraryRight from './MediaLibraryComponents/MediaLibraryRight';

const MediasSortingValue = {
   created_at: 'Date added',
   name_a_z: 'Name A to Z',
   name_z_a: 'Name Z to A',
};

const FileSortingValue = {
   all: 'All',
   video: 'Video',
   file: 'File',
};

const MediaLibraryView = ({
   data, filterData, setFilterData, onFilter, checkedFoldersIds, handleFolderGeneralCheck,
   selectedFolderId, onSelect, onAdd, onCheck, onRemoveSelected, currentFolder, onUpload,
   checkedFiles, onCheckFile, onCheckAllFiles, onSingleRemove, onDuplicate, updateFolderName, isMobile, getFolders,
}) => {
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
   const [isOpen, setIsOpen] = useState(true);

   return (
      <div className='media__view__container'>
         <>
            {isOpenDeleteModal && (
               <DeleteModal
                  onDelete={ () => onRemoveSelected(setIsOpenDeleteModal) }
                  onCancel={ () => setIsOpenDeleteModal(false) }
                  deleteText='Delete'
                  title='Are you sure you want to delete the selected items?'
               />
            )}
            <FilterWrapper
               isHaveSearch={ true }
               searchValue={ filterData.searchValue }
               onFilter={ onFilter }
               leftText={ `${ data.length } folders and ${ getFilesCount(data) } items` }
               leftTextAcitve={ `${ checkedFoldersIds.length }/${ data.length - 1 } Folders` }
               isCheckedMain={ checkedFoldersIds.length === data.length - 1 }
               onCheckMain={ handleFolderGeneralCheck }
               isMulti={ filterData.isMulti }
               onRemove={ () => setIsOpenDeleteModal((!!checkedFoldersIds.length || !!checkedFiles.length)) }
               right={ (
                  <div className='media__filter'>
                     <SortButton
                        onFilter={ (val) => setFilterData('fileType', val) }
                        value={ filterData.fileType }
                        filterType='Filter'
                        iconName='FilterM'
                        isNewIcon={ true }
                        options={ FileSortingValue } />
                     <SortButton
                        onFilter={
                           (val) => {
                              setFilterData('sortingBy', val);
                           } }
                        value={ filterData.sortingBy }
                        options={ MediasSortingValue } />
                  </div>
               ) }
               setIsMulti={ () => setFilterData('isMulti', !filterData.isMulti) }
               onChangeSearch={ value => setFilterData('searchValue', value) }
            />
            {data.length > 0 ? (
               <div className='media__library__bottom'>
                  <MediaLibraryLeft
                     data={ data }
                     onCheck={ onCheck }
                     selectedFolderId={ selectedFolderId }
                     isMulti={ filterData.isMulti }
                     onSelect={ onSelect }
                     onSingleRemove={ onSingleRemove }
                     onAdd={ onAdd }
                     onDuplicate={ onDuplicate }
                     checkedFoldersIds={ checkedFoldersIds }
                     updateFolderName={ updateFolderName }
                     isMobile={ isMobile }
                     isOpen={ isOpen }
                     setIsOpen={ setIsOpen }
                  />
                  {currentFolder.id && (
                     <MediaLibraryRight
                        folderContent={ currentFolder }
                        onSingleRemove={ onSingleRemove }
                        onCheckFile={ onCheckFile }
                        checkedFiles={ checkedFiles }
                        onCheckAllFiles={ onCheckAllFiles }
                        isMulti={ filterData.isMulti }
                        onUpload={ onUpload }
                        getFolders={ getFolders }
                        isOpen={ isOpen }
                     />
                  )}
               </div>
            ) : (
               <Text
                  inner='No results'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ {
                     color: '#727978', textAlign: 'center', width: '100%', marginTop: '24px',
                  } }
               />
            )}
         </>
      </div>
   );
};

MediaLibraryView.propTypes = {
   onCheck: PropTypes.func,
   checkedFiles: PropTypes.array,
   onCheckFile: PropTypes.func,
   data: PropTypes.array,
   filterData: PropTypes.object,
   checkedFoldersIds: PropTypes.array,
   setFilterData: PropTypes.func,
   onAdd: PropTypes.func,
   onRemoveSelected: PropTypes.func,
   onFilter: PropTypes.func,
   selectedFolderId: PropTypes.any,
   onSelect: PropTypes.func,
   currentFolder: PropTypes.object,
   handleFolderGeneralCheck: PropTypes.func,
   onUpload: PropTypes.func,
   onCheckAllFiles: PropTypes.func,
   onSingleRemove: PropTypes.func,
   onDuplicate: PropTypes.func,
   updateFolderName: PropTypes.func,
   isMobile: PropTypes.bool,
   getFolders: PropTypes.func,
};

export default MediaLibraryView;
