import * as types from './types';

export const reloadReduxState = () => {
   return { type: types.RELOAD_REDUX_STATE };
};

export const setInput = (key, value, target) => {
   return {
      type: types.SET_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};


export const setResourceInput = (key, value, target) => {
   return {
      type: types.SET_RESOURCE_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};


export const addTestimonial = (data) => {
   return {
      type: types.ADD_TESTIMONIAL,
      payload: {
         data,
      },
   };
};

export const addBullet = (data) => {
   return {
      type: types.ADD_BULLET,
      payload: {
         data,
      },
   };
};

export const addQuestion = (data) => {
   return {
      type: types.ADD_QUESTION_ACTION,
      payload: {
         data,
      },
   };
};

export const setSettingsInputStart = () => {
   return {
      type: types.SET_SETTINGS_INPUT_START,
   };
};

export const setSettingsInput = (key, value, target) => {
   return {
      type: types.SET_SETTINGS_INPUT,
      payload: {
         key,
         value,
         target,
      },
   };
};
export const updateSettingsInput = (key, value) => {
   return {
      type: types.UPDATE_SETTINGS_COMPLETED,
      payload: {
         key,
         value,
      },
   };
};


export const chooseSection = (sectionId) => {
   return {
      type: types.CHOOSE_SECTION,
      payload: {
         sectionId,
      },
   };
};

export const createSectionStart = () => {
   return {
      type: types.CREATE_SECTION_START,
   };
};
export const createSectionComplete = (data) => {
   return {
      type: types.CREATE_SECTION_COMPLETED,
      payload: {
         data,
      },
   };
};
export const createSectionFailed = (errors) => {
   return {
      type: types.CREATE_SECTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const editSectionStart = () => {
   return {
      type: types.EDIT_SECTION_START,
   };
};
export const editSectionComplete = (sectionId, params) => {
   return {
      type: types.EDIT_SECTION_COMPLETED,
      payload: {
         sectionId,
         params,
      },
   };
};
export const editSectionFailed = (errors) => {
   return {
      type: types.EDIT_SECTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteSectionStart = () => {
   return {
      type: types.DELETE_SECTION_START,
   };
};
export const deleteSectionComplete = (sectionId) => {
   return {
      type: types.DELETE_SECTION_COMPLETED,
      payload: {
         sectionId,
      },
   };
};
export const deleteSectionFailed = (errors) => {
   return {
      type: types.DELETE_SECTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const updateCourseStart = () => {
   return {
      type: types.UPDATE_COURSE_START,
   };
};
export const updateCourseComplete = (params, authorId, data) => {
   return {
      type: types.UPDATE_COURSE_COMPLETED,
      payload: {
         params,
         authorId,
         data,
      },
   };
};
export const updateCourseFailed = (errors) => {
   return {
      type: types.UPDATE_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};


export const getCourseStart = () => {
   return {
      type: types.GET_COURSE_START,
   };
};
export const getCourseComplete = (data) => {
   return {
      type: types.GET_COURSE_COMPLETED,
      payload: {
         data,
      },
   };
};

export const getCourseFailed = (errors) => {
   return {
      type: types.GET_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};

export const getLessonStart = () => {
   return {
      type: types.GET_LESSON_START,
   };
};
export const getLessonComplete = (data) => {
   return {
      type: types.GET_LESSON_COMPLETED,
      payload: {
         data,
      },
   };
};
export const getLessonFailed = (errors) => {
   return {
      type: types.GET_LESSON_FAILED,
      payload: {
         errors,
      },
   };
};

export const createLessonStart = () => {
   return {
      type: types.CREATE_LESSON_START,
   };
};
export const createLessonComplete = (data) => {
   return {
      type: types.CREATE_LESSON_COMPLETED,
      payload: {
         data,
      },
   };
};
export const createLessonFailed = (errors) => {
   return {
      type: types.CREATE_LESSON_FAILED,
      payload: {
         errors,
      },
   };
};

export const saveLessonStart = () => {
   return {
      type: types.SAVE_LESSON_START,
   };
};
export const saveLessonComplete = (data) => {
   return {
      type: types.SAVE_LESSON_COMPLETED,
      payload: {
         data,
      },
   };
};
export const saveLessonFailed = (errors) => {
   return {
      type: types.SAVE_LESSON_FAILED,
      payload: {
         errors,
      },
   };
};

export const saveLessonTitleStart = () => {
   return {
      type: types.SAVE_LESSONTITLE_START,
   };
};
export const saveLessonTitleComplete = (data) => {
   return {
      type: types.SAVE_LESSONTITLE_COMPLETED,
      payload: {
         data,
      },
   };
};
export const saveLessonTitleFailed = (errors) => {
   return {
      type: types.SAVE_LESSONTITLE_FAILED,
      payload: {
         errors,
      },
   };
};

export const saveLessonSettingsStart = () => {
   return {
      type: types.SAVE_LESSONSETTINGS_START,
   };
};
export const saveLessonSettingsComplete = (data) => {
   return {
      type: types.SAVE_LESSONSETTINGS_COMPLETED,
      payload: {
         data,
      },
   };
};
export const saveLessonSettingsFailed = (errors) => {
   return {
      type: types.SAVE_LESSONSETTINGS_FAILED,
      payload: {
         errors,
      },
   };
};

export const saveLessonResourceStart = () => {
   return {
      type: types.SAVE_LESSONRESOURCE_START,
   };
};
export const saveLessonResourceComplete = (data) => {
   return {
      type: types.SAVE_LESSONRESOURCE_COMPLETED,
      payload: {
         data,
      },
   };
};
export const saveLessonResourceFailed = (errors) => {
   return {
      type: types.SAVE_LESSONRESOURCE_FAILED,
      payload: {
         errors,
      },
   };
};

export const editResourceLessonStart = () => {
   return {
      type: types.EDIT_LESSONRESOURCE_START,
   };
};

export const editResourceLessonComplete = (data) => {
   return {
      type: types.EDIT_LESSONRESOURCE_COMPLETED,
      payload: {
         data,
      },
   };
};

export const editResourceLessonFailed = (errors) => {
   return {
      type: types.EDIT_LESSONRESOURCE_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteLessonResourceStart = () => {
   return {
      type: types.DELETE_LESSONRESOURCE_START,
   };
};
export const deleteLessonResourceComplete = (resourceId) => {
   return {
      type: types.DELETE_LESSONRESOURCE_COMPLETED,
      payload: {
         resourceId,
      },
   };
};
export const deleteLessonResourceFailed = (errors) => {
   return {
      type: types.DELETE_LESSONRESOURCE_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteLessonAllResourcesStart = () => {
   return {
      type: types.DELETEALL_LESSONRESOURCES_START,
   };
};
export const deleteLessonAllResourcesComplete = () => {
   return {
      type: types.DELETEALL_LESSONRESOURCES_COMPLETED,
   };
};
export const deleteLessonAllResourcesFailed = (errors) => {
   return {
      type: types.DELETEALL_LESSONRESOURCES_FAILED,
      payload: {
         errors,
      },
   };
};


export const createQuestionStart = () => {
   return {
      type: types.CREATE_QUESTION_START,
   };
};
export const createQuestionComplete = (data) => {
   return {
      type: types.CREATE_QUESTION_COMPLETED,
      payload: {
         data,
      },
   };
};
export const createQuestionFailed = (errors) => {
   return {
      type: types.CREATE_QUESTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const updateQuestionStart = () => {
   return {
      type: types.UPDATE_QUESTION_START,
   };
};
export const updateQuestionComplete = (data) => {
   return {
      type: types.UPDATE_QUESTION_COMPLETED,
      payload: {
         data,
      },
   };
};
export const updateQuestionFailed = (errors) => {
   return {
      type: types.UPDATE_QUESTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteQuestionStart = () => {
   return {
      type: types.DELETE_QUESTION_START,
   };
};
export const deleteQuestionComplete = (id) => {
   return {
      type: types.DELETE_QUESTION_COMPLETED,
      payload: {
         id,
      },
   };
};
export const deleteQuestionFailed = (errors) => {
   return {
      type: types.DELETE_QUESTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteLessonStart = () => {
   return {
      type: types.DELETE_LESSON_START,
   };
};


export const deleteLessonComplete = (sectionId, lessonId) => {
   return {
      type: types.DELETE_LESSON_COMPLETED,
      payload: {
         sectionId,
         lessonId,
      },
   };
};


export const deleteLessonFailed = (errors) => {
   return {
      type: types.DELETE_LESSON_FAILED,
      payload: {
         errors,
      },
   };
};

export const setCurrentPricing = (obj) => {
   return {
      type: types.SET_CURRENT_PRICING,
      payload: { obj },
   };
};

export const setPlanInput = (key, value) => {
   return {
      type: types.SET_PLAN_INPUT,
      payload: {
         key,
         value,
      },
   };
};

export const addPlan = (type, data) => {
   return {
      type: types.ADD_PLAN,
      payload: { type, data },
   };
};

export const addPlanInCreate = (type) => {
   return {
      type: types.ADD_PLAN_IN_CREATE,
      payload: { type },
   };
};

export const createPlanStart = () => {
   return {
      type: types.CREATE_PLAN_START,
   };
};
export const createPlanComplete = (data, selectedPricingAttachedCourses) => {
   return {
      type: types.CREATE_PLAN_COMPLETED,
      payload: {
         data,
         selectedPricingAttachedCourses,
      },
   };
};
export const createPlanFailed = (errors) => {
   return {
      type: types.CREATE_PLAN_FAILED,
      payload: {
         errors,
      },
   };
};
export const updatePlanStart = () => {
   return {
      type: types.UPDATE_PLAN_START,
   };
};
export const updatePlanComplete = (pricingId, data, selectedPricingAttachedCourses) => {
   return {
      type: types.UPDATE_PLAN_COMPLETED,
      payload: {
         data,
         pricingId,
         selectedPricingAttachedCourses,
      },
   };
};
export const updatePlanFailed = (errors) => {
   return {
      type: types.UPDATE_PLAN_FAILED,
      payload: {
         errors,
      },
   };
};

export const deletePlanStart = () => {
   return {
      type: types.DELETE_PLAN_START,
   };
};
export const deletePlanComplete = (pricingId) => {
   return {
      type: types.DELETE_PLAN_COMPLETED,
      payload: {
         pricingId,
      },
   };
};
export const deletePlanFailed = (errors) => {
   return {
      type: types.DELETE_PLAN_FAILED,
      payload: {
         errors,
      },
   };
};


export const setCouponInput = (key, value) => {
   return {
      type: types.SET_COUPON_INPUT,
      payload: {
         key,
         value,
      },
   };
};


export const createCouponStart = () => {
   return {
      type: types.CREATE_COUPON_START,
   };
};
export const createCouponComplete = (pricingId, data) => {
   return {
      type: types.CREATE_COUPON_COMPLETED,
      payload: {
         pricingId,
         data,
      },
   };
};
export const createCouponFailed = (errors) => {
   return {
      type: types.CREATE_COUPON_FAILED,
      payload: {
         errors,
      },
   };
};

export const showCouponPopup = (show) => {
   return {
      type: types.SHOW_COUPON_POPUP,
      payload: {
         show,
      },
   };
};


export const deleteCouponStart = () => {
   return {
      type: types.DELETE_COUPON_START,
   };
};
export const deleteCouponComplete = (pricingId, couponId) => {
   return {
      type: types.DELETE_COUPON_COMPLETED,
      payload: {
         pricingId,
         couponId,
      },
   };
};
export const deleteCouponFailed = (errors) => {
   return {
      type: types.DELETE_COUPON_FAILED,
      payload: {
         errors,
      },
   };
};

export const updateSignUpStart = () => {
   return {
      type: types.UPDATE_SIGN_UP_START,
   };
};

export const updateSignUpComplete = (id, data, currentTab) => {
   return {
      type: types.UPDATE_SIGN_UP_COMPLETED,
      payload: {
         id,
         data,
         currentTab,
      },
   };
};

export const updateSignUpFailed = (errors) => {
   return {
      type: types.UPDATE_SIGN_UP_FAILED,
      payload: {
         errors,
      },
   };
};

export const getAutoresponderListsCompleted = (lists) => {
   return {
      type: types.GET_AUTORESPONDERS_LISTS_COMPLETED,
      payload: {
         lists,
      },
   };
};

export const addTag = (data) => {
   return {
      type: types.ADD_COURSE_TAG,
      payload: {
         data,
      },
   };
};

export const atachTag = (tagId) => {
   return {
      type: types.ATACH_COURSE_TAG,
      payload: {
         tagId,
      },
   };
};

export const detachTag = (tagId) => {
   return {
      type: types.DETACH_COURSE_TAG,
      payload: {
         tagId,
      },
   };
};


export const setSignUpInput = (key, value, target, id) => {
   return {
      type: types.SET_SIGN_UP_INPUT,
      payload: {
         key,
         value,
         target,
         id,
      },
   };
};


export const deleteSignUpStart = () => {
   return {
      type: types.DELETE_SIGN_UP_START,
   };
};

export const deleteSignUpComplete = (id, currentTab) => {
   return {
      type: types.DELETE_SIGN_UP_COMPLETED,
      payload: {
         id,
         currentTab,
      },
   };
};

export const deleteSignUpFailed = (errors) => {
   return {
      type: types.DELETE_SIGN_UP_FAILED,
      payload: {
         errors,
      },
   };
};

export const hideCourseStart = () => {
   return {
      type: types.HIDE_COURSE_START,
   };
};
export const hideCourseCompleted = (courseId) => {
   return {
      type: types.HIDE_COURSE_COMPLETED,
      payload: {
         courseId,
      },
   };
};
export const hideCourseFailed = (errors) => {
   return {
      type: types.HIDE_COURSE_FAILED,
      payload: {
         errors,
      },
   };
};

// TOGGLE COMMENT SHOW
export const toggleCommentShowStart = () => ({
   type: types.TOGGLE_COMMENT_SHOW_START,
});
export const toggleCommentShowCompleted = (commentStatus) => ({
   type: types.TOGGLE_COMMENT_SHOW_COMPLETED,
   payload: {
      commentStatus,
   },
});
export const toggleCommentShowFailed = (error) => ({
   type: types.TOGGLE_COMMENT_SHOW_FAILED,
   payload: error,
});


export const updateCourseLinkStart = () => {
   return {
      type: types.UPDATE_COURSELINK_START,
   };
};
export const updateCourseLinkCompleted = (courseId, inputs) => {
   return {
      type: types.UPDATE_COURSELINK_COMPLETED,
      payload: {
         courseId,
         inputs,
      },
   };
};
export const updateCourseLinkFailed = (errors) => {
   return {
      type: types.UPDATE_COURSELINK_FAILED,
      payload: {
         errors,
      },
   };
};


export const openResourceEdit = (id) => {
   return {
      type: types.CHOOSE_RESOURCE,
      payload: {
         id,
      },
   };
};
export const lessonOrderChangeCompleted = (sectionId, lessonData) => {
   return {
      type: types.LESSON_ORDER_COMPLETED,
      payload: {
         sectionId,
         lessonData,
      },
   };
};
export const lessonOrderChangeStart = () => {
   return {
      type: types.LESSON_ORDER_START,
   };
};
export const lessonOrderChangeFailed = () => {
   return {
      type: types.LESSON_ORDER_FAILED,
   };
};

export const sectionOrderChangeCompleted = (sectionData) => {
   return {
      type: types.SECTION_ORDER_COMPLETED,
      payload: {
         sectionData,
      },
   };
};
export const sectionOrderChangeStart = () => {
   return {
      type: types.SECTION_ORDER_START,
   };
};
export const sectionOrderChangeFailed = () => {
   return {
      type: types.SECTION_ORDER_FAILED,
   };
};

export const clearLessonData = () => {
   return {
      type: types.CLEAR_LESSON_DATA,
   };
};

export const hideCourseLiveIntegrationModal = () => {
   return {
      type: types.HIDE_COURSE_LIVEINTEGRATION_MODAL,
   };
};


export const chooseTestimonialAction = (id) => {
   return {
      type: types.CHOOSE_TESTIMONIAL,
      payload: {
         id,
      },
   };
};


export const chooseBulletAction = (id) => {
   return {
      type: types.CHOOSE_BULLET,
      payload: {
         id,
      },
   };
};

export const updateCourseTheme = (theme) => {
   return {
      type: types.UPDATE_COURSE_THEME,
      payload: theme,
   };
};

export const setFilterOptions = (courses) => ({
   type: types.CHOOSE_COURSES_OPTIONS,
   payload: { courses },
});

export const addFilterOption = (option) => ({
   type: types.ADD_FILTER_OPTION,
   payload: { option },
});

export const removeFilterOption = (pricingId, optionId) => ({
   type: types.REMOVE_FILTER_OPTION,
   payload: { pricingId, optionId },
});


export const getLandingComplate = (data) => {
   return {
      type: types.GET_LANDING_COMPLETED,
      payload: {
         data,
      },
   };
};

export const setAuthorSettingsAction = (data) => {
   return {
      type: types.SET_AUTHOR,
      payload: {
         data,
      },
   };
};

export const setInstructorInput = (data, isSelect) => {
   return {
      type: types.SET_INSTRUCTOR_INPUT,
      payload: {
         data,
         isSelect,
      },
   };
};

export const attachCategoriesData = (data, isAttach) => {
   return {
      type: types.ATACH_CATEGORIES,
      payload: {
         data,
         isAttach,
      },
   };
};

export const updateAttachedCategories = (categories) => {
   return {
      type: types.UPDATE_ATACHED_CATEGORIES,
      payload: {
         categories,
      },
   };
};

export const setPlanDrawerState = (drawerState) => {
   return {
      type: types.SET_PLAN_DRAWER_STATE,
      payload: {
         drawerState,
      },
   };
};

export const updateCourseSettings = (data) => {
   return {
      type: types.UPDATE_COURSE_SETTINGS,
      payload: {
         data,
      },
   };
};

export const updateZoomStart = () => {
   return {
      type: types.UPDATE_ZOOM_SETTINGS_START,
   };
};
export const updateZoomFinish = () => {
   return {
      type: types.UPDATE_ZOOM_SETTINGS_FINISH,
   };
};

export const updateZoomAfterSave = (meeting) => {
   return {
      type: types.UPDATE_ZOOM_SETTINGS_COMPLETE,
      payload: {
         meeting,
      },
   };
};

export const changesSectionStart = () => {
   return {
      type: types.CHANGES_SECTION_START,
   };
};


export const changesSectionEnd = () => {
   return {
      type: types.CHANGES_SECTION_END,
   };
};


export const changesSectionCompleted = () => {
   return {
      type: types.CHANGES_SECTION_COMPLETED,
   };
};

export const getAllCoursesCompleted = (data) => {
   return {
      type: types.GET_ALL_COURSES_COMPLETED,
      payload: data,
   };
};

export const transferSectionStart = () => {
   return {
      type: types.TRANSFER_SECTION_START,
   };
};

export const transferSectionFinished = (isChecked, sectionId, setSelectedSection) => {
   return {
      type: types.TRANSFER_SECTION_FINISHED,
      payload: {
         isChecked,
         sectionId,
         setSelectedSection,
      },
   };
};

export const copySectionStart = () => ({
   type: types.COPY_SECTION_START,
});

export const copySectionFinished = () => ({
   type: types.COPY_SECTION_FINISHED,
});

export const deleteBlockStart = () => {
   return {
      type: types.DELETE_BLOCK_START,
   };
};
export const deleteBlockComplete = (data, slug) => {
   return {
      type: types.DELETE_BLOCK_COMPLETED,
      payload: {
         data,
         slug,
      },
   };
};
export const deleteBlockFailed = (errors) => {
   return {
      type: types.DELETE_BLOCK_FAILED,
      payload: {
         errors,
      },
   };
};

export const duplicateBlockStart = () => {
   return {
      type: types.DUPLICATE_BLOCK_START,
   };
};

export const duplicateBlockComplete = (data) => {
   return {
      type: types.DUPLICATE_BLOCK_COMPLETED,
      payload: {
         data,
      },
   };
};

export const duplicateBlockFailed = (errors) => {
   return {
      type: types.DUPLICATE_BLOCK_FAILED,
      payload: {
         errors,
      },
   };
};

export const searchFilterStart = () => ({
   type: types.FILTER_SEARCH_START,
});

export const searchFilterEnd = (data) => ({
   type: types.FILTER_SEARCH_END,
   payload: data,
});

export const updateCuttentLessonAction = (data) => {
   return {
      type: types.UPDATE_CURRENTLESSON,
      payload: {
         data,
      },
   };
};

export const productSettingsStart = () => {
   return {
      type: types.PRODUCT_SETTINGS_START,
   };
};

export const productSettingsCompleted = () => ({
   type: types.PRODUCT_SETTINGS_COMPLETED,
});

export const productSettingsFailed = () => ({
   type: types.PRODUCT_SETTINGS_FAILED,
});

export const deleteQuizQuestionStart = () => {
   return {
      type: types.DELETE_QUIZQUESTION_START,
   };
};
export const deleteQuizQuestionComplete = (questionId, blockId) => {
   return {
      type: types.DELETE_QUIZQUESTION_COMPLETED,
      payload: {
         questionId, blockId,
      },
   };
};
export const deleteQuizQuestionFailed = (errors) => {
   return {
      type: types.DELETE_QUIZQUESTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const deleteQuizAnswerStart = () => {
   return {
      type: types.DELETE_QUIZANSWER_START,
   };
};
export const deleteQuizAnswerComplete = (blockId, questionId, answerId) => {
   return {
      type: types.DELETE_QUIZANSWER_COMPLETED,
      payload: {
         blockId, questionId, answerId,
      },
   };
};
export const deleteQuizAnswerFailed = (errors) => {
   return {
      type: types.DELETE_QUIZANSWER_FAILED,
      payload: {
         errors,
      },
   };
};


export const chooseSavedTemplateStart = () => {
   return {
      type: types.CHOOSE_SAVEDTEMPLATE_START,
   };
};
export const chooseSavedTemplateComplete = (data, blockIndex) => {
   return {
      type: types.CHOOSE_SAVEDTEMPLATE_COMPLETED,
      payload: {
         data,
         blockIndex,
      },
   };
};
export const chooseSavedTemplateFailed = (errors) => {
   return {
      type: types.CHOOSE_SAVEDTEMPLATE_FAILED,
      payload: {
         errors,
      },
   };
};

export const addNewQuestionStart = () => {
   return {
      type: types.ADD_NEWQUESTION_START,
   };
};
export const addNewQuestionComplete = (data, blockIndex, questionIndex, blockId) => {
   return {
      type: types.ADD_NEWQUESTION_COMPLETED,
      payload: {
         data,
         blockIndex,
         questionIndex,
         blockId,
      },
   };
};
export const addNewQuestionFailed = (errors) => {
   return {
      type: types.ADD_NEWQUESTION_FAILED,
      payload: {
         errors,
      },
   };
};

export const addNewAnswerStart = () => {
   return {
      type: types.ADD_NEWANSWER_START,
   };
};
export const addNewAnswerComplete = (data, blockIndex, questionIndex) => {
   return {
      type: types.ADD_NEWANSWER_COMPLETED,
      payload: {
         data,
         blockIndex,
         questionIndex,
      },
   };
};
export const addNewAnswerFailed = (errors) => {
   return {
      type: types.ADD_NEWANSWER_FAILED,
      payload: {
         errors,
      },
   };
};

export const lessonAuthorCompleted = (author) => {
   return {
      type: types.LESSON_SELECT_AUTHOR,
      payload: author,
   };
};

export const createBridgeStart = () => {
   return {
      type: types.CREATE_BRIDGE_START,
   };
};


export const createBridgeComplete = (inputs) => {
   return {
      type: types.CREATE_BRIDGE_COMPLETED,
      payload: {
         inputs,
      },
   };
};


export const createBridgeFailed = () => {
   return {
      type: types.CREATE_BRIDGE_FAILED,
   };
};