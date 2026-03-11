import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import 'index.scss';
import AddNewCourse from 'components/modules/courses/AddNewCourse';
import CourseCard from 'components/modules/courses/CourseCard';

storiesOf('App|Modules/courses', module)
   .addDecorator(withKnobs)
   .add('AddNewCourse', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '328px' } }>
            <AddNewCourse />
         </div>
      );
   })
   .add('CourseCard', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '328px' } }>
            <CourseCard
               published={ boolean('published', false) }
               title={ text('title', 'Course Code Masterclass') }
               content={ text('content', 'This training shows you how to massively scale your business with online courses.') }
            />
         </div>
      );
   });
