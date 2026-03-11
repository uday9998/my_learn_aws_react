import React from 'react';
import { storiesOf } from '@storybook/react';
import NewSection from 'components/modules/designCourse/courseMaterial/NewSection';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/Course Material/New Section', module)
   .addDecorator(withKnobs)
   .add('Initial State', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <NewSection />
         </div>
      );
   })
   .add('Section Added', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <NewSection
               sectionAdded={ true }
               sectionName='Welcome to Miestro'
            />
         </div>
      );
   });
