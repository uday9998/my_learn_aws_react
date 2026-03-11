import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Emails from 'views/pages/Emails/index.mob';

storiesOf('App|Views/pages/Emails/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Emails', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Email Templates' />
            </Layout.Header>
            <Layout.Content>
               <Emails />
            </Layout.Content>
         </Layout>
      );
   });
