import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Plans from 'views/pages/Plans/index.mob';

storiesOf('App|Views/pages/Plans/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Empty State', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Plans' />
            </Layout.Header>
            <Layout.Content>
               <Plans empty />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Monthly', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Plans' />
            </Layout.Header>
            <Layout.Content>
               <Plans />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Annually', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Plans' />
            </Layout.Header>
            <Layout.Content>
               <Plans annually />
            </Layout.Content>
         </Layout>
      );
   });
