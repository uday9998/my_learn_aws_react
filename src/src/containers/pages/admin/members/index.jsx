/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Container from 'views/layout/AdminContainer';
import * as selectors from 'state/modules/members/selectors';
import {
   setInput as setInputAction,
   getCurrentMemberCompleted,
   addFilterOption as addFilterOptionAction,
   removeFilterOption as removeFilterOptionAction,
   chooseNoteAction,
   setNoteInputAction,
   emptyCourseFilterAction,
} from 'state/modules/members/actions';
import getDeff from 'utils/getDeff';
import * as operations from 'state/modules/members/operations';
import Members from 'views/pages/members';
import MembersNew from 'views/layout/membersNew';
import moment from 'moment';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import withLoading from 'utils/withLoading';
import { isLocalhost } from 'utils/Helpers';
import QueryParams from 'utils/QueryParams';
import * as AuthApi from 'api/AuthApi';
import {
   appSelector, authUserSelector, mainAppSelector, onlineUsersSelector, siteInfoSelector, 
} from 'state/modules/common/selectors';
import isPrint from 'state/modules/designCourse/edit/Error';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { plansSelector } from 'state/modules/plans/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const MembersIsLoading = withLoading(Members);
const apiUrl = isLocalhost() || window.location.hostname === 'taron5.miestro.loc'
   ? process.env.REACT_APP_API_LOCAL_ENDPOINT
   : `https://${ window.location.host }`;

class MembersContainer extends Component {
   static propTypes = {
      siteInfo: PropTypes.object,
      mainApp: PropTypes.object,
      getMembers: PropTypes.func.isRequired,
      setInput: PropTypes.func.isRequired,
      getCurrentMember: PropTypes.func.isRequired,
      getMemberTransactions: PropTypes.func.isRequired,
      getMemberNotes: PropTypes.func.isRequired,
      sendPassword: PropTypes.func.isRequired,
      members: PropTypes.object.isRequired,
      tags: PropTypes.array.isRequired,
      addTag: PropTypes.func.isRequired,
      putMember: PropTypes.func.isRequired,
      createNote: PropTypes.func.isRequired,
      deleteNote: PropTypes.func.isRequired,
      currentMember: PropTypes.object.isRequired,
      currentMemberInitialData: PropTypes.object.isRequired,
      dataIsFetching: PropTypes.bool.isRequired,
      moreMember: PropTypes.func,
      searchMember: PropTypes.func.isRequired,
      addMember: PropTypes.func.isRequired,
      addCurrentMemberCourse: PropTypes.func,
      assignRole: PropTypes.func,
      pauseCurrentMemberCourse: PropTypes.func,
      deleteCurrentMemberCourse: PropTypes.func,
      deleteMember: PropTypes.func,
      goToDashboard: PropTypes.func,
      getCurrentMemberAction: PropTypes.func,
      importMembers: PropTypes.func,
      filterByCourses: PropTypes.func,
      chooseCourses: PropTypes.array,
      addFilterOption: PropTypes.func,
      onAttachManyTags: PropTypes.func,
      removeFilterOption: PropTypes.func,
      selectedFilters: PropTypes.array,
      defaultMemberId: PropTypes.number,
      changeMembersPage: PropTypes.func,
      addMemberInProgress: PropTypes.bool,
      chooseNote: PropTypes.func,
      setNoteInput: PropTypes.func,
      updateNote: PropTypes.func,
      emptyCourseFilter: PropTypes.func,
      authUser: PropTypes.object,
      addCourseProgress: PropTypes.bool,
      bulkDelete: PropTypes.func,
      isPopupChangeInProgress: PropTypes.bool,
      isOpenBulk: PropTypes.any,
      initialLength: PropTypes.func,
      plans: PropTypes.array,
      isEmptyByFilter: PropTypes.bool,
      onlineUsers: PropTypes.array,
      showFullScreenLoader: PropTypes.bool,
   };

   constructor(props) {
      super(props);
      this.state = {
         isShowPopup: false,
         popupTitle: '',
         searchValue: '',
         searchFrom: null,
         searchTo: null,
         addingMember: false,
         isMobileChangeTab: false,
         checkedAdmins: [],
         checkedMembers: [],
         newMember: {
            email: '',
            password: '',
            name: '',
            role: 0,
            company_name: '',
            picture_src: '',
         },
         courseId: 1,
         date_from: null,
         date_to: null,
         searchValueLast: '',
         advancedFilterOption: '',
         advancedFilterName: '',
         advancedFilterLogin: 'last_login_after',
         isOpenMobSearch: false,
         selectedSortedVariant: '0',
      };
   }

   async componentDidMount() {
      const {
         getMembers,
         getMemberTransactions,
         currentMember,
         getMemberNotes,
         filterByCourses,
         authUser,
      } = this.props;
      await getMembers(authUser.id);
      const { defaultMemberId } = this.props;
      await filterByCourses();
      if (window.innerWidth >= 1024) {
         if (defaultMemberId) {
            // await getCurrentMember(defaultMemberId);
            await getMemberTransactions(defaultMemberId);
            await getMemberNotes(defaultMemberId);
         }
      }
      // const adminContent = document.querySelector('.adminContent');
      // adminContent.style.overflow = 'hidden';
      this.memberInitialData = currentMember;
   }

   componentWillUnmount() {
      const adminContent = document.querySelector('.adminContent');
      if (adminContent) {
         adminContent.style.overflow = 'auto';
      }
   }

   handleUploadCSVClick = file => {
      const { importMembers } = this.props;
      const data = new FormData();
      data.append('csv', file);
      importMembers(data);
   };

   handleInputChange = (name, value, isCustomField) => {
      const { setInput } = this.props;
      setInput(name, value, isCustomField);
   };

   handleNoteInputChange = (name, value) => {
      const { setNoteInput } = this.props;
      setNoteInput(name, value);
   };

   handleInternalInputChange = (name, value) => {
      if (name === 'advancedFilterOption') {
         this.setState({
            advancedFilterName: '',
            advancedFilterLogin: 'last_login_after',
            searchFrom: null,
            searchTo: null,
         });
      }
      // if (name === 'searchValue') {
      //    this.handleSearch(value, null, null, null, null, false);
      // }
      this.setState({
         [name]: value,
      });
   };

   handleNewMemberInputChange = (name, value) => {
      this.setState(state => ({
         newMember: {
            ...state.newMember,
            [name]: value,
         },
      }));
   };

   handleSave = async id => {
      const {
         currentMember,
         currentMemberInitialData,
         putMember,
         selectedFilters,
         chooseCourses,
         getCurrentMember,
      } = this.props;
      const courseIdsArray = [];
      const courseArrays = [];
      chooseCourses.forEach(e1 => selectedFilters.forEach(e2 => {
         if (e1.name === e2) {
            courseIdsArray.push(e1.id);
            courseArrays.push(e1);
         }
      })
      );
      const changedFields = getDeff(currentMemberInitialData, currentMember);
      const newInputs = { ...changedFields, course_ids: courseIdsArray };
      const fieldValues = currentMember.field_values;
      let validation = true;
      if (fieldValues.length) {
         for (let i = 0; i < fieldValues.length; i++) {
            if (fieldValues[i].value === '') {
               validation = false;
               if (
                  isPrint(`Please add the ${ fieldValues[i].custom_field_name }`)
               ) {
                  toast.error(
                     `Please add the ${ fieldValues[i].custom_field_name }`
                  );
               }
               break;
            } else {
               validation = true;
            }
         }
      }
      if (validation) {
         await putMember(id, newInputs, courseArrays, fieldValues);
         const { addMemberInProgress } = this.props;
         if (!addMemberInProgress) {
            await getCurrentMember(id);
         }
      }
   };

