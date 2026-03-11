import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ProgressCircle from 'components/elements/mainHub/ProgressCircle';
import 'index.scss';

storiesOf('App|Elements/mainHub', module)
   .addDecorator(withKnobs)
   .add('ProgressCircle', () => {
      return (
         <div className='storybook-element__wrapper'>
            <ProgressCircle
               size={ text('size', '79%') }
               text={ text('text', 'Complete') }
            />
         </div>
      );
   });
