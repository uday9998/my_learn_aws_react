import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { errorsSelector } from 'state/modules/members/selectors';

import PropTypes from 'prop-types';
import MemberContainer from 'views/newLayout/members';
import Pagination from 'components/elements/Pagination';
import UploadModal from 'components/modules/UploadModal';
import Popup from 'components/modules/PopupMember';
import DeleteModal from 'components/elements/DeleteModal';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import MembersHeader from './membersComponents/membersHeader';
import { MembersTypeFirst } from './membersComponents/membersTypeFirst';
import MembersFilter from './membersComponents/membersFilter';
import './index.scss';
import { MembersTypeSecond } from './membersComponents/membersTypeSecond';
import { BulkImportModal, AddMemberModal, MemberInfo } from './membersComponents/membersModals';
import MemberEditGrantPopup from './membersComponents/memberEditPopups/GrantPopup';
import MemberEditRolePopup from './membersComponents/memberEditPopups/RolePopup';
import MemberEditNotePopup from './membersComponents/memberEditPopups/NotePopup';
import MemberEditTagPopup from './membersComponents/memberEditPopups/TagPopup';
import MemberEmptyPage from './membersComponents/MembersEmpty';

const Members = ({
   members, onCheck, selectMember, handleDeleteMember, selectedAdvancedFilter, coursesOption,
   addMember, onCheckAll, handleSearch, searchValue, handleInternalInputChange, exportCSV, handleUploadCSVClick,
   advancedFilterName, advancedFilterLogin, searchFrom, searchTo, handleResetFilter, dataIsFetching, onAddToCourse,
   onAssignRole, handleCreateNote, tags, createTag, onSaveMemberTags, handleSendPassword, onChangeMembersPage,
   checkedMembers, checkedAdmins, bulkDelete, initialLength, isOpenBulk, plans, isEmptyByFilter, isOpenMobSearch,
   onlineUsers, selectedSortedVariant
}) => {
   const errorData = useSelector(errorsSelector);
   const [filters, setFilters] = useState({
      big: false,
   });
   const [showOnlyMembers, setShowOnlyMembers] = useState(false);
   // const [selectedSortedVariant, setSelectedSortedVariant] = useState('0');
   const [selectedVariant, setSelectedVariant] = useState(0);
   const [popupType, setPopupType] = useState('');
   const [file, setFile] = useState({});
   const [selectedGrantVariant, setSelectedGrantVariant] = useState('');
   const [deleteModalContent, setDeleteModalContent] = useState({
      isOpen: false,
      name: '',
      id: null,
   });
   const [tagsSelectValues, setTagsSelectValues] = useState([]);
   const [inputs, setInputs] = useState({
      name: '',
      email: '',
      password: '',
      course: '',
      passwordConfirmation: '',
      role: 0,
   });
   const [isOpenAddModal, setIsOpenAddModal] = useState(false);
   const [memberMoreInfo, setMemberMoreInfo] = useState({
      isOpen: false,
   });
   const [role, setRole] = useState(memberMoreInfo.isOpen ? memberMoreInfo.role : 0);
   const [isOpenBulkModal, setIsOpenBulkModal] = useState(false);
   const [noteInputs, setNoteInputs] = useState({
      title: '',
      description: '',
   });
   const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);
   const [selectedGrantAccess, setSelectedGrantAccess] = useState(null);
   const { isMobile } = useWindowSizeChange();
   const [errorMessages, setErrorMessages] = useState({});

   const clearErrorMessages = () => {
      setErrorMessages({});
   };

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   useEffect(() => {
      if (memberMoreInfo.isOpen && members.data) {
         const currentMemberChange = members.data.filter((member) => member.id === memberMoreInfo.id);
         setMemberMoreInfo({
            ...currentMemberChange[0],
            isOpen: true,
         });
      }
   }, [members]);

   useEffect(() => {
      setRole(memberMoreInfo.isOpen ? memberMoreInfo.role : 0);
      if (memberMoreInfo.tags) {
         const filtered = memberMoreInfo.tags.filter(
            (tag) => !tagsSelectValues.filter((tagSelect) => tagSelect.created_at === tag.created_at)[0]
         );
         setTagsSelectValues([
            ...(tagsSelectValues || []),
            ...filtered,
         ]);
      }
   }, [memberMoreInfo]);

   const closeAddMemberPopup = () => {
      setIsOpenAddModal(false);
      clearErrorMessages();
   };

   useEffect(() => {
      if (errorData?.errors) {
         // setIsOpenAddModal(true);
         setInputs({
            ...errorData.memberFieldValues,
         });
         addErrorMessages(errorData.errors);
      } else {
         closeAddMemberPopup();
         setInputs({
            role: 0,
         });
      }
   }, [members, errorData?.errors]);

   const changeNoteInputs = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setNoteInputs({
         ...noteInputs,
         [name]: value,
      });
   };

   const changeGrantInputs = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      if (name === 'grantVariant') {
         setSelectedGrantVariant(value);
      }
      if (name === 'grantAccess') {
         setSelectedGrantAccess(value);
      }
   };

   const getPopupContent = () => {
      if (popupType === 'grant') {
         return (
            <MemberEditGrantPopup
               selectedGrantVariant={ selectedGrantVariant }
               setSelectedGrantVariant={ setSelectedGrantVariant }
               coursesOption={ coursesOption }
               member={ memberMoreInfo }
               plans={ plans }
               selectedGrantAccess={ selectedGrantAccess }
               setSelectedGrantAccess={ setSelectedGrantAccess }
               changeGrantInputs={ changeGrantInputs }
               errorMessages={ errorMessages }
            />
         );
      } if (popupType === 'role') {
         return (
            <MemberEditRolePopup
               role={ role }
               setRole={ setRole }
            />
         );
      }
      if (popupType === 'note') {
         return (
            <MemberEditNotePopup
               errorMessages={ errorMessages }
               inputs={ noteInputs }
               onChange={ changeNoteInputs }
               memberName={ memberMoreInfo.name }
            />
         );
      } if (popupType === 'tag') {
         return (
            <MemberEditTagPopup
               onAdd={ (id) => setTagsSelectValues([...tagsSelectValues, id]) }
               onRemove={ (id) => setTagsSelectValues([...tagsSelectValues.filter((item) => item.id !== id)]) }
               tagsValues={ tagsSelectValues }
               tags={ tags }
               onAttachTag={ (title) => createTag(memberMoreInfo.id, title) }
            />
         );
      }
      return 'dvdd';
   };
   const getFilteredIdsTags = (toFilterTags) => {
      const returnTags = toFilterTags.map((tag) => tag.id);
      return returnTags;
   };

   const closePopup = () => {
      setPopupType('');
      setTagsSelectValues(memberMoreInfo.tags);
      clearErrorMessages();
   };

   const getPopupAcceptText = () => {
      if (popupType === 'grant') {
         return 'Grant Access';
      } if (popupType === 'role') {
         return 'Assign Role';
      } if (popupType === 'note') {
         return 'Add Note';
      }
      return 'Add Tag';
   };

   const onAcceptPopup = async () => {
      if (popupType === 'grant') {
         if (!selectedGrantVariant && !selectedGrantAccess) {
            addErrorMessages({
               grantVariant: ['Please select a Product'],
               grantAccess: ['Please select a Bundle'],
            });
            return;
         }

         const coursesIds = memberMoreInfo.courses ? memberMoreInfo.courses.map((course) => course.id) : [];
         const selectedCourseIds = [...coursesIds];
         if (selectedGrantVariant) {
            selectedCourseIds.unshift(selectedGrantVariant);
         }

         onAddToCourse(memberMoreInfo.id, selectedCourseIds, selectedGrantAccess);
         setSelectedGrantVariant('');
      } else if (popupType === 'role') {
         if (role !== memberMoreInfo.role) {
            onAssignRole(memberMoreInfo.id, role);
         }
         setSelectedGrantVariant('');
      } else if (popupType === 'note') {
         const newErrMessages = await handleCreateNote(memberMoreInfo.id, noteInputs);

         if (newErrMessages) {
            addErrorMessages(newErrMessages);
            return;
         }

         setNoteInputs({
            title: '',
            description: '',
         });
      } else if (popupType === 'tag') {
         const TagsToAttch = tagsSelectValues.filter((tag) => {
            return !memberMoreInfo.tags.filter((memberTag) => memberTag.id === tag.id)[0];
         });
         const TagsTODettach = memberMoreInfo.tags.filter((tag) => {
            return !tagsSelectValues.filter((valueTag) => valueTag.id === tag.id)[0];
         });
         onSaveMemberTags(memberMoreInfo.id, {
            attachIds: getFilteredIdsTags(TagsToAttch),
            detachIds: getFilteredIdsTags(TagsTODettach),
         });
         setTagsSelectValues([]);
      }

      setPopupType('');
      clearErrorMessages();
   };

   const isDisabledAcceptAdd = () => {
      return !selectedVariant && !(inputs.name && inputs.password && inputs.email && inputs.password_confirmation);
   };

   return (
      <MemberContainer>
         {deleteModalContent.isOpen && (
            <DeleteModal
               title={ `Are you sure you want to permanently delete ${ deleteModalContent.name }?` }
               onCancel={ () => {
                  setDeleteModalContent({
                     isOpen: false,
                  });
               } }
               onDelete={ () => {
                  handleDeleteMember(deleteModalContent.id);
                  setDeleteModalContent({
                     isOpen: false,
                  });
               } }
               deleteText='Delete Member'
            />
         )}
         <MembersHeader
            searchValue={ searchValue }
            handleSearch={ handleSearch }
            isOpenBulk={ isOpenBulk }
            exportCSV={ exportCSV }
            initialLength={ initialLength }
            handleInternalInputChange={ handleInternalInputChange }
            openBulkModal={ () => setIsOpenBulkModal(true) }
            openAddMemberModal={ () => setIsOpenAddModal(true) }
            showSearch={ !isMobile || (initialLength !== 0 && !isEmptyByFilter && isOpenMobSearch) }
         />
         {isOpenAddModal && (
            <Popup
               isOpen={ isOpenAddModal }
               onAcceptText={ selectedVariant ? 'Copy Link' : 'Add Member' }
               isAcceptDisabled={ isDisabledAcceptAdd() }
               onAccept={ () => {
                  addMember(inputs);
               } }
               onClose={ closeAddMemberPopup }
               cancelText='Cancel'
            >
               <AddMemberModal
                  errorMessages={ errorMessages }
                  removeErrorMessage={ removeErrorMessage }
                  setIsOpenChangeModal={ () => setIsOpenChangeModal(true) }
                  setInputs={ setInputs }
                  coursesOption={ coursesOption }
                  inputs={ inputs }
                  selectedVariant={ selectedVariant }
                  setSelectedVariant={ setSelectedVariant }
               />
            </Popup>
         )}
         {isOpenChangeModal && (
            <UploadModal
               isOptional={ true }
               label='Profile Picture'
               fileLessonFormat='image'
               isAmazonFile={ true }
               text='Image'
               onClose={ () => setIsOpenChangeModal(false) }
               onChange={ (url) => {
                  setInputs({ ...inputs, picture_src: url });
                  setIsOpenChangeModal(false);
               } }
            />
         )}
         {memberMoreInfo.isOpen && !popupType && (
            <Popup
               isOpen={ memberMoreInfo.isOpen }
               onClose={ () => setMemberMoreInfo({ isOpen: false }) }
               onAcceptText='Open Full Profile'
               className='more-info-popup'
               onAccept={ () => selectMember(memberMoreInfo.id) }
            >
               <MemberInfo
                  handleSelect={ selectMember }
                  closeModal={ () => setMemberMoreInfo({ isOpen: false }) }
                  member={ memberMoreInfo }
                  setPopupType={ setPopupType }
                  onEdit={ () => selectMember(memberMoreInfo.id) }
                  onDelete={ () => {
                     setDeleteModalContent({
                        isOpen: true,
                        id: memberMoreInfo.id,
                        name: memberMoreInfo.name,
                     });
                     setMemberMoreInfo({
                        isOpen: false,
                     });
                  } }
                  status={
                     onlineUsers.length > 0 ? (onlineUsers.includes(memberMoreInfo.id) ? 'Active' : 'Inactive') : (memberMoreInfo.online ? 'Active' : 'Inactive')
                  }
               />
            </Popup>
         )}
         {popupType && (
            <Popup
               isOpen={ true }
               onClose={ closePopup }
               onAccept={ () => onAcceptPopup() }
               onAcceptText={ getPopupAcceptText() }
               cancelText='Cancel'
            >
               {getPopupContent()}
            </Popup>
         )}
         {isOpenBulkModal && (
            <Popup
               isOpen={ isOpenBulkModal }
               onAcceptText='Upload'
               cancelText='Cancel'
               isAcceptDisabled={ !(file && file.text) }
               onAccept={ () => { handleUploadCSVClick(file); setIsOpenBulkModal(false); setFile({}); } }
               onClose={ () => setIsOpenBulkModal(false) }
            ><BulkImportModal file={ file } onChange={ (element) => setFile(element) } />
            </Popup>
         )}
         {initialLength === 0 && !isEmptyByFilter ? (
            <MemberEmptyPage
               isOpenBulk={ isOpenBulk }
               openBulkModal={ () => setIsOpenBulkModal(true) }
               openAddMemberModal={ () => setIsOpenAddModal(true) }
               exportCSV={ exportCSV }
            />
         ) : (
            <>
               {!dataIsFetching && (
                  <MembersFilter
                     members={ members }
                     filters={ filters }
                     isAllChecked={ members.data.filter((e) => e.role !== 0).length === checkedAdmins.length }
                     showOnlyMembers={ showOnlyMembers }
                     setShowOnlyMembers={ () => setShowOnlyMembers(!showOnlyMembers) }
                     advancedFilterLogin={ advancedFilterLogin }
                     handleInternalInputChange={ handleInternalInputChange }
                     selectedAdvancedFilter={ selectedAdvancedFilter }
                     selectedSortedVariant={ selectedSortedVariant }
                     // setSelectedSortedVariant={ setSelectedSortedVariant }
                     handleResetFilter={ handleResetFilter }
                     coursesOption={ coursesOption }
                     advancedFilterName={ advancedFilterName }
                     searchValue={ searchValue }
                     handleSearch={ handleSearch }
                     searchFrom={ searchFrom }
                     searchTo={ searchTo }
                     onChange={
                        (name, value) => setFilters({ ...filters, [name]: value })
                     }
                     onCheckAll={ onCheckAll }
                     checkedMembers={ checkedMembers }
                     isMobile={ isMobile }
                  />
               )}
               {
                  filters.big ? (
                     <MembersTypeSecond
                        onCheck={ onCheck }
                        total={ members.total }
                        members={ members.data || [] }
                        handleDeleteMember={ (id, name) => setDeleteModalContent({
                           isOpen: true,
                           id,
                           name,
                        }) }
                        onCheckAll={ onCheckAll }
                        bulkDelete={ bulkDelete }
                        handleSelect={ selectMember }
                        onMoreInfo={ (member) => setMemberMoreInfo({ ...member, isOpen: true }) }
                        checkedMembers={ checkedMembers }
                        dataIsFetching={ dataIsFetching }
                        onOpenEditPopup={ (member, type) => {
                           setMemberMoreInfo({
                              isOpen: false,
                              ...member,
                           });
                           setPopupType(type);
                        } }
                        showOnlyMembers={ showOnlyMembers }
                        key={ showOnlyMembers }
                        checkedAdmins={ checkedAdmins }
                        isMobile={ isMobile }
                        onlineUsers={ onlineUsers }
                     />
                  )
                     : (
                        <MembersTypeFirst
                           onCheck={ onCheck }
                           total={ members.total }
                           checkedAdmins={ checkedAdmins }
                           checkedMembers={ checkedMembers }
                           bulkDelete={ bulkDelete }
                           members={ members.data || [] }
                           handleSelect={ selectMember }
                           handleDeleteMember={ (id, name) => setDeleteModalContent({
                              isOpen: true,
                              id,
                              name,
                           }) }
                           onOpenEditPopup={ (member, type) => {
                              setMemberMoreInfo({
                                 isOpen: false,
                                 ...member,
                              });
                              setPopupType(type);
                           } }
                           onCheckAll={ onCheckAll }
                           onMoreInfo={ (member) => setMemberMoreInfo({ ...member, isOpen: true }) }
                           dataIsFetching={ dataIsFetching }
                           showOnlyMembers={ showOnlyMembers }
                           key={ showOnlyMembers }
                           onlineUsers={ onlineUsers }
                        />
                     )
               }
            </>
         )}
         {members.total && members.total > 29 ? (
            <Pagination
               totalRecords={ members.total || 0 }
               pageLimit={ 30 }
               pageNeighbours={ 1 }
               onPageChanged={ (page) => onChangeMembersPage(page) }
            />
         ) : ''}
      </MemberContainer>
   );
};

