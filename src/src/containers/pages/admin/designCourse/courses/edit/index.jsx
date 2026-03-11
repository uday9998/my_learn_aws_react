/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Container from 'views/layout/AdminContainer';
import Router from 'routes/router';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import DesignCourseGeneral from 'views/pages/DesignCourse/DesingCourseGeneral';
import {
   setInput as setInputAction,
   setResourceInput as setResourceInputAction,
   openResourceEdit as openResourceEditAction,
   chooseSection as chooseSectionAction,
   setCurrentPricing as setCurrentPricingAction,
   setPlanInput as setPlanInputAction,
   setCouponInput as setCouponInputAction,
   showCouponPopup as showCouponPopupAction,
   reloadReduxState as reloadReduxStateAction,
   setSignUpInput as setSignUpInputAction,
   updateSettingsInput as updateSettingsAction,
   clearLessonData as clearLessonDataAction,
   chooseTestimonialAction,
   chooseBulletAction,
   addTestimonial as addTestimonialAction,
   addBullet as addBulletAction,
   addQuestion as addQuestionAction,
   addFilterOption as addFilterOptionAction,
   sectionOrderChangeCompleted,
} from 'state/modules/designCourse/edit/actions';
import SiteHeader from 'containers/modules/siteheader/index.mob';

import * as selectors from 'state/modules/designCourse/edit/selectors';
import {
   authUserSelector, appSelector, mainAppSelector, siteInfoSelector, 
} from 'state/modules/common/selectors';
import * as operations from 'state/modules/designCourse/edit/operations';
import { settingsGetOperation } from 'state/modules/settings/operations';
import { integrationSettingsSelector, getFileSizeSelector } from 'state/modules/settings/selectors';
import TabSwitch from 'components/elements/TabSwitch';
import { mediasSelector, isFetchingDataSelector } from 'state/modules/mediaLibrary/selectors';
// import { generatedArraySelector, generateInprogressSelector } from 'state/modules/designCourse/create/selectors';
// import { emptyGeneratedArray } from 'state/modules/designCourse/create/actions';
// import { generateTitleDescOperation } from 'state/modules/designCourse/create/operations';
import {
   getOpenAuthorPopupSelector,
   getOpenDeleteAuthorPopupSelector,
   getAllAuthorsSelector,
   isFetcheAuthorsSelector,
} from 'state/modules/designCourse/author/selectors';
import {
   getAuthorsDataOperation,
   createAuthorOperation,
   authorSaveOperation,
   deleteAuthorOperation,
} from 'state/modules/designCourse/author/operations';
import { getMedias } from 'state/modules/mediaLibrary/operations';
import isPrint from 'state/modules/designCourse/edit/Error';
import CourseInformation from 'views/pages/DesignCourse/CourseInformation';
import BridgeInformation from 'views/pages/DesignCourse/BridgeInformation';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import ProductSettings from 'views/pages/DesignCourse/ProductSettings';
import DeleteModal from 'components/elements/DeleteModal';

class CoursesContainer extends Component {
   static propTypes = {
      setInput: PropTypes.func.isRequired,
      courseMaterial: PropTypes.object,
      initDataInProgress: PropTypes.bool.isRequired,
      getCourse: PropTypes.func.isRequired,
      chooseSection: PropTypes.func.isRequired,
      deleteLesson: PropTypes.func.isRequired,
      currentSection: PropTypes.any,
      editSection: PropTypes.func.isRequired,
      createSection: PropTypes.func.isRequired,
      deleteSection: PropTypes.func.isRequired,
      user: PropTypes.object,
      saveLessonResource: PropTypes.func,
      saveLessonSettings: PropTypes.func,
      deleteLessonResource: PropTypes.func,
      deleteLessonAllResources: PropTypes.func,
      editLessonResource: PropTypes.func,
      goTo: PropTypes.func,
      authorsData: PropTypes.array,
      app: PropTypes.object,
      updateVideoImage: PropTypes.func,
      location: PropTypes.object,
      changeStatusSection: PropTypes.func,
      allCourses: PropTypes.array,
      isLoadingGeneral: PropTypes.bool,
      goToCategorys: PropTypes.func,
      transferSection: PropTypes.func,
      copySection: PropTypes.func,
      isFiltering: PropTypes.bool,
      filter: PropTypes.func,
      updateCourseProgress: PropTypes.bool,
      goToComments: PropTypes.func,
      saveProduct: PropTypes.func,
      progressSettings: PropTypes.bool,
      createBridge: PropTypes.func,
      siteInfo: PropTypes.object,
   };

