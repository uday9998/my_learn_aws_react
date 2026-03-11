import React from 'react';
import { storiesOf } from '@storybook/react';
import SiteHeader from 'views/layout/SiteHeader';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

storiesOf('App|Views/layout/SiteHeader/desktop', module)
   .addDecorator(withKnobs)
   .add('SiteHeader', () => {
      return (
         <SiteHeader
            hasArrow={ boolean('has arrow', false) }
            title={ text('title', 'Title') }
         />
      );
   });
