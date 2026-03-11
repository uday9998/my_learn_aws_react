import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import LogIn from 'views/pages/LogIn/index.mob';

storiesOf('App|Views/pages/LogIn/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Log In', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader />
            </Layout.Header>
            <Layout.Content>
               <LogIn />
            </Layout.Content>
         </Layout>
      );
   });
