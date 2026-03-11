/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import SignInForm from 'views/pages/Affiliate/TemplateEditor/View/Form/SignInForm';
import { isArray } from 'utils/isArray';
import * as types from './types';
import {
   createReducer,
} from '../../utils/reducerHelper';
import initialState from './initial-state';

const reducersMap = {

   [types.GET_COURSE_START]: (state) => {
      return {
         ...state,
         getCourseInProgress: true,
      };
   },

   [types.GET_COURSE_COMPLETED]: (state, action) => {
      const { payload: { data, preview } } = action;
      const sectionsOrder = data.sections.sort((a, b) => a.order - b.order);
      const sections = sectionsOrder.map(section => ({
         id: section.id,
         title: section.name,
         description: section.description,
         videoCount: 4,
         videoDuration: '18:24',
         status: section.status,
         drip_date: section.drip_date,
         drip_days: section.drip_days,
         publishing_date: section.publishing_date,
         is_dripSection: section.status === '2' ? 1 : 0,
      }));

      let allLessonsArrayOrder = [];
      let sectionOrder;
      data.sections.forEach((section) => {
         if (section.status !== '0') {
            let sectionLessons = section.lessons;
            if (typeof section.lessons === 'object') {
               sectionLessons = Object.values(section.lessons);
            }
            sectionOrder = sectionLessons.sort((a, b) => {
               a.section = {
                  is_dripSection: section.status === '2' ? 1 : 0,
                  drip_date: section.publishing_date,
                  is_driplesson: section.status === '2' ? 1 : 0,
                  section: section.id,
                  description: section.description,

               };
               b.section = {
                  is_dripSection: section.status === '2' ? 1 : 0,
                  drip_date: section.publishing_date,
                  is_driplesson: section.status === '2' ? 1 : 0,
                  section: section.id,
                  description: section.description,

               };
               return a.order - b.order;
            });
            allLessonsArrayOrder = [...allLessonsArrayOrder, ...sectionOrder];
         }
      });

      const lessons = [];
      allLessonsArrayOrder.forEach(lesson => {
         let lessonsObj = {};
         if (lesson.is_published !== '2' && lesson.is_published !== '0') {
            lessonsObj = {
               id: lesson.id,
               section_id: lesson.section_id,
               title: lesson.name,
               duration: '5:51',
               isFreeLesson: lesson.is_free_lesson,
               viewed: lesson.is_complete,
               lesson_format: lesson.lesson_format,
               comment_status: lesson.comment_status,
               prerequisite: lesson.prerequisite,
               completed_status: lesson.completed_status,
               drip_date: (lesson.section && lesson.section.drip_date) || lesson.drip_date,
               drip_days: lesson.drip_days,
               is_driplesson: (lesson.section && lesson.section.is_dripSection) || (lesson.is_published === '3' ? 1 : 0),
               is_published: lesson.is_published,
               diff_days: lesson.diff_days,
               is_drip_turned_on: lesson.is_published === '3' ? 1 : 0,
               drip_type: lesson.drip_type,
               is_free_lesson: lesson.is_free_lesson,
               zoom_meeting: lesson.zoom_meeting,
               is_inactive_prerequisite: lesson.is_inactive_prerequisite,
            };
            lessons.push(lessonsObj);
         }
      });
      // }

      let author = {
         name: '', description: '', img: '',
      };
      if (data.authors && data.authors[0]) {
         author = {
            name: data.authors[0].name, description: data.authors[0].description, img: data.authors[0].picture_src,
         };
      }

      let courseComplateCount = 0;
      let courseComplatePercent = 0;
      const lessonCount = lessons.length;
      let prerequisiteLessonIndex = null;
      const finalLessons = lessons.map((lesson, index) => {
         courseComplateCount += lesson.viewed;
         if (prerequisiteLessonIndex === null && lesson.prerequisite && !lesson.viewed) {
            prerequisiteLessonIndex = index;
         }
         return { ...lesson, lessonIndex: index };
      });
      if (lessonCount) {
         courseComplatePercent = Math.ceil((courseComplateCount / lessonCount) * 100, 10);
      } else {
         courseComplatePercent = 0;
      }

      let isComplateData = {};
      if (!state.isComplateTest) {
         isComplateData = {
            isComplateTest: courseComplatePercent === 100,
         };
      }
      const finalCourse = { ...data };
      if (preview === 'success' && finalCourse.theme && window.previewTheme) {
         finalCourse.is_rated_on = window.previewTheme.isRatedChecked;
         finalCourse.theme.name = window.previewTheme.themeName;
         finalCourse.theme.themesparts = window.previewTheme.themesParts;
         finalCourse.rated_courses = window.previewTheme.ratedCourses;
         delete window.previewTheme;
      }

      return {
         ...state,
         getCourseInProgress: false,
         course: finalCourse,
         sections,
         lessons: finalLessons,
         author,
         defaultLessonId: finalLessons[0] && finalLessons[0].id,
         prerequisiteLessonIndex,
         courseComplatePercent,
         ...isComplateData,
      };
   },

   [types.GET_VIDEOCOURSE_COMPLETED]: (state, action) => {
      const { payload: { data, isPlaylist } } = action;
      const lessons = [];
      const allLessonsArrayOrder = isArray(data.lessons) || data.blocks;
      allLessonsArrayOrder.forEach(lesson => {
         let lessonsObj = {};
         if ((lesson.is_published !== '2' && lesson.is_published !== '0') || data.is_playlist) {
            if (isPlaylist) {
               lessonsObj = {
                  ...lesson,
                  joined: data.joined,
                  id: lesson.lesson_id,
                  section_id: lesson.section_id,
                  name: lesson.lesson_name,
                  isFreeLesson: lesson.is_free_lesson,
                  viewed: lesson.is_complete,
                  lesson_format: lesson.lesson_format,
                  comment_status: lesson.comment_status,
                  prerequisite: lesson.prerequisite,
                  completed_status: lesson.completed_status,
                  drip_date: (lesson.section && lesson.section.drip_date) || lesson.drip_date,
                  drip_days: lesson.drip_days,
                  is_driplesson: (lesson.section && lesson.section.is_dripSection) || (lesson.is_published === '3' ? 1 : 0),
                  is_published: lesson.is_published,
                  diff_days: lesson.diff_days,
                  is_drip_turned_on: lesson.is_published === '3' ? 1 : 0,
                  drip_type: lesson.drip_type,
                  is_free_lesson: lesson.is_free_lesson,
                  zoom_meeting: lesson.zoom_meeting,
                  is_inactive_prerequisite: lesson.is_inactive_prerequisite,
               };
            } else {
               lessonsObj = {
                  id: lesson.id,
                  section_id: lesson.section_id,
                  title: lesson.name,
                  isFreeLesson: lesson.is_free_lesson,
                  viewed: lesson.is_complete,
                  lesson_format: lesson.lesson_format,
                  comment_status: lesson.comment_status,
                  prerequisite: lesson.prerequisite,
                  completed_status: lesson.completed_status,
                  drip_date: (lesson.section && lesson.section.drip_date) || lesson.drip_date,
                  drip_days: lesson.drip_days,
                  is_driplesson: (lesson.section && lesson.section.is_dripSection) || (lesson.is_published === '3' ? 1 : 0),
                  is_published: lesson.is_published,
                  diff_days: lesson.diff_days,
                  is_drip_turned_on: lesson.is_published === '3' ? 1 : 0,
                  drip_type: lesson.drip_type,
                  is_free_lesson: lesson.is_free_lesson,
                  zoom_meeting: lesson.zoom_meeting,
                  is_inactive_prerequisite: lesson.is_inactive_prerequisite,
                  ...lesson,
               };
            }

            lessons.push(lessonsObj);
         }
      });

      let author = {
         name: '', description: '', img: '',
      };

      if (data.authors && data.authors[0]) {
         author = {
            name: data.authors[0].name, description: data.authors[0].description, img: data.authors[0].picture_src,
         };
      }


      if (isPlaylist) {
         lessons.sort((a, b) => a.order - b.order);
      }

      return {
         ...state,
         getCourseInProgress: false,
         lessons,
         course: {
            ...data, authors: data.authors || [data.author], id: data.course_id, catId: data.id,
         },
         author,
         defaultLessonId: lessons[0] && lessons[0].id,
      };
   },

   [types.GET_COURSE_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getCourseInProgress: false,
         errors,
      };
   },

   [types.GET_LESSON_START]: (state) => {
      return {
         ...state,
         getLessonInProgress: true,
      };
   },

   [types.GET_LESSON_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;
      // question
      let questionLesson;
      let firstQuestionLessonId;

      // if (data.lesson_format === 'Quiz') {
      //    questionLesson = data.quizzes[0];
      //    firstQuestionLessonId = questionLesson.questions[0].id;
      // } else {
      //    questionLesson = [];
      //    firstQuestionLessonId = 0;
      // }
      const lessons = [...state.lessons];
      const filteredLesson = lessons.filter(lesson => lesson.id === data.id);
      if (filteredLesson && filteredLesson[0]
         && filteredLesson[0].is_driplesson && filteredLesson[0].is_driplesson === 1) {
         data.is_driplesson = 1;
         data.diff_days = filteredLesson[0].diff_days;
      }
      return {
         ...state,
         getLessonInProgress: false,
         lesson: data,
         course: { ...state.course, id: data.course?.id },
         // questions: questionLesson,
         //  defaultQuestionId: firstQuestionLessonId,
      };
   },

   [types.GET_VIDEO_COMPLETED]: (state, action) => {
      const { payload: { data } } = action;

      const lessons = [...state.lessons];
      let filteredLesson = {};
      lessons.forEach(lesson => {
         const newLesson = lesson;
         if (lesson.id === data.id) {
            if (state.course.is_free_lesson || state.course.joined) {
               newLesson.blocks = [
                  {
                     videos: lesson.videos,
                     css_attributes: lesson.css_attributes,
                     lesson_format: lesson.lesson_format,
                  },
               ];
               filteredLesson = {
                  ...newLesson,
                  comment_status: 1,
                  status: 1,
                  subtitle: lesson.lesson_subtitle,
                  course: { id: state.course.course_id, section_id: state.course.section_id },
                  section_id: state.course.section_id,
               };
            } else {
               filteredLesson = {
                  ...newLesson,
                  status: 3,
                  subtitle: lesson.lesson_subtitle,
                  comment_status: 1,
                  course: { id: state.course.course_id, section_id: state.course.section_id },
                  section_id: state.course.section_id,
               };
            }
            return false;
         }
      });
      // if (filteredLesson && filteredLesson[0]
      //    && filteredLesson[0].is_driplesson && filteredLesson[0].is_driplesson === 1) {
      //    data.is_driplesson = 1;
      //    data.diff_days = filteredLesson[0].diff_days;
      // }
      return {
         ...state,
         getLessonInProgress: false,
         lesson: filteredLesson,
      };
   },

   [types.GET_LESSON_FAILED]: (state, action) => {
      const { payload: { errors } } = action;
      return {
         ...state,
         getLessonInProgress: false,
         errors,
      };
   },
   [types.SET_LESSON_COMPLATE]: (state, action) => {
      const { payload: { lessonId } } = action;
      const { lessons } = state;
      let prerequisiteLessonIndex = null;

      const newLessons = lessons.map((lesson, index) => {
         if (lesson.id === lessonId) {
            // eslint-disable-next-line no-param-reassign
            lesson.viewed = true;
         }
         if (prerequisiteLessonIndex === null && lesson.prerequisite && !lesson.viewed) {
            prerequisiteLessonIndex = index;
         }
         return lesson;
      }
      );
      let courseComplateCount = 0;
      let newCourseComplatePercent = 0;
      const lessonCount = newLessons.length;
      newLessons.forEach(lesson => {
         courseComplateCount += lesson.viewed;
      });
      newCourseComplatePercent = Math.ceil((courseComplateCount / lessonCount) * 100, 10);

      let isComplateData = {};
      if (!state.isComplateTest) {
         isComplateData = {
            isComplate: newCourseComplatePercent === 100,
            isComplateTest: newCourseComplatePercent === 100,
         };
      }
      return {
         ...state,
         lessons: newLessons,
         courseComplatePercent: newCourseComplatePercent,
         prerequisiteLessonIndex,
         ...isComplateData,
      };
   },

   [types.SET_IS_COMPLATE_COMPLATE]: (state, action) => {
      return {
         ...state,
         isComplate: action.payload,
      };
   },
   [types.COURSE_FINISHED_COMPLATED]: (state, action) => {
      return {
         ...state,
         isComplate: true,
         hasCertificate: action.payload,
      };
   },
   [types.MEETING__BOOK__START]: (state) => {
      return {
         ...state,
         getLessonInProgress: true,
      };
   },
   [types.MEETING__BOOK__END]: (state) => {
      return {
         ...state,
         getLessonInProgress: false,
      };
   },
   [types.MEETING__BOOK__COMPLETED]: (state, action) => {
      const { blockId } = action.payload;
      const lessonBlocks = [...state.lesson.blocks];
      const currentBlock = lessonBlocks.filter(block => block.id === blockId);
      if (currentBlock && currentBlock[0] && !!currentBlock.length) {
         currentBlock[0].zoom_meeting = { ...currentBlock[0].zoom_meeting, is_booked: true };
      }


      return {
         ...state,
         lesson: {
            ...state.lesson,
            blocks: lessonBlocks,
         },
         getLessonInProgress: false,
      };
   },
   [types.SET_ZOOM_SETTINGS_COMPLETE]: (state, action) => {
      const { data } = action.payload;

      switch (data.status) {
         case 'deleted':
            if (state.lesson.id === Number.parseFloat(data.id)) {
               const lessonBlocks = [...state.lesson.blocks];
               const currentBlock = lessonBlocks.filter(block => block.id === Number.parseFloat(data.block_id));
               if (currentBlock && currentBlock[0] && !!currentBlock.length) {
                  currentBlock[0].zoom_meeting = {};
               }
               return {
                  ...state,
                  // lesson: {
                  //    ...state.lesson,
                  //    zoom_meeting: [],
                  // },
                  lesson: {
                     ...state.lesson,
                     blocks: lessonBlocks,
                  },
               };
            }
            break;
         case 'updated':
            if (state.lesson.id === Number.parseFloat(data.id)) {
               const lessonBlocks = [...state.lesson.blocks];
               const currentBlock = lessonBlocks.filter(block => block.id === Number.parseFloat(data.block_id));
               if (currentBlock && currentBlock[0] && !!currentBlock.length) {
                  currentBlock[0].zoom_meeting = { ...data.meeting };
               }
               return {
                  ...state,
                  // lesson: {
                  //    ...state.lesson,
                  //    zoom_meeting: { ...data.meeting },
                  // },
                  lesson: {
                     ...state.lesson,
                     blocks: lessonBlocks,
                  },
               };
            }
            break;
         default:
            if (state.lesson.id === Number.parseFloat(data.id)) {
               const lessonBlocks = [...state.lesson.blocks];
               const currentBlock = lessonBlocks.filter(block => block.id === Number.parseFloat(data.block_id));
               if (currentBlock && currentBlock[0] && !!currentBlock.length) {
                  currentBlock[0].zoom_meeting = { ...currentBlock[0].zoom_meeting, status: data.status };
               }
               return {
                  ...state,
                  // lesson: {
                  //    ...state.lesson,
                  //    zoom_meeting: {
                  //       ...state.lesson.zoom_meeting,
                  //       status: data.status,
                  //    },
                  // },
                  lesson: {
                     ...state.lesson,
                     blocks: lessonBlocks,
                  },
               };
            }
            return state;
      }
   },
};
export default createReducer(initialState)(reducersMap);
