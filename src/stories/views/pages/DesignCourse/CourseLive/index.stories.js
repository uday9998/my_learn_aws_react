import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import Layout from 'views/layout';
import CourseLive from 'views/pages/DesignCourse/CourseLive';

storiesOf('App|Views/pages/designCourse/CourseLive/desktop', module)
   .addDecorator(withKnobs)
   .add('Course Live', () => {
      return (
         <Layout>
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <CourseHeader />
            </Layout.Header>
            <Layout.Content>
               <CourseLive />
            </Layout.Content>
         </Layout>
      );
   });
