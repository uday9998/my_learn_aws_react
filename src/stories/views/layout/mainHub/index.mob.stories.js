import React from 'react';
import { storiesOf } from '@storybook/react';
import MainHubHeader from 'views/layout/mainHub/MainHubHeader/index.mob';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout/MainHubHeader/mobile', module)
   .addDecorator(withKnobs)
   .add('MainHubHeader', () => {
      return (
         <MainHubHeader />
      );
   }, { viewport: { defaultViewport: 'iphone6' } });
