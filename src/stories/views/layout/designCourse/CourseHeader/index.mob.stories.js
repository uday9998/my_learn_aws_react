import React from 'react';
import { storiesOf } from '@storybook/react';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Layout from 'views/layout/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';

storiesOf('App|Views/layout/designCourse/CourseHeader/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('NavPanel', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
            </Layout.Content>
         </Layout>
      );
   });
