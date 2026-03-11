import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import MemberEmpty from 'views/pages/members/MemberEmpty/index.mob';
import MemberSelected from 'views/pages/members/MemberSelected/index.mob';
import AddMember from 'views/pages/members/AddMember/index.mob';

storiesOf('App|Views/pages/Members/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Member Empty', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Members' />
            </Layout.Header>
            <Layout.Content>
               <MemberEmpty />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Member Selected', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Members' />
            </Layout.Header>
            <Layout.Content>
               <MemberSelected />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Add member', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Members' />
            </Layout.Header>
            <Layout.Content>
               <AddMember />
            </Layout.Content>
         </Layout>
      );
   });
