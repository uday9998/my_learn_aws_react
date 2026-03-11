import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import LiveCard from 'components/modules/designCourse/courseLive/LiveCard';

storiesOf('App|Modules/designCourse/courseLive', module)
   .addDecorator(withKnobs)
   .add('LiveCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <LiveCard />
         </div>
      );
   });
