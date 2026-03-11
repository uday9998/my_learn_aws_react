import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import CourseCommissions from 'components/modules/courseReports/CourseCommissions';

storiesOf('App|Modules/courseReports', module)
   .addDecorator(withKnobs)
   .add('Course Commissions', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CourseCommissions />
         </div>
      );
   });