   constructor(props) {
      super(props);
      this.state = {
         searchSection: '',
         deleteLessonModalOpen: false,
         searchLessonValue: '',
         errorMessages: {},
      };
      this.courseId = null;
      this.sectionId = null;
      this.lessonId = null;
      this.currencyInfo = null;
   }

   async componentDidMount() {
      const {
         match: { params: { id } },
         getCourse,
         getAuthorsData,
         getCourses,
      } = this.props;
      this.courseId = id;
      const { getIntegrations } = this.props;
      getIntegrations();
      getCourses();
      await getCourse(id);
      await getAuthorsData({ count: 'all' });
   }

   componentWillUnmount() {
      const { reloadReduxState } = this.props;
      reloadReduxState();
   }

   clearErrorMessages = () => {
      this.setState({ errorMessages: {} });
   };

   removeErrorMessage = (fieldName) => {
      this.setState((prevState) => ({
         errorMessages: {
            ...prevState.errorMessages,
            [fieldName]: [],
         },
      }));
   };

   addErrorMessages = (newErrors) => {
      this.setState((prevState) => ({
         errorMessages: {
            ...prevState.errorMessages,
            ...newErrors,
         },
      }));
   };

   addErrorsFromQuery = ({ data: { errors = {} } }) => {
      this.addErrorMessages(errors);

      return true;
   };

   handleAttachTag = (tagId) => {
      const { signUp: { advanced: { checkoutId } }, attachTag } = this.props;
      attachTag(this.courseId, checkoutId, tagId);
   }

   handledetachTag = (tagId) => {
      const { signUp: { advanced: { checkoutId } }, detachTag } = this.props;
      detachTag(this.courseId, checkoutId, tagId);
   }

   handleAddTag = (name) => {
      const { signUp: { advanced: { checkoutId } }, addTag } = this.props;
      addTag(this.courseId, checkoutId, name);
   }


   previewCheckout = () => {
      const { settings } = this.props;
      if (settings.pricings && settings.pricings.length) {
         // this.setState({ courseLinksModalOpen: true });
      }
   }

   headerPreviewCheckout = () => {
      const { settings } = this.props;
      if (settings.pricings && settings.pricings.length) {
         // this.setState({ courseLinksModalOpen: true });
      }
   }


   handleAddingSection = (bool, isMobileChange) => {
      if (isMobileChange) {
         this.onMobileSteteChange(true);
      }
      // this.setState({
      //    addingSection: bool,
      // });
   }

   handleInternalInputChange = (name, value) => {
      this.setState({
         [name]: value,
      });
   }

   handleInputChange = (name, value, target) => {
      const {
         setInput, setResourceInput, setSettingsInput, updateSettingsInput,
      } = this.props;
      if (target && target.name === 'lessonResources') {
         setResourceInput(name, value, target);
      } else if (target && target.name === 'lessonSettings') {
         setSettingsInput(name, value, target);
      } else if (target && (target === 'thank-you-page' || target === 'completion-message')) {
         updateSettingsInput(name, value);
      } else {
         setInput(name, value, target);
      }
   }

   openResourceEdit = (id) => {
      const { openResourceEdit } = this.props;
      openResourceEdit(id);
   }

   createSection = async (title) => {
      const { createSection } = this.props;
      await createSection(this.courseId, title);
      this.handleAddingSection(false);
      this.onMobileSteteChange(false);
   }

   editSection = (sectionId, params) => {
      const { editSection } = this.props;
      editSection(this.courseId, sectionId, params);
   }

