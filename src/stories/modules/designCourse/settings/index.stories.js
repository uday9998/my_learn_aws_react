import React from 'react';
import { storiesOf } from '@storybook/react';
import CourseDetails from 'components/modules/designCourse/settings/CourseDetails';
import InstructorDetails from 'components/modules/designCourse/settings/InstructorDetails';
import SiteChanges from 'components/modules/designCourse/settings/SiteChanges';
import Seo from 'components/modules/designCourse/settings/Seo';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/settings', module)
   .addDecorator(withKnobs)
   .add('Course Details', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <CourseDetails />
         </div>
      );
   })
   .add('Instructor Details', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <InstructorDetails />
         </div>
      );
   })
   .add('Seo', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <Seo />
         </div>
      );
   })
   .add('Site Changes', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <SiteChanges />
         </div>
      );
   });
