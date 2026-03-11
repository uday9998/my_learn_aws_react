import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Features from 'views/pages/Features/index.mob';

storiesOf('App|Views/pages/landings/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Features', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader />
            </Layout.Header>
            <Layout.Content>
               <Features />
            </Layout.Content>
         </Layout>
      );
   });
