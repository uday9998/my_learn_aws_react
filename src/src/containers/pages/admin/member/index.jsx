import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import * as operations from 'state/modules/members/operations';
import * as selectors from 'state/modules/members/selectors';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import MemberView from 'views/pages/member';
import { useHistory } from 'react-router-dom';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { resetCommunity } from 'state/modules/members/actions';
import { push } from 'connected-react-router';
import Popup from 'components/modules/PopupMember';
import Router from 'routes/router';
import MemberEditGrantPopup from 'views/layout/membersNew/membersComponents/memberEditPopups/GrantPopup';
import MemberEditNotePopup from 'views/layout/membersNew/membersComponents/memberEditPopups/NotePopup';
import MemberTags from 'components/modules/memberPages/Tags/TagsComponents/MemberTags';
import RolePopup from 'views/layout/membersNew/membersComponents/memberEditPopups/RolePopup';
import DeleteModal from 'components/elements/DeleteModal';
import { plansSelector } from 'state/modules/plans/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { onlineUsersSelector } from 'state/modules/common/selectors';

const Member = ({
   currentMember, createNote, clearCurrentMember,
   getCurrentMember, match, courses, detachTag, filterMemberClasses, isLoading, sortedVersionClasses,
   pauseCurrentMemberCourse, deleteCurrentMemberCourse, updateNote, deleteNote, addTag, atachTag,
   getFilteredTransaction, getCommunity, isLoadingCommunity, selectedCommunity, handleClearCommunity,
   filterByCourses, chooseCourses, addCurrentMemberCourse, deleteMember, goToMembers, goToHome, plans, assignRole, onlineUsers,
}) => {
   const history = useHistory();
   const [popupType, setPopupType] = useState('');
   const [selectedGrantVariant, setSelectedGrantVariant] = useState('');
   const [selectedGrantAccess, setSelectedGrantAccess] = useState(null);
   const [role, setRole] = useState(currentMember && currentMember.role);
   // const [tagsSelectValues, setTagsSelectValues] = useState([]);
   const [noteInputs, setNoteInputs] = useState({
      title: '',
      description: '',
   });
   const [deleteModalContent, setDeleteModalContent] = useState({
      isOpen: false,
      name: '',
      id: null,
   });
   const [errorMessages, setErrorMessages] = useState({});

   useEffect(() => {
      if (match.params.id) {
         getCurrentMember(match.params.id);
         filterByCourses();
      } else if (isPrint('Something went wrong')) {
         toast.error('Something went wrong');
      }
   }, []);

   useEffect(() => {
      setRole(currentMember.role);
   }, [currentMember]);

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

   const handleMemberActions = (hash) => {
      if (hash === 'delete') {
         setDeleteModalContent({
            isOpen: true,
            name: currentMember.name,
            id: currentMember.id,
         });
      } else {
         setPopupType(hash);
      }
   };

   const closePopup = () => {
      setPopupType('');
      clearErrorMessages();
   };

   const getPopupAcceptText = () => {
      if (popupType === 'grant') {
         return 'Grant Offer';
      }
      if (popupType === 'note') {
         return 'Add Note';
      }
      if (popupType === 'role') {
         return 'Change Role';
      }
      return 'Add Tag';
   };


   const onAddToCourse = (memberId, courseId, planId) => {
      addCurrentMemberCourse(memberId, courseId, planId);
   };

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
         removeErrorMessage('grantVariant');
         removeErrorMessage('grantAccess');
      }

      if (name === 'grantVariant') {
         setSelectedGrantVariant(value);
      }
      if (name === 'grantAccess') {
         setSelectedGrantAccess(value);
      }
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

         const coursesIds = currentMember.courses ? currentMember.courses.map((course) => course.id) : [];
         const selectedCourseIds = [...coursesIds];
         if (selectedGrantVariant) {
            selectedCourseIds.unshift(selectedGrantVariant);
         }
         onAddToCourse(currentMember.id, selectedCourseIds, selectedGrantAccess);
         setSelectedGrantVariant('');
      }
      if (popupType === 'note') {
         const newErrMessages = await createNote(currentMember.id, noteInputs);

         if (newErrMessages) {
            addErrorMessages(newErrMessages);
            return;
         }

         setNoteInputs({
            title: '',
            description: '',
         });
      }
      if (popupType === 'role') {
         assignRole(currentMember.id, role);
         setRole(currentMember.role || 0);
      }

      closePopup();
   };

   return (
      <>
         {
            !popupType && (
               <MobileHeader>
                  <SiteHeader
                     isLeftAction
                     goToBack={ () => {} }
                  />
               </MobileHeader>
            )
         }
         <Container>
            {isLoading && <LoaderSpinner />}
            {currentMember && currentMember.id && (
               <MemberView
                  goBack={ () => {
                     history.goBack();
                     handleClearCommunity();
                     clearCurrentMember();
                  } }
                  selectedCommunity={ selectedCommunity }
                  isLoadingCommunity={ isLoadingCommunity }
                  addTag={ addTag }
                  courses={ courses }
                  onClassFilter={ (course, from, to) => getFilteredTransaction(currentMember.id, course, from, to) }
                  updateNote={ updateNote }
                  detachTag={ detachTag }
                  currentMember={ currentMember }
                  atachTag={ atachTag }
                  handleResetSelectedCommunity={ () => handleClearCommunity() }
                  createNote={ createNote }
                  filterMemberClasses={ filterMemberClasses }
                  deleteNote={ deleteNote }
                  sortedVersionClasses={ sortedVersionClasses }
                  pauseCurrentMemberCourse={ pauseCurrentMemberCourse }
                  removeMemberCourse={ deleteCurrentMemberCourse }
                  handleMemberActions={ handleMemberActions }
                  onSelectCommunity={ (communityId) => getCommunity(currentMember.id, communityId) }
                  onlineUsers={ onlineUsers }
               />
            )}
            {!!popupType && (
               <Popup
                  isOpen={ !!popupType }
                  onClose={ closePopup }
                  className='more-info-popup'
                  onAccept={ popupType === 'tags' ? null : () => onAcceptPopup() }
                  onAcceptText={ getPopupAcceptText() }
                  cancelText='Cancel'
               >
                  {popupType === 'grant' && (
                     <MemberEditGrantPopup
                        selectedGrantVariant={ selectedGrantVariant }
                        coursesOption={ chooseCourses }
                        member={ currentMember }
                        plans={ plans }
                        selectedGrantAccess={ selectedGrantAccess }
                        changeGrantInputs={ changeGrantInputs }
                        errorMessages={ errorMessages }
                     />
                  )}
                  { popupType === 'note' && (
                     <MemberEditNotePopup
                        errorMessages={ errorMessages }
                        inputs={ noteInputs }
                        onChange={ changeNoteInputs }
                        memberName={ currentMember.name }
                     />
                  )}
                  {popupType === 'tags'
                  && (
                     <MemberTags
                        isHaveDetach={ true }
                        onAdd={ (inputs, isNew) => addTag(currentMember.id, inputs, isNew) }
                        isFirstTag={ currentMember.tags && currentMember.tags.length }
                        tags={ currentMember.tags }
                        options={ currentMember.allTags }
                        atachTag={ (id) => atachTag(currentMember.id, id) }
                        detachTag={ (id) => detachTag(currentMember.id, id) }
                     />
                  )}
                  {popupType === 'role' && (
                     <RolePopup
                        role={ role }
                        setRole={ setRole }
                        title='Change Role'
                     />
                  )}
               </Popup>
            )}
            {deleteModalContent.isOpen && (
               <DeleteModal
                  title={ `Are you sure you want to permanently delete ${ deleteModalContent.name }?` }
                  onCancel={ () => {
                     setDeleteModalContent({
                        isOpen: false,
                     });
                  } }
                  onDelete={ () => {
                     deleteMember(deleteModalContent.id, () => goToMembers());
                     setDeleteModalContent({
                        isOpen: false,
                     });
                  } }
                  deleteText='Delete Member'
               />
            )}
         </Container>
      </>
   );
};

