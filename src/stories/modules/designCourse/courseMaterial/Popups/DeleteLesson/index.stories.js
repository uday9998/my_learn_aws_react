import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteLesson from 'components/modules/designCourse/courseMaterial/Popups/DeleteLesson';

import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/Course Material/Popups', module)
   .addDecorator(withKnobs)
   .add('DeleteLesson', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
            <DeleteLesson />
         </div>
      );
   });
