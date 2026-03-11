import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import RevenueReports from 'views/pages/RevenueReports/index.mob';

storiesOf('App|Views/pages/RevenueReports/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Revenue Reports', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Reports' />
            </Layout.Header>
            <Layout.Content>
               <RevenueReports />
            </Layout.Content>
         </Layout>
      );
   });