Member.propTypes = {
   getCurrentMember: PropTypes.func,
   match: PropTypes.object,
   pauseCurrentMemberCourse: PropTypes.func,
   deleteNote: PropTypes.func,
   currentMember: PropTypes.object,
   updateNote: PropTypes.func,
   courses: PropTypes.array,
   sortedVersionClasses: PropTypes.number,
   isLoading: PropTypes.bool,
   filterMemberClasses: PropTypes.func,
   clearCurrentMember: PropTypes.func,
   createNote: PropTypes.func,
   detachTag: PropTypes.func,
   atachTag: PropTypes.func,
   addTag: PropTypes.func,
   deleteCurrentMemberCourse: PropTypes.func,
   getFilteredTransaction: PropTypes.func,
   getCommunity: PropTypes.func,
   isLoadingCommunity: PropTypes.bool,
   selectedCommunity: PropTypes.object,
   handleClearCommunity: PropTypes.func,
   filterByCourses: PropTypes.func,
   chooseCourses: PropTypes.array,
   addCurrentMemberCourse: PropTypes.func,
   deleteMember: PropTypes.func,
   goToMembers: PropTypes.func,
   goToHome: PropTypes.func,
   plans: PropTypes.array,
   assignRole: PropTypes.func,
   onlineUsers: PropTypes.array,
};

