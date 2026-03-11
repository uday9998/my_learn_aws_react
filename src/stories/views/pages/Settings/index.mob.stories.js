import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import SettingsMenu from 'views/pages/Settings/SettingsMenu';
import Mainhub from 'views/pages/Settings/Mainhub/index.mob';
import Connect from 'views/pages/Settings/Connect/index.mob';
import CourseRoom from 'views/pages/Settings/CourseRoom/index.mob';
import AccountInfo from 'views/pages/Settings/AccountInfo/index.mob';
import IntegrationSettings from 'views/pages/Settings/IntegrationSettings/index.mob';
import EmailsSettings from 'views/pages/Settings/EmailsSettings/index.mob';

storiesOf('App|Views/pages/Settings/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Emails - Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Settings' goBack />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu active={ 1 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Mainhub - Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Settings' goBack />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu active={ 2 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Course Room - Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Settings' goBack />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu active={ 3 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Account - Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Settings' goBack />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu active={ 4 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Connect - Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Settings' goBack />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu active={ 5 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Integrations - Menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Settings' goBack />
            </Layout.Header>
            <Layout.Content>
               <SettingsMenu active={ 6 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Mainhub', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Mainhub' goBack />
            </Layout.Header>
            <Layout.Content>
               <Mainhub />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Connect', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Connect' goBack />
            </Layout.Header>
            <Layout.Content>
               <Connect />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Course Room', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Course Room' goBack />
            </Layout.Header>
            <Layout.Content>
               <CourseRoom />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Account Info', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Course Room' goBack />
            </Layout.Header>
            <Layout.Content>
               <AccountInfo />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Integrations', withState({
      integrations: [
         {
            title: 'Stripe',
            subtitle: 'Subtitle',
            image: 'stripe.svg',
            conected: false,
            value: '',
         },
         {
            title: 'PayPal',
            subtitle: 'Subtitle',
            image: 'pay-pal.svg',
            conected: false,
            value: '',
         },
         {
            title: 'Zapier',
            subtitle: 'Subtitle',
            image: 'zapier.jpg',
            conected: false,
            value: '',
         },
         {
            title: 'Google Analytics',
            subtitle: 'Subtitle',
            image: 'stripe.svg',
            conected: true,
            value: 'justinburn@gmail.com',
         },
         {
            title: 'Aweber',
            subtitle: 'Subtitle',
            image: 'aweber.jpg',
            conected: false,
            value: '',
         },
         {
            title: 'MailChimp',
            subtitle: 'Subtitle',
            image: 'mailchimp.jpg',
            conected: false,
            value: '',
         },
         {
            title: 'Active Campaign',
            subtitle: 'Subtitle',
            image: 'active-campaign.jpg',
            conected: false,
            value: '',
         },
         {
            title: 'Facebook Pixel',
            subtitle: 'Subtitle',
            image: 'facebook-pixel.jpg',
            conected: false,
            value: '',
         },
         {
            title: 'Convert Kit',
            subtitle: 'Subtitle',
            image: 'convert-kit.jpg',
            conected: false,
            value: '',
         },
         {
            title: 'Drip',
            subtitle: 'Subtitle',
            image: 'drip.jpg',
            conected: false,
            value: '',
         },
      ],
   })(({ store }) => {
      const { state: { integrations } } = store;
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Course Room' goBack />
            </Layout.Header>
            <Layout.Content>
               <IntegrationSettings
                  integrations={ integrations }
               />
            </Layout.Content>
         </Layout>
      );
   }))
   .add('Emails Settings', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Course Room' goBack />
            </Layout.Header>
            <Layout.Content>
               <EmailsSettings />
            </Layout.Content>
         </Layout>
      );
   });
