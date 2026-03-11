import React from 'react';
import './index.mob.scss';
import GettingCard from 'components/modules/designCourse/studentsView/GettingCard';
import AccountCard from 'components/modules/designCourse/studentsView/AccountCard';
import PaymentCard from 'components/modules/designCourse/studentsView/PaymentCard';
import SummaryCard from 'components/modules/designCourse/studentsView/SummaryCard';
import OpinionCard from 'components/modules/designCourse/studentsView/OpinionCard';
import CheckBox from 'components/elements/form/CheckBox';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';

const link = (
   <span>
      <span className='privacyLink'>Terms of Use</span> &
      <span className='privacyLink'>Privacy Policy</span>
   </span>
);
const label = (
   <span className='privacyLabel' key='privacyLabel'>
      By continuing, you agree to Miestro’s { link } and courses { link }
   </span>
);

const StudentsView = ({ coupon }) => {
   return (
      <div className='mob-studentsView'>
         <div className='m-b-exl'>
            <SummaryCard coupon={ coupon } />
         </div>
         <div className='m-b-exl'>
            <AccountCard />
         </div>
         <div className='m-b-exl'>
            <PaymentCard />
         </div>
         <div className='m-b-exl'>
            <OpinionCard />
         </div>
         <div className='m-b-exl'>
            <GettingCard />
         </div>
         <div className='m-b-exl'>
            <CheckBox label={ [label] } />
         </div>
         <BaseButton
            size={ btnSize.full }
            text='Buy Now'
            style={ { height: '48px' } }
         />
      </div>
   );
};

StudentsView.propTypes = {
   coupon: PropTypes.string,
};

export default StudentsView;
