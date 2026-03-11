import React from 'react';
import { storiesOf } from '@storybook/react';
import LessonItem from 'components/elements/designCourse/courseMaterial/LessonItem';
import LessonMenuItem from 'components/elements/designCourse/courseMaterial/LessonMenuItem';
import QuizItem from 'components/elements/designCourse/courseMaterial/QuizItem';
import UploadFileItem from 'components/elements/designCourse/courseMaterial/UploadFileItem';
import {
   withKnobs, text, select, boolean,
} from '@storybook/addon-knobs';
import { icons } from './propOption';

storiesOf('App|Elements/designCourse/courseMaterial', module)
   .addDecorator(withKnobs)
   .add('LessonItem', () => {
      return (
         <LessonItem
            icon={ select(...icons) }
            text={ text('text', 'Intro') }
         />
      );
   })
   .add('LessonMenuItem', () => (
      <LessonMenuItem />
   ))
   .add('Quiz Item', () => {
      return (
         <QuizItem />
      );
   })
   .add('UploadFileItem', () => (
      <div className='storybook-element__wrapper' style={ { maxWidth: '456px' } }>
         <UploadFileItem
            file={ text('file', 'awesome-file.jpg') }
            uploaded={ boolean('uploaded', false) }
         />
      </div>
   ));