   deleteSection = (sectionId) => {
      const { deleteSectionModalOpen } = this.state;
      this.sectionId = sectionId;
      this.setState({
         deleteSectionModalOpen: !deleteSectionModalOpen,
      });
      this.onMobileSteteChange(false);
   }

   addLesson = (sectionId, publishedStatus) => {
      const { createLesson, clearLessonData, courseMaterial } = this.props;
      clearLessonData();
      let type = 'Lesson';
      if (courseMaterial.course.type === '1') {
         type = 'Video';
      }
      const pathName = courseMaterial.course.type === '1' ? 'videos' : 'lessons';
      createLesson(this.courseId, sectionId, type, publishedStatus, pathName);
   };

   saveLesson = (sectionId, lessonId, params) => {
      const { saveLesson, saveLessonResource, saveLessonTitle } = this.props;
      if (params.type === 'resource') {
         saveLessonResource(this.courseId, sectionId, lessonId, params);
      } else if (params.type) {
         saveLesson(this.courseId, sectionId, lessonId, params);
      } else {
         saveLessonTitle(this.courseId, sectionId, lessonId, params);
      }
      // this.setState({ isOpenSelectVideoModal: false });
   };


   handleSaveVideoLessonImg = (videoId, imgSrc) => {
      const { updateVideoImage } = this.props;
      updateVideoImage(videoId, imgSrc);
   }

   saveLessonSettings = (sectionId, lessonId, params) => {
      const { saveLessonSettings } = this.props;
      saveLessonSettings(this.courseId, sectionId, lessonId, params);
   };


   editLessonResource = (sectionId, lessonId, params) => {
      const { editLessonResource } = this.props;
      editLessonResource(this.courseId, sectionId, lessonId, params);
   }

   deleteLessonResource = (sectionId, lessonId, resourceId) => {
      const { deleteLessonResource, deleteLessonAllResources } = this.props;
      if (resourceId === 'all') {
         deleteLessonAllResources(this.courseId, sectionId, lessonId);
      } else {
         deleteLessonResource(this.courseId, sectionId, lessonId, resourceId);
      }
   };

   deleteLesson = (sectionId, lessonId) => {
      this.sectionId = sectionId;
      this.lessonId = lessonId;
      const { deleteLessonModalOpen } = this.state;
      this.setState({
         deleteLessonModalOpen: !deleteLessonModalOpen,
      });
      // this.onMobileSteteChange(false);
   };

   deleteLessonApproved = async () => {
      const { deleteLesson } = this.props;
      await deleteLesson(this.courseId, this.sectionId, this.lessonId);
      const { deleteLessonModalOpen } = this.state;
      this.setState({
         deleteLessonModalOpen: !deleteLessonModalOpen,
      });
      // this.onMobileSteteChange(false);
   }

   onCancelLessonDelete = () => {
      this.setState({
         deleteLessonModalOpen: false,
      });
   }

   selectSection = (sectionId) => {
      const { chooseSection } = this.props;
      this.handleAddingSection(false);
      chooseSection(sectionId);
      this.onMobileSteteChange(true);
   }

   handleRatedSave = ratedIds => {
      const { match: { params: { id } }, updateCourse } = this.props;
      updateCourse(id, { rated_ids: ratedIds }, 'course-details');
   }


   courseHasVisibleLesson = () => {
      const { settings } = this.props;

      for (let i = 0; i < settings.sections.length; i++) {
         for (let j = 0; j < settings.sections[i].lessons.length; j++) {
            if (settings.sections[i].lessons[j].lesson_visiblity === 1 && !settings.sections[i].lessons[j].draft) {
               return true;
            }
         }
      }
      return false;
   }

   handleCourseLive = () => {
      const {
         settings, LiveCourse,
      } = this.props;
      const isPublished = settings.is_published;
      if (isPublished === 1) {
         LiveCourse(this.courseId, isPublished);
      } else if (this.courseHasVisibleLesson()) {
         LiveCourse(this.courseId, isPublished);
      } else if (isPrint('Your class must contain at least one not empty lesson for publishing')) {
         toast.error('Your class must contain at least one not empty lesson for publishing');
      }
   }


