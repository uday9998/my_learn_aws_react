/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import ImageLesson from './ImageLesson';
import PdfLesson from './PdfLesson';
import PptLesson from './PptLesson';
import VideoLesson from './VideoLesson';
import AudioLesson from './AudioLesson';
import TextLesson from './TextLesson';
import QuizLesson from './QuizLesson';
import MultimediaLesson from './FileLesson';
import CodeLesson from './CodeLesson';
import LessonBlockContainer from '../LessonBlockContainer';
import LessonBlock from './LessonBlock';
import './index.scss';


const LessonBlocks = ({
   lesson, onChange, addBlock, reOrderBlocks, setOpenSettings,
   deleteBlock, duplicateBlock, openSettings,
   deleteQuestion, changeQuestionAnswer, handleElementOnDragEnd,
   lessonActionInProgress, handleDeleteAnswer, setOpenQuizSettings,
   setHasError, quizTemplatesDesc, quizTemplatesAsc, chooseSavedTemplate,
   course, app, videoOptimizing,
}) => {
   const [editableBlockOpen, setEditableBlockOpen] = useState(false);
   let blocksSort = [];
   if (lesson && lesson.blocks && !!lesson.blocks.length) {
      blocksSort = lesson.blocks.sort((a, b) => {
         return a.order - b.order;
      });
   }

   const min = 0;
   const chooseBlocktype = (blockType, block, index) => {
      let blockName;

      switch (blockType) {
         case 'Image':
            blockName = (
               <ImageLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type, options) => onChange(
                        name,
                        value,
                        isBlock,
                        originalName,
                        type,
                        index,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        options
                     )
                  }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         case 'Pdf':
            blockName = (
               <PdfLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type) => onChange(name, value, isBlock, originalName, type, index) }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         case 'Ppt':
            blockName = (
               <PptLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type) => onChange(name, value, isBlock, originalName, type, index) }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         case 'Video':
         case 'Video-url':
         case 'Video-embed':
            blockName = (
               <VideoLesson
                  onChange={
                     (name, value, isBlock, originalName, type, options) => onChange(
                        name,
                        value,
                        isBlock,
                        originalName,
                        type,
                        index,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        options
                     )
                  }
                  block={ block }
                  lesson={lesson}
                  openSettings={ openSettings }
                  app={ app }
                  videoOptimizing={ videoOptimizing }
               />
            );
            break;
         case 'Audio':
            blockName = (
               <AudioLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type) => onChange(name, value, isBlock, originalName, type, index) }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         case 'Text':
            blockName = (
               <TextLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type) => onChange(name, value, isBlock, originalName, type, index) }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         case 'Quiz':
            blockName = (
               <QuizLesson
                  setActiveName={ () => {
                  } }
                  onChange={ (name, value, isBlock, originalName, type, questionIndex, questionType, isSettings, isAddQuestion) => onChange(name, value, isBlock, originalName, type, index, questionIndex, questionType, isSettings, isAddQuestion) }
                  block={ block }
                  openSettings={ openSettings }
                  changeQuestionAnswer={ (newQuestion, questionIndex, isSave) => changeQuestionAnswer(newQuestion, questionIndex, isSave, index) }
                  deleteQuestion={ (quizId, question, questionSlug) => deleteQuestion(quizId, question, questionSlug, block.id, index) }
                  handleElementOnDragEnd={ handleElementOnDragEnd }
                  blockIndex={ index }
                  lessonActionInProgress={ lessonActionInProgress }
                  handleDeleteAnswer={ (questionId, answer, questionIndex) => handleDeleteAnswer(block, questionId, answer, questionIndex, index) }
                  setHasError={ setHasError }
                  quizTemplatesAsc={ quizTemplatesAsc }
                  quizTemplatesDesc={ quizTemplatesDesc }
                  chooseSavedTemplate={ (quizId) => chooseSavedTemplate(quizId, block.slug, block.id, index) }
               />
            );
            break;
         case 'Multimedia':
            blockName = (
               <MultimediaLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type) => onChange(name, value, isBlock, originalName, type, index) }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         case 'Code':
            blockName = (
               <CodeLesson
                  setActiveName={ () => {
                  } }
                  onChange={
                     (name, value, isBlock, originalName, type) => onChange(name, value, isBlock, originalName, type, index) }
                  block={ block }
                  openSettings={ openSettings }
               />
            );
            break;
         default:
      }
      return blockName;
   };

   return (
      <div className='lesson__blocks'>
         {course?.type !== '1' && !!lesson && ((lesson.blocks && !lesson.blocks.length) || lesson.blocks === null) && (
            <>
               <div className='lesson__blocks__title'>
                  <div>
                     <IconNew name='WaveL' />
                  </div>
                  <div className='lesson__blocks__title__text'>
                     <Text
                        inner={ course.type === '1' ? 'Welcome to Video Lesson Creation' : 'Welcome to Lesson Creation' }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                     />
                  </div>
                  <div>
                     <Text
                        inner='Select Any Block To Start'
                        type={ txtTypes.regularDefaultSmall }
                        size={ txtSizes.size_28 }
                     />
                  </div>
                  <LessonBlock
                     addBlock={ (type) => {
                        addBlock(type, editableBlockOpen);
                        setEditableBlockOpen(!editableBlockOpen);
                        setOpenSettings(false);
                     } }
                     course={ course }
                  />
               </div>

            </>
         )}
         {lesson && lesson.blocks && !!lesson.blocks.length
            && (
               <>
                  {blocksSort.map((block, index) => {
                     if (block.lesson_format !== 'Zoom') {
                        return (
                           <div>
                              {!!editableBlockOpen && editableBlockOpen === index + 1 && (
                                 <div className='lesson__blocks__title'>
                                    <LessonBlock
                                       course={ course }
                                       addBlock={ (type) => {
                                          addBlock(type, editableBlockOpen);
                                          setEditableBlockOpen(!editableBlockOpen);
                                          setOpenSettings(false);
                                       } }
                                    />
                                 </div>
                              )}

                              <LessonBlockContainer
                                 onClick={ () => {
                                    setEditableBlockOpen(index + 1);
                                    setOpenSettings(false);
                                 } }
                                 key={ block.slug }
                                 id={ block.slug }
                                 deleteBlock={ () => deleteBlock(block.id, block.slug) }
                                 blockId={ block.id }
                                 block={ block }
                                 type={ block.lesson_format }
                                 duplicateBlock={ () => duplicateBlock(block, index + 1) }
                                 reOrderBlocks={ (orderType) => reOrderBlocks(orderType, index) }
                                 setOpenSettings={ () => setOpenSettings(index + 1) }
                                 setOpenQuizSettings={ () => setOpenQuizSettings(index + 1) }
                                 openSettings={ openSettings }
                                 style={ block.css_attributes || {} }
                                 addBlock={ (type) => {
                                    addBlock(type, editableBlockOpen);
                                    setEditableBlockOpen(!editableBlockOpen);
                                    setOpenSettings(false);
                                 } }
                                 index={ index }
                                 editableBlockOpen={ editableBlockOpen }
                                 course={ course }

                              >

                                 {chooseBlocktype(block.lesson_format, block, index)}
                              </LessonBlockContainer>
                           </div>
                        );
                     }
                     return null;
                  })}
                  {course.type !== '1' && (
                     <div className='lesson__block__container__last'>
                        <div
                           className='lesson__block__container__add'
                           onClick={ () => {
                              setEditableBlockOpen(lesson.blocks.length + 1);
                              setOpenSettings(false);
                              setTimeout(() => {
                                 document.getElementById('last-id').scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'end',
                                 }, 200);
                              });
                           } }
                           role='presentation'
                        ><IconNew name='PlusL' />
                        </div>
                     </div>
                  )}
                  {!!editableBlockOpen && editableBlockOpen === lesson.blocks.length + 1 && (
                     <div className='lesson__blocks__title lesson__blocks__title__last' id='last-id'>
                        <LessonBlock
                           isLast={ true }
                           course={ course }
                           addBlock={ (type) => {
                              addBlock(type, editableBlockOpen);
                              setEditableBlockOpen(!editableBlockOpen);
                              setOpenSettings(false);
                           } }
                        />
                     </div>
                  )}
               </>
            )}
      </div>
   );
};

LessonBlocks.propTypes = {
   lesson: PropTypes.object,
   duplicateBlock: PropTypes.func,
   deleteBlock: PropTypes.func,
   setOpenSettings: PropTypes.func,
   onChange: PropTypes.func,
   addBlock: PropTypes.func,
   reOrderBlocks: PropTypes.func,
   openSettings: PropTypes.any,
   deleteQuestion: PropTypes.func,
   changeQuestionAnswer: PropTypes.func,
   handleElementOnDragEnd: PropTypes.func,
   lessonActionInProgress: PropTypes.bool,
   handleDeleteAnswer: PropTypes.func,
   setOpenQuizSettings: PropTypes.func,
   setHasError: PropTypes.func,
   quizTemplatesAsc: PropTypes.array,
   quizTemplatesDesc: PropTypes.array,
   chooseSavedTemplate: PropTypes.func,
   course: PropTypes.object,
   app: PropTypes.any,
   videoOptimizing: PropTypes.bool,
};

export default LessonBlocks;