   handlePermissonSave = async id => {
      const {
         currentMember,
         currentMemberInitialData,
         putMember,
         getCurrentMember,
      } = this.props;
      const changedFields = getDeff(currentMemberInitialData, currentMember);
      await putMember(id, changedFields);
      const { addMemberInProgress } = this.props;
      if (!addMemberInProgress) {
         await getCurrentMember(id);
      }
   };

   handleSendPassword = id => {
      const { sendPassword } = this.props;
      sendPassword(id);
   };

   onChooseMember = id => {
      const {
         getCurrentMember,
         getMemberTransactions,
         getMemberNotes,
      } = this.props;
      this.switchToAddingMember(false);
      getCurrentMember(id);
      getMemberNotes(id);
      getMemberTransactions(id);
      this.setState({
         isMobileChangeTab: true,
      });
   };

   handleCreateNote = (memberId, inputs) => {
      const { createNote } = this.props;
      return createNote(memberId, inputs);
   };

   handleDeleteNote = noteId => {
      const { deleteNote, currentMember } = this.props;

      deleteNote(currentMember.id, noteId);
   };

   handleAddTag = (memberId, value) => {
      const { addTag } = this.props;

      return addTag(memberId, { name: value.label });
   };

   handleResetFilter = async () => {
      this.setState({
         advancedFilterOption: '',
         advancedFilterName: '',
         advancedFilterLogin: 'last_login_after',
         searchFrom: null,
         searchTo: null,
      });
      const {
         getMembers,
         getCurrentMember,
         getMemberTransactions,
         getMemberNotes,
         authUser,
      } = this.props;
      await getMembers(authUser.id);
      const { defaultMemberId } = this.props;
      if (window.innerWidth >= 1024) {
         if (defaultMemberId) {
            await getCurrentMember(defaultMemberId);
            await getMemberTransactions(defaultMemberId);
            await getMemberNotes(defaultMemberId);
         }
      }
   };

   handleSearch = async (
      value,
      from,
      to,
      filterName,
      filterValue,
      isAdvanced,
      sortBy
   ) => {
      const { searchMember } = this.props;
      let date_from = null;
      let date_to = null;
      let filterLastName = filterName;
      let filterLastValue = filterValue;
      if (from) {
         date_from = moment(from).format('YYYY/MM/DD');
      }
      if (to) {
         date_to = moment(to).format('YYYY/MM/DD');
      }

      this.setState({
         date_from,
         date_to,
         searchValueLast: value,
         selectedSortedVariant: sortBy,
      });
      const { advancedFilterLogin } = this.state;

      if (filterName === 'last_login_') {
         filterLastName = advancedFilterLogin;
         if (filterLastValue) {
            if (filterLastName === 'last_login_after') {
               filterLastValue = moment(filterValue)
                  .add(1, 'days')
                  .format('YYYY/MM/DD');
            } else {
               filterLastValue = moment(filterValue).format('YYYY/MM/DD');
            }
         }
      }

      if (isAdvanced) {
         await searchMember({
            search: value,
            date_from,
            date_to,
            [filterLastName]: filterLastValue || [],
         });
      } else {
         await searchMember({
            search: value,

         }, sortBy);
      }

      const {
         getCurrentMember,
         getMemberTransactions,
         getMemberNotes,
         defaultMemberId,
         dataIsFetching,
      } = this.props;
      this.switchToAddingMember(false);
      // if (!dataIsFetching && defaultMemberId && window.innerWidth >= 1024) {
      //    await getCurrentMember(defaultMemberId);
      //    await getMemberNotes(defaultMemberId);
      //    await getMemberTransactions(defaultMemberId);
      // }
   };

   switchToAddingMember = bool => {
      const { emptyCourseFilter } = this.props;
      emptyCourseFilter();
      this.setState(() => ({
         addingMember: bool,
      }));
   };

