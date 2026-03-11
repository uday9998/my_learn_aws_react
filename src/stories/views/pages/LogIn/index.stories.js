import React from 'react';
import { storiesOf } from '@storybook/react';
import LogIn from 'views/pages/LogIn';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Views/pages/LogIn/desktop', module)
   .addDecorator(withKnobs)
   .add('Login Page', () => {
      return (
         <LogIn />
      );
   })
   .add('With Illustration', () => {
      return (
         <LogIn hasImage />
      );
   });
