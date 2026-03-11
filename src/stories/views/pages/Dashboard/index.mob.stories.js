import React from 'react';
import { storiesOf } from '@storybook/react';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Layout from 'views/layout/index.mob';
import Dashboard from 'views/pages/Dashboard/index.mob';
import { withKnobs } from '@storybook/addon-knobs';
import BackdropFilter from 'components/elements/BackdropFilter';
import ChooseCoursePopup from 'components/modules/dashboard/ChooseCoursePopup';
import AddCoursePopup from 'components/modules/dashboard/AddCoursePopup';
import 'index.scss';
import { pathCourses, typeCourses } from './propOptions';

storiesOf('App|Views/pages/Dashboard/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('General', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader />
            </Layout.Header>
            <Layout.Content>
               <Dashboard />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Course Path model', () => {
      return (
         <BackdropFilter active fixed={ false }>
            <Layout>
               <Layout.Header>
                  <SiteHeader />
               </Layout.Header>
               <Layout.Content>
                  <Dashboard />
               </Layout.Content>
            </Layout>
            <div style={ { maxWidth: '360px' } }>
               <ChooseCoursePopup
                  title='Choose Your Course Path'
                  courses={ pathCourses }
               />
            </div>
         </BackdropFilter>
      );
   })
   .add('Start From Stratch', () => {
      return (
         <BackdropFilter active>
            <Layout>
               <Layout.Header>
                  <SiteHeader />
               </Layout.Header>
               <Layout.Content>
                  <Dashboard />
               </Layout.Content>
            </Layout>
            <div style={ { maxWidth: '360px', width: '100%', marginTop: '150px' } }>
               <AddCoursePopup />
            </div>
         </BackdropFilter>
      );
   })
   .add('Course Type model', () => {
      return (
         <BackdropFilter active fixed={ false }>
            <Layout>
               <Layout.Header>
                  <SiteHeader />
               </Layout.Header>
               <Layout.Content>
                  <Dashboard />
               </Layout.Content>
            </Layout>
            <div style={ { maxWidth: '360px', width: '100%' } }>
               <ChooseCoursePopup
                  title='Choose Your Course Path'
                  courses={ typeCourses }
               />
            </div>
         </BackdropFilter>
      );
   });