   newHandleAddMember = (inputs) => {
      const { siteInfo: { permissions }, mainApp, members } = this.props;
      if (!Array.isArray(permissions)) {
         if (!inputs.role && members.membersCount < permissions.users_count) {
            this.handleAddMember(inputs);
         } else if (mainApp.plan_name.includes('starter') && members.adminsCount < permissions.admins_count) {
            this.handleAddMember(inputs);
         } else if (mainApp.plan_name.includes('essential') && members.adminsCount < permissions.admins_count) {
            this.handleAddMember(inputs);
         } else if (mainApp.plan_name.includes('surge') && members.adminsCount < permissions.admins_count) {
            this.handleAddMember(inputs);
         } else if (mainApp.plan_name.includes('infinite')) {
            this.handleAddMember(inputs);
         } else {
            this.setState({
               isShowPopup: true,
               popupTitle: 'Admins',
            });
         }
      } else {
         this.handleAddMember(inputs);
      }
   }

   handleClosePopup = () => {
      this.setState({
         isShowPopup: false,
      });
   }

   handleAddMember = async inputs => {
      const {
         addMember,
         selectedFilters,
         chooseCourses,
         getCurrentMember,
      } = this.props;
      const courseIdsArray = [];
      chooseCourses.forEach(e1 => selectedFilters.forEach(e2 => {
         if (e1.name === e2) {
            courseIdsArray.push(e1.id);
         }
      })
      );
      const newInputs = { ...inputs, course_ids: courseIdsArray };
      await addMember(newInputs);
      const { addMemberInProgress, defaultMemberId } = this.props;

      if (!addMemberInProgress) {
         await getCurrentMember(defaultMemberId);
         this.setState({
            newMember: {
               email: '',
               password: '',
               name: '',
               role: 0,
               company_name: '',
            },
            addingMember: false,
         });
      }
   };

   handlePauseCurrentMemberCourse = courseId => {
      const { pauseCurrentMemberCourse, currentMember } = this.props;
      const memberId = currentMember.id;
      pauseCurrentMemberCourse(memberId, courseId);
   };

   handleAddCurrentMemberCourse = (memberId, courseId, planId) => {
      const { addCurrentMemberCourse } = this.props;
      addCurrentMemberCourse(memberId, courseId, planId);
   }

   handleAssignMemberRole = (memberId, role) => {
      const { assignRole } = this.props;
      assignRole(memberId, role);
   }

   handleDeleteCurrentMemberCourse = courseId => {
      this.setState({ courseId });
   };

   handleDeleteModalOpen = () => {
      // this.setState({ delModalOpen: false });
   };

   handleDeleteCourseApprove = () => {
      const { currentMember, deleteCurrentMemberCourse } = this.props;
      const memberId = currentMember.id;
      const { courseId } = this.state;
      deleteCurrentMemberCourse(memberId, courseId);
      // this.setState({ delModalOpen: false });
   };

   handleCheckUser = (user, type) => {
      const { checkedAdmins, checkedMembers } = this.state;
      if (type === 'admin') {
         const isUserChecked = checkedAdmins.find((e) => e.email === user.email);
         if (isUserChecked) {
            this.setState({
               checkedAdmins: [...checkedAdmins.filter((e) => e.email !== user.email)],
            });
         } else {
            this.setState({
               checkedAdmins: [...checkedAdmins, user],
            });
         }
         return;
      }
      const isUserChecked = checkedMembers.find((e) => e.email === user.email);
      if (isUserChecked) {
         this.setState({
            checkedMembers: [...checkedMembers.filter((e) => e.email !== user.email)],
         });
      } else {
         this.setState({
            checkedMembers: [...checkedMembers, user],
         });
      }
   }

