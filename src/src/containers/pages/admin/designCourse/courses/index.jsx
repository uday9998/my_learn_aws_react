import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import {
   authUserSelector, appSelector, screenWidthSelector, siteInfoSelector,
   mainAppSelector, 
} from 'state/modules/common/selectors';
import * as selectors from 'state/modules/designCourse/courses/selectors';
import * as operations from 'state/modules/designCourse/courses/operations';
import BaseHeader from 'views/layout/DesignCourse/BaseHeader';
import DesignCourse from 'views/pages/DesignCourse';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import Modal from 'components/elements/Modal';
import ChooseCoursePaths from 'components/modules/designCourse/courseMaterial/AddCoursePaths';
import { chooseCourseLinkCompleted, setInputAction } from 'state/modules/designCourse/courses/actions';
import withLoading from 'utils/withLoading';
import DeleteModal from 'components/elements/DeleteModal';
import moment from 'moment';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import { portalId } from 'utils/constants';
import CoursesFilter from 'views/pages/DesignCourse/CoursesFilter';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import _ from 'lodash';


const ChooseCoursePathsLoading = withLoading(ChooseCoursePaths);

class CoursesContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      getCourses: PropTypes.func.isRequired,
      courses: PropTypes.array.isRequired,
      authUser: PropTypes.object,
      selectCourse: PropTypes.func.isRequired,
      hideCourse: PropTypes.func,
      duplicateCourse: PropTypes.func,
      deleteCourse: PropTypes.func,
      chooseCourseLink: PropTypes.func,
      currentCourse: PropTypes.object,
      goTo: PropTypes.func,
      setInput: PropTypes.func,
      updateCourseLink: PropTypes.func,
      duplicateCourseInProgress: PropTypes.bool,
      getCoursesInProgress: PropTypes.bool,
      getDefaultNames: PropTypes.func,
      getFilteredCourses: PropTypes.func,
      totalCourses: PropTypes.number,
      defaultNames: PropTypes.array,
      fetchDefaultNames: PropTypes.bool,
      chooseDefaultName: PropTypes.func,
      showCourse: PropTypes.func,
      app: PropTypes.object,
      deleteCoursesByIds: PropTypes.func,
      duplicateCoursesByIds: PropTypes.func,
      isEmptyByFilter: PropTypes.bool,
      errors: PropTypes.object,
      screenWidth: PropTypes.number,
      felteredCoursesInProgress: PropTypes.bool,
      siteInfo: PropTypes.object,
      mainApp: PropTypes.object,
   };

   constructor(props) {
      super(props);
      this.state = {
         isShowPopup: false,
         popupTitle: '',
         searchField: '',
         deleteCourseModalOpen: false,
         courseId: 0,
         courseLinksModalOpen: false,
         copyView: '',
         searchText: '',
         modalType: null,
         openModal: false,
         courseName: '',
         courseType: '',
         isCreatation: true,
         coursesSortingValue: 'recently_updated',
         isMultiSelected: false,
         selectedCoursesIds: [],
         deleteMultipleModalIsOpen: false,
         filter: 'all',
         isMobSearchOpen: false,
         isMobileTable: false,
         isActiveSearch: true,
      };
   }

   componentDidMount() {
      const handleActiveSearch = () => {
         this.setState({ isActiveSearch: false });
      };
      const { getCourses } = this.props;
      getCourses(1, {}, false, handleActiveSearch);

      window.addEventListener('resize', this.handleResize);
      this.handleResize();
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
   }


   changeCoursePage = (data) => {
      const { getFilteredCourses, screenWidth } = this.props;
      const { currentPage } = data;
      const { searchText } = this.state;
      getFilteredCourses(currentPage, searchText, () => {
         document.querySelector(screenWidth < 1025 ? '.adminContent' : '.adminContainer')
            ?.scrollTo({
               top: 0,
               left: 0,
            });
      });
   }

   handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      this.setState({ isMobileTable: isMobile });
   };


   handleInternalInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }

   switchCoursePaths = (type, bool) => {
      this.setState({
         modalType: type,
         openModal: bool,
         courseName: '',
      });
   }

   setIsOpenMobSearch = (value) => {
      const { isMobSearchOpen } = this.state;
      this.setState({
         isMobSearchOpen: !isMobSearchOpen,
      });
   }

   handleInputChange = (name, value) => {
      const { getCourses } = this.props;
      this.setState({ searchField: value });
      const { filter, coursesSortingValue } = this.state;
      getCourses(1, { filter, searchValue: value, sort: coursesSortingValue }, true);
   }

   handleSelectCourse = (id, type, course) => {
      const { selectCourse } = this.props;
      if (type === 'community') {
         const groupId = course.communities?.room_groups[0]?.id;
         const roomId = course.communities?.rooms[0]?.id;
         if (roomId) {
            window.open(`/admin/community/${ id }#${ roomId }-${ groupId }-posts`, '_self');
         } else {
            window.open(`/admin/community/${ id }`, '_self');
         }
        
         return;
      }
      selectCourse(id);
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }

   showCourse = (e, id, params) => {
      e.stopPropagation();
      const { showCourse } = this.props;
      let isShowCourse = params;
      if (isShowCourse === 1) {
         isShowCourse = 0;
      } else {
         isShowCourse = 1;
      }
      showCourse(id, { show_course: isShowCourse });
   }

   handleDuplicateCourse = async (e, id) => {
      const { isCreatation } = this.state;
      if (isCreatation) {
         this.setState({ isCreatation: false });
         e.stopPropagation();
         const { duplicateCourse } = this.props;
         await duplicateCourse(id);
         const { duplicateCourseInProgress } = this.props;
         if (!duplicateCourseInProgress) {
            this.setState({ isCreatation: true });
            // this.scrollToBottom();
            const { getCourses } = this.props;
            getCourses(1);
         }
      } else {
         e.stopPropagation();
      }
   }

   handleDeleteCourse = (e, id) => {
      e.stopPropagation();
      this.setState({ deleteCourseModalOpen: true, courseId: id });
   }

   handleCancelDeleteCourse = () => {
      this.setState({ deleteCourseModalOpen: false });
   }

   handleApproveDeleteCourse = () => {
      const { deleteCourse } = this.props;
      const { courseId, filter, searchValue } = this.state;
      const isFiltered = filter !== 'all' && !searchValue;
      deleteCourse(courseId, isFiltered);
      this.setState({ deleteCourseModalOpen: false });
   }

   handleCourseLinks = (e, id) => {
      const { chooseCourseLink } = this.props;
      e.stopPropagation();

      chooseCourseLink(id);
      this.setState({ courseLinksModalOpen: true, courseId: id });
   }

   handleCancelCourseLinks = () => {
      this.setState({ courseLinksModalOpen: false });
   }

   onInputChange = (name, value) => {
      this.setState({ [name]: value });
   }

   handleApproveCourseLinks = () => {
      const { currentCourse, updateCourseLink } = this.props;
      const currentUrl = {
         url: currentCourse.url,
         landing_url: currentCourse.landing_url,
      };
      const id = currentCourse.id;
      updateCourseLink(id, currentUrl);
      this.setState({ courseLinksModalOpen: false });
   }

   copyCodeToClipboard = (text, id) => {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setTimeout(
         () => this.setState({
            copyView: id,
         }),
         0
      );
      setTimeout(
         () => this.setState({
            copyView: '',
         }),
         800
      );
   }

   onChooseCoursePath = (type) => {
      const { getDefaultNames } = this.props;

      switch (type) {
         case 'scratch':
            // addingCourse();
            this.setState({
               modalType: 'add-name',
            });
            break;
         case 'choose':
            getDefaultNames();
            this.setState({
               modalType: 'choose-name',
            });
            break;
         case 'micro':
         case 'full':
         case 'webinar':
            this.setState({
               courseType: type,
               modalType: 'add-name',
            });
            break;

         default:
            break;
      }
   }

   // scrollToBottom() {
   //    const el = document.getElementById('d-designCourse');
   //    el.scrollIntoView({ block: 'end', behavior: 'smooth' });
   // }

   sortbyHandle=(value) => {
      const { getCourses } = this.props;
      const { searchField, filter } = this.state;
      this.setState({
         coursesSortingValue: value,
      });
      getCourses(1, { sort: value, searchValue: searchField, filter });
   }

   filterbyHandle=(value) => {
      const { getCourses } = this.props;
      const { searchField, coursesSortingValue } = this.state;
      this.setState({
         filter: value,
      });
      getCourses(1, { filter: value, searchValue: searchField, sort: coursesSortingValue }, true);
   }

   handleChangeMultiSelect = (isMultiSelected) => {
      this.setState({
         isMultiSelected,
         selectedCoursesIds: [],
      });
   }

   handleOnCheckAll = () => {
      const { selectedCoursesIds } = this.state;
      const { courses } = this.props;
      if (courses.length === selectedCoursesIds.length) {
         this.setState({
            selectedCoursesIds: [],
         });
      } else {
         const ids = courses.map((post) => post.id);
         this.setState({
            selectedCoursesIds: ids,
         });
      }
   }

   handleOnCheckItem = (id) => {
      const { selectedCoursesIds } = this.state;
      if (!selectedCoursesIds.includes(id)) {
         this.setState({
            selectedCoursesIds: [...selectedCoursesIds, id],
         });
      } else {
         this.setState({
            selectedCoursesIds: (selectedCoursesIds.filter((i) => i !== id)),
         });
      }
   }

   onRemoveSelected = (value) => {
      this.setState({
         deleteMultipleModalIsOpen: value,
      });
   }

   onAcceptRemove = (isDuplicate) => {
      const { selectedCoursesIds } = this.state;
      if (selectedCoursesIds.length > 0) {
         const { deleteCoursesByIds, duplicateCoursesByIds } = this.props;
         this.handleChangeMultiSelect(false);
         this.setState({
            deleteMultipleModalIsOpen: false, coursesSortingValue: 'recently_updated', filter: 'all',
         });
         if (isDuplicate) {
            duplicateCoursesByIds(selectedCoursesIds);
         } else {
            deleteCoursesByIds(selectedCoursesIds);
         }
      }
   }

   hideCourseHandle = (courseId, value, data) => {
      const { hideCourse } = this.props;
      let params = {};
      if (value !== 3) {
         hideCourse(courseId, value);
      } else if (value === 3 && typeof data === 'object') {
         if (data.type === 'custom') {
            params.drip_type = 'custom';
            if (data.time) {
               const time = moment(`${ data.time } ${ data.timeType }`, ['h:mm A']).format('HH:mm:ss');
               params.drip_days = `${ moment(data.date).format('YYYY-MM-DD ') }${ time }`;
            } else {
               params.drip_days = `${ data.date }`;
            }
         } else {
            params = {
               drip_type: data.type,
               drip_days: `${ data.count }`,
            };
         }
         hideCourse(courseId, value, params);
      } else if (isPrint(('The date  field is required.'))) {
         toast.error('The date field is required.');
      }
   }

   handleAddProduct = () => {
      const {
         goTo, siteInfo: { permissions }, courses, mainApp, 
      } = this.props;

      const onlineCourseCount = _.filter(courses, ['type', '0']).length;
      const communityCount = _.filter(courses, ['type', '1']).length;
      const isMembership = _.filter(courses, ['type', '2']).length;

      if (Array.isArray(permissions)) {
         goTo(Router.route('ADMIN_COURSES_CREATE').getMask());
      } else if (permissions.course && permissions.commmunities && onlineCourseCount === permissions.course?.courses_count && communityCount === permissions.commmunities?.count && isMembership) {
         this.setState({
            isShowPopup: true,
            popupTitle: 'Product',
         });
      } else {
         goTo(Router.route('ADMIN_COURSES_CREATE').getMask());
      }
   }

   handleClosePopup = () => {
      this.setState({
         isShowPopup: false,
      });
   }

   render() {
      const {
         courses, currentCourse, goTo,
         getCoursesInProgress, totalCourses,
         defaultNames,
         fetchDefaultNames,
         chooseDefaultName,
         authUser,
         app,
         isEmptyByFilter,
         errors,
         felteredCoursesInProgress,
         duplicateCourseInProgress,
      } = this.props;

      const {
         searchField, deleteCourseModalOpen,
         courseLinksModalOpen, copyView,
         modalType, openModal, courseName,
         courseType,
         coursesSortingValue,
         deleteMultipleModalIsOpen,
         selectedCoursesIds,
         isMultiSelected,
         filter,
         isMobSearchOpen,
         isMobileTable,
         isActiveSearch,
         isShowPopup,
         popupTitle,
      } = this.state;

      return (
         <Container>
            {
               isShowPopup && createPortal(<PricingPopup isProduct={ true } popupTitle={ popupTitle } handleClosePopup={ this.handleClosePopup } />, document.body)
            }
            <Container.Header>
               <SiteHeader
                  title='Courses'
                  tooltip='This is where you can create new programs and organize existing ones.'
                  goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
                  goBack
                  isLeftAction
                  setIsOpenMobSearch={ this.setIsOpenMobSearch }
                  isMobSearchOpen={ isMobSearchOpen }
               />
               <BaseHeader
                  switchAddingCourse={ this.handleAddProduct }
                  tooltip='This is where you can create new programs and organize existing ones.'
                  goToCategories={ () => goTo(Router.route('ADMIN_CATEGORIES').getMask()) }
                  marginTop={ 0 }
               />
            </Container.Header>
            <Container.Content>

               {isActiveSearch && (
                  <CoursesFilter
                     isMob={ isMobileTable }
                     courses={ courses }
                     handleDeleteCourse={ this.handleDeleteCourse }
                     goTo={ goTo }
                     isMultiSelected={ isMultiSelected }
                     searchValue={ searchField }
                     setSearchValue={ this.handleInputChange }
                     checkedItemsLength={ selectedCoursesIds.length }
                     selectedCoursesIds={ selectedCoursesIds }
                     onCheck={ this.handleOnCheckAll }
                     setIsMultiSelected={ this.handleChangeMultiSelect }
                     onFilter={ this.sortbyHandle }
                     onStatusFilter={ this.filterbyHandle }
                     coursesSortingValue={ coursesSortingValue }
                     onRemoveSelected={ () => this.onRemoveSelected(true) }
                     options={ this.options }
                     searchOnEnter={ this.handleSearch }
                     filter={ filter }
                     onAcceptRemove={ this.onAcceptRemove }
                     totalCourses={ totalCourses }
                     isMobSearchOpen={ isMobSearchOpen }
                     isDeleteDisabled={
                        false
                     }
                  />
               )}

               <DesignCourse
                  isMobileTable={ isMobileTable }
                  courses={ courses }
                  searchField={ searchField }
                  handleInternalInputChange={ (name, value) => this.handleInternalInputChange(name, value) }
                  handleSearch={ (param) => this.handleSearch(param) }
                  switchAddingCourse={ () => this.switchCoursePaths('choose-path', true) }
                  selectCourse={ (id, type, course) => this.handleSelectCourse(id, type, course) }
                  showCourse={ (e, id, params) => this.showCourse(e, id, params) }
                  handleDuplicateCourse={ (e, id) => this.handleDuplicateCourse(e, id) }
                  handleDeleteCourse={ (e, id) => this.handleDeleteCourse(e, id) }
                  deleteCourseModalOpen={ deleteCourseModalOpen }
                  handleCancelDeleteCourse={ this.handleCancelDeleteCourse }
                  handleApproveDeleteCourse={ this.handleApproveDeleteCourse }
                  courseLinksModalOpen={ courseLinksModalOpen }
                  handleCourseLinks={ (e, id) => this.handleCourseLinks(e, id) }
                  handleCancelCourseLinks={ this.handleCancelCourseLinks }
                  handleApproveCourseLinks={ this.handleApproveCourseLinks }
                  currentCourse={ currentCourse }
                  goTo={ goTo }
                  copyCodeToClipboard={ (text, id) => this.copyCodeToClipboard(text, id) }
                  copyView={ copyView }
                  handleInputChange={ (name, value) => this.handleInputChange(name, value) }
                  getCoursesInProgress={ getCoursesInProgress }
                  totalCourses={ totalCourses }
                  changeCoursePage={ (data) => this.changeCoursePage(data) }
                  authUser={ authUser }
                  app={ app }
                  coursesSortingValue={ coursesSortingValue }
                  onFilter={ this.sortbyHandle }
                  onStatusFilter={ this.filterbyHandle }
                  isMultiSelected={ isMultiSelected }
                  setIsMultiSelected={ this.handleChangeMultiSelect }
                  checkedItemsLength={ selectedCoursesIds.length }
                  onCheckAll={ this.handleOnCheckAll }
                  onCheck={ this.handleOnCheckItem }
                  filter={ filter }
                  onRemoveSelected={ () => this.onRemoveSelected(true) }
                  selectedCoursesIds={ selectedCoursesIds }
                  hideCourseHandle={ this.hideCourseHandle }
                  onAcceptRemove={ this.onAcceptRemove }
                  isMobSearchOpen={ isMobSearchOpen }
                  createProduct={ () => goTo(Router.route('ADMIN_COURSES_CREATE').getMask()) }
                  isEmptyByFilter={ isEmptyByFilter }
                  felteredCoursesInProgress={ felteredCoursesInProgress }
                  duplicateCourseInProgress={ duplicateCourseInProgress }
               />
               {
                  openModal && (
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition={ window.innerWidth >= 721 ? 'center' : 'full-screen' }
                        closeOnClickOutside={ true }
                        contentWidth={ window.innerWidth >= 721 ? 'auto' : '100%' }
                        onClose={ () => this.switchCoursePaths(null, false) }
                        className='chooseCoursePaths-modals'
                     >
                        <ChooseCoursePathsLoading
                           isLoading={ fetchDefaultNames }
                           onChooseCoursePath={ this.onChooseCoursePath }
                           modalType={ modalType }
                           onClickCancel={ (name, bool) => this.switchCoursePaths(name, bool) }
                           courseName={ courseName }
                           onClickCreate={ () => chooseDefaultName(courseName, courseType) }
                           onInputChange={ this.onInputChange }
                           defaultNames={ defaultNames }
                        />

                     </Modal>
                  )
               }
               {
                  deleteMultipleModalIsOpen && (
                     <DeleteModal
                        title={ `Are you sure you want to delete the ${ selectedCoursesIds.length }  selected  ${ selectedCoursesIds.length > 1 ? 'products' : 'product' }?` }
                        deleteText='Delete'
                        maxWidth={ 465 }
                        onDelete={ () => { this.onAcceptRemove(false); } }
                        onCancel={ () => this.onRemoveSelected(false) }
                     />
                  )
               }
            </Container.Content>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      courses: selectors.coursesSelector(state),
      currentCourse: selectors.currentCourseSelector(state),
      duplicateCourseInProgress: selectors.duplicateCourseInProgressSelector(state),
      getCoursesInProgress: selectors.getCoursesInProgressSelector(state),
      totalCourses: selectors.totalCoursesSelector(state),
      defaultNames: selectors.defaultNamesSelector(state),
      fetchDefaultNames: selectors.fetchDefaultNamesSelector(state),
      authUser: authUserSelector(state),
      app: appSelector(state),
      isEmptyByFilter: selectors.isEmptyByFilterSelector(state),
      errors: selectors.errorsSelector(state),
      screenWidth: screenWidthSelector(state),
      felteredCoursesInProgress: selectors.felteredCoursesInProgressSelector(state),
      siteInfo: siteInfoSelector(state),
      mainApp: mainAppSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('COURSES').getCompiledPath(portalId)));
      },

      selectCourse: (id) => {
         dispatch(push(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id })));
      },
      addingCourse: () => {
         dispatch(push(Router.route('ADMIN_COURSES_CREATE').getMask()));
      },

      getCourses: (pageNum, params, isByFilter, searchFunc) => {
         dispatch(operations.getCoursesOperation(pageNum, params, isByFilter, searchFunc));
      },
      getFilteredCourses: (pageNum, params, callback) => {
         dispatch(operations.filteredGetCoursesOperation(pageNum, params, callback));
      },
      hideCourse: (id, isPublished, publishDate, publishTime) => {
         dispatch(operations.hideCourseOperation(id, isPublished, publishDate, publishTime));
      },
      duplicateCourse: async (id) => {
         await dispatch(operations.duplicateCourseOperation(id));
      },
      deleteCourse: (id, isFiltered) => {
         dispatch(operations.deleteCourseOperation(id, isFiltered));
      },
      chooseCourseLink: (id) => {
         dispatch(chooseCourseLinkCompleted(id));
      },
      goTo: (location) => {
         dispatch(push(location));
      },
      setInput: (key, value) => {
         dispatch(setInputAction(key, value));
      },
      updateCourseLink: (id, inputs) => {
         dispatch(operations.updateCourseLinkOperation(id, inputs));
      },
      showCourse: (id, inputs) => {
         dispatch(operations.showCourseOperation(id, inputs));
      },
      getDefaultNames: () => {
         dispatch(operations.getDefaultNamesOperation());
      },
      chooseDefaultName: (name, type) => {
         dispatch(operations.chooseDefaultNameOperation(name, type));
      },
      deleteCoursesByIds: (ids) => {
         dispatch(operations.deleteCoursesByIdsOperation(ids));
      },
      duplicateCoursesByIds: (ids) => {
         dispatch(operations.duplicateCoursesByIdsOperation(ids));
      },

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
