import React from 'react';
import { storiesOf } from '@storybook/react';
import AudioLesson from 'components/modules/designCourse/courseMaterial/AudioLesson';
import VideoLesson from 'components/modules/designCourse/courseMaterial/VideoLesson';
import QuizLesson from 'components/modules/designCourse/courseMaterial/QuizLesson';
import PdfLesson from 'components/modules/designCourse/courseMaterial/PdfLesson';
import PptLesson from 'components/modules/designCourse/courseMaterial/PptLesson';
import TextLesson from 'components/modules/designCourse/courseMaterial/TextLesson';
import ImageLesson from 'components/modules/designCourse/courseMaterial/ImageLesson';
import FileLesson from 'components/modules/designCourse/courseMaterial/FileLesson';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/Course Material/Lessons', module)
   .addDecorator(withKnobs)
   .add('Audio', () => {
      return (
         <div className='lessons_wrapper'>
            <AudioLesson
               lessonAdded={ boolean('added Lesson', false) }
            />
         </div>
      );
   })
   .add('Video', () => {
      return (
         <div className='lessons_wrapper'>
            <VideoLesson
               lessonAdded={ boolean('added Lesson', false) }
            />
         </div>
      );
   })
   .add('Quiz', () => {
      return (
         <div className='lessons_wrapper'>
            <QuizLesson />
         </div>
      );
   })
   .add('PDF', () => {
      return (
         <div className='lessons_wrapper'>
            <PdfLesson />
         </div>
      );
   })
   .add('PowerPoint', () => {
      return (
         <div className='lessons_wrapper'>
            <PptLesson />
         </div>
      );
   })
   .add('Image', () => {
      return (
         <div className='lessons_wrapper'>
            <ImageLesson />
         </div>
      );
   })
   .add('Text', () => {
      return (
         <div className='lessons_wrapper'>
            <TextLesson />
         </div>
      );
   })
   .add('File', () => {
      return (
         <div className='lessons_wrapper'>
            <FileLesson
               upload={ boolean('upload field', false) }
            />
         </div>
      );
   });
