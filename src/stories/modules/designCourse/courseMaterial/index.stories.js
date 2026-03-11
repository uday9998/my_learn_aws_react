import React from 'react';
import { storiesOf } from '@storybook/react';
import AddSectionTutorial from 'components/modules/designCourse/courseMaterial/AddSectionTutorial';
import AudioComments from 'components/modules/designCourse/courseMaterial/AudioComments';
import AudioResources from 'components/modules/designCourse/courseMaterial/AudioResources';
import AudioSettings from 'components/modules/designCourse/courseMaterial/AudioSettings';
import LessonMenu from 'components/modules/designCourse/courseMaterial/LessonMenu';

import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/Course Material', module)
   .addDecorator(withKnobs)
   .add('Add Section Tutorial', () => {
      return (
         <AddSectionTutorial />
      );
   })
   .add('Audio Comments', () => {
      return (
         <AudioComments
            isOpen={ boolean('isOpen', false) }
         />
      );
   })
   .add('Audio Resources', () => {
      return (
         <AudioResources
            isOpen={ boolean('isOpen', false) }
         />
      );
   })
   .add('Audio Settings', () => {
      return (
         <AudioSettings
            isOpen={ boolean('isOpen', false) }
         />
      );
   })
   .add('Lesson Menu', () => {
      return (
         <LessonMenu />
      );
   });
