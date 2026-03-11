import React from 'react';
import { storiesOf } from '@storybook/react';
import CourseSection from 'components/modules/designCourse/courseMaterial/CourseSection';
import AddFirstSection from 'components/modules/designCourse/courseMaterial/AddFirstSection';
import AddSection from 'components/modules/designCourse/courseMaterial/AddSection';
import { withKnobs } from '@storybook/addon-knobs';
import { addedLessons } from './propOption';
import 'index.scss';

storiesOf('App|Modules/designCourse/Course Material/CourseSection', module)
   .addDecorator(withKnobs)
   .add('Add First Section', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <AddFirstSection />
         </div>
      );
   })
   .add('Add Section', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <AddSection />
         </div>
      );
   })
   .add('Initial state', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <CourseSection />
         </div>
      );
   })
   .add('With One Lesson', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <CourseSection
               addedLessons={ [addedLessons[0]] }
            />
         </div>
      );
   })
   .add('With Any Lesson', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <CourseSection
               addedLessons={ [addedLessons[0], addedLessons[1]] }
            />
         </div>
      );
   });
