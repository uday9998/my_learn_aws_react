import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkout from 'views/pages/Checkout';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Views/pages/Checkout/desktop', module)
   .addDecorator(withKnobs)
   .add('First', () => {
      return <Checkout creditCardFormView={ false } />;
   })
   .add('Second', () => {
      return <Checkout />;
   })
   .add('Third', () => {
      return <Checkout formView={ false } />;
   });
