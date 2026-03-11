import React from 'react';
import { storiesOf } from '@storybook/react';
import HomePage from 'views/pages/HomePage';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Views/pages/landings/desktop', module)
   .addDecorator(withKnobs)
   .add('HomePage', () => {
      return <HomePage />;
   });
