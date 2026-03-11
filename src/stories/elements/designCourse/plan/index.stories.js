import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import PlansTable from 'components/elements/designCourse/plan/PlansTable';
import CouponsTable from 'components/elements/designCourse/plan/CouponsTable';

storiesOf('App|Elements/designCourse/plan', module)
   .addDecorator(withKnobs)
   .add('Plans Table', () => {
      return (
         <div className='storybook-element__wrapper'>
            <PlansTable
               plans={ [
                  {
                     id: 1, type: 'free', name: 'test',
                  },
                  {
                     id: 2, type: 'One Time', name: 'test2',
                  },
               ] }
               checkedId={ 2 }
            />
         </div>
      );
   })
   .add('Coupons Table', () => {
      return (
         <div className='storybook-element__wrapper'>
            <CouponsTable
               coupons={ [
                  {
                     id: 1, plan: 'One Time', Code: '7435', couponPrice: '40$', couponType: 'Percentage', expiryDate: '22.06.2019',
                  },
               ] }
            />
         </div>
      );
   });