   goToBack = () => {
      // const {
      //    mobileCourse,
      //    activeSettingsTabIsMobile,
      //    mobilePlanTanbels,
      // } = this.state;
      const {
         goTo,
      } = this.props;
      // if (mobileCourse.isActiveLessonTab || !!activeSettingsTabIsMobile || !!mobilePlanTanbels) {
      //    this.onMobileSteteChange(false);
      // } else {
      // }
      goTo(Router.route('ADMIN_COURSES').getMask());
   }

   onMobileSteteChange = (bool) => {
      const { mobileCourse } = this.state;
      if (window.innerWidth < 1024) {
         this.setState({
            mobileCourse: {
               ...mobileCourse,
               isActiveLessonTab: bool,
            },
            // mobilePlanTanbels: bool,
            // activeSettingsTabIsMobile: null,

         });
      }
   }

   onMobileSettingSwich = (tab) => {
      this.setState({
         // activeSettingsTabIsMobile: tab,
      });
   }


   onReorderLessons = (data, id, sectionId) => {
      const {
         lessonsReorder,
      } = this.props;
      const orderedData = [...data].map(item => {
         return { [item.order]: item.id };
      });
      lessonsReorder(this.courseId, sectionId, orderedData, data);
   }

   onReorderSections = (newSections, data) => {
      const {
         sectionsReorder,
         sectionReorderComplete,
      } = this.props;
      sectionReorderComplete(newSections);
      sectionsReorder(this.courseId, data);
   }

   videoLibraryPageChange = (data) => {
      const { fetchMedialibraryData } = this.props;
      fetchMedialibraryData({ page: data.currentPage, count: 20 });
   };

   onAddValue = (option) => {
      const {
         addFilterOption,
      } = this.props;
      addFilterOption(option);
   }

   onSwitchTabChange = () => {
      // this.setState({ activeSettingsTabIsMobile: null });
   }

   handleDeleteSection = (sectionId) => {
      const { deleteSection } = this.props;
      deleteSection(this.courseId, sectionId);
   }

   handleSetSearchSection = (value) => {
      const { filter } = this.props;
      this.setState({
         searchSection: value,
      });
      filter(this.courseId, value);
   }

   handleSetSearchLesson = (value) => {
      const { filter } = this.props;
      this.setState({
         searchLessonValue: value,
      });
      filter(this.courseId, null, value);
   }


   handleSearch = () => {
      const { filter } = this.props;
      const { searchSection } = this.state;
      filter(this.courseId, searchSection);
   }

   updateCourse = (inputs, data, id, changeTab) => {
      const { updateCourse } = this.props;

      updateCourse(this.courseId, inputs, data, id, changeTab, this.addErrorsFromQuery);
   }

   handleCreateAuthor = (data) => {
      const { createAuthor } = this.props;

      createAuthor(data, this.addErrorsFromQuery);
   }

   goToPricings = () => {
      const {
         goTo, courseMaterial,
      } = this.props;
      if (courseMaterial.course.type === '1' && courseMaterial.course.plan_id) {
         goTo(`${ Router.route('ADMIN_MEMBERSHIP_EDIT').getCompiledPath({ id: courseMaterial.course.plan_id }) }#main`);
      } else if (courseMaterial.course.plan_id) {
         goTo(`${ Router.route('ADMIN_COURSES_PLAN_EDIT').getCompiledPath({ id: courseMaterial.course.plan_id }) }#main`);
      } else {
         goTo(`${ Router.route('ADMIN_COURSES_PLAN_CREATE').getCompiledPath({ id: courseMaterial.course.id }) }`);
      }
   }


