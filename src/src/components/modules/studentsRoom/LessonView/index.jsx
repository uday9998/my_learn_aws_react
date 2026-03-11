/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import './index.scss';
import Text, { TextWithIcon, SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import AudioItem from 'components/elements/designCourse/courseMaterial/AudioItem';
import TextWithSeeMore from 'components/modules/TextWithSeeMore';
import QuizView from './QuizView';
import IframeView from './IframeView';
import Multimedia from './Multimedia';
import VideoView from './VideoView';
import LessonHeader from '../LessonHeader/LessonHeader';

const LessonView = ({
   lesson, activeQuestionNext,
   defaultQuestionId, activeQuestion, isChecked, onChangeChecked, questionNextText, primaryTheme,
   onAddNoCompletedVideoView, onAddCompletedVideoView, darkMode, defaultColor, textColor, addBookmark,
   isBookmarked, course, openNavBar, isMobile,
}) => {
   let blocksSort = [];
   if (lesson && lesson.blocks && !!lesson.blocks.length) {
      blocksSort = lesson.blocks.sort((a, b) => {
         return a.order - b.order;
      });
   }

   let view;


   const [isLoaded, setIsLoaded] = useState(true);
   const showBlocks = (blockFormat, block) => {
      let videoStyle = {};

      if (block && block.css_attributes && !!block.css_attributes.width) {
         if (block.css_attributes && block.css_attributes.width && block.css_attributes.width === 1) {
            videoStyle = { maxWidth: '620px' };
         }
         // else if (block.css_attributes && block.css_attributes.width && block.css_attributes.width === 2) {
         //    videoStyle = { maxWidth: '100%' };
         // }
      }
      switch (blockFormat) {
         case 'Quiz':
            if (block.quizzes[0]) {
               let questionsNew = block.quizzes[0].questions;
               let quiz = block.quizzes[0];
               if (block.quizzes[0].questions && block.quizzes[0].questions[0] && block.quizzes[0].questions[0].type !== 'welcome_screen') {
                  questionsNew = [{ order: 0, id: null }, ...questionsNew];
                  quiz = {
                     ...quiz,
                     questions: questionsNew,
                  };
               }
               view = (
                  (quiz.questions.length > 2 || (quiz.questions.length === 1 && quiz.questions[0].type !== 'welcome_screen' && quiz.questions[0].type !== 'ending')
                 || (quiz.questions.length === 2 && quiz.questions.filter(quest => quest.type !== 'welcome_screen' && quest.type !== 'ending').length > 0))
                  && (
                     <div className='LessonView'>
                        <QuizView
                           quiz={ quiz }
                           activeQuestionNext={ activeQuestionNext }
                           questionsUnorder={ quiz.questions }
                           defaultQuestionId={ defaultQuestionId }
                           activeQuestion={ activeQuestion }
                           isChecked={ isChecked }
                           onChangeChecked={ onChangeChecked }
                           questionNextText={ questionNextText }
                           primaryTheme={ primaryTheme }
                           defaultColor={ defaultColor }
                           textColor={ textColor }
                           course={ course }
                           lesson={ lesson }
                        />
                     </div>
                  )
               );
            } break;

         case 'Pdf': view = (
            <IframeView lesson={ block } primaryTheme={ primaryTheme } />
         ); break;
         case 'Ppt': view = (
            <IframeView lesson={ block } primaryTheme={ primaryTheme } />
         ); break;
         case 'Multimedia': view = (
            <Multimedia lesson={ block } primaryTheme={ primaryTheme } />
         ); break;
         case 'Video': view = (
            // eslint-disable-next-line max-len
            <VideoView
               lesson={ block }
               primaryTheme={ primaryTheme }
               textColor={ textColor }
               defaultColor={ defaultColor }
               course={ course }
               onAddNoCompletedVideoView={
                  () => onAddNoCompletedVideoView(block && block.videos && block.videos[0] && block.videos[0].id)
               }
               onAddCompletedVideoView={
                  () => onAddCompletedVideoView(block && block.videos && block.videos[0] && block.videos[0].id)
               }
            />
         ); break;
         case 'Text': view = (
            <div className='LessonText'>

               <div className='LessonView__content'>
                  {
                     // eslint-disable-next-line react/no-danger
                     block.description
                     && (
                        <div
                           dangerouslySetInnerHTML={ { __html: block.description } }
                           style={ { fontFamily: primaryTheme } }
                        />
                     )}

               </div>
            </div>
         ); break;
         case 'Code': view = (
            <div className='LessonText'>

               <div className='LessonView__content'>
                  {
                     // eslint-disable-next-line react/no-danger
                     block.description
                     && (
                        <div
                           dangerouslySetInnerHTML={ { __html: block.description } }
                           style={ { fontFamily: primaryTheme } }
                        />
                     )}

               </div>
            </div>
         ); break;
         case 'Image': view = (
            <div className='LessonImage'>
               {
                  block.files && block.files[0] && block.files[0].src && (
                     <div className='LessonView__image m-t-exl'>
                        <img
                           src={ block.files && block.files[0] && block.files[0].src }
                           alt={ block.name }
                           style={ { width: `${ block.css_attributes && block.css_attributes.width }px`, height: `${ block.css_attributes && block.css_attributes.height }px` } }
                        />
                     </div>
                  )
               }
            </div>
         ); break;
         case 'Audio': view = (
            <div className='LessonAudio'>
               <AudioItem
                  file={ block.files && block.files[0] && block.files[0].src }
                  name={ block.name }
                  autoplay={ block.css_attributes && block.css_attributes.autoplay }
               />
            </div>
         ); break;
         case 'Video-url':
            if (block.videos && block.videos[0] && block.videos[0].src) {
               if (block.videos[0].video_type === 'youtube') {
                  view = (
                     <div className='LessonIframe' style={ videoStyle }>
                        <div className='LessonView__iframe' style={ videoStyle }>
                           <div className='embed-container'>
                              <iframe
                                 src={ block.videos[0].src && `https://www.youtube.com/embed/${ block.videos[0].src }?autoplay=${ block.autoplay }` }
                                 width='500'
                                 height='400'
                                 frameBorder='0'
                                 allow={ block.autoplay ? 'autoplay' : '' }
                                 allowFullScreen
                              />
                           </div>
                        </div>
                     </div>
                  );
               } else if (block.videos[0].video_type === 'wistia') {
                  view = (
                     <div className='LessonIframe' style={ videoStyle }>
                        <div className='LessonView__iframe' style={ videoStyle }>
                           { /* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                           <div className='embed-container'>
                              <iframe
                                 src={ block.videos[0].src && `//fast.wistia.net/embed/iframe/${ block.videos[0].src }${ block.css_attributes && block.css_attributes.autoplay ? '?autoplay=true' : '' }` }
                                 width='500'
                                 height='400'
                                 frameBorder='0'
                                 scrolling='no'
                                 className='wistia_embed'
                                 name='wistia_embed'
                                 allow={ block.css_attributes && block.css_attributes.autoplay ? 'autoplay' : '' }
                                 allowFullScreen
                              />
                           </div>
                        </div>
                     </div>
                  );
               } else if (block.videos[0].video_type === 'vimeo') {
                  view = (
                     <div className='LessonIframe' style={ videoStyle }>
                        <div className='LessonView__iframe' style={ videoStyle }>
                           <div className='embed-container'>
                              <iframe
                                 src={ block.videos[0].src && `https://player.vimeo.com/video/${ block.videos[0].src }?byline=0&amp;portrait=0&autoplay=${ block.css_attributes && block.css_attributes.autoplay }` }
                                 width='500'
                                 height='400'
                                 frameBorder='0'
                                 allow={ block.css_attributes && block.css_attributes.autoplay ? 'autoplay' : '' }
                                 allowFullScreen
                              />
                           </div>
                        </div>
                     </div>
                  );
               }
            }
            break;
         case 'vimeo': view = (
            <div className='LessonIframe'>
               <div className='LessonView__iframe'>
                  <div className='embed-container'>
                     <iframe
                        src={ block.files && block.files[0] && block.files[0].src && `https://player.vimeo.com/video/${ block.files && block.files[0] && block.files[0].src }?byline=0&amp;portrait=0&autoplay=${ block.autoplay }` }
                        width='500'
                        height='400'
                        frameBorder='0'
                        allow={ block.autoplay ? 'autoplay' : '' }
                        allowFullScreen
                     />
                  </div>
               </div>
            </div>
         ); break;
         case 'wistia': view = (
            <div className='LessonIframe'>
               <div className='LessonView__iframe' style={ videoStyle }>
                  { /* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                  <div className='embed-container'>
                     <iframe
                        src={ block.files && block.files[0] && block.files[0].src && `//fast.wistia.net/embed/iframe/${ block.files && block.files[0] && block.files[0].src }${ block.autoplay ? '?autoplay=true' : '' }` }
                        width='500'
                        height='400'
                        frameBorder='0'
                        scrolling='no'
                        className='wistia_embed'
                        name='wistia_embed'
                        allow={ block.autoplay ? 'autoplay' : '' }
                        allowFullScreen
                     />
                  </div>
               </div>
            </div>
         ); break;
         case 'Video-embed':
            view = (
               block && block.videos && block.videos[0]
            && (
               <div className='LessonIframe'>
                  <div className='LessonView__iframe' style={ videoStyle }>
                     { /* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                     <div className='embed-container' dangerouslySetInnerHTML={ { __html: block.videos[0].src } } />
                  </div>
               </div>
            )
            ); break;
         default: view = null;
      }
      return view;
   };
   const LessonAuthor = lesson.author || (course && course.authors && course.authors[0]);

   return (
      <div className={ openNavBar ? 'Lesson' : 'Lesson Lesson__full' } onLoad={ () => setIsLoaded(false) }>
         {isLoaded && (<LoaderSpinner />)}
         {(!isLoaded && lesson.lesson_format !== 'youtube' && lesson.lesson_format !== 'vimeo' && lesson.lesson_format !== 'wistia' && lesson.lesson_format !== 'video')
            && (
               <LessonHeader
                  lesson={lesson}
                  course={course}
                  isBookmarked={isBookmarked}
                  addBookmark={addBookmark}
                  primaryTheme={primaryTheme}
               />
            )}
         { !isLoaded && blocksSort && !!blocksSort.length
         && (
            <div className='blockFrontViews'>
               <div className='blockFrontViews__content'>
                  {blocksSort.map((block) => {
                     let style = {};
                     if (block.css_attributes) {
                        style = {
                           backgroundColor: block.css_attributes.bg_color,
                           paddingBottom: isMobile ? `${ 4 + parseInt(block.css_attributes.paddingBottom, 10) }px` : `${ 84 + parseInt(block.css_attributes.paddingBottom, 10) }px`,
                           paddingTop: isMobile ? `${ 4 + parseInt(block.css_attributes.paddingTop, 10) }px` : `${ 84 + parseInt(block.css_attributes.paddingTop, 10) }px`,
                        };
                        if (block.css_attributes.letterSpacing) {
                           style.letterSpacing = `${ block.css_attributes.letterSpacing }px`;
                        }
                     }
                     if (showBlocks(block.lesson_format, block) && block.lesson_format !== 'Zoom') {
                        return (
                           <div key={ block.id } style={ style }>
                              { showBlocks(block.lesson_format, block)}
                           </div>
                        );
                     }
                     return null;
                  })
                  }
               </div>
            </div>
         )
         }

      </div>
   );
};
LessonView.propTypes = {
   lesson: PropTypes.object,
   isChecked: PropTypes.array,
   defaultQuestionId: PropTypes.number,
   onChangeChecked: PropTypes.func,
   activeQuestionNext: PropTypes.func,
   onAddNoCompletedVideoView: PropTypes.func,
   onAddCompletedVideoView: PropTypes.func,
   activeQuestion: PropTypes.number,
   questionNextText: PropTypes.string,
   course: PropTypes.object,
   isBookmarked: PropTypes.any,
   primaryTheme: PropTypes.string,
   defaultColor: PropTypes.string,
   textColor: PropTypes.string,
   darkMode: PropTypes.bool,
   addBookmark: PropTypes.func,
   openNavBar: PropTypes.bool,
   isMobile: PropTypes.bool,
};

LessonView.defaultProps = {
   lesson: {},
   activeQuestionNext: () => { },
   onChangeChecked: () => { },
};

export default LessonView;
