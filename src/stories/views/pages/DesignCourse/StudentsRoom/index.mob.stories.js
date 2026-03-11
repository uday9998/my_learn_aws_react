import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import VideosSidebar from 'views/pages/DesignCourse/StudentsRoom/VideosSidebar/index.mob';
import StudentsRoom from 'views/pages/DesignCourse/StudentsRoom/index.mob';

storiesOf('App|Views/pages/designCourse/StudentsRoom/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Videos sidebar', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Students Room' />
            </Layout.Header>
            <Layout.Content>
               <VideosSidebar />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Course Discussion', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Course Course' />
            </Layout.Header>
            <Layout.Content>
               <StudentsRoom />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Meet the Professor', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Course Course' />
            </Layout.Header>
            <Layout.Content>
               <StudentsRoom checked={ 2 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Achievements', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Course Course' />
            </Layout.Header>
            <Layout.Content>
               <StudentsRoom checked={ 3 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Resources', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Course Course' />
            </Layout.Header>
            <Layout.Content>
               <StudentsRoom checked={ 4 } />
            </Layout.Content>
         </Layout>
      );
   });
