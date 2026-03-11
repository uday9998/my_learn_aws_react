import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import CouponCard from 'components/modules/designCourse/studentsView/CouponCard';
import GettingCard from 'components/modules/designCourse/studentsView/GettingCard';
import AccountCard from 'components/modules/designCourse/studentsView/AccountCard';
import PaymentCard from 'components/modules/designCourse/studentsView/PaymentCard';
import SummaryCard from 'components/modules/designCourse/studentsView/SummaryCard';
import OpinionCard from 'components/modules/designCourse/studentsView/OpinionCard';
import { textList } from './propOptions.js';
import 'index.scss';

storiesOf('App|Modules/designCourse/studentsView', module)
   .addDecorator(withKnobs)
   .add('CouponCard', () => (
      <div className='storybook-element__wrapper' style={ { maxWidth: '552px' } }>
         <CouponCard />
      </div>
   ))
   .add('GettingCard', () => (
      <div className='storybook-element__wrapper m' style={ { width: '456px' } }>
         <GettingCard textList={ textList } />
      </div>
   ))
   .add('AccountCard', () => (
      <div className='storybook-element__wrapper' style={ { width: '648px' } }>
         <AccountCard />
      </div>
   ))
   .add('PaymentCard', () => (
      <div className='storybook-element__wrapper' style={ { width: '648px' } }>
         <PaymentCard />
      </div>
   ))
   .add('SummaryCard', () => (
      <div className='storybook-element__wrapper' style={ { width: '648px' } }>
         <SummaryCard />
      </div>
   ))
   .add('OpinionCard', () => (
      <div className='storybook-element__wrapper' style={ { width: '456px' } }>
         <OpinionCard />
      </div>
   ));
