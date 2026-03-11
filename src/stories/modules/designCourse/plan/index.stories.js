import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import AddFirstPlan from 'components/modules/designCourse/plan/AddFirstPlan';
import PricingPlans from 'components/modules/designCourse/plan/PricingPlans';
import SavedCoupons from 'components/modules/designCourse/plan/SavedCoupons';
import FreePlan from 'components/modules/designCourse/plan/FreePlan';
import OneTimePlan from 'components/modules/designCourse/plan/OneTimePlan';
import SubscriptionPlan from 'components/modules/designCourse/plan/SubscriptionPlan';
import AddPlanTutorial from 'components/modules/designCourse/plan/AddPlanTutorial';
import AddCouponPopup from 'components/modules/designCourse/plan/AddCouponPopup';

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

storiesOf('App|Modules/designCourse/Plans', module)
   .addDecorator(withKnobs)
   .add('Add First Plan', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <AddFirstPlan />
         </div>
      );
   })
   .add('Add Plan Tutorial', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <AddPlanTutorial />
         </div>
      );
   })
   .add('Pricings Plans', () => {
      return (
         <div className='w-full'>
            <PricingPlans
               plans={ plans }
               checkedId={ 1 }
            />
         </div>
      );
   })
   .add('Free Plan', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <FreePlan />
         </div>
      );
   })
   .add('One Time Plan', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <OneTimePlan />
         </div>
      );
   })
   .add('Subscription Plan', () => {
      return (
         <div className='coursMaterial_wrapper'>
            <SubscriptionPlan />
         </div>
      );
   })
   .add('Saved Coupons', () => {
      return (
         <div className='w-full'>
            <SavedCoupons />
         </div>
      );
   })
   .add('AddCouponPopup', () => {
      return (
         <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
            <AddCouponPopup />
         </div>
      );
   });
