import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Affiliates from 'views/pages/Promotions/Affiliates/index.mob';
import AddAffiliate from 'views/pages/Promotions/AddAffiliate';

storiesOf('App|Views/pages/promotions/Affiliates/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Empty State', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Affiliates' hasMenu={ false } />
            </Layout.Header>
            <Layout.Content>
               <Affiliates empty />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Save & Preview', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Affiliates' hasMenu={ false } />
            </Layout.Header>
            <Layout.Content>
               <Affiliates />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Add Affiliate', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Add Affiliates' />
            </Layout.Header>
            <Layout.Content>
               <AddAffiliate />
            </Layout.Content>
         </Layout>
      );
   });
