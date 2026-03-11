import React from 'react';
import 'index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Layout from 'views/layout';
import SideBar from 'components/modules/Sidebar';
import SiteHeader from 'views/layout/SiteHeader';
import AccountInfo from 'views/pages/Settings/AccountInfo';
import IntegrationSettings from 'views/pages/Settings/IntegrationSettings';
import EmailsSettings from 'views/pages/Settings/EmailsSettings';
import SettingsMenu from 'components/modules/settings/SettingsMenu';
import Mainhub from 'views/pages/Settings/Mainhub';
import LoginWith from 'components/modules/settings/LoginWith';
import SiteChanges from 'components/modules/settings/SiteChanges';

storiesOf('App|Views/pages/Settings/desktop', module)
   .addDecorator(withKnobs)
   .add('Mainhub', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Settings' hasArrow />
               <div className='design-course__content' style={ { minHeight: 'calc(100vh - 80px)' } }>
                  <div className='content__left' style={ { maxWidth: '288px' } }>
                     <SettingsMenu active={ 2 } />
                  </div>
                  <div className='content__right'>
                     <Mainhub />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Connect', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Settings' hasArrow />
               <div className='design-course__content' style={ { minHeight: 'calc(100vh - 80px)' } }>
                  <div className='content__left' style={ { maxWidth: '288px' } }>
                     <SettingsMenu active={ 5 } />
                  </div>
                  <div className='content__right'>
                     <LoginWith />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Course Room', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <SiteHeader title='Settings' hasArrow />
               <div className='design-course__content' style={ { minHeight: 'calc(100vh - 80px)' } }>
                  <div className='content__left' style={ { maxWidth: '288px' } }>
                     <SettingsMenu active={ 3 } />
                  </div>
                  <div className='content__right'>
                     <SiteChanges />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Account Info', () => {
      return (
         <Layout>
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <SiteHeader title='Settings' hasArrow />
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
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <SiteHeader title='Settings' hasArrow />
            </Layout.Header>
            <Layout.Content>
               <IntegrationSettings
                  integrations={ integrations }
               />
            </Layout.Content>
         </Layout>
      );
   }))
   .add('Emails', () => {
      return (
         <Layout>
            <Layout.LeftBar>
               <SideBar />
            </Layout.LeftBar>
            <Layout.Header>
               <SiteHeader title='Settings' hasArrow />
            </Layout.Header>
            <Layout.Content>
               <EmailsSettings />
            </Layout.Content>
         </Layout>
      );
   });
