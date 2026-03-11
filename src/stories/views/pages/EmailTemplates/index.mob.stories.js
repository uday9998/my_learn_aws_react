import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import EmailTemplates from 'views/pages/EmailTemplates/index.mob';

storiesOf('App|Views/pages/EmailTemplates/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Welcome', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Emails' />
            </Layout.Header>
            <Layout.Content>
               <EmailTemplates active={ 1 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Enrollment', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Emails' />
            </Layout.Header>
            <Layout.Content>
               <EmailTemplates active={ 2 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Completion', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Emails' />
            </Layout.Header>
            <Layout.Content>
               <EmailTemplates active={ 3 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Subscription', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Emails' />
            </Layout.Header>
            <Layout.Content>
               <EmailTemplates active={ 4 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Affiliate Welcome', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Emails' />
            </Layout.Header>
            <Layout.Content>
               <EmailTemplates active={ 5 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Refund', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Emails' />
            </Layout.Header>
            <Layout.Content>
               <EmailTemplates active={ 6 } />
            </Layout.Content>
         </Layout>
      );
   });