   handleCheckAllUsers = (type) => {
      const { checkedAdmins, checkedMembers } = this.state;
      const { members } = this.props;
      const Admins = members.data.filter(member => member.role !== 0);
      const Users = members.data.filter(member => member.role === 0);
      if (type === 'admin') {
         if (checkedAdmins.length === Admins.length) {
            this.setState({
               checkedAdmins: [],
            });
         } else {
            this.setState({
               checkedAdmins: [...Admins],
            });
         }
         return;
      }
      if (checkedMembers.length === Users.length) {
         this.setState({
            checkedMembers: [],
         });
      } else {
         this.setState({
            checkedMembers: [...Users],
         });
      }
   }


   handleDeleteMember = async (id, callBack) => {
      const { deleteMember, currentMember } = this.props;
      const { searchValue, advancedFilterOption } = this.state;
      const isFiltered = Boolean(searchValue) || Boolean(advancedFilterOption);
      deleteMember(id, callBack, isFiltered);
      if (currentMember.id === id) {
         const {
            getCurrentMember,
            getMemberTransactions,
            getMemberNotes,
            defaultMemberId,
            dataIsFetching,
         } = this.props;
         this.switchToAddingMember(false);
         if (!dataIsFetching && defaultMemberId) {
            await getCurrentMember(defaultMemberId);
            await getMemberNotes(defaultMemberId);
            await getMemberTransactions(defaultMemberId);
         }
      }
   };

   goToBack = () => {
      const { addingMember, isMobileChangeTab } = this.state;
      const { goToDashboard, getCurrentMemberAction } = this.props;
      if (!addingMember && !isMobileChangeTab) {
         goToDashboard();
      } else {
         this.setState({
            addingMember: false,
            isMobileChangeTab: false,
         });
         const data = {
            courses: null,
            last_login_at: null,
         };
         getCurrentMemberAction(data);
      }
   };

   exportMembersCSV = () => {
      const {
         date_from,
         date_to,
         searchValueLast,
         advancedFilterOption,
         advancedFilterName,
         advancedFilterLogin,
      } = this.state;
      let lastLoginWas = advancedFilterName;
      let params = {
         search: searchValueLast,
         date_from,
         date_to,
         [advancedFilterOption]: advancedFilterName,
      };
      if (advancedFilterOption === 'last_login_' && advancedFilterName) {
         lastLoginWas = moment(lastLoginWas).format('Y-MM-d');
         params = {
            search: searchValueLast,
            date_from,
            date_to,
            [advancedFilterOption]: advancedFilterName,
            [advancedFilterLogin]: lastLoginWas,
         };
      }

      const query = QueryParams.generateQuery(params);
      const hiddenElement = document.createElement('a');
      hiddenElement.href = `${ apiUrl }/api/v1/members/export-to-csv?${ query.join(
         '&'
      ) }`;
      hiddenElement.click();
   };

   onAddValue = option => {
      const { addFilterOption } = this.props;
      addFilterOption(option);
   };

   onRemoveValue = option => {
      const { removeFilterOption } = this.props;
      removeFilterOption(option);
   };

   onChangeMembersPage = data => {
      const {
         searchValue,
         searchFrom,
         searchTo,
         advancedFilterOption,
         advancedFilterName,
      } = this.state;
      let date_from = null;
      let date_to = null;
      let filterLastName = advancedFilterOption;
      let filterLastValue = advancedFilterName;
      if (searchFrom) {
         date_from = moment(searchFrom).format('YYYY/MM/DD');
      }
      if (searchTo) {
         date_to = moment(searchTo).format('YYYY/MM/DD');
      }

      this.setState({
         date_from,
         date_to,
         searchValueLast: searchValue,
      });
      const { advancedFilterLogin } = this.state;

      if (advancedFilterOption === 'last_login_') {
         filterLastName = advancedFilterLogin;
         if (filterLastValue) {
            if (filterLastName === 'last_login_after') {
               filterLastValue = moment(advancedFilterName)
                  .add(1, 'days')
                  .format('YYYY/MM/DD');
            } else {
               filterLastValue = moment(advancedFilterName).format(
                  'YYYY/MM/DD'
               );
            }
         }
      }
      const { changeMembersPage, authUser } = this.props;
      changeMembersPage(
         {
            search: searchValue,
            date_from,
            date_to,
            [filterLastName]: filterLastValue,
            page: data.currentPage,
            count: 30,
         },
         authUser.id
      );
   };

