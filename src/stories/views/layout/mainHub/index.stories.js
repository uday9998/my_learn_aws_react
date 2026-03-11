import React from 'react';
import { storiesOf } from '@storybook/react';
import MainHubHeader from 'views/layout/BlueHeader';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout/MainHubHeader/desktop', module)
   .addDecorator(withKnobs)
   .add('MainHubHeader', () => {
      return (
         <MainHubHeader />
      );
   });
