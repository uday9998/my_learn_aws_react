import React from 'react';
import { storiesOf } from '@storybook/react';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout/designCourse/CourseHeader/desktop', module)
   .addDecorator(withKnobs)
   .add('Header', () => {
      return (
         <CourseHeader />
      );
   });