   handleSelectMember = (id) => {
      const { moreMember } = this.props;
      moreMember(id);
   }

   handleChooseNote = id => {
      const { chooseNote } = this.props;
      chooseNote(id);
   };

   handleUpdateNote = (id, userId, inputs) => {
      const { updateNote } = this.props;
      updateNote(id, userId, inputs);
   };

   removeFile = uuid => {
      AuthApi.removeFileFromUploadcare(uuid);
   };

   handleBulkDelete(type) {
      const { bulkDelete } = this.props;
      const { checkedAdmins, checkedMembers } = this.state;
      if (type === 'admin') {
         bulkDelete(checkedAdmins.map((e) => e.id), () => {
            this.setState({
               checkedAdmins: [],
            });
            this.onChangeMembersPage({ currentPage: 1 });
         });
         return;
      }
      bulkDelete(checkedMembers.map((e) => e.id), () => {
         this.setState({
            checkedMembers: [],
         });
         this.onChangeMembersPage({ currentPage: 1 });
      });
   }

   handleFilterChecklist(id) {
      const { checkedAdmins, checkedMembers } = this.state;

      this.setState({
         checkedAdmins: checkedAdmins.filter(e => e.id !== id),
         checkedMembers: checkedMembers.filter(e => e.id !== id),
      });
   }

   render() {
      const {
         members,
         dataIsFetching,
         tags,
         chooseCourses,
         addCourseProgress,
         isPopupChangeInProgress,
         onAttachManyTags,
         isOpenBulk,
         initialLength,
         plans,
         isEmptyByFilter,
         onlineUsers,
         showFullScreenLoader
      } = this.props;
      const {
         searchValue,
         searchFrom,
         searchTo,
         advancedFilterOption,
         advancedFilterName,
         advancedFilterLogin,
         checkedAdmins,
         checkedMembers,
         isOpenMobSearch,
         isShowPopup,
         popupTitle,
         selectedSortedVariant
      } = this.state;

      return (
         <>
            {
               isShowPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ this.handleClosePopup } />, document.body)
            }
            <MobileHeader>
               <SiteHeader
                  isLeftAction
                  goToBack={ () => {} }
                  isMobSearchOpen
                  setIsOpenMobSearch={ () => {
                     this.setState({
                        isOpenMobSearch: !isOpenMobSearch,
                     });
                  } }
               />
            </MobileHeader>
            <Container>
               {
                  showFullScreenLoader && (
                     <LoaderSpinner />
                  )
               }
               {dataIsFetching || addCourseProgress || isPopupChangeInProgress ? (
                  <LoaderSpinner />
               ) : (
                  <MembersNew
                     checkedAdmins={ checkedAdmins }
                     checkedMembers={ checkedMembers }
                     dataIsFetching={ dataIsFetching }
                     isOpenBulk={ isOpenBulk }
                     onCheck={ this.handleCheckUser }
                     initialLength={ initialLength }
                     members={ members }
                     coursesOption={ chooseCourses }
                     searchValue={ searchValue }
                     tags={ tags }
                     selectedSortedVariant={selectedSortedVariant}
                     createTag={ (memberId, value) => this.handleAddTag(memberId, value) }
                     selectedAdvancedFilter={ advancedFilterOption }
                     exportCSV={ this.exportMembersCSV }
                     handleCreateNote={ (memberId, inputs) => this.handleCreateNote(memberId, inputs) }
                     handleDeleteMember={ (id) => {
                        this.handleDeleteMember(id, () => this.handleFilterChecklist(id));
                     } }
                     bulk
                     handleSendPassword={ id => this.handleSendPassword(id) }
                     advancedFilterLogin={ advancedFilterLogin }
                     onAssignRole={ (memberId, role) => this.handleAssignMemberRole(memberId, role) }
                     onAddToCourse={
                        (memberId, courseId, planId) => this.handleAddCurrentMemberCourse(memberId, courseId, planId)
                     }
                     handleUploadCSVClick={ this.handleUploadCSVClick }
                     handleSearch={ (
                        value,
                        from,
                        to,
                        filterName,
                        filterValue,
                        isAdvanced,
                        sortBy
                     ) => this.handleSearch(
                        value,
                        from,
                        to,
                        filterName,
                        filterValue,
                        isAdvanced,
                        sortBy
                     )
                     }
                     bulkDelete={ (type) => this.handleBulkDelete(type) }
                     searchFrom={ searchFrom }
                     onChangeMembersPage={ this.onChangeMembersPage }
                     onSaveMemberTags={ (memberId, addedTags) => onAttachManyTags(memberId, addedTags) }
                     handleResetFilter={ () => this.handleResetFilter() }
                     searchTo={ searchTo }
                     advancedFilterName={ advancedFilterName }
                     handleInternalInputChange={ (name, value) => this.handleInternalInputChange(name, value) }
                     onCheckAll={ this.handleCheckAllUsers }
                     selectMember={ (id) => this.handleSelectMember(id) }
                     addMember={ (inputs) => this.newHandleAddMember(inputs) }
                     plans={ plans }
                     isEmptyByFilter={ isEmptyByFilter }
                     isOpenMobSearch={ isOpenMobSearch }
                     onlineUsers={ onlineUsers }
                  />
               )}

