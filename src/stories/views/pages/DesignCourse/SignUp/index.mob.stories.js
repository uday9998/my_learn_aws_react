import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import SignUpItems from 'views/pages/DesignCourse/signUp/SignUpItems/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';
import OrderSummary from 'views/pages/DesignCourse/signUp/OrderSummary/index.mob';
import Testimonials from 'views/pages/DesignCourse/signUp/Testimonials/index.mob';
import BulletPoints from 'views/pages/DesignCourse/signUp/BulletPoints/index.mob';
import BuyButton from 'views/pages/DesignCourse/signUp/BuyButton/index.mob';

storiesOf('App|Views/pages/designCourse/SignUp/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Edit Order Summary - menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SignUpItems />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Order Summary', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <OrderSummary />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Testimonials - menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SignUpItems checked={ 2 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Testimonials', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <Testimonials />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Bullet Points - menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SignUpItems checked={ 3 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Bullet Points', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <BulletPoints />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Buy Button - menu', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SignUpItems checked={ 4 } />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Edit Buy Button', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader goBack title='Design Course' hasShadow={ false } />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <BuyButton />
            </Layout.Content>
         </Layout>
      );
   });
