import React from 'react';
import { storiesOf } from '@storybook/react';
import LandingFooter from 'views/layout/landings/LandingFooter';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout', module)
   .addDecorator(withKnobs)
   .add('LandingFooter', () => {
      return (
         <LandingFooter />
      );
   });