            </Container>
         </>
      );
   }
}

const mapStateToProps = state => {
   return {
      mainApp: mainAppSelector(state),
      members: selectors.membersSelector(state),
      isOpenBulk: state.common.authUser.member_bulk_import,
      currentMember: selectors.currentMemberSelector(state),
      memberTransactions: selectors.memberTransactionsSelector(state),
      memberNotes: selectors.memberNotesSelector(state),
      tags: selectors.tagsSelector(state),
      currentMemberInitialData: selectors.currentMemberInitialDataSelector(
         state
      ),
      dataIsFetching: selectors.dataIsFetchingSelector(state),
      innerActionInProgress: selectors.innerActionInProgressSelector(state),
      transactionsInProgress: selectors.transactionsInProgressSelector(state),
      NotesInProgress: selectors.NotesInProgressSelector(state),
      noteActionProgress: selectors.noteActionProgressSelector(state),
      tagsActionProgress: selectors.tagsActionProgressSelector(state),
      courses: selectors.currentMemberCoursesSelector(state),
      lastLogin: selectors.currentMemberLastLoginSelector(state),
      chooseCourses: selectors.chooseCoursesSelector(state),
      selectedFilters: selectors.selectedFiltersSelector(state),
      defaultMemberId: selectors.defaultMemberIdSelector(state),
      addMemberInProgress: selectors.addMemberInProgressSelector(state),
      currentNote: selectors.currentNoteSelector(state),
      authUser: authUserSelector(state),
      addCourseProgress: selectors.getProgressAddCourse(state),
      isPopupChangeInProgress: selectors.getPopupChangesProgress(state),
      initialLength: selectors.initialLengthSelector(state),
      plans: plansSelector(state),
      isEmptyByFilter: selectors.isEmptyByFilterSelector(state),
      onlineUsers: onlineUsersSelector(state),
      siteInfo: siteInfoSelector(state),
      showFullScreenLoader: selectors.showFullScreenLoaderSelector(state),
   };
};

