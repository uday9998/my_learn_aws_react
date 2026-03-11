import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import MainHub from 'views/pages/MainHub/index.mob';
import Header from 'views/layout/mainHub/MainHubHeader/index.mob';
import Layout from 'views/layout/index.mob';

storiesOf('App|Views/pages/MainHub/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Empty State', () => {
      return (
         <Layout>
            <Layout.Header>
               <Header />
            </Layout.Header>
            <Layout.Content>
               <MainHub notFound />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Save & Preview', () => {
      return (
         <Layout>
            <Layout.Header>
               <Header />
            </Layout.Header>
            <Layout.Content>
               <MainHub />
            </Layout.Content>
         </Layout>
      );
   });
