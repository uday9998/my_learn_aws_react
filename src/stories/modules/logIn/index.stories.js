import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import LogIn from 'components/modules/logIn';
import 'index.scss';

storiesOf('App|Modules', module)
   .addDecorator(withKnobs)
   .add('logIn', () => {
      return (
         <div className='storybook-element__wrapper'>
            <LogIn />
         </div>
      );
   });
