import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LessonCreate from 'views/pages/DesignCourse/LessonCreate';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
   updateCuttentLessonAction as updateCuttentLesson,
} from 'state/modules/designCourse/edit/actions';
import withLoading from 'utils/withLoading';
import * as operations from 'state/modules/designCourse/edit/operations';
import * as selectors from 'state/modules/designCourse/edit/selectors';
import { appSelector, siteInfoSelector } from 'state/modules/common/selectors';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import DeleteModal from 'components/elements/DeleteModal';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import Container from 'views/layout/AdminContainer';
import {
   getAllAuthors,
} from 'api/AuthApi';
import { useApiQuery } from 'utils/hooks/useQuery';
import Router from 'routes/router';
import { useSocket } from 'utils/hooks/useSocket';

const LessonCreateLoading = withLoading(LessonCreate);

const CreateLessonContainer = ({
   lessonActionInProgress, match, chooseLesson, currentLesson, goTo, saveLesson, deleteBlock, duplicateBlock,
   updateCuttentLessonFunc, saveZoomSettingsView, createLesson, currentSection, deleteQuizQuestion, deleteQuizAnswer,
   quizTemplatesDesc, quizTemplatesAsc, chooseSavedTemplate, addNewQuestion, addNewAnswer, deleteLesson, course, app, zoomLoader,
   selectAuthor, siteInfo,
}) => {
   const { data: authors, loading } = useApiQuery(getAllAuthors);
   const [deleteLessonModalOpen, setDeleteLessonModalOpen] = useState(false);
   const [currentBlockId, setCurrentBlockId] = useState(null);
   const [videoOptimizing, setVideoOptizing] = useState('');
   const [isMobile, setIsMobile] = useState(false);
   useSocket('uploads.video-update', (res) => { setVideoOptizing(res); }, app);
   useSocket('transcription_url', (res) => { setVideoOptizing(res); }, app);

   useEffect(() => {
      const isMobileView = () => {
         return window.innerWidth <= 1024;
      };
      const handleMobileView = () => {
         setIsMobile(isMobileView());
      };
      window.addEventListener('resize', handleMobileView);
      handleMobileView();
      return () => {
         window.removeEventListener('resize', handleMobileView);
      };
   }, []);

   useEffect(() => {
      chooseLesson(match.params.id, match.params.sectionId, match.params.lessonId);
   }, [match.params.lessonId]);


   // let primaryButton = siteInfo && siteInfo.landing_data[5].school_room_components[0].subcomponent[2].props;
   // if (siteInfo && siteInfo.landing_data[5].school_room_components[0].subcomponent[2].props
   //    && !siteInfo.landing_data[5].school_room_components[0].subcomponent[2].props.bgColor) {
   //    primaryButton = siteInfo && siteInfo.landing_data[5].school_room_components[0].subcomponent[3].props;
   // }


   // React.useEffect(() => {
   //    document.body.style.setProperty('--textColor', primaryButton.color);
   // }, [siteInfo]);


   const saveLessonHandle = (lesson, isExit) => {
      saveLesson(match.params.id, match.params.sectionId, match.params.lessonId, lesson, isExit, course.type);
   };


   const duplicateBlockHandle = (blockId) => {
      duplicateBlock(match.params.id, match.params.sectionId, match.params.lessonId, blockId);
   };

   const saveZoomSettings = (data) => {
      saveZoomSettingsView(match.params.id, match.params.sectionId, match.params.lessonId, data);
   };

   const createNewLesson = () => {
      createLesson(match.params.id, match.params.sectionId, course.type === '1' ? 'Video' : 'Lesson');
   };

   const chooseSavedTemplateFunc = (quizId, blockSlug, blockId, blockIndex) => {
      chooseSavedTemplate(
         match.params.id, match.params.sectionId, match.params.lessonId, quizId, blockSlug, blockId, blockIndex);
   };

   const addNewQuestionFunc = (blockId, quizId, question, blockIndex, questionIndex, slug) => {
      addNewQuestion(
         match.params.id, match.params.sectionId, match.params.lessonId,
         blockId, quizId, question, blockIndex, questionIndex, slug);
   };

   const addNewAnswerFunc = (questionId, answer, blockIndex, questionIndex) => {
      addNewAnswer(
         match.params.id, match.params.sectionId, match.params.lessonId, questionId, answer, blockIndex, questionIndex);
   };

   const openDeleteLesson = () => {
      setDeleteLessonModalOpen(!deleteLessonModalOpen);
   };

   const deleteLessonApproved = () => {
      deleteLesson(match.params.id, match.params.sectionId, match.params.lessonId);
      setDeleteLessonModalOpen(!deleteLessonModalOpen);
   };

   const deleteBlockHandle = (blockId, slug) => {
      setCurrentBlockId({
         blockId,
         slug,
      });
   };


   const deleteBlockApproved = ({ blockId, slug }) => {
      deleteBlock(blockId, slug);
      setCurrentBlockId(null);
   };

   return (
      <Container>
         <>
            <Container.Header>
               <SiteHeader
                  title='Courses'
                  tooltip='This is where you can create new courses and organize existing ones.'
                  goToBack={ () => goTo(Router.route('ADMIN_DASHBOARD').getMask()) }
                  goBack
                  isLeftAction
                  // setIsOpenMobSearch={ this.setIsOpenMobSearch }
                  // isMobSearchOpen={ isMobSearchOpen }
               />
            </Container.Header>
            <LessonCreateLoading
               isLoading={ lessonActionInProgress }
               selectAuthor={ selectAuthor }
               authors={ authors }
               handleAttachAuthorToLesson={ selectAuthor }
               match={ match }
               currentLesson={ currentLesson }
               goTo={ goTo }
               saveLesson={ saveLessonHandle }
               deleteBlock={ deleteBlockHandle }
               duplicateBlock={ duplicateBlockHandle }
               updateCuttentLesson={ updateCuttentLessonFunc }
               saveZoomSettings={ saveZoomSettings }
               createLesson={ createNewLesson }
               currentSection={ currentSection }
               deleteQuizQuestion={ deleteQuizQuestion }
               lessonActionInProgress={ lessonActionInProgress }
               deleteQuizAnswer={ deleteQuizAnswer }
               quizTemplatesAsc={ quizTemplatesAsc }
               quizTemplatesDesc={ quizTemplatesDesc }
               chooseSavedTemplate={ chooseSavedTemplateFunc }
               addNewQuestion={ addNewQuestionFunc }
               addNewAnswer={ addNewAnswerFunc }
               openDeleteLesson={ openDeleteLesson }
               course={ course }
               app={ app }
               isMobile={ isMobile }
               zoomLoader={ zoomLoader }
               videoOptimizing={ videoOptimizing }
            />
            {lessonActionInProgress && (
               <LoaderSpinner />
            )}
            {
               deleteLessonModalOpen && (
                  <DeleteModal
                     title='Are you sure you want to delete this lesson?'
                     deleteText='Delete'
                     maxWidth={ 345 }
                     onDelete={ deleteLessonApproved }
                     onCancel={ openDeleteLesson }
                  />
               )
            }
            {
               currentBlockId && (
                  <DeleteModal
                     title='Are you sure you want to delete this block?'
                     deleteText='Delete'
                     maxWidth={ 345 }
                     onDelete={ () => deleteBlockApproved(currentBlockId) }
                     onCancel={ () => setCurrentBlockId(null) }
                  />
               )
            }
         </>
      </Container>
   );
};

