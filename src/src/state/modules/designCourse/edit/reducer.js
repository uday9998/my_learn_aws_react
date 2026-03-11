// import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import * as types from './types';
import {
   createReducer,
} from '../../../utils/reducerHelper';

import initialState from './initial-state';

const reducersMap = {
   [types.RELOAD_REDUX_STATE]: () => {
      return {
         ...initialState,
      };
   },
   [types.SET_INPUT]: (state, action) => {
      const { payload: { key, value, target } } = action;

      return {
         ...state,
         [target]: {
            ...state[target],
            [key]: value,
         },
      };
   },

   [types.CHOOSE_RESOURCE]: (state, action) => {
      const { payload: { id } } = action;
      const currentResource = state.courseMaterial.lessonResources.find(lessonResource => lessonResource.id === id);

      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentResource,
         },
      };
   },

   [types.SET_RESOURCE_INPUT]: (state, action) => {
      const { payload: { value } } = action;

      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentResource: {
               ...state.courseMaterial.currentResource,
               title: value,
            },
         },
      };
   },

   [types.SET_SETTINGS_INPUT_START]: (state) => {
      return {
         ...state,
         settingsActionInProgress: true,
      };
   },


   [types.SET_SETTINGS_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson: {
               ...state.courseMaterial.currentLesson,
               [key]: value,
            },
         },
         settingsActionInProgress: false,
      };
   },


   [types.CHOOSE_SECTION]: (state, action) => {
      const { payload: { sectionId } } = action;
      const currentSection = state.courseMaterial.sections.find(section => section.id === sectionId);

      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentSection,
            lessonContent: null,
            currentLesson: null,
         },
      };
   },

   [types.CREATE_SECTION_START]: (state) => {
      return {
         ...state,
         initDataInProgress: true,
      };
   },
   [types.CREATE_SECTION_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { courseMaterial: { sections } } = state;
      data.lessons = [];
      sections.push(data);
      const newSections = [...sections];

      return {
         ...state,
         initDataInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            sections: newSections,
            currentSection: data,
            currentLesson: null,
            lessonContent: null,
         },
      };
   },
   [types.CREATE_SECTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         initDataInProgress: false,
         errors,
      };
   },

   [types.EDIT_SECTION_START]: (state) => {
      return {
         ...state,
         initDataInProgress: true,
      };
   },
   [types.EDIT_SECTION_COMPLETED]: (state, action) => {
      const { payload: { sectionId, params } } = action;
      const sections = state.courseMaterial.sections.map(section => (
         section.id === sectionId ? { ...section, name: params.name, description: params.description } : section)
      );
      const currentSection = sections.find(elem => elem.id === sectionId);

      return {
         ...state,
         initDataInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            sections,
            currentSection,
         },
      };
   },
   [types.EDIT_SECTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         initDataInProgress: false,
         errors,
      };
   },

   [types.DELETE_SECTION_START]: (state) => {
      return {
         ...state,
         isLoadingGeneral: true,
      };
   },
   [types.DELETE_SECTION_COMPLETED]: (state, action) => {
      const { payload: { sectionId } } = action;
      const { courseMaterial: { sections } } = state;
      const newSections = sections.filter(section => section.id !== sectionId);
      const currentSection = newSections[0];

      return {
         ...state,
         isLoadingGeneral: false,
         courseMaterial: {
            ...state.courseMaterial,
            sections: newSections,
            currentSection,
         },
      };
   },
   [types.DELETE_SECTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         isLoadingGeneral: false,
      };
   },

   [types.GET_LESSON_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.GET_LESSON_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const course = data.course;
      const sections = course.sections;
      const currentLesson = data.main_lesson;
      let currentSection = course.sections.filter(section => section.id === data.main_lesson.section_id);
      if (currentSection && currentSection.length !== 0) {
         currentSection = currentSection[0];
      }
      currentLesson.blocks = data.blocks;
      const lessonContent = data.lesson_file;
      const lessonResources = data && data.lesson_resourses;

      if (currentLesson && currentLesson.blocks && !!currentLesson.blocks.length) {
         currentLesson.blocks.forEach((block) => {
            const newBlock = block;
            if (newBlock.lesson_format === 'Image' && newBlock.files && newBlock.files[0]) {
               newBlock.image_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Pdf' && newBlock.files && newBlock.files[0]) {
               newBlock.pdf_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Audio' && newBlock.files && newBlock.files[0]) {
               newBlock.audio_src = newBlock.files[0].src;
               newBlock.name = newBlock.files[0].name;
            }
            if (newBlock.lesson_format === 'Ppt' && newBlock.files && newBlock.files[0]) {
               newBlock.ppt_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Multimedia' && newBlock.multimedia && newBlock.multimedia.src) {
               newBlock.src = newBlock.multimedia.src;
            }
            if (newBlock.lesson_format === 'Video' && newBlock.videos && newBlock.videos[0] && newBlock.videos[0] && newBlock.videos[0].src) {
               newBlock.video_src = newBlock.videos[0].src;
               newBlock.video_length = newBlock.videos[0].video_length || 0;
               newBlock.name = newBlock.videos[0].name;
            }
            if (newBlock.lesson_format === 'Video-url' && newBlock.videos && newBlock.videos[0] && newBlock.videos[0] && newBlock.videos[0].src) {
               newBlock.video_src = newBlock.videos[0].src;
               newBlock.video_length = newBlock.videos[0].video_length || 0;
               newBlock.video_src_type = [newBlock.videos[0].video_type, newBlock.videos[0].src];
               newBlock.name = newBlock.videos[0].name;
            }
            if (newBlock.lesson_format === 'Video-embed' && newBlock.videos && newBlock.videos[0] && newBlock.videos[0] && newBlock.videos[0].src) {
               newBlock.video_embed = newBlock.videos[0].src;
               newBlock.video_src = newBlock.videos[0].src;
               newBlock.name = newBlock.videos[0].name;
               newBlock.video_length = newBlock.videos[0].video_length || 0;
            }
            if (newBlock.lesson_format === 'Zoom' && newBlock.files && newBlock.files[0]) {
               newBlock.picture_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Quiz' && newBlock.questions && newBlock.questions.length) {
               newBlock.question = {};
               const multipleChoice = [];
               newBlock.questions.forEach(quest => {
                  if (quest.template_name === 'welcome_screen') {
                     newBlock.question.welcome_screen = [quest];
                  }
                  if (quest.template_name === 'ending') {
                     newBlock.question.ending = [quest];
                  }
                  if (quest.template_name === 'multiple_choice') {
                     multipleChoice.push(quest);
                     newBlock.question.multiple_choice = multipleChoice;
                  }
               });
            }
         });
      }
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            course,
            sections,
            currentLesson,
            lessonContent,
            lessonResources,
            currentSection,
            quizTemplatesAsc: data.quiz_templates_asc,
            quizTemplatesDesc: data.quiz_templates_desc,
         },
      };
   },
   [types.UPDATE_ZOOM_SETTINGS_START]: (state) => {
      return {
         ...state,
         zoomLoader: true,
         lessonActionInProgress: true,
      };
   },
   [types.UPDATE_ZOOM_SETTINGS_FINISH]: (state) => {
      return {
         ...state,
         zoomLoader: false,
         lessonActionInProgress: false,
      };
   },
   [types.UPDATE_ZOOM_SETTINGS_COMPLETE]: (state, action) => {
      const { payload: { meeting } } = action;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      const changableBlock = currentLesson.blocks.filter(block => block.id === meeting.block_id)[0];
      changableBlock.zoom_meeting = meeting;

      return {
         ...state,
         zoomLoader: false,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson: {
               ...state.courseMaterial.currentLesson,
               currentLesson,
            },
         },
      };
   },
   [types.GET_LESSON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonActionInProgress: false,
         errors,
      };
   },

   [types.SAVE_LESSON_START]: (state) => {
      return {
         ...state,
         // lessonActionInProgress: true,
      };
   },
   [types.SAVE_LESSON_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const currentLesson = data.main_lesson;
      const lessonContent = data.lesson_file;
      const parentSection = state.courseMaterial.sections.find(section => section.id === currentLesson.section_id);
      parentSection.lessons = parentSection.lessons.map(lesson => (
         lesson.id === currentLesson.id ? currentLesson : lesson
      ));
      const newSections = state.courseMaterial.sections.map(elem => (
         elem.id === parentSection.id ? parentSection : elem
      ));


      return {
         ...state,
         //   lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
            lessonContent,
            currentSection: undefined,
            sections: newSections,
         },
      };
   },
   [types.SAVE_LESSON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
      };
   },

   [types.SAVE_LESSONTITLE_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },
   [types.SAVE_LESSONTITLE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const lesson = data.data[0];
      // const currentLesson = { ...state.courseMaterial.currentLesson, ...data };
      // const parentSection = state.courseMaterial.sections.find(section => section.id === currentLesson.section_id);
      // parentSection.lessons = parentSection.lessons.map(lesson => (
      //    lesson.id === currentLesson.id ? currentLesson : lesson
      // ));
      // const newSections = state.courseMaterial.sections.map(elem => (
      //    elem.id === parentSection.id ? parentSection : elem
      // ));
      if (lesson && lesson.blocks && !!lesson.blocks.length) {
         lesson.blocks.forEach((block) => {
            const newBlock = block;

            if (newBlock.lesson_format === 'Image' && newBlock.files && newBlock.files[0]) {
               newBlock.image_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Pdf' && newBlock.files && newBlock.files[0]) {
               newBlock.pdf_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Ppt' && newBlock.files && newBlock.files[0]) {
               newBlock.ppt_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Audio' && newBlock.files && newBlock.files[0]) {
               newBlock.audio_src = newBlock.files[0].src;
               newBlock.name = newBlock.files[0].name;
            }
            if (newBlock.lesson_format === 'Multimedia' && newBlock.multimedia && newBlock.multimedia.src) {
               newBlock.src = newBlock.multimedia.src;
            }
            if (newBlock.lesson_format === 'Video' && newBlock.videos && newBlock.videos[0] && newBlock.videos[0] && newBlock.videos[0].src) {
               newBlock.video_src = newBlock.videos[0].src;
               newBlock.video_length = newBlock.videos[0].video_length || 0;
               newBlock.name = newBlock.videos[0].name;
            }
            if (newBlock.lesson_format === 'Video-url' && newBlock.videos && newBlock.videos[0] && newBlock.videos[0] && newBlock.videos[0].src) {
               newBlock.video_src = newBlock.videos[0].src;
               newBlock.video_length = newBlock.videos[0].video_length || 0;
               newBlock.video_src_type = [newBlock.videos[0].video_type, newBlock.videos[0].src];
               newBlock.name = newBlock.videos[0].name;
            }
            if (newBlock.lesson_format === 'Video-embed' && newBlock.videos && newBlock.videos[0] && newBlock.videos[0] && newBlock.videos[0].src) {
               newBlock.video_embed = newBlock.videos[0].src;
               newBlock.video_src = newBlock.videos[0].src;
               newBlock.name = newBlock.videos[0].name;
               newBlock.video_length = newBlock.videos[0].video_length || 0;
            }
            if (newBlock.lesson_format === 'Zoom' && newBlock.files && newBlock.files[0]) {
               newBlock.picture_src = newBlock.files[0].src;
            }
            if (newBlock.lesson_format === 'Quiz' && newBlock.questions && newBlock.questions.length) {
               const multipleChoice = [];
               newBlock.questions.forEach(quest => {
                  if (quest.template_name === 'welcome_screen') {
                     newBlock.question.welcome_screen = [quest];
                  }
                  if (quest.template_name === 'ending') {
                     newBlock.question.ending = [quest];
                  }
                  if (quest.template_name === 'multiple_choice') {
                     multipleChoice.push(quest);
                     newBlock.question.multiple_choice = multipleChoice;
                  }
               });
            }
         });
      }

      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson: lesson,
         //  sections: newSections,
         },
      };
   },
   [types.SAVE_LESSONTITLE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonActionInProgress: false,
         errors,
      };
   },

   [types.GET_LESSON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonActionInProgress: false,
         errors,
      };
   },

   [types.SAVE_LESSONSETTINGS_START]: (state) => {
      return {
         ...state,
         settingsActionInProgress: true,
      };
   },
   [types.SAVE_LESSONSETTINGS_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const parentSection = state.courseMaterial.sections.find(section => section.id === data.section_id);
      parentSection.lessons = parentSection.lessons.map(lesson => (
         lesson.id === data.id ? data : lesson
      ));
      const newSections = state.courseMaterial.sections.map(elem => (
         elem.id === parentSection.id ? parentSection : elem
      ));

      return {
         ...state,
         settingsActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson: {
               ...state.courseMaterial.currentLesson,
               autoplay: data.autoplay,
               draft: data.draft,
               is_published: data.is_published,
            },
            sections: newSections,
         },
      };
   },
   [types.SAVE_LESSONSETTINGS_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         settingsActionInProgress: false,
         errors,
      };
   },


   [types.SAVE_LESSONRESOURCE_START]: (state) => {
      return {
         ...state,
         lessonResourceActionInProgress: true,
      };
   },
   [types.SAVE_LESSONRESOURCE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const courseMaterial = { ...state.courseMaterial };
      const lessonResources = [...courseMaterial.lessonResources, data];
      return {
         ...state,
         lessonResourceActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            lessonResources,
         },
      };
   },
   [types.SAVE_LESSONRESOURCE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonResourceActionInProgress: false,
         errors,
      };
   },

   [types.EDIT_LESSONRESOURCE_START]: (state) => {
      return {
         ...state,
         lessonResourceActionInProgress: true,
      };
   },
   [types.EDIT_LESSONRESOURCE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const courseMaterial = { ...state.courseMaterial };
      const lessonResources = [...courseMaterial.lessonResources];
      const lessonResource = lessonResources.find(resource => resource.id === data.id);
      lessonResource.title = data.title;
      const newLessonResources = lessonResources.map(elem => (elem.id === data.id ? lessonResource : elem));
      return {
         ...state,
         lessonResourceActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            newLessonResources,
            currentResource: {
               ...state.courseMaterial.currentResource,
               id: 0,
            },
         },

      };
   },
   [types.EDIT_LESSONRESOURCE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonResourceActionInProgress: false,
         errors,
      };
   },


   [types.DELETE_LESSONRESOURCE_START]: (state) => {
      return {
         ...state,
         lessonResourceActionInProgress: true,
      };
   },
   [types.DELETE_LESSONRESOURCE_COMPLETED]: (state, action) => {
      const { payload: { resourceId } } = action;
      const courseMaterial = { ...state.courseMaterial };
      let lessonResources = [...courseMaterial.lessonResources];

      lessonResources = lessonResources.filter(resource => resource.id !== resourceId);

      return {
         ...state,
         lessonResourceActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            lessonResources,
         },
      };
   },
   [types.DELETE_LESSONRESOURCE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonResourceActionInProgress: false,
         errors,
      };
   },

   [types.DELETEALL_LESSONRESOURCES_START]: (state) => {
      return {
         ...state,
         lessonResourceActionInProgress: true,
      };
   },
   [types.DELETEALL_LESSONRESOURCES_COMPLETED]: (state) => {
      return {
         ...state,
         lessonResourceActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            lessonResources: [],
         },
      };
   },
   [types.DELETEALL_LESSONRESOURCES_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         lessonResourceActionInProgress: false,
         errors,
      };
   },

   [types.CREATE_QUESTION_START]: (state) => {
      return {
         ...state,
         //  lessonActionInProgress: true,
      };
   },
   [types.CREATE_QUESTION_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      let { courseMaterial: { lessonContent } } = state;
      if (lessonContent && Object.prototype.toString.call(lessonContent === '[object Array]')) {
         lessonContent.push(data);
      } else {
         lessonContent = [];
         lessonContent.push(data);
      }
      const newLessonContent = lessonContent.map(elem => elem);

      return {
         ...state,
         // lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            lessonContent: newLessonContent,
            isQuestionSaved: false,
         },
      };
   },
   [types.CREATE_QUESTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         //  lessonActionInProgress: false,
         errors,
      };
   },

   [types.UPDATE_QUESTION_START]: (state) => {
      return {
         ...state,
      //   lessonActionInProgress: true,
      };
   },
   [types.UPDATE_QUESTION_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { courseMaterial: { lessonContent } } = state;
      const newLessonContent = lessonContent.map(elem => (elem.id === data.id ? data : elem));

      return {
         ...state,
         //  lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            lessonContent: newLessonContent,
         },
      };
   },
   [types.UPDATE_QUESTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         //   lessonActionInProgress: false,
         errors,
      };
   },

   [types.DELETE_QUESTION_START]: (state) => {
      return {
         ...state,
         //  lessonActionInProgress: true,
      };
   },
   [types.DELETE_QUESTION_COMPLETED]: (state, action) => {
      const { payload: { id } } = action;
      const { courseMaterial: { lessonContent } } = state;

      const newLessonContent = lessonContent.filter(elem => elem.id !== id);

      return {
         ...state,
         //  lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            lessonContent: newLessonContent,
         },
      };
   },
   [types.DELETE_QUESTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         // lessonActionInProgress: false,
         errors,
      };
   },

   [types.ADD_QUESTION_ACTION]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            isQuestionSaved: data,
         },
      };
   },

   [types.CREATE_LESSON_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },
   [types.CLEAR_LESSON_DATA]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
         courseMaterial: {
            ...state.courseMaterial,
            lessonContent: [],
         },
      };
   },
   [types.CREATE_LESSON_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const sectionId = data.section_id;
      let noneVisibleLessonIndex = null;
      const { courseMaterial: { sections } } = state;
      const section = sections.find(elem => elem.id === sectionId);
      for (let i = 0; i < sections.length; i++) {
         if (sections[i].lessons.length) {
            for (let j = 0; j < sections[i].lessons.length; j++) {
               if (sections[i].lessons[j].lesson_visiblity === 0) {
                  noneVisibleLessonIndex = j;
                  break;
               }
            }
         }
      }
      if (noneVisibleLessonIndex != null && noneVisibleLessonIndex !== -1) {
         section.lessons.push(data);
      } else {
         section.lessons.push(data);
      }
      const newSections = sections.map(elem => (elem.id === section.id ? section : elem));

      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            sections: newSections,
            currentLesson: data,
            currentSection: undefined,
         },
      };
   },
   [types.CREATE_LESSON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.DELETE_LESSON_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },
   [types.DELETE_LESSON_COMPLETED]: (state, action) => {
      const { payload: { sectionId, lessonId } } = action;
      const { courseMaterial: { sections } } = state;
      const section = sections.find(elem => elem.id === sectionId);
      section.lessons = section.lessons.filter(lesson => lesson.id !== lessonId);
      const newSections = sections.map(elem => (elem.id === section.id ? section : elem));
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            sections: newSections,
            currentSection: section,
         },
      };
   },

   [types.DELETE_LESSON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.UPDATE_COURSE_START]: (state) => {
      return {
         ...state,
         updateCourseInProgress: true,
      };
   },

   [types.UPDATE_COURSE_COMPLETED]: (state, action) => {
      const { payload: { params, authorId, data } } = action;
      return {
         ...state,
         updateCourseInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            course: {
               ...state.courseMaterial.course,
               ...params,
               authors: [{
                  id: authorId,
                  ...data,
               }],
            },
         },
      };
   },


   [types.UPDATE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         updateCourseInProgress: false,
      };
   },

   [types.GET_COURSE_START]: (state) => {
      return {
         ...state,
         initDataInProgress: true,
         instructorDataInProgress: true,
      };
   },
   [types.GET_COURSE_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      const { categories_without_default: categories = {} } = data;
      let currentSection = null;

      if (data.theme) {
         data.theme_name = data.theme.name;
         data.theme.themesparts.map(item => data[item.key] = item.value);
      }

      // let planTypes = state.plan.allPlanTypes;
      // if (data.pricings.some(item => item.pricing_type === 0)) {
      //    planTypes = state.plan.allPlanTypes.filter(item => item.type !== 0);
      // }

      if (data.sections) {
         currentSection = data.sections[0];
      }
      return {
         ...state,
         initDataInProgress: false,
         instructorDataInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            course: data,
            landing_url: data.landing_url,
            sections: data.sections,
            // currentLesson,
            // lessonContent,
            // lessonResources,
            currentSection,
         },
         initialCountOfSections: data.sections.length,
         settings: {
            ...state.settings,
            categories,
            ...data,
         },
         // plan: {
         //    ...state.plan,
         //    pricings: [...data.pricings],
         //    selectedPricing: { ...data.pricings[0] },
         //    addingFirstPlan: !state.plan.createFirstPlanAdding ? data.pricings.length > 0 : true,
         //    currentPricingType: !state.plan.createFirstPlanAdding
         //       ? data.pricings[0] && data.pricings[0].pricing_type : state.plan.pricingTypeInCreate,
         //    planTypes: [...planTypes],
         //    is_published: data.is_published,
         //    // ...plansData,
         //    //  payment_methods: plansData.payment_methods.length !== 0 ? plansData.payment_methods : {},
         // },
         // signUp: {
         //    ...state.signUp,
         //    'order-summary': { ...data.checkout },
         //    'testimonials': [...data.testimonials.reverse()],
         //    'bullet-points': [...data.offers.reverse()],
         //    'buy-bottom': { ...data.checkout },
         //    advanced: { ...state.signUp.advanced, selectedTags: data.checkout.tags.map(({ id }) => id) },
         // },
      };
   },
   [types.GET_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         initDataInProgress: false,
         instructorDataInProgress: false,
         errors,
      };
   },
   [types.SET_CURRENT_PRICING]: (state, action) => {
      const { payload: { obj } } = action;

      return {
         ...state,
         planDrawerState: true,
         plan: {
            ...state.plan,
            selectedPricing: { ...obj },
            currentPricingType: obj.pricing_type,
            currentPricingUnsaved: false,
            couponInputs: { coupon_type: 'flate_rate' },
         },
      };
   },
   [types.SET_PLAN_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      return {
         ...state,
         plan: {
            ...state.plan,
            selectedPricing: { ...state.plan.selectedPricing, [key]: value },
         },
      };
   },
   [types.ADD_PLAN]: (state, action) => {
      const { payload: { type, data } } = action;
      let selectedPricing = {};
      if (type === 1 || type === 2) {
         selectedPricing = { currency: data.default_currency, attached_courses: [] };
         if (type === 2) {
            selectedPricing = { currency: data.default_currency, attached_courses: [], number_of_payments: 1 };
         }
      }

      return {
         ...state,
         plan: {
            ...state.plan,
            selectedPricing,
            currentPricingType: type,
            currentPricingUnsaved: true,
            addingFirstPlan: true,
         },
         planDrawerState: true,
      };
   },

   [types.ADD_PLAN_IN_CREATE]: (state, action) => {
      const { payload: { type } } = action;

      return {
         ...state,
         plan: {
            ...state.plan,
            pricingTypeInCreate: type,
            currentPricingUnsaved: true,
            createFirstPlanAdding: true,
         },
      };
   },


   [types.CREATE_PLAN_START]: (state) => {
      return {
         ...state,
         planActionInProgress: true,
      };
   },
   [types.CREATE_PLAN_COMPLETED]: (state, action) => {
      const { payload: { data, selectedPricingAttachedCourses } } = action;
      let planTypes = state.plan.planTypes;

      if (data.pricing_type === 0) {
         planTypes = state.plan.planTypes.filter(item => item.type !== 0);
      }
      let newdata = data;
      if (selectedPricingAttachedCourses.length !== 0) {
         newdata = { ...data, attached_courses: selectedPricingAttachedCourses };
      }

      return {
         ...state,
         planActionInProgress: false,
         plan: {
            ...state.plan,
            selectedPricing: { ...newdata },
            pricings: [...state.plan.pricings, newdata],
            currentPricingUnsaved: false,
            planTypes,
         },
         settings: {
            ...state.settings,
            pricings: [...state.plan.pricings, data],
         },
      };
   },
   [types.CREATE_PLAN_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         planActionInProgress: false,
         errors,
      };
   },


   [types.UPDATE_PLAN_START]: (state) => {
      return {
         ...state,
         planActionInProgress: true,
      };
   },
   [types.UPDATE_PLAN_COMPLETED]: (state, action) => {
      const { payload: { data, pricingId, selectedPricingAttachedCourses } } = action;
      const updateCurrentPricing = state.plan.pricings.find(item => item.id === pricingId);
      updateCurrentPricing.name = data.name;
      updateCurrentPricing.is_visible = data.is_visible;
      if (selectedPricingAttachedCourses.length !== 0) {
         updateCurrentPricing.attached_courses = selectedPricingAttachedCourses;
      }


      return {
         ...state,
         planActionInProgress: false,
         plan: {
            ...state.plan,
            pricings: [...state.plan.pricings],
            selectedPricing: { ...updateCurrentPricing },
            currentPricingUnsaved: false,
         },
         settings: {
            ...state.settings,
            pricings: [...state.plan.pricings],
         },
      };
   },
   [types.UPDATE_PLAN_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         planActionInProgress: false,
         errors,
      };
   },


   [types.DELETE_PLAN_START]: (state) => {
      return {
         ...state,
         planActionInProgress: true,
      };
   },
   [types.DELETE_PLAN_COMPLETED]: (state, action) => {
      const { payload: { pricingId } } = action;

      const { plan: { pricings } } = state;
      const currentPricing = pricings.filter(elem => elem.id === pricingId);
      const newPricings = pricings.filter(elem => elem.id !== pricingId);

      let planTypes = state.plan.allPlanTypes;
      if (currentPricing.pricing_type === 0) {
         planTypes = state.plan.allPlanTypes;
      }

      return {
         ...state,
         planActionInProgress: false,
         plan: {
            ...state.plan,
            pricings: [...newPricings],
            selectedPricing: { ...newPricings[0] },
            currentPricingType: newPricings[0] ? newPricings[0].pricing_type : 0,
            currentPricingUnsaved: newPricings[0] ? state.plan.currentPricingUnsaved : true,
            planTypes,
         },
         settings: {
            ...state.settings,
            pricings: [...newPricings],
            is_published: newPricings.length === 0 ? 2 : state.settings.is_published,
         },
      };
   },
   [types.DELETE_PLAN_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         planActionInProgress: false,
      };
   },

   [types.SET_COUPON_INPUT]: (state, action) => {
      const { payload: { key, value } } = action;
      return {
         ...state,
         plan: {
            ...state.plan,
            couponInputs: { ...state.plan.couponInputs, [key]: value },
         },
      };
   },
   [types.SHOW_COUPON_POPUP]: (state, action) => {
      const { payload: { show } } = action;
      return {
         ...state,
         plan: {
            ...state.plan,
            showCouponPopup: show,
         },
      };
   },
   [types.CREATE_COUPON_START]: (state) => {
      return {
         ...state,
         planCouponActionInProgress: true,
      };
   },
   [types.CREATE_COUPON_COMPLETED]: (state, action) => {
      const { payload: { pricingId, data } } = action;
      const updatePricingCoupons = state.plan.pricings.find(item => item.id === pricingId);
      if (!updatePricingCoupons.coupons) updatePricingCoupons.coupons = [];
      updatePricingCoupons.coupons = [...updatePricingCoupons.coupons, data];

      return {
         ...state,
         planCouponActionInProgress: false,
         plan: {
            ...state.plan,
            pricings: [...state.plan.pricings],
            showCouponPopup: false,
            couponInputs: { coupon_type: 'flate_rate' },
         },
      };
   },
   [types.CREATE_COUPON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         planCouponActionInProgress: false,
         errors,
      };
   },


   [types.DELETE_COUPON_START]: (state) => {
      return {
         ...state,
         planCouponActionInProgress: true,
      };
   },
   [types.DELETE_COUPON_COMPLETED]: (state, action) => {
      const { payload: { pricingId, couponId } } = action;
      const { plan: { pricings } } = state;
      const pricing = pricings.find(elem => elem.id === pricingId);
      pricing.coupons = pricing.coupons.filter(coupon => coupon.id !== couponId);
      const newPricings = pricings.map(elem => (elem.id === pricing.id ? pricing : elem));

      return {
         ...state,
         planCouponActionInProgress: false,
         plan: {
            ...state.plan,
            pricings: [...newPricings],
         },
      };
   },
   [types.DELETE_COUPON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         planCouponActionInProgress: false,
      };
   },

   [types.SET_SIGN_UP_INPUT]: (state, action) => {
      let {
         payload: {
            value,
         },
      } = action;
      const {
         payload: {
            key, target, id,
         },
      } = action;

      if (key === 'tags' && target === 'advanced') {
         value = value.filter(() => {
            return true;
         });
      }
      let signUpinput = { ...state.signUp[target] };
      let newTestimonialInput = { ...state.signUp.newTestimonialInput };
      let currentTestimonial = { ...state.signUp.currentTestimonial };
      let newBulletInput = { ...state.signUp.newBulletInput };
      let currentBullet = { ...state.signUp.currentBullet };
      if (target === 'testimonials' || target === 'bullet-points') {
         signUpinput = '';
         if (id) {
            if (id === 'update') {
               currentTestimonial = { ...state.signUp.currentTestimonial, [key]: value };
            } else if (id === 'updatebullet') {
               currentBullet = { ...state.signUp.currentBullet, [key]: value };
            } else {
               const currentIndex = state.signUp[target].findIndex(x => x.id === id);
               // eslint-disable-next-line no-param-reassign
               state.signUp[target][currentIndex] = { ...state.signUp[target][currentIndex], [key]: value };
            }
         } else if (target === 'testimonials') {
            newTestimonialInput = { ...state.signUp.newTestimonialInput, [key]: value };
         } else if (target === 'bullet-points') {
            newBulletInput = { ...state.signUp.newBulletInput, [key]: value };
         }
      } else {
         signUpinput = { [target]: { ...state.signUp[target], [key]: value } };
      }
      return {
         ...state,
         signUp: {
            ...state.signUp,
            ...signUpinput,
            newTestimonialInput,
            newBulletInput,
            currentTestimonial,
            currentBullet,
         },
      };
   },

   [types.GET_AUTORESPONDERS_LISTS_COMPLETED]: (state, action) => {
      const { payload: { lists } } = action;
      const signUpCopy = JSON.parse(JSON.stringify(state.signUp));
      let res = [];
      if (!Array.isArray(lists) && lists) {
         res.push(lists);
      } else {
         res = lists;
      }
      signUpCopy.advanced.lists = res;
      return {
         ...state,
         signUp: signUpCopy,
      };
   },
   [types.UPDATE_SIGN_UP_START]: (state) => {
      return {
         ...state,
         updateSignUpInProgress: true,
      };
   },
   [types.UPDATE_SIGN_UP_COMPLETED]: (state, action) => {
      const { id, data, currentTab } = action.payload;
      const testimonials = [...state.signUp.testimonials];
      const bulletPoints = [...state.signUp['bullet-points']];
      let newItem = [...state.signUp['bullet-points']];
      let newTestimonialItem = [...state.signUp.testimonials];
      let newTestimonialInput = { ...state.signUp.newTestimonialInput };
      let newBulletInput = { ...state.signUp.newBulletInput };
      let isTestimonalSaved = state.signUp.isTestimonalSaved;
      let isBulletSaved = state.signUp.isBulletSaved;
      if (currentTab === 'testimonials' || currentTab === 'bullet-points') {
         if (!id) {
            if (currentTab === 'testimonials') {
               newTestimonialItem = [...state.signUp[currentTab], data];
               newTestimonialInput = {};
               isTestimonalSaved = false;
            } else if (currentTab === 'bullet-points') {
               newItem = [data, ...state.signUp[currentTab]];
               newBulletInput = {};
               isBulletSaved = false;
            }
         } else if (currentTab === 'testimonials') {
            const updatedTestimonial = testimonials.find(testimonial => testimonial.id === id);
            updatedTestimonial.text = state.signUp.currentTestimonial.text;
            updatedTestimonial.picture_src = state.signUp.currentTestimonial.picture_src;
            updatedTestimonial.author_name = state.signUp.currentTestimonial.author_name;
         } else if (currentTab === 'bullet-points') {
            const updatedBullet = bulletPoints.find(bullet => bullet.id === id);
            updatedBullet.text = state.signUp.currentBullet.text;
         } else {
            newItem = [...state.signUp[currentTab]];
         }
      }


      return {
         ...state,
         signUp: {
            ...state.signUp,
            // testimonials: [...newItem],
            testimonials: id ? testimonials : newTestimonialItem,
            'bullet-points': id ? bulletPoints : newItem,
            newTestimonialInput,
            newBulletInput,
            currentTestimonial: {
               ...state.signUp.currentTestimonial,
               id: 0,
            },
            currentBullet: {
               ...state.signUp.currentBullet,
               id: 0,
            },
            isTestimonalSaved,
            isBulletSaved,
         },
         updateSignUpInProgress: false,

      };
   },
   [types.ADD_COURSE_TAG]: (state, action) => {
      const { payload: { data } } = action;
      const signUpCopy = JSON.parse(JSON.stringify(state.signUp));
      signUpCopy.advanced.selectedTags.push(data);
      return {
         ...state,
         signUp: signUpCopy,
      };
   },
   [types.ATACH_COURSE_TAG]: (state, action) => {
      const { payload: { tagId } } = action;

      return {
         ...state,
         signUp: {
            ...state.signUp,
            advanced:
            {
               ...state.signUp.advanced,
               selectedTags:
               [...state.signUp.advanced.selectedTags, tagId],
            },
         },
      };
   },
   [types.DETACH_COURSE_TAG]: (state, action) => {
      const { payload: { tagId } } = action;

      return {
         ...state,
         signUp: {
            ...state.signUp,
            advanced:
            {
               ...state.signUp.advanced,
               selectedTags: state.signUp.advanced.selectedTags.filter(id => tagId !== id),
            },
         },
      };
   },

   [types.UPDATE_SIGN_UP_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         updateSignUpInProgress: false,
      };
   },


   [types.DELETE_SIGN_UP_START]: (state) => {
      return {
         ...state,
         updateSignUpInProgress: true,
      };
   },
   [types.DELETE_SIGN_UP_COMPLETED]: (state, action) => {
      const { id, currentTab } = action.payload;
      let newItem = [...state.signUp['bullet-points']];
      let newTestimonialItem = [...state.signUp.testimonials];
      if (currentTab === 'bullet-points') {
         newItem = state.signUp[currentTab].filter(elem => elem.id !== id);
      }
      if (currentTab === 'testimonials') {
         newTestimonialItem = state.signUp[currentTab].filter(elem => elem.id !== id);
      }

      return {
         ...state,
         signUp: {
            ...state.signUp,
            testimonials: newTestimonialItem,
            'bullet-points': newItem,
         },
         updateSignUpInProgress: false,
      };
   },
   [types.DELETE_SIGN_UP_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         updateSignUpInProgress: false,
      };
   },

   // SHOW/HIDE COMMENT
   [types.TOGGLE_COMMENT_SHOW_START]: (state) => {
      return {
         ...state,
      };
   },
   [types.TOGGLE_COMMENT_SHOW_COMPLETED]: (state, action) => {
      const { payload: { commentStatus } } = action;

      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson: {
               ...state.courseMaterial.currentLesson,
               comment_status: commentStatus,
            },
         },
      };
   },
   [types.TOGGLE_COMMENT_SHOW_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   [types.HIDE_COURSE_START]: (state) => {
      return {
         ...state,
         integrationError: false,
      };
   },

   [types.HIDE_COURSE_COMPLETED]: (state) => {
      const settings = { ...state.settings };
      if (settings.is_published === 2 || settings.is_published === 0) {
         settings.is_published = 1;
      } else {
         settings.is_published = 2;
      }
      return {
         ...state,
         settings,
         integrationError: false,
      };
   },

   [types.UPDATE_SETTINGS_COMPLETED]: (state, action) => {
      const {
         payload: {
            key, value,
         },
      } = action;
      return {
         ...state,
         settings: {
            ...state.settings,
            [key]: value,
         },
      };
   },

   [types.HIDE_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
         integrationError: errors.errorType === 'integration',
      };
   },

   [types.UPDATE_COURSELINK_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.UPDATE_COURSELINK_COMPLETED]: (state, action) => {
      const { payload: { inputs } } = action;
      const settings = { ...state.settings };
      settings.url = inputs.url;
      settings.landing_url = inputs.landing_url;

      return {
         ...state,
         settings,
      };
   },

   [types.UPDATE_COURSELINK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },
   [types.LESSON_ORDER_START]: (state) => {
      return {
         ...state,
      };
   },
   [types.LESSON_ORDER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },
   [types.LESSON_ORDER_COMPLETED]: (state, action) => {
      const {
         payload: {
            sectionId,
            lessonData,
         },
      } = action;
      const { courseMaterial: { sections } } = state;
      const newSections = [...sections].map(item => {
         const { ...elm } = item;
         if (elm.id === sectionId) {
            elm.lessons = lessonData;
            return elm;
         }
         return elm;
      });
      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            sections: newSections,
         },
      };
   },


   [types.SECTION_ORDER_START]: (state) => {
      return {
         ...state,
      };
   },

   [types.SECTION_ORDER_COMPLETED]: (state, action) => {
      const { payload: { sectionData } } = action;

      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            sections: sectionData,
         },
      };
   },

   [types.SECTION_ORDER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         errors,
      };
   },


   [types.HIDE_COURSE_LIVEINTEGRATION_MODAL]: (state) => {
      return {
         ...state,
         integrationError: false,
      };
   },

   [types.CHOOSE_TESTIMONIAL]: (state, action) => {
      const { payload: { id } } = action;
      const currentTestimonial = state.signUp.testimonials.find(testimonial => testimonial.id === id);

      return {
         ...state,
         signUp: {
            ...state.signUp,
            currentTestimonial,
         },
      };
   },

   [types.ADD_TESTIMONIAL]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         signUp: {
            ...state.signUp,
            isTestimonalSaved: data,
         },
      };
   },


   [types.ADD_BULLET]: (state, action) => {
      const { payload: { data } } = action;

      return {
         ...state,
         signUp: {
            ...state.signUp,
            isBulletSaved: data,
         },
      };
   },


   [types.CHOOSE_BULLET]: (state, action) => {
      const { payload: { id } } = action;
      const currentBullet = state.signUp['bullet-points'].find(bullet => bullet.id === id);

      return {
         ...state,
         signUp: {
            ...state.signUp,
            currentBullet,
         },
      };
   },

   [types.UPDATE_COURSE_THEME]: (state, action) => {
      return {
         ...state,
         settings: {
            ...state.settings,
            theme: {
               ...state.settings.theme,
               ...action.payload,
            },
         },
      };
   },

   [types.CHOOSE_COURSES_OPTIONS]: (state, action) => {
      const { payload: { courses } } = action;
      const coursesPublished = courses.filter(course => course.is_published === 1);
      return {
         ...state,
         chooseCourses: coursesPublished,
      };
   },

   [types.ADD_FILTER_OPTION]: (state, action) => {
      const { payload: { option } } = action;
      const selectedPricing = { ...state.plan.selectedPricing };
      let selectedPricingAttachedCourses = [{ course: { name: option } }];
      if (selectedPricing.attached_courses && selectedPricing.attached_courses.length !== 0) {
         selectedPricingAttachedCourses = [...selectedPricing.attached_courses, { course: { name: option } }];
      }

      return {
         ...state,
         plan: {
            ...state.plan,
            selectedPricing: { ...state.plan.selectedPricing, attached_courses: selectedPricingAttachedCourses },
         },
      };
   },
   [types.REMOVE_FILTER_OPTION]: (state, action) => {
      const { payload: { pricingId, optionId } } = action;
      const updateCurrentPricing = state.plan.pricings.find(item => item.id === pricingId);
      let updateBundleCourses = [];
      if (optionId) {
         updateBundleCourses = updateCurrentPricing.attached_courses.filter(courses => courses.course.id !== optionId);
         updateCurrentPricing.attached_courses = [...updateBundleCourses];
      } else {
         updateCurrentPricing.attached_courses = [];
      }

      return {
         ...state,
         plan: {
            ...state.plan,
            pricings: [...state.plan.pricings],
            selectedPricing: { ...state.plan.selectedPricing, attached_courses: updateBundleCourses },
            currentPricingUnsaved: false,
         },
      };
   },

   [types.GET_LANDING_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         landing: data,
      };
   },

   [types.ATACH_CATEGORIES]: (state, action) => {
      const { payload: { data, isAttach } } = action;
      let newData = [];
      if (isAttach) {
         newData = [
            ...state.settings.categories,
            { ...data },
         ];
      } else {
         newData = data;
      }
      return {
         ...state,
         settings: {
            ...state.settings,
            categories: [
               ...newData,
            ],
         },
      };
   },

   [types.UPDATE_ATACHED_CATEGORIES]: (state, action) => {
      const { payload: { categories } } = action;

      return {
         ...state,
         settings: {
            ...state.settings,
            categories,
         },
      };
   },


   [types.SET_AUTHOR]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         settings: {
            ...state.settings,
            authors: [
               data,
            ],
         },
      };
   },

   [types.SET_INSTRUCTOR_INPUT]: (state, action) => {
      const { payload: { data, isSelect } } = action;
      let authorData = [];
      if (isSelect) {
         authorData = data;
      } else {
         authorData = [
            {
               ...state.settings.authors[0],
               ...data[0],
            },
         ];
      }
      return {
         ...state,
         settings: {
            ...state.settings,
            authors: authorData,
         },
      };
   },
   [types.SET_PLAN_DRAWER_STATE]: (state, action) => {
      const { payload: { drawerState } } = action;
      return {
         ...state,
         planDrawerState: drawerState,
      };
   },
   [types.UPDATE_COURSE_SETTINGS]: (state, action) => {
      const { payload: { data } } = action;
      return {
         ...state,
         settings: {
            ...state.settings,
            name: data.name,
            thumbnail_image: data.thumbnail_image,
         },
         courseMaterial: {
            ...state.courseMaterial,
            course: {
               ...state.courseMaterial.course,
               name: data.name,
            },
         },
      };
   },
   [types.CHANGES_SECTION_START]: (state) => {
      return {
         ...state,
         isLoadingGeneral: true,
      };
   },
   [types.CHANGES_SECTION_COMPLETED]: (state) => {
      return {
         ...state,
         isLoadingGeneral: false,
      };
   },
   [types.CHANGES_SECTION_END]: (state) => {
      return {
         ...state,
         isLoadingGeneral: false,
      };
   },
   [types.GET_ALL_COURSES_COMPLETED]: (state, action) => {
      return {
         ...state,
         allCourses: action.payload,
      };
   },
   [types.TRANSFER_SECTION_START]: (state) => {
      return {
         ...state,
         isLoadingGeneral: true,
      };
   },
   [types.TRANSFER_SECTION_FINISHED]: (state, action) => {
      const { isChecked, sectionId, setSelectedSection } = action.payload;
      if (!isChecked) {
         setSelectedSection(state.courseMaterial.sections.filter((e) => e.id !== sectionId)[0]);
         return {
            ...state,
            isLoadingGeneral: false,
            courseMaterial: {
               ...state.courseMaterial,
               sections: state.courseMaterial.sections.filter((e) => e.id !== sectionId),
            },
         };
      }
      return {
         ...state,
         isLoadingGeneral: false,
      };
   },
   [types.COPY_SECTION_START]: (state) => {
      return {
         ...state,
         isLoadingGeneral: true,
      };
   },
   [types.COPY_SECTION_FINISHED]: (state) => {
      return {
         ...state,
         isLoadingGeneral: false,
      };
   },


   [types.DELETE_BLOCK_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.DELETE_BLOCK_COMPLETED]: (state, action) => {
      const { payload: { slug } } = action;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      currentLesson.blocks = currentLesson.blocks.filter(block => block.slug !== slug);
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },

   [types.DELETE_BLOCK_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.FILTER_SEARCH_START]: (state) => {
      return {
         ...state,
         isFiltering: true,
      };
   },

   [types.FILTER_SEARCH_END]: (state, action) => {
      return {
         ...state,
         isFiltering: false,
         courseMaterial: {
            ...state.courseMaterial,
            sections: action.payload,
         },
      };
   },

   [types.UPDATE_CURRENTLESSON]: (state, action) => {
      const { payload: { data } } = action;
      const currentLesson = data;
      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },
   [types.PRODUCT_SETTINGS_START]: (state) => {
      return {
         ...state,
         isPorgressProductSettings: true,
      };
   },
   [types.PRODUCT_SETTINGS_COMPLETED]: (state) => {
      return {
         ...state,
         isPorgressProductSettings: false,
      };
   },
   [types.PRODUCT_SETTINGS_FAILED]: (state) => {
      return {
         ...state,
         isPorgressProductSettings: false,
      };
   },

   [types.DELETE_QUIZQUESTION_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.DELETE_QUIZQUESTION_COMPLETED]: (state, action) => {
      const { payload: { questionId, blockId } } = action;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      const changedBlock = currentLesson.blocks.filter(block => block.id === blockId);
      changedBlock[0].quizzes[0].questions = changedBlock[0].quizzes[0].questions.filter(
         question => question.id !== questionId);
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },

   [types.DELETE_QUIZQUESTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.DELETE_QUIZANSWER_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.DELETE_QUIZANSWER_COMPLETED]: (state, action) => {
      const {
         payload: {
            blockId, questionId, answerId,
         },
      } = action;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      const changedBlock = currentLesson.blocks.filter(block => block.id === blockId);
      const changedQuestion = changedBlock[0].quizzes[0].questions.filter(
         question => question.id === questionId)[0];
      changedQuestion.answers = changedQuestion.answers.filter(
         answer => answer.id !== answerId);
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },

   [types.DELETE_QUIZANSWER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.CHOOSE_SAVEDTEMPLATE_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.CHOOSE_SAVEDTEMPLATE_COMPLETED]: (state, action) => {
      const {
         payload: {
            data, blockIndex,
         },
      } = action;
      const quizzes = [data];
      const id = data.blocks[0].id;
      const slug = data.blocks[0].slug;
      delete data.blocks;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      currentLesson.blocks[blockIndex] = {
         ...currentLesson.blocks[blockIndex],
         quizzes,
         id,
         slug,
      };
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },

   [types.CHOOSE_SAVEDTEMPLATE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.ADD_NEWQUESTION_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.ADD_NEWQUESTION_COMPLETED]: (state, action) => {
      const {
         payload: {
            data, blockIndex, questionIndex, blockId,
         },
      } = action;
      let quizzes = [data];
      const id = data.blocks[0].id;
      const slug = data.blocks[0].slug;
      delete data.blocks;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      if (blockId) {
         const question = data.questions[data.questions.length - 1];
         const questions = currentLesson.blocks[blockIndex].quizzes[0].questions;
         if (question.type === 'welcome_screen') {
            questions.splice(1, 0, question);
         } else if (question.type === 'ending') {
            questions.splice(questions.length, 0, question);
         } else {
            questions.splice(questionIndex + 1, 0, question);
            questions.forEach((quest, i) => {
               const orderedQuestion = quest;
               orderedQuestion.order = i;
            });
         }
         if (!currentLesson.blocks[blockIndex].quizzes[0].name) {
            currentLesson.blocks[blockIndex].quizzes[0].name = 'Welcome';
         }

         quizzes = [{
            ...currentLesson.blocks[blockIndex].quizzes[0],
            questions,

         }];
      }
      if (!quizzes[0].name) {
         quizzes[0].name = 'Welcome';
      }
      currentLesson.blocks[blockIndex] = {
         ...currentLesson.blocks[blockIndex],
         quizzes,
         id,
         slug,

      };

      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },

   [types.ADD_NEWQUESTION_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },

   [types.ADD_NEWANSWER_START]: (state) => {
      return {
         ...state,
         lessonActionInProgress: true,
      };
   },

   [types.ADD_NEWANSWER_COMPLETED]: (state, action) => {
      const {
         payload: {
            data, blockIndex, questionIndex,
         },
      } = action;
      const currentLesson = { ...state.courseMaterial.currentLesson };
      const question = currentLesson.blocks[blockIndex].quizzes[0].questions[questionIndex];
      currentLesson.blocks[blockIndex].quizzes[0].questions[questionIndex] = {
         ...question,
         answers: [
            ...question.answers,
            data,
         ],
      };
      return {
         ...state,
         lessonActionInProgress: false,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },

   [types.ADD_NEWANSWER_FAILED]: (state, action) => {
      const { payload: { errors } } = action;

      return {
         ...state,
         errors,
         lessonActionInProgress: false,
      };
   },
   [types.CREATE_BRIDGE_START]: (state) => {
      return {
         ...state,
         initDataInProgress: true,
      };
   },
   [types.CREATE_BRIDGE_COMPLETED]: (state, action) => {
      const { payload: { inputs } } = action;
      const courseMaterial = {
         ...state.courseMaterial,
         course: {
            ...state.courseMaterial.course,
            bridge_page: inputs,
            initDataInProgress: false,
         },
         
      };
      return {
         ...state,
         courseMaterial,
         initDataInProgress: false,
      };
   },

   [types.CREATE_BRIDGE_FAILED]: (state) => {
      return {
         ...state,
      };
   },

   [types.LESSON_SELECT_AUTHOR]: (state, action) => {
      const currentLesson = {
         ...state.courseMaterial.currentLesson,
         author: action.payload,
      };
      return {
         ...state,
         courseMaterial: {
            ...state.courseMaterial,
            currentLesson,
         },
      };
   },
};


export default createReducer(initialState)(reducersMap);