   render() {
      const {
         courseMaterial, initDataInProgress, settings,
         user, transferSection, app, location, changeStatusSection,
         isLoadingGeneral, allCourses, copySection, authorSave, goToCategorys,
         initialSectionsCountSelector, isFiltering, updateCourseProgress, saveLessonSettings,
         goToComments, goTo, saveProduct, progressSettings, authorsData,
         deleteAuthor, createBridge, siteInfo,
      } = this.props;

      const {
         searchSection,
         searchLessonValue,
         deleteLessonModalOpen,
         errorMessages,
      } = this.state;
      const CourseHeaderProps = {
         courseId: this.courseId,
         courseUrl: courseMaterial.course && courseMaterial.course.url,
         lessonId: courseMaterial
            && courseMaterial.currentSection && courseMaterial.currentSection.lessons
            && courseMaterial.currentSection.lessons.length
            && courseMaterial.currentSection.lessons[0].id,
         courseName: courseMaterial.course && courseMaterial.course.name,
         isLoading: initDataInProgress,
         handleCourseLive: this.handleCourseLive,
         settingsData: settings,
         data: settings,
         authUser: user,
         appUUID: app && app.uuid,
         headerPreviewCheckout: this.headerPreviewCheckout,
         goToBack: () => this.goToBack(),
      };
      return (
         <Container className={ (location.hash === '#checkout/template1' || location.hash === '#checkout/template2' || location.hash === '#checkout/template3')
            ? 'courses-create-edit checkout-page'
            : 'courses-create-edit' }
         >
            <Container.Header>
               <SiteHeader
                  title='Courses'
                  tooltip='This is where you can create new programs and organize existing ones.'
                  goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
                  goBack
                  isLeftAction
                  // setIsOpenMobSearch={ this.setIsOpenMobSearch }
                  // isMobSearchOpen={ isMobSearchOpen }
               />
            </Container.Header>
            {initDataInProgress ? (
               <LoaderSpinner />
            ) : (
               <TabSwitch
                  onSwitchTab={ this.onSwitchTabChange }
                  initialTab='program-general'
               >
                  <TabSwitch.Content>
                     <ProductSettings
                        tabId='course-settings'
                        goToComments={ () => goToComments(this.courseId) }
                        course={ courseMaterial.course }
                        isLoading={ progressSettings }
                        handleSave={ (data, changeRoute) => saveProduct(this.courseId, data, changeRoute) }
                     />
                     <DesignCourseGeneral
                        onCreateSection={ this.createSection }
                        tabId='program-general'
                        onReorder={ this.onReorderSections }
                        onChangeStatus={ (sectionId, status, data) => changeStatusSection(this.courseId, sectionId, status, data) }
                        course={ courseMaterial.course }
                        courseMaterial={ courseMaterial }
                        headerProps={ CourseHeaderProps }
                        onSearch={ this.handleSearch }
                        isLoading={ isLoadingGeneral }
                        initialCountSections={ initialSectionsCountSelector }
                        onTransfer={ transferSection }
                        search={ searchSection }
                        goToCategorys={ goToCategorys }
                        user={ user }
                        onReorderLessons={ this.onReorderLessons }
                        setSearch={ this.handleSetSearchSection }
                        allCourses={ allCourses }
                        copySection={ (sectionId) => copySection(courseMaterial.course.id, sectionId) }
                        isFiltering={ isFiltering }
                        onDeleteSection={ this.handleDeleteSection }
                        addLesson={ this.addLesson }
                        onSaveSection={ this.editSection }
                        goTo={ goTo }
                        goToComments={ () => goToComments(this.courseId) }
                        saveLesson={ saveLessonSettings }
                        deleteLesson={ this.deleteLesson }
                        searchLesson={ this.handleSetSearchLesson }
                        searchLessonValue={ searchLessonValue }
                        goToPricings={ this.goToPricings }
                     />
                     <CourseInformation
                        onSaveInstructor={ (data, id) => authorSave(courseMaterial.course.id, id, data) }
                        course={ courseMaterial.course }
                        isLoading={ updateCourseProgress }
                        createAuthor={ this.handleCreateAuthor }
                        authors={ authorsData }
                        deleteAuthor={ deleteAuthor }
                        onSave={ (inputs, data, id, changeTab) => this.updateCourse(inputs, data, id, changeTab) }
                        tabId='program-information'
                        setOpenModal={ this.setOpenModal }
                        onApprove={ (name, post) => this.onGenerate(name, post) }
                        onCancel={ () => this.onDiscard() }
                        errorMessages={ errorMessages }
                        removeErrorMessage={ this.removeErrorMessage }
                        clearErrorMessages={ this.clearErrorMessages }
                     />
                     <BridgeInformation
                        course={ courseMaterial.course }
                        isLoading={ updateCourseProgress }
                        tabId='bridge'
                        createBridge={ createBridge }
                        site={ siteInfo }
                     />
                  </TabSwitch.Content>
               </TabSwitch>
            )}
            {
               deleteLessonModalOpen && (
                  <DeleteModal
                     title={ courseMaterial.course.type === '1' ? 'Are you sure you want to delete this lesson?' : 'Are you sure you want to delete this lesson?' }
                     deleteText='Delete'
                     maxWidth={ 345 }
                     onDelete={ this.deleteLessonApproved }
                     onCancel={ this.onCancelLessonDelete }
                  />
               )
            }
         </Container>
      );
   }
}

CoursesContainer.propTypes = {
   updateCourse: PropTypes.func,
   settings: PropTypes.object,
   createBridge: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      integrations: integrationSettingsSelector(state),
      courseMaterial: selectors.courseMaterialSelector(state),
      initDataInProgress: selectors.initDataInProgressSelector(state),
      lessonActionInProgress: selectors.lessonActionInProgressSelector(state),
      lessonResourceActionInProgress: selectors.lessonResourceActionInProgressSelector(state),
      currentSection: selectors.currentSectionSelector(state),
      settings: selectors.settingsSelector(state),
      plan: selectors.planSelector(state),
      signUp: selectors.signUpSelector(state),
      user: authUserSelector(state),
      currentResource: selectors.currentResourceSelector(state),
      settingsActionInProgress: selectors.settingsActionInProgressSelector(state),
      integartionError: selectors.integartionErrorSelector(state),
      currentTestimonial: selectors.currentTestimonialSelector(state),
      updateSignUpInProgress: selectors.updateSignUpInProgressSelector(state),
      currentBullet: selectors.currentBulletSelector(state),
      errors: selectors.errorsSelector(state),
      isFetchingMediaLibraryData: isFetchingDataSelector(state),
      mediaLibraryData: mediasSelector(state),
      landing: selectors.landingSelector(state),
      instructorDataInProgress: selectors.instructorDataInProgressSelector(state),
      uploadVideosSize: getFileSizeSelector(state),
      isOpenAuthorPopup: getOpenAuthorPopupSelector(state),
      isOpenDeleteAuthorPopup: getOpenDeleteAuthorPopupSelector(state),
      authorsData: getAllAuthorsSelector(state),
      isFetcheAuthors: isFetcheAuthorsSelector(state),
      app: appSelector(state),
      mainApp: mainAppSelector(state),
      showDrawer: selectors.planDrawerStateSelector(state),
      zoomLoader: selectors.zoomLoaderSelector(state),
      isLoadingGeneral: selectors.generalProgressSelector(state),
      //
      allCourses: selectors.allCoursesSelector(state),
      initialSectionsCountSelector: selectors.initialSectionsCountSelector(state),
      isFiltering: selectors.isFilteringSelector(state),
      updateCourseProgress: selectors.fetchingCourseUpdatesSelector(state),
      progressSettings: selectors.ProductSettingsProgressSelector(state),
      siteInfo: siteInfoSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      reloadReduxState: () => {
         dispatch(reloadReduxStateAction());
      },
      goTo: (location) => {
         dispatch(push(location));
      },
      goToCategorys: () => {
         dispatch(push({
            pathname: Router.route('ADMIN_CATEGORIES').getMask(),
         }));
      },
      goToComments: (id) => {
         dispatch(push({
            pathname: Router.route('ADMIN_COURSE_COMMENTS').getCompiledPath({ id }),
            hash: 'unread',
         }));
      },
      chooseSection: (sectionId) => {
         dispatch(chooseSectionAction(sectionId));
      },

      getCourseAutoResponders: (id) => {
         dispatch(operations.getCourseCheckoutOperation(id));
      },

      createSection: async (courseId, title) => {
         await dispatch(operations.createSectionOperation(courseId, title));
      },

      editSection: (courseId, sectionId, params) => {
         dispatch(operations.editSectionOperation(courseId, sectionId, params));
      },

      deleteSection: (courseId, sectionId) => {
         dispatch(operations.deleteSectionOperation(courseId, sectionId));
      },

      createLesson: (courseId, sectionId, lessonFormat, publishedStatus, pathName) => {
         dispatch(operations.createLessonOperation(courseId, sectionId, lessonFormat, publishedStatus, pathName));
      },

      saveLesson: (courseId, sectionId, lessonId, params) => {
         dispatch(operations.saveLessonOperation(courseId, sectionId, lessonId, params));
      },
      saveZoomSettingsView: (courseId, sectionId, lessonId, params, data) => {
         dispatch(operations.saveZoom(courseId, sectionId, lessonId, params, data));
      },
      getIntegrations: async () => {
         await dispatch(settingsGetOperation('integrations'));
      },
      saveLessonTitle: (courseId, sectionId, lessonId, params) => {
         dispatch(operations.saveLessonTitleOperation(courseId, sectionId, lessonId, params));
      },
      saveLessonResource: (courseId, sectionId, lessonId, params) => {
         dispatch(operations.saveLessonResourceOperation(courseId, sectionId, lessonId, params));
      },
      saveLessonSettings: (courseId, sectionId, lessonId, params) => {
         dispatch(operations.saveLessonSettingsOperation(courseId, sectionId, lessonId, params));
      },
      deleteLessonResource: (courseId, sectionId, lessonId, resourceId) => {
         dispatch(operations.deleteLessonResourceOperation(courseId, sectionId, lessonId, resourceId));
      },
      deleteLessonAllResources: (courseId, sectionId, lessonId) => {
         dispatch(operations.deleteLessonAllResourcesOperation(courseId, sectionId, lessonId));
      },
      editLessonResource: (courseId, sectionId, lessonId, params) => {
         dispatch(operations.editResourceLessonOperation(courseId, sectionId, lessonId, params));
      },
      addQuestion: (courseId, sectionId, lessonId, params) => {
         dispatch(operations.createQuestionOperation(courseId, sectionId, lessonId, params));
      },

      sectionReorderComplete: (newSections) => {
         dispatch(sectionOrderChangeCompleted(newSections));
      },
      updateQuestion: (courseId, sectionId, lessonId, questionId, params) => {
         dispatch(operations.updateQuestionOperation(courseId, sectionId, lessonId, questionId, params));
      },

      deleteQuestion: (...params) => {
         dispatch(operations.deleteQuestionOperation(...params));
      },

      deleteLesson: async (courseId, sectionId, lessonId) => {
         await dispatch(operations.deleteLessonOperation(courseId, sectionId, lessonId));
      },

      updateCourse: (id, params, data, authorId, changeTab, onError) => {
         dispatch(operations.updateCourseOperation(id, params, data, authorId, changeTab, onError));
      },

      getCourse: (id, searchValue, lessonSearchValue) => {
         dispatch(operations.getCourseOperation(id, searchValue, lessonSearchValue));
      },

      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },

      setResourceInput: (key, value, target) => {
         dispatch(setResourceInputAction(key, value, target));
      },

      setSettingsInput: (key, value, target) => {
         dispatch(operations.lessonsSettingsInput(key, value, target));
      },
      updateSettingsInput: (key, value, target) => {
         dispatch(updateSettingsAction(key, value, target));
      },

      openResourceEdit: (id) => {
         dispatch(openResourceEditAction(id));
      },
      setCurrentPricing: (obj) => {
         dispatch(setCurrentPricingAction(obj));
      },
      addPlan: (type) => {
         dispatch(operations.addPlanOperation(type));
      },
      setPlanInput: (key, value) => {
         dispatch(setPlanInputAction(key, value));
      },
      createPlan: (courseId, pricingType, data, selectedPricingAttachedCourses) => {
         dispatch(operations.createPlanOperation(courseId, pricingType, data, selectedPricingAttachedCourses));
      },
      updatePlan: (courseId, pricingId, data, selectedPricingAttachedCourses) => {
         dispatch(operations.updatePlanOperation(courseId, pricingId, data, selectedPricingAttachedCourses));
      },
      deletePlan: (courseId, pricingId) => {
         dispatch(operations.deletePlanOperation(courseId, pricingId));
      },
      setCouponInput: (key, value) => {
         dispatch(setCouponInputAction(key, value));
      },
      createCoupon: (pricingId, data) => {
         dispatch(operations.createCouponOperation(pricingId, data));
      },
      showCouponPopup: (show) => {
         dispatch(showCouponPopupAction(show));
      },
      deleteCoupon: (pricingId, couponId) => {
         dispatch(operations.deleteCouponOperation(pricingId, couponId));
      },
      updateSignUp: (id, courseId, params, currentTab) => {
         dispatch(operations.updateSignUpOperation(id, courseId, params, currentTab));
      },
      setSignUpInput: (key, value, target, id) => {
         dispatch(setSignUpInputAction(key, value, target, id));
      },
      addTestimonial: (data) => {
         dispatch(addTestimonialAction(data));
      },
      addBullet: (data) => {
         dispatch(addBulletAction(data));
      },
      addQuestionAction: (data) => {
         dispatch(addQuestionAction(data));
      },
      deleteSignUp: (id, courseId, currentTab) => {
         dispatch(operations.deleteSignUpOperation(id, courseId, currentTab));
      },
      LiveCourse: (courseId, isPublished) => {
         dispatch(operations.LiveCourseOperation(courseId, isPublished));
      },
      updateCourseLink: (courseId, inputs) => {
         dispatch(operations.updateCourseLinkOperation(courseId, inputs));
      },
      clearLessonData: () => {
         dispatch(clearLessonDataAction());
      },
      addTag: (courseId, checkoutId, tagName) => {
         dispatch(operations.addTagOperation(courseId, checkoutId, tagName));
      },
      attachTag: (courseId, checkoutId, tagId) => {
         dispatch(operations.atachTagOperation(courseId, checkoutId, tagId));
      },
      detachTag: (courseId, checkoutId, tagId) => {
         dispatch(operations.detachTagOperation(courseId, checkoutId, tagId));
      },
      lessonsReorder: (courseId, sectionId, data, newLessons) => {
         dispatch(operations.lessonsReorderOperation(courseId, sectionId, data, newLessons));
      },
      sectionsReorder: (courseId, data) => {
         dispatch(operations.sectionsReorderOperation(courseId, data));
      },
      chooseTestimonial: (id) => {
         dispatch(chooseTestimonialAction(id));
      },
      chooseBullet: (id) => {
         dispatch(chooseBulletAction(id));
      },
      fetchMedialibraryData: (params) => dispatch(getMedias(params)),
      addFilterOption: option => { dispatch(addFilterOptionAction(option)); },
      // Course Authors

      getAuthorsData: async (param) => {
         await dispatch(getAuthorsDataOperation(param));
      },
      createAuthor: (data, onError) => {
         dispatch(createAuthorOperation(data, onError));
      },
      authorSave: async (courseId, authorId, data) => {
         await dispatch(authorSaveOperation(courseId, authorId, data));
      },
      deleteAuthor: (id) => {
         dispatch(deleteAuthorOperation(id));
      },
      changeStatusSection: (courseId, sectionId, status, data) => {
         dispatch(operations.selectStatusSactionOperation(courseId, sectionId, status, data));
      },
      getCourses: () => {
         dispatch(operations.getAllCoursesOperation('is_online=1', true));
      },
      transferSection: (data, setSelectedSection) => {
         dispatch(operations.transferSectionOperation(data, setSelectedSection));
      },
      copySection: (courseId, id) => {
         dispatch(operations.copySectionOperation(courseId, id));
      },
      filter: (id, search, lessonSearch) => {
         dispatch(operations.filterSearchOperation(id, search, lessonSearch));
      },
      saveProduct: (courseId, data, changeRoute) => {
         dispatch(operations.productSettingSave(data, courseId, changeRoute));
      },
      createBridge: (id, inputs) => {
         dispatch(operations.createBridgeOperation(id, inputs));
      },
      
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
