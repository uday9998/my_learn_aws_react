import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';
import SettingsMenu from 'views/pages/DesignCourse/settings/SettingsMenu/index.mob';
import CourseDetails from 'views/pages/DesignCourse/settings/CourseDetails/index.mob';
import InstructorDetails from 'views/pages/DesignCourse/settings/InstructorDetails/index.mob';
import Seo from 'views/pages/DesignCourse/settings/Seo/index.mob';
import SiteChanges from 'views/pages/DesignCourse/settings/SiteChanges/index.mob';

storiesOf('App|Views/pages/designCourse/Settings/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Settings Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Course Details', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <CourseDetails />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Instructor Details', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <InstructorDetails />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Seo', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <Seo />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Site Changes', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SiteChanges />
            </Layout.Content>
         </Layout>
      );
   });
