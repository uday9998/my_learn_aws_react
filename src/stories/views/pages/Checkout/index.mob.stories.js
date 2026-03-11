import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from 'components/modules/checkout/CheckoutHeader';
import Layout from 'views/layout/index.mob';
import Checkout from 'views/pages/Checkout/index.mob';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('App|Views/pages/Checkout/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Checkout', () => {
      return (
         <Layout>
            <Layout.Header>
               <Header />
            </Layout.Header>
            <Layout.Content>
               <Checkout />
            </Layout.Content>
         </Layout>
      );
   });
