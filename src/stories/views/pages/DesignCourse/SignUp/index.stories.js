/* eslint-disable react/no-array-index-key */
import React from 'react';
import 'index.scss';
import './index.scss';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SideBar from 'components/modules/Sidebar';
import CourseHeader from 'views/layout/designCourse/CourseHeader';
import SignUpItem from 'components/modules/designCourse/signUp/SignUpItem';
import {
   OrderCard,
   TestimonialCard,
   BulletCard,
   BuyCard,
} from 'components/modules/designCourse/signUp/signUpCards';

const items = [
   {
      text: 'Edit Order Summary',
      icon: 'Order',
   },
   {
      text: 'Edit Testimonials',
      icon: 'Testimonial',
   },
   {
      text: 'Edit Bullet Points',
      icon: 'Bullet',
   },
   {
      text: 'Edit Buy Button',
      icon: 'BuyButton',
   },
];


storiesOf('App|Views/pages/designCourse/SignUp/desktop', module)
   .addDecorator(withKnobs)
   .add('Edit Order Summary', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left sign-up__left'>
                     <div className='signUp__items'>
                        {
                           items.map((item, i) => {
                              return (
                                 <div className='m-b-exs' key={ i }>
                                    <SignUpItem text={ item.text } icon={ item.icon } active={ i === 0 } />
                                 </div>
                              );
                           })
                        }
                     </div>
                  </div>
                  <div className='sign-up__right'>
                     <OrderCard />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Edit Testimonials', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left sign-up__left'>
                     <div className='signUp__items'>
                        {
                           items.map((item, i) => {
                              return (
                                 <div className='m-b-exs' key={ i }>
                                    <SignUpItem text={ item.text } icon={ item.icon } active={ i === 1 } />
                                 </div>
                              );
                           })
                        }
                     </div>
                  </div>
                  <div className='sign-up__right'>
                     <TestimonialCard />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Edit Bullet Points', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left sign-up__left'>
                     <div className='signUp__items'>
                        {
                           items.map((item, i) => {
                              return (
                                 <div className='m-b-exs' key={ i }>
                                    <SignUpItem text={ item.text } icon={ item.icon } active={ i === 2 } />
                                 </div>
                              );
                           })
                        }
                     </div>
                  </div>
                  <div className='sign-up__right'>
                     <BulletCard />
                  </div>
               </div>
            </div>
         </div>
      );
   })
   .add('Edit Buy Button', () => {
      return (
         <div className='container'>
            <SideBar />
            <div className='design-course'>
               <CourseHeader />
               <div className='design-course__content'>
                  <div className='design-course__left sign-up__left'>
                     <div className='signUp__items'>
                        {
                           items.map((item, i) => {
                              return (
                                 <div className='m-b-exs' key={ i }>
                                    <SignUpItem text={ item.text } icon={ item.icon } active={ i === 3 } />
                                 </div>
                              );
                           })
                        }
                     </div>
                  </div>
                  <div className='sign-up__right'>
                     <BuyCard />
                  </div>
               </div>
            </div>
         </div>
      );
   });
