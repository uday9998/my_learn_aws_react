import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import MainHub from 'views/pages/MainHub';

storiesOf('App|Views/pages/MainHub/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty State', () => {
      return <MainHub notFound />;
   })
   .add('Save & Preview', () => {
      return <MainHub />;
   })
   .add('Logged in', () => {
      return <MainHub loggedIn />;
   });