const mapStateToProps = (state) => {
   return {
      courses: selectors.currentMemberCoursesSelector(state),
      currentMember: selectors.currentMemberSelector(state),
      isLoading: selectors.isProgressSelector(state),
      sortedVersionClasses: selectors.getSortedClassesVersion(state),
      isLoadingCommunity: selectors.isLoadingCommunitySelector(state),
      selectedCommunity: selectors.selectedCommunitySelector(state),
      chooseCourses: selectors.chooseCoursesSelector(state),
      plans: plansSelector(state),
      onlineUsers: onlineUsersSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getCurrentMember: async id => {
         await dispatch(operations.getCurrentMemberOperation(id));
      },
      getFilteredTransaction: async (memberId, courseId, from, to) => {
         await dispatch(operations.filteredTransactionsOperation(memberId, courseId, from, to));
      },
      pauseCurrentMemberCourse: (memberId, courseId) => {
         dispatch(
            operations.pauseCurrentMemberCourseOperation(memberId, courseId)
         );
      },
      clearCurrentMember: () => {
         dispatch(operations.clearCurrentMemberOperation());
      },
      deleteCurrentMemberCourse: (memberId, courseId) => {
         dispatch(
            operations.deleteCurrentMemberCourseOperation(memberId, courseId)
         );
      },
      filterMemberClasses: (memberId, sort) => {
         dispatch(
            operations.filterClassesOperation(memberId, sort)
         );
      },

      createNote: (id, inputs) => dispatch(operations.createNoteOperation(id, inputs)),

      updateNote: (id, userId, inputs) => dispatch(operations.updateNoteOperation(id, userId, inputs)),

      deleteNote: (userId, noteId) => {
         dispatch(operations.deleteNoteOperation(userId, noteId));
      },
      addTag: (memberId, inputs, isNew) => dispatch(operations.addTagOperation(memberId, inputs, isNew)),
      atachTag: (memberId, tagId) => {
         dispatch(operations.atachTagOperation(memberId, tagId));
      },
      detachTag: (memberId, tagId) => {
         dispatch(operations.detachTagOperation(memberId, tagId));
      },
      getCommunity: (id, communityId) => {
         dispatch(operations.getCurrentMemberCommunityOperation(id, communityId));
      },
      goToMembers: () => {
         dispatch(push({
            pathname: Router.route('ADMIN_MEMBERS').getCompiledPath(),
         }));
      },
      goToHome: () => {
         dispatch(push({
            pathname: Router.route('ADMIN_HOME').getCompiledPath(),
         }));
      },
      filterByCourses: () => dispatch(operations.filterByCoursesOperation()),
      deleteMember: (id, callBack) => {
         dispatch(operations.deleteMemberOperation(id, callBack));
      },
      addCurrentMemberCourse: (memberId, courseId, planId) => {
         dispatch(
            operations.addCurrentMemberCourseOperation(memberId, courseId, planId, true)
         );
      },
      onAttachManyTags: async (memberId, tags) => {
         await dispatch(operations.attachManyTagsOperation(memberId, tags));
      },
      assignRole: (memberId, role) => {
         dispatch(
            operations.assignRoleOperation(memberId, role)
         );
      },
      handleClearCommunity: () => dispatch(resetCommunity()),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Member);
