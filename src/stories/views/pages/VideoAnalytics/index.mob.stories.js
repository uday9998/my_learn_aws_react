import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import VideosTable from 'views/pages/videoAnalytics/VideosTable/index.mob';
import VideosEdit from 'views/pages/videoAnalytics/VideosEdit/index.mob';

storiesOf('App|Views/pages/VideoAnalytics/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('My Videos', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='My Videos' />
            </Layout.Header>
            <Layout.Content>
               <VideosTable />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='My Videos' />
            </Layout.Header>
            <Layout.Content>
               <VideosEdit />
            </Layout.Content>
         </Layout>
      );
   });
