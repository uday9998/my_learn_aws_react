import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Pricing from 'views/pages/Pricing/index.mob';

storiesOf('App|Views/pages/Pricing/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Pricing', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader />
            </Layout.Header>
            <Layout.Content>
               <Pricing />
            </Layout.Content>
         </Layout>
      );
   });