Members.propTypes = {
   onCheck: PropTypes.func,
   onCheckAll: PropTypes.func,
   checkedMembers: PropTypes.array,
   members: PropTypes.any,
   coursesOption: PropTypes.array,
   searchValue: PropTypes.string,
   advancedFilterName: PropTypes.any,
   handleSearch: PropTypes.func,
   handleInternalInputChange: PropTypes.func,
   exportCSV: PropTypes.func,
   onAddToCourse: PropTypes.func,
   advancedFilterLogin: PropTypes.string,
   handleResetFilter: PropTypes.func,
   selectMember: PropTypes.func,
   addMember: PropTypes.func,
   selectedAdvancedFilter: PropTypes.any,
   handleDeleteMember: PropTypes.func,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
   handleUploadCSVClick: PropTypes.func,
   onAssignRole: PropTypes.func,
   tags: PropTypes.array,
   handleCreateNote: PropTypes.func,
   dataIsFetching: PropTypes.bool,
   createTag: PropTypes.func,
   handleSendPassword: PropTypes.func,
   onSaveMemberTags: PropTypes.func,
   onChangeMembersPage: PropTypes.func,
   checkedAdmins: PropTypes.array,
   bulkDelete: PropTypes.func,
   initialLength: PropTypes.number,
   isOpenBulk: PropTypes.bool,
   plans: PropTypes.array,
   isEmptyByFilter: PropTypes.bool,
   isOpenMobSearch: PropTypes.bool,
   onlineUsers: PropTypes.array,
   selectedSortedVariant: PropTypes.string,
};

export default Members;
