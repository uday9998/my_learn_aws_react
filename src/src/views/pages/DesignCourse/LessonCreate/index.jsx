/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LessonHeader from 'views/layout/DesignCourse/LessonHeader';
import LessonTitle from 'views/pages/DesignCourse/LessonCreate/LessonTitle';
import LessonBlocks from 'views/pages/DesignCourse/LessonCreate/LessonBlocks';
import { slug } from 'views/pages/DesignCourse/LessonCreate/BlockComponent';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';
import Router from 'routes/router';
import { cloneDeep } from 'lodash';
import { useHistory } from 'react-router-dom';
import { slugAnswerMulti } from 'utils/questions';
import UploadModal from 'components/modules/UploadModal';
import UnsavedPopup from 'components/elements/checkoutPopup';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import BlockSettings from './BlockSettings';
import LessonsCreateButton from './LessonsCreateButton';
import './index.scss';

const LessonCreate = ({
  currentLesson,
  goTo,
  match,
  saveLesson,
  deleteBlock,
  updateCuttentLesson,
  saveZoomSettings,
  createLesson,
  currentSection,
  deleteQuizQuestion,
  lessonActionInProgress,
  deleteQuizAnswer,
  quizTemplatesDesc,
  quizTemplatesAsc,
  chooseSavedTemplate,
  openDeleteLesson,
  course,
  app,
  isMobile,
  zoomLoader,
  authors,
  handleAttachAuthorToLesson,
  videoOptimizing,
}) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [bulkBlocks, setBulkBlocks] = useState(currentLesson && currentLesson.blocks);
  const [openLessons, setOpenLessons] = useState(false);
  const [openQuizSettings, setOpenQuizSettings] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNewLessonModal, setOpenNewLessonModal] = useState(false);
  const [openChangeLessonModal, setOpenChangeLessonModal] = useState(0);
  const [isLessonChanged, setIsLessonChanged] = useState(false);
  const [isOpenBulkModal, setIsOpenBulkModal] = useState(false);
  const [isMoreOption, setIsMoreOption] = useState({ navigateFunc: null, e: null });
  const [showCelebration, setShowCelebration] = useState(false);
  const [, setHasError] = useState(false);

  useEffect(() => {
    setBulkBlocks(currentLesson.blocks);
  }, [currentLesson]);

  const history = useHistory();

  useEffect(() => {
    if (isLessonChanged) setOpenModal(true);
    else if (isMoreOption.navigateFunc) isMoreOption.navigateFunc(isMoreOption.e);
  }, [isMoreOption.navigateFunc]);

  const hasValidVideo = (blocks = currentLesson.blocks) =>
    blocks.some(
      (b) =>
        (b.lesson_format === 'Video' ||
          b.lesson_format === 'Video-url' ||
          b.lesson_format === 'Video-embed') &&
        ((b.video_src && b.video_src.length) ||
          (b.video_embed && b.video_embed.length) ||
          (b.videos && b.videos.length) ||
          (b.files && b.files.some((f) => f && f.id))),
    );


    const togglePublish = async () => {
      const unpublishing = currentLesson.is_published === '1';
    
      if (!unpublishing && course.type === '1' && !hasValidVideo()) {
        toast.error('This is a video course. Please add at least one valid video before publishing.');
        return;
      }
    
      try {
        await saveLessonWithErrors(false);
        await saveLesson(
          {
            id: currentLesson.id,
            name: currentLesson.name,
            is_published: unpublishing ? 0 : 1,
            lesson_visiblity: unpublishing ? 0 : 1,
          },
          false
        );
        if (!unpublishing) setShowCelebration(true);
      } catch (e) {
      }
    };
    
  const handleDeleteBlock = (blockId, blockSlug) => {
    setOpenSettings(false);
    deleteBlock(blockId, blockSlug);
  };

  const onChange = (
    name,
    value,
    isBlock,
    originalName,
    type,
    index,
    questionIndex,
    questionType,
    isSettings,
    isAddQuestion,
    options = {},
  ) => {
    if (
      !(
        isBlock &&
        type === 'description' &&
        currentLesson.blocks &&
        currentLesson.blocks[index] &&
        currentLesson.blocks[index][name].includes(
          'Best Headline Ever it Can be Very Long Text to Keep Attention',
        )
      )
    )
      setIsLessonChanged(true);

    if (isBlock) {
      const newLesson = { ...currentLesson };

      if (
        name === 'lesson_format' &&
        (value === 'Video-url' || value === 'Video' || value === 'Video-embed')
      ) {
        if (value !== 'Video-url') newLesson.blocks[index].video_src_type = [];
        else if (value !== 'Video-embed') newLesson.blocks[index].video_embed = '';
      }

      if (originalName && type !== 'Quiz') {
        newLesson.blocks[index].original_name = originalName;
        newLesson.blocks[index].mime_type = type;
        if (newLesson.blocks[index].lesson_format !== 'Zoom') {
          newLesson.blocks[index].name = originalName;
          newLesson.blocks[index] = { ...newLesson.blocks[index], ...options };
          if (!newLesson.blocks[index].files)
            newLesson.blocks[index].files = [{ isMediaLibrary: options.isMediaLibrary, id: options.mediaId }];
        }
      }

      if (type !== 'Quiz') newLesson.blocks[index][name] = value;

      if (type === 'Quiz') {
        if (questionType) {
          if (isSettings) newLesson.blocks[index].quizzes[0][name] = value;
          else {
            newLesson.blocks[index].quizzes[0].questions[questionIndex][name] = value;
            if (originalName && originalName.originalName)
              newLesson.blocks[index].quizzes[0].questions[questionIndex].original_name =
                originalName.originalName;
          }
        }

        if (isAddQuestion) {
          setOpenSettings(false);
          let questions = [];
          if (
            newLesson.blocks[index].quizzes &&
            newLesson.blocks[index].quizzes[0].questions &&
            newLesson.blocks[index].quizzes[0].questions.length
          )
            questions = newLesson.blocks[index].quizzes[0].questions;

          if (value.type === 'welcome_screen') questions.splice(1, 0, value);
          else if (value.type === 'ending') {
            questions.splice(questions.length, 0, value);
            value.order = questions.length - 1;
          } else {
            questions.splice(questionIndex + 1, 0, value);
            questions.forEach((question, i) => {
              const orderedQuestion = question;
              orderedQuestion.order = i;
            });
          }

          const quizzes = [{ ...newLesson.blocks[index].quizzes[0], questions }];
          newLesson.blocks[index] = { ...newLesson.blocks[index], quizzes };
        }
      }
      updateCuttentLesson(newLesson);
    } else updateCuttentLesson({ ...currentLesson, [name]: value });
  };

  const onBulkUpload = (name, value, file, files) => {
    setOpenSettings(false);
    setIsLessonChanged(true);
    const lessonBlocks = bulkBlocks;

    let newBlock = {};
    let blockType = 'Video';
    if (file.type === 'application/pdf') {
      blockType = 'Pdf';
      newBlock.pdf_src = value;
    } else if (file.type.includes('image')) {
      blockType = 'Image';
      newBlock.image_src = value;
    } else if (file.type.includes('video')) {
      blockType = 'Video';
      newBlock.video_src = value;
    } else if (file.type.includes('audio')) {
      blockType = 'Audio';
      newBlock.audio_src = value;
    } else if (file.type.includes('presentation')) {
      blockType = 'Ppt';
      newBlock.ppt_src = value;
    }
    const blockIndex = lessonBlocks.length + 1;
    newBlock = {
      ...newBlock,
      lesson_format: blockType,
      slug: slug(),
      order: blockIndex === false ? 0 : blockIndex,
    };

    if (blockType === 'Video') {
      newBlock.css_attributes = {
        play: 1,
        subtitle: 0,
        show_playbar: 1,
        allow_full_screen: 1,
      };
    }

    if (file.name) {
      newBlock.original_name = file.name;
      newBlock.name = file.name;
      newBlock.mime_type = file.type;
    }

    lessonBlocks.splice(blockIndex - 1, 0, newBlock);

    lessonBlocks.forEach((block, i) => {
      const orderedBlock = block;
      orderedBlock.order = i;
    });

    updateCuttentLesson({ ...currentLesson, blocks: lessonBlocks });
    setBulkBlocks(lessonBlocks);

    const newBlockSlug = newBlock.slug;
    setTimeout(() => {
      const targetElm = document.querySelector(`#${newBlockSlug}`);
      if (targetElm) targetElm.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 0);
    if (files) setIsOpenBulkModal(false);
  };

  const addBlock = (blockType, blockIndex) => {
    setOpenSettings(false);
    setIsLessonChanged(true);
    const lessonBlocks = [...currentLesson.blocks];
    const newQuizBlock = {
      lesson_format: blockType,
      slug: slug(),
      order: blockIndex === false ? 0 : blockIndex,
      quizzes: [
        {
          name: 'Welcome',
          description: '',
          passing_grade: 80,
          passing_grade_status: 1,
          questions: [],
          slug: slug(),
          send_email: false,
          resault_breakdown: false,
        },
      ],
    };

    let newBlock = { lesson_format: blockType, slug: slug(), order: blockIndex === false ? 0 : blockIndex };

    newBlock.css_attributes = { paddingTop: 20, paddingBottom: 20, bg_color: null };

    if (blockType === 'Text')
      newBlock = { ...newBlock, description: 'Best Headline Ever it Can be Very Long Text to Keep Attention' };

    if (blockType === 'Video')
      newBlock.css_attributes = { play: 1, subtitle: 0, show_playbar: 1, allow_full_screen: 1 };

    if (blockType === 'Quiz') lessonBlocks.splice(blockIndex - 1, 0, newQuizBlock);
    else lessonBlocks.splice(blockIndex - 1, 0, newBlock);

    lessonBlocks.forEach((block, i) => {
      const orderedBlock = block;
      orderedBlock.order = i;
    });

    updateCuttentLesson({ ...currentLesson, blocks: lessonBlocks });

    let newBlockSlug = newBlock.slug;
    if (blockType === 'Quiz') newBlockSlug = newQuizBlock.slug;

    setTimeout(() => {
      const targetElm = document.querySelector(`#${newBlockSlug}`);
      if (targetElm) targetElm.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 0);
  };

  const addVideoBlock = (blockType, blockIndex) => {
    setOpenSettings(false);
    const lessonBlocks = [...currentLesson.blocks];
    const newBlock = { lesson_format: blockType, slug: slug(), order: blockIndex === false ? 0 : blockIndex };

    newBlock.css_attributes = {
      paddingTop: 20,
      paddingBottom: 20,
      bg_color: null,
      play: 1,
      subtitle: 0,
      show_playbar: 1,
      allow_full_screen: 1,
    };
    lessonBlocks.splice(blockIndex - 1, 0, newBlock);
    updateCuttentLesson({ ...currentLesson, blocks: lessonBlocks });
  };

  useEffect(() => {
    if (course.type === '1' && currentLesson.blocks && currentLesson.blocks.length === 0)
      addVideoBlock('Video', 0);

    const learnMoreElement = document.querySelectorAll('.icon__text__wrapper');
    learnMoreElement.forEach((element) => {
      element.style.display = 'none';
    });
  }, []);

  const duplicateBlock = (duplicatedBlock, blockIndex) => {
    setOpenSettings(false);
    setIsLessonChanged(true);
    let newDuplicatedBlock = duplicatedBlock;
    if (duplicatedBlock.lesson_format === 'Quiz') {
      newDuplicatedBlock = cloneDeep(duplicatedBlock);
      if (newDuplicatedBlock.quizzes[0].id) delete newDuplicatedBlock.quizzes[0].id;
      if (newDuplicatedBlock.quizzes[0].questions.length > 0) {
        newDuplicatedBlock.quizzes[0].questions.forEach((question) => {
          let newQuestion = question;
          switch (newQuestion.type) {
            case 'multiple_choice':
              newQuestion = { ...newQuestion };
              let newMultiAnswers = cloneDeep(newQuestion.answers).map((newMultiAnswer, i) => {
                newMultiAnswer.slug = slugAnswerMulti(new Date().getTime() + i);
                if (newMultiAnswer.id) delete newMultiAnswer.id;
                return newMultiAnswer;
              });
              newQuestion.answers = [...newMultiAnswers];
              break;
            case 'yes_no':
              newQuestion = { ...newQuestion };
              let newAnswers = cloneDeep(newQuestion.answers).map((newAnswer, i) => {
                newAnswer.slug = slugAnswerMulti(new Date().getTime() + i);
                if (newAnswer.id) delete newAnswer.id;
                return newAnswer;
              });
              newQuestion.answers = [...newAnswers];
              break;
            default:
          }
          newQuestion.slug = slug(new Date().getTime());
          if (question.id) delete newQuestion.id;
        });
      }
    }
    const lessonBlocks = [...currentLesson.blocks];
    lessonBlocks.splice(blockIndex, 0, { ...newDuplicatedBlock, slug: slug(), id: null });

    lessonBlocks.forEach((block, i) => {
      const orderedBlock = block;
      orderedBlock.order = i;
    });

    updateCuttentLesson({ ...currentLesson, blocks: lessonBlocks });
  };

  const reOrderBlocks = (orderType, orderedBlockIndex) => {
    setOpenSettings(false);
    setIsLessonChanged(true);
    const lessonBlocks = [...currentLesson.blocks];
    if (orderType === '+' && orderedBlockIndex < lessonBlocks.length - 1) {
      lessonBlocks[orderedBlockIndex].order = orderedBlockIndex + 1;
      lessonBlocks[orderedBlockIndex + 1].order = orderedBlockIndex;
      const b = lessonBlocks[orderedBlockIndex];
      lessonBlocks[orderedBlockIndex] = lessonBlocks[orderedBlockIndex + 1];
      lessonBlocks[orderedBlockIndex + 1] = b;
    } else if (orderType === '-' && orderedBlockIndex > 0) {
      lessonBlocks[orderedBlockIndex].order = orderedBlockIndex - 1;
      lessonBlocks[orderedBlockIndex - 1].order = orderedBlockIndex;
      const b = lessonBlocks[orderedBlockIndex];
      lessonBlocks[orderedBlockIndex] = lessonBlocks[orderedBlockIndex - 1];
      lessonBlocks[orderedBlockIndex - 1] = b;
    }

    updateCuttentLesson({ ...currentLesson, blocks: lessonBlocks });
  };

  const onSettingsChange = (name, value) => {
    setIsLessonChanged(true);
    const lessonBlocks = [...currentLesson.blocks];
    let currentBlock = lessonBlocks[openSettings - 1];
    currentBlock = { ...currentBlock, css_attributes: { ...currentBlock.css_attributes, [name]: value } };
    lessonBlocks[openSettings - 1] = currentBlock;

    updateCuttentLesson({ ...currentLesson, blocks: lessonBlocks });
  };

  const deleteQuestion = (quizId, question, questionSlug, blockId, index) => {
    if (question.id !== undefined) deleteQuizQuestion(quizId, question.id, blockId);
    else {
      const newLesson = { ...currentLesson };
      const newQuiz = newLesson.blocks[index].quizzes[0];
      newQuiz.questions = newQuiz.questions.filter((newquestion) => newquestion.slug !== questionSlug);

      updateCuttentLesson({ ...newLesson });
    }
  };

  const changeQuestionAnswer = (newQuestion, isSave, questionIndex, index) => {
    const newLesson = { ...currentLesson };
    setIsLessonChanged(true);
    setOpenSettings(false);
    if (!isSave) {
      newLesson.blocks[index].quizzes[0].questions[questionIndex] = newQuestion;

      updateCuttentLesson(newLesson);
    } else if (isSave) {
      const newAnswers = newLesson.blocks[index].quizzes[0].questions[questionIndex].answers;
      const newAnswer = newQuestion.newAnswer;
      newAnswer.slug = slug();
      newAnswers.push(newAnswer);

      updateCuttentLesson(newLesson);
    }
  };

  const handleElementOnDragEnd = (result, blockIndex) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      if (isPrint("The element can't be added in this area.")) toast.error("The element can't be added in this area.");
      return;
    }
    if (destination && destination.droppableId !== source.droppableId) {
      if (isPrint("The element can't be added in this area.")) toast.error("The element can't be added in this area.");
      return;
    }
    setIsLessonChanged(true);
    if (type === 'questions') {
      const newLesson = { ...currentLesson };
      const questions = [
        ...newLesson.blocks[parseInt(source.droppableId, 10)].quizzes[0].questions,
      ];
      const draggableQuestion = questions.find((question) => question.slug === draggableId);
      questions.splice(source.index, 1);
      questions.splice(destination.index, 0, draggableQuestion);
      questions.forEach((question, i) => {
        const orderedQuestion = question;
        orderedQuestion.order = i;
      });

      updateCuttentLesson(newLesson);
    } else if (type === 'answers') {
      const newLesson = { ...currentLesson };
      const questions = [...newLesson.blocks[blockIndex].quizzes[0].questions];
      const dropableQuestion = questions.find(
        (question) => question.slug === destination.droppableId,
      );
      const answers = dropableQuestion.answers;
      const draggableAnswer = answers.find((answer) => answer.slug === draggableId);
      answers.splice(source.index, 1);
      answers.splice(destination.index, 0, draggableAnswer);

      answers.forEach((answer, i) => {
        const orderedAnswer = answer;
        orderedAnswer.order = i;
      });

      updateCuttentLesson(newLesson);
    }
  };

  const handleDeleteAnswer = (block, questionId, answer, questionIndex, index) => {
    if (answer.id !== undefined) deleteQuizAnswer(block.id, block.quizzes[0].id, questionId, answer.id);
    else {
      const newLesson = { ...currentLesson };
      const newQuiz = newLesson.blocks[index].quizzes[0];
      const questions = newQuiz.questions;
      const currentQuestion = questions[questionIndex];
      currentQuestion.answers = currentQuestion.answers.filter(
        (newanswer) => newanswer.slug !== answer.slug,
      );

      updateCuttentLesson({ ...newLesson });
    }
  };

  const saveLessonWithErrors = async (isExit, extraData = {}) => {
   let errorMsg = '';
   const quizBlocks = currentLesson.blocks.filter(b => b.lesson_format === 'Quiz');
 
   outer: for (let i = 0; i < quizBlocks.length; i++) {
     const quiz = quizBlocks[i].quizzes[0];
     if (!quiz.name) {
       errorMsg = 'Quiz name is required.';
       break;
     }
     for (let j = 0; j < quiz.questions.length; j++) {
       const q = quiz.questions[j];
       if (q.type !== 'welcome_screen' && !q.title) {
         errorMsg = 'Question name is required.';
         break outer;
       }
       if (q.type === 'multiple_choice' || q.type === 'yes_no') {
         const emptyAnswer = q.answers.some(a => !a.description);
         if (emptyAnswer) {
           errorMsg = 'Answer description is required.';
           break outer;
         }
         if (q.type === 'multiple_choice' && q.multiple_status) {
           const trueCount = q.answers.filter(a => a.is_true === 1 || a.is_true === true).length;
           if (parseInt(q.multiple_value, 10) !== trueCount) {
             errorMsg = 'There is a multiple question with the correct number of answers indicated incorrectly';
             break outer;
           }
         }
       }
     }
   }
 
   if (errorMsg) {
     if (isPrint(errorMsg)) toast.error(errorMsg);
     throw new Error(errorMsg);
   }
 
   const payload = {
     ...currentLesson,
     ...extraData,
     lesson_visiblity: extraData.lesson_visiblity !== undefined ? extraData.lesson_visiblity : 1,
   };
 
   if (!isLessonChanged && !Object.keys(extraData).length) {
     if (isExit) {
       goTo(
         `${Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: match.params.id })}#program-general`
       );
     }
     return;
   }
 
   await saveLesson(payload, isExit);
   setIsLessonChanged(false);
 };

  const goBack = () => {
    history.push(
      Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: match.params.id }),
      [match.params.sectionId],
    );
  };

  const handleMoreOptionNavigate = (navigateFunc, e) => {
    setIsMoreOption((prevState) => ({ ...prevState, navigateFunc, e }));
  };

  return (
    <div className='lesson__create'>
      <LessonHeader
        title={currentLesson.name}
        goTo={isLessonChanged ? () => setOpenModal(true) : () => goBack()}
        match={match}
        openDeleteLesson={openDeleteLesson}
        onChange={onChange}
        saveLesson={(isExit) => {
          saveLessonWithErrors(isExit);
          setOpenSettings(false);
        }}
        currentLesson={currentLesson}
        course={course}
        setIsOpenBulkModal={setIsOpenBulkModal}
        isMobile={isMobile}
        authors={authors}
        handleAttachAuthorToLesson={handleAttachAuthorToLesson}
        isLessonChanged={isLessonChanged}
        handleMoreOptionNavigate={handleMoreOptionNavigate}
        publishLesson={togglePublish}
        isPublished={currentLesson.is_published === "1"}
      />
      <div className='lesson__create__container'>
        {openSettings && (
          <BlockSettings
            isVideo={course.type === '1'}
            onClose={() => {
              setOpenSettings(false);
              setOpenQuizSettings(false);
            }}
            onSettingsChange={onSettingsChange}
            onQuizSettingsChange={(name, value) =>
              onChange(name, value, 'true', '', 'Quiz', openSettings - 1, '', 'welcome_screen', true)
            }
            openQuizSettings={openQuizSettings}
            inputs={currentLesson.blocks[openSettings - 1].css_attributes || {}}
            type={currentLesson.blocks[openSettings - 1].lesson_format}
            quiz={
              currentLesson.blocks[openSettings - 1] &&
              currentLesson.blocks[openSettings - 1].quizzes &&
              currentLesson.blocks[openSettings - 1].quizzes[0]
            }
          />
        )}
        <div className='lesson__create__container__right'>
          <LessonTitle
            title={currentLesson.name}
            subtitle={currentLesson.subtitle}
            goTo={goTo}
            match={match}
            authors={authors}
            author={currentLesson.author}
            handleAttachAuthorToLesson={(e) => handleAttachAuthorToLesson(e, currentLesson.id)}
            onChange={onChange}
            course={course}
            setOpenSettings={setOpenSettings}
          />
          <LessonBlocks
            onChange={onChange}
            lesson={currentLesson}
            addBlock={addBlock}
            deleteBlock={handleDeleteBlock}
            duplicateBlock={duplicateBlock}
            reOrderBlocks={reOrderBlocks}
            setOpenSettings={setOpenSettings}
            openSettings={openSettings}
            saveZoomSettings={saveZoomSettings}
            deleteQuestion={deleteQuestion}
            changeQuestionAnswer={changeQuestionAnswer}
            handleElementOnDragEnd={handleElementOnDragEnd}
            lessonActionInProgress={lessonActionInProgress}
            handleDeleteAnswer={handleDeleteAnswer}
            setOpenQuizSettings={setOpenQuizSettings}
            setHasError={setHasError}
            quizTemplatesAsc={quizTemplatesAsc}
            quizTemplatesDesc={quizTemplatesDesc}
            chooseSavedTemplate={chooseSavedTemplate}
            saveLesson={(isExit) => {
              saveLessonWithErrors(isExit);
              setOpenSettings(false);
            }}
            course={course}
            app={app}
            zoomLoader={zoomLoader}
            videoOptimizing={videoOptimizing}
          />
        </div>
      </div>

      <LessonsCreateButton
        setOpenLessons={setOpenLessons}
        openLessons={openLessons}
        course={course}
        createLesson={isLessonChanged ? () => setOpenNewLessonModal(true) : () => createLesson()}
        currentSection={currentSection}
        currentLesson={currentLesson}
        goTo={
          isLessonChanged
            ? (id) => setOpenChangeLessonModal(id)
            : (id) =>
                goTo(
                  Router.route('ADMIN_LESSON_CREATE').getCompiledPath({
                    id: currentSection.course_id,
                    sectionId: currentSection.id,
                    lessons: course.type === '1' ? 'videos' : 'lessons',
                    lessonId: id,
                  }),
                )
        }
      />
      {!!openChangeLessonModal && (
        <UnsavedPopup
          handleCloseModal={() => setOpenChangeLessonModal(false)}
          handleYes={() => {
            setOpenChangeLessonModal(false);
            goTo(
              Router.route('ADMIN_LESSON_CREATE').getCompiledPath({
                id: currentSection.course_id,
                sectionId: currentSection.id,
                lessons: course.type === '1' ? 'videos' : 'lessons',
                lessonId: openChangeLessonModal,
              }),
            );
            setOpenLessons(false);
          }}
        />
      )}
      {!!openNewLessonModal && (
        <UnsavedPopup
          handleCloseModal={() => setOpenNewLessonModal(false)}
          handleYes={() => {
            setOpenNewLessonModal(false);
            createLesson();
            setOpenLessons(false);
          }}
        />
      )}
      {openModal && (
        <UnsavedPopup
          handleCloseModal={() => setOpenModal(false)}
          handleYes={() =>
            goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: match.params.id }))
          }
          navigateFunc={isMoreOption.navigateFunc}
          e={isMoreOption.e}
        />
      )}
      {isOpenBulkModal && (
        <UploadModal
          fileLessonFormat='media'
          isWithoutModal
          isBulk
          isAmazonFile
          text='Files'
          onChange={(value, originalName, file, files) => onBulkUpload('src', value, file, files)}
          onCloseModal={() => setIsOpenBulkModal(false)}
        />
      )}
      {showCelebration && (
        <div className='celebration__overlay'>
          <div className='celebration__content'>
            <div className='celebration__animation'>🎉</div>
            <BaseButton
              theme={btnTheme.primary}
              size={btnSizes.small}
              text='Close'
              onClick={() => setShowCelebration(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

LessonCreate.propTypes = {
  currentLesson: PropTypes.object,
  saveLesson: PropTypes.func,
  goTo: PropTypes.func,
  match: PropTypes.object,
  deleteBlock: PropTypes.func,
  updateCuttentLesson: PropTypes.func,
  saveZoomSettings: PropTypes.func,
  createLesson: PropTypes.func,
  currentSection: PropTypes.object,
  deleteQuizQuestion: PropTypes.func,
  lessonActionInProgress: PropTypes.bool,
  deleteQuizAnswer: PropTypes.func,
  quizTemplatesAsc: PropTypes.array,
  quizTemplatesDesc: PropTypes.array,
  chooseSavedTemplate: PropTypes.func,
  openDeleteLesson: PropTypes.func,
  course: PropTypes.object,
  app: PropTypes.any,
  isMobile: PropTypes.bool,
  zoomLoader: PropTypes.bool,
  authors: PropTypes.array,
  handleAttachAuthorToLesson: PropTypes.func,
  videoOptimizing: PropTypes.bool,
};

export default LessonCreate;