CreateLessonContainer.propTypes = {
   lessonActionInProgress: PropTypes.bool,
   match: PropTypes.object,
   chooseLesson: PropTypes.func,
   currentLesson: PropTypes.object,
   saveLesson: PropTypes.func,
   goTo: PropTypes.func,
   deleteBlock: PropTypes.func,
   updateCuttentLessonFunc: PropTypes.func,
   createLesson: PropTypes.func,
   currentSection: PropTypes.object,
   duplicateBlock: PropTypes.func,
   saveZoomSettingsView: PropTypes.func,
   deleteQuizQuestion: PropTypes.func,
   deleteQuizAnswer: PropTypes.func,
   quizTemplatesAsc: PropTypes.array,
   quizTemplatesDesc: PropTypes.array,
   chooseSavedTemplate: PropTypes.func,
   addNewAnswer: PropTypes.func,
   addNewQuestion: PropTypes.func,
   deleteLesson: PropTypes.func,
   course: PropTypes.object,
   app: PropTypes.any,
   zoomLoader: PropTypes.bool,
   selectAuthor: PropTypes.func,
   siteInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      currentLesson: selectors.currentLessonSelector(state),
      course: selectors.courseLessonSelector(state),
      currentSection: selectors.currentSectionSelector(state),
      lessonActionInProgress: selectors.lessonActionInProgressSelector(state),
      quizTemplatesDesc: selectors.QuizTemplatesDescSelector(state),
      quizTemplatesAsc: selectors.QuizTemplatesAscSelector(state),
      app: appSelector(state),
      zoomLoader: selectors.zoomLoaderSelector(state),
      siteInfo: siteInfoSelector(state),

   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
      deleteLesson: (courseId, sectionId, lessonId) => {
         dispatch(operations.deleteLessonOperation(courseId, sectionId, lessonId));
      },
      chooseLesson: async (courseId, sectionId, lessonId) => {
         await dispatch(operations.getLessonOperation(courseId, sectionId, lessonId));
      },
      saveLesson: (courseId, sectionId, lessonId, params, isExit, courseType) => {
         dispatch(operations.saveLessonTitleOperation(courseId, sectionId, lessonId, params, isExit, courseType));
      },
      deleteBlock: (blockId, slug) => {
         dispatch(operations.deleteBlockOperation(blockId, slug));
      },
      duplicateBlock: (courseId, sectionId, lessonId, blockId) => {
         dispatch(operations.duplicateBlockOperation(courseId, sectionId, lessonId, blockId));
      },
      updateCuttentLessonFunc: (lesson) => {
         dispatch(updateCuttentLesson(lesson));
      },
      saveZoomSettingsView: (courseId, sectionId, lessonId, params, data) => {
         dispatch(operations.saveZoom(courseId, sectionId, lessonId, params, data));
      },
      createLesson: (courseId, sectionId, format) => {
         dispatch(operations.createLessonOperation(courseId, sectionId, format));
      },
      deleteQuizQuestion: (quizId, questionId, blockId) => {
         dispatch(operations.deleteQuizQuestionOperation(quizId, questionId, blockId));
      },
      deleteQuizAnswer: (blockId, quizId, questionId, answerId) => {
         dispatch(operations.deleteQuizAnswerOperation(blockId, quizId, questionId, answerId));
      },
      chooseSavedTemplate: (courseId, sectionId, lessonId, quizId, blockSlug, blockId, blockIndex) => {
         dispatch(operations.chooseSavedTemplateOperation(
            courseId, sectionId, lessonId, quizId, blockSlug, blockId, blockIndex));
      },
      addNewQuestion: (courseId, sectionId, lessonId, blockId, quizId, question, blockIndex, questionIndex, slug) => {
         dispatch(operations.addNewQuestionOperation(
            courseId, sectionId, lessonId, blockId, quizId, question, blockIndex, questionIndex, slug));
      },
      addNewAnswer: (courseId, sectionId, lessonId, questionId, answer, blockIndex, questionIndex) => {
         dispatch(operations.addNewAnswerOperation(
            courseId, sectionId, lessonId, questionId, answer, blockIndex, questionIndex));
      },
      selectAuthor: (author, lessonId) => {
         dispatch(operations.LessonSelectAuthor(author, lessonId));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLessonContainer);
