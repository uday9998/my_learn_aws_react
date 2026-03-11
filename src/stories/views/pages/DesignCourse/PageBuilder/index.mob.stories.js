import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import PageBuilder from 'views/pages/DesignCourse/PageBuilder/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';

storiesOf('App|Views/pages/designCourse/PageBuilder/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Page Builder', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <PageBuilder />
            </Layout.Content>
         </Layout>
      );
   });
