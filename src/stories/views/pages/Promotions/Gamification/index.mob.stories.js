import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import Gamification from 'views/pages/Promotions/Gamification/index.mob';
import BackdropFilter from 'components/elements/BackdropFilter';
import CongratulationsCard from 'components/modules/promotions/gamification/CongratulationsCard';

storiesOf('App|Views/pages/promotions/Gamification/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Empty State', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Gamification' />
            </Layout.Header>
            <Layout.Content>
               <Gamification empty />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Added Badge - From Deafult', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Gamification' />
            </Layout.Header>
            <Layout.Content>
               <Gamification />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Added Badge - From File', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Gamification' />
            </Layout.Header>
            <Layout.Content>
               <Gamification file />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Added a Few Bagdes', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader title='Gamification' />
            </Layout.Header>
            <Layout.Content>
               <Gamification file completed />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Pop up - Preview', () => {
      return (
         <BackdropFilter active fixed>
            <Layout>
               <Layout.Header>
                  <SiteHeader title='Gamification' />
               </Layout.Header>
               <Layout.Content>
                  <Gamification file completed />
               </Layout.Content>
            </Layout>
            <div style={ { width: '328px', height: '293px', marginTop: '96px' } }>
               <CongratulationsCard />
            </div>
         </BackdropFilter>
      );
   });
