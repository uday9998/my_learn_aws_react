import React from 'react';
import { storiesOf } from '@storybook/react';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Views/layout/SiteHeader/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('SiteHeader Logo', () => {
      return (
         <SiteHeader />
      );
   })
   .add('With Title', () => {
      return (
         <SiteHeader
            goBack
            title='Design Course'
            hasShadow={ false }
         />
      );
   });
