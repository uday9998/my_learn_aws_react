import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';
import CourseLive from 'views/pages/DesignCourse/CourseLive/index.mob';

storiesOf('App|Views/pages/designCourse/CourseLive/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Course Live', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <CourseLive />
            </Layout.Content>
         </Layout>
      );
   });
