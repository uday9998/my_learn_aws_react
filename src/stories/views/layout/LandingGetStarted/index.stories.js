import React from 'react';
import { storiesOf } from '@storybook/react';
import LandingGetStarted from 'views/layout/landings/LandingGetStarted';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout', module)
   .addDecorator(withKnobs)
   .add('LandingGetStarted', () => {
      return (
         <LandingGetStarted />
      );
   });
