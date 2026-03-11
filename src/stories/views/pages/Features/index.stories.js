import React from 'react';
import { storiesOf } from '@storybook/react';
import Features from 'views/pages/Features';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Views/pages/landings/desktop', module)
   .addDecorator(withKnobs)
   .add('Features', () => {
      return <Features />;
   });
