import React from 'react';
import { storiesOf } from '@storybook/react';
import UploadFile from 'components/modules/designCourse/courseMaterial/Popups/UploadFile';

import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Modules/designCourse/Course Material/Popups', module)
   .addDecorator(withKnobs)
   .add('UploadFile', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
            <UploadFile />
         </div>
      );
   });
