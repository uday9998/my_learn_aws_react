import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
// import { withState } from '@dump247/storybook-state';
import Layout from 'views/layout/index.mob';
import SiteHeader from 'views/layout/SiteHeader/index.mob';
import NavPanel from 'views/layout/designCourse/NavPanel/index.mob';
import PlanEmpty from 'views/pages/DesignCourse/plan/PlanEmpty/index.mob';
import FreePlanName from 'views/pages/DesignCourse/plan/FreePlanName/index.mob';
import FreePlan from 'views/pages/DesignCourse/plan/FreePlan/index.mob';
import SubscriptionPlan from 'views/pages/DesignCourse/plan/SubscriptionPlan/index.mob';
import AddCouponPopup from 'components/modules/designCourse/plan/AddCouponPopup';
import BackdropFilter from 'components/elements/BackdropFilter';

const plans = [
   {
      id: 1, type: 'Free', name: 'test',
   },
   {
      id: 2, type: 'One Time', name: 'test2',
   },
   {
      id: 3, type: 'Subscribtion', name: 'test3',
   },
];


storiesOf('App|Views/pages/designCourse/Plans/mobile', module)
   .addDecorator(withKnobs)
   .addParameters({ viewport: { defaultViewport: 'iphone6' } })
   .add('Empty', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <PlanEmpty />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Free Plan Name', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <FreePlanName />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Free Plan', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <FreePlan
                  plans={ [plans[0]] }
               />
            </Layout.Content>
         </Layout>
      );
   })
   .add('One Time Plan', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <FreePlan
                  plans={ [plans[0], plans[1]] }
               />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Subscription Plan', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <FreePlan
                  plans={ plans }
               />
            </Layout.Content>
         </Layout>
      );
   })
   .add('Subscription', () => {
      return (
         <Layout>
            <Layout.Header>
               <SiteHeader
                  hasShadow={ false }
               />
               <NavPanel />
            </Layout.Header>
            <Layout.Content>
               <SubscriptionPlan />
            </Layout.Content>
         </Layout>
      );
   })
   .add('One Time Plan - Add Coupon', () => {
      return (
         <BackdropFilter active fixed={ false }>
            <Layout>
               <Layout.Header>
                  <SiteHeader
                     hasShadow={ false }
                  />
                  <NavPanel />
               </Layout.Header>
               <Layout.Content>
                  <SubscriptionPlan />
               </Layout.Content>
            </Layout>
            <div style={ { maxWidth: '328px' } } className='m-t-exl'>
               <AddCouponPopup />
            </div>
         </BackdropFilter>
      );
   });
