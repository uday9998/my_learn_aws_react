import React from 'react';
import { storiesOf } from '@storybook/react';
import LandingHeader from 'views/layout/landings/LandingHeader';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout', module)
   .addDecorator(withKnobs)
   .add('LandingHeader', () => {
      return (
         <LandingHeader />
      );
   });
