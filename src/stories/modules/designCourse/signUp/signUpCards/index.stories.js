import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'index.scss';
import {
   OrderCard,
   TestimonialCard,
   BulletCard,
   BuyCard,
} from 'components/modules/designCourse/signUp/signUpCards';

storiesOf('App|Modules/designCourse/signUp/signUpCrads', module)
   .addDecorator(withKnobs)
   .add('OrderCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <OrderCard />
         </div>
      );
   })
   .add('TestimonialCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <TestimonialCard />
         </div>
      );
   })
   .add('BulletCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <BulletCard />
         </div>
      );
   })
   .add('BuyCard', () => {
      return (
         <div className='storybook-element__wrapper'>
            <BuyCard />
         </div>
      );
   });
