import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Transactions from 'views/pages/Transactions/index.mob';

storiesOf('App|Views/pages/Transactions/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Transactions', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Transactions' />
            </Layout.Header>
            <Layout.Content>
               <Transactions />
            </Layout.Content>
         </Layout>
      );
   });
