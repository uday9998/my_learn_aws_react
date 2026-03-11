import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import AffiliateProgram from 'views/pages/Promotions/AffiliateProgram/index.mob';
import AddAffiliate from 'views/pages/Promotions/AddAffiliate';

storiesOf('App|Views/pages/promotions/AffiliateProgram/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Affiliate Program', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Affiliate Program' />
            </Layout.Header>
            <Layout.Content>
               <AffiliateProgram />
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
