import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import AddFirstPlan from 'components/modules/designCourse/plan/AddFirstPlan';
import AddPlanTutorial from 'components/modules/designCourse/plan/AddPlanTutorial';
import PricingPlans from 'components/modules/designCourse/plan/PricingPlans';
import FreePlan from 'components/modules/designCourse/plan/FreePlan';
import OneTimePlan from 'components/modules/designCourse/plan/OneTimePlan';
import SubscriptionPlan from 'components/modules/designCourse/plan/SubscriptionPlan';
import SavedCoupons from 'components/modules/designCourse/plan/SavedCoupons';
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

const coupons = [
   {
      id: 1, plan: 'One Time', code: '7435', couponPrice: '40$', couponType: 'Percentage', expiryDate: '22.06.2019',
   },
];

storiesOf('App|Views/pages/designCourse/Plans/desktop', module)
   .addDecorator(withKnobs)
   .add('Empty', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left'>
                     <div className='design-course__left-container'>
                        <AddFirstPlan />
                     </div>
                  </div>
                  <div className='design-course__right'>
                     <div className='design-course__right-container'>
                        <AddPlanTutorial />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Free Plan', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='plans'>
                     <div className='plans__leftContainer'>
                        <PricingPlans
                           plans={ plans }
                           checkedId={ 1 }
                        />
                     </div>
                  </div>
                  <div className='planType'>
                     <div className='planType__rightContainer'>
                        <FreePlan />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('One Time Plan', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='plans'>
                     <div className='plans__leftContainer'>
                        <PricingPlans
                           plans={ plans }
                           checkedId={ 2 }
                        />
                     </div>
                  </div>
                  <div className='planType'>
                     <div className='planType__rightContainer'>
                        <OneTimePlan />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('One Time Plan - Add Coupon', () => {
      return (
         <BackdropFilter active>
            <div className='container'>
               <SideBar />
               <div className='design-course'>
                  <CourseHeader />
                  <div className='design-course__content'>
                     <div className='plans'>
                        <div className='plans__leftContainer'>
                           <PricingPlans
                              plans={ plans }
                              checkedId={ 2 }
                           />
                        </div>
                     </div>
                     <div className='planType'>
                        <div className='planType__rightContainer'>
                           <OneTimePlan />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='addCouponPopup__container'>
               <AddCouponPopup />
            </div>
         </BackdropFilter>
      );
   })
   .add('Coupon Added', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='plans'>
                     <div className='plans__leftContainer'>
                        <PricingPlans
                           plans={ plans }
                           checkedId={ 2 }
                        />
                        <div className='m-t-exl'>
                           <SavedCoupons
                              coupons={ coupons }
                           />
                        </div>
                     </div>
                  </div>
                  <div className='planType'>
                     <div className='planType__rightContainer'>
                        <OneTimePlan />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Subscription Plan', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='plans'>
                     <div className='plans__leftContainer'>
                        <PricingPlans
                           plans={ plans }
                           checkedId={ 3 }
                        />
                     </div>
                  </div>
                  <div className='planType'>
                     <div className='planType__rightContainer'>
                        <SubscriptionPlan />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   });