const mapDispatchToProps = dispatch => {
   return {
      setInput: (key, value, isCustomField) => {
         dispatch(setInputAction(key, value, isCustomField));
      },
      getMembers: async id => {
         await dispatch(operations.getMembersOperation(id));
      },

      getCurrentMember: async id => {
         await dispatch(operations.getCurrentMemberOperation(id));
      },
      getMemberTransactions: async id => {
         await dispatch(operations.getMemberTransactionsOperation(id));
      },
      onAttachManyTags: async (memberId, tags) => {
         await dispatch(operations.attachManyTagsOperation(memberId, tags));
      },

      getMemberNotes: async id => {
         await dispatch(operations.getMemberNotesOperation(id));
      },

      sendPassword: (id, inputs) => {
         dispatch(operations.sendPasswordOperation(id, inputs));
      },

      putMember: async (id, inputs, courseArrays, fieldValues) => {
         await dispatch(
            operations.putCurrentMemberOperation(
               id,
               inputs,
               courseArrays,
               fieldValues
            )
         );
      },
      createNote: (id, inputs) => dispatch(operations.createNoteOperation(id, inputs)),

      deleteNote: (userId, noteId) => {
         dispatch(operations.deleteNoteOperation(userId, noteId));
      },

      updateNote: (id, userId, inputs) => {
         dispatch(operations.updateNoteOperation(id, userId, inputs));
      },

      addTag: (memberId, inputs, isNew) => dispatch(operations.addTagOperation(memberId, inputs, isNew)),

      detachTag: (memberId, tagId) => {
         dispatch(operations.detachTagOperation(memberId, tagId));
      },
      atachTag: (memberId, tagId) => {
         dispatch(operations.atachTagOperation(memberId, tagId));
      },

      searchMember: async ({ ...params }, sortBy) => {
         await dispatch(operations.searchMemberOperation(params, sortBy));
      },
      changeMembersPage: ({ ...params }, id) => {
         dispatch(operations.changeMembersPageOperation(params, id));
      },
      moreMember: (id) => {
         dispatch(push(Router.route('ADMIN_MEMBER_VIEW').getCompiledPath({ id })));
      },
      addMember: async inputs => {
         await dispatch(operations.addMemberOperation(inputs));
      },
      pauseCurrentMemberCourse: (memberId, courseId) => {
         dispatch(
            operations.pauseCurrentMemberCourseOperation(memberId, courseId)
         );
      },
      addCurrentMemberCourse: (memberId, courseId, planId) => {
         dispatch(
            operations.addCurrentMemberCourseOperation(memberId, courseId, planId)
         );
      },
      assignRole: (memberId, role) => {
         dispatch(
            operations.assignRoleOperation(memberId, role)
         );
      },
      deleteCurrentMemberCourse: (memberId, courseId) => {
         dispatch(
            operations.deleteCurrentMemberCourseOperation(memberId, courseId)
         );
      },
      deleteMember: (id, callBack, isFiltered) => {
         dispatch(operations.deleteMemberOperation(id, callBack, isFiltered));
      },
      goToDashboard: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      getCurrentMemberAction: data => {
         dispatch(getCurrentMemberCompleted(data));
      },
      importMembers: data => {
         dispatch(operations.importMembersOperation(data));
      },
      filterByCourses: () => dispatch(operations.filterByCoursesOperation()),
      addFilterOption: option => {
         dispatch(addFilterOptionAction(option));
      },
      removeFilterOption: option => {
         dispatch(removeFilterOptionAction(option));
      },
      chooseNote: id => {
         dispatch(chooseNoteAction(id));
      },
      setNoteInput: (key, value) => {
         dispatch(setNoteInputAction(key, value));
      },
      emptyCourseFilter: () => {
         dispatch(emptyCourseFilterAction());
      },
      bulkDelete: (data, callBack) => {
         dispatch(operations.bulkDeleteMemberOperation(data, callBack));
      },
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MembersContainer);
