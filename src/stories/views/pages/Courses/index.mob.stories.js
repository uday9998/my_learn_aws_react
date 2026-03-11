import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Courses from 'views/pages/Courses/index.mob';

storiesOf('App|Views/pages/Courses/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Courses', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Courses' />
            </Layout.Header>
            <Layout.Content>
               <Courses />
            </Layout.Content>
         </Layout>
      );
   });
