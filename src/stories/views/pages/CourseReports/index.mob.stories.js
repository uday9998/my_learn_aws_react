import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import CourseReports from 'views/pages/CourseReports/index.mob';

storiesOf('App|Views/pages/CourseReports/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Course Reports', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader />
            </Layout.Header>
            <Layout.Content>
               <CourseReports />
            </Layout.Content>
         </Layout>
      );
   });
