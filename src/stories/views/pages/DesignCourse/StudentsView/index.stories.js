import React from 'react';
import { storiesOf } from '@storybook/react';
import StudentsView from 'views/pages/DesignCourse/StudentsView';

storiesOf('App|Views/pages/designCourse/StudentsView/desktop', module)
   .add('Students View', () => {
      return (
         <StudentsView />
      );
   })
   .add('Pay Pal', () => {
      return (
         <StudentsView
            paypalChecked
         />
      );
   })
   .add('Coupon', () => {
      return (
         <StudentsView
            filterActive
         />
      );
   })
   .add('Added Coupon', () => {
      return (
         <StudentsView
            coupon='MMDC2019'
         />
      );
   });
