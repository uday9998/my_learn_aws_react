import React from 'react';
import './index.scss';
import MainHubHeader from 'views/layout/BlueHeader';
import CheckBox from 'components/elements/form/CheckBox';
import BaseButton from 'components/elements/buttons/BaseButton';
import GettingCard from 'components/modules/designCourse/studentsView/GettingCard';
import AccountCard from 'components/modules/designCourse/studentsView/AccountCard';
import PaymentCard from 'components/modules/designCourse/studentsView/PaymentCard';
import SummaryCard from 'components/modules/designCourse/studentsView/SummaryCard';
import OpinionCard from 'components/modules/designCourse/studentsView/OpinionCard';
import CouponCard from 'components/modules/designCourse/studentsView/CouponCard';
import BackdropFilter from 'components/elements/BackdropFilter';
import PropTypes from 'prop-types';


const StudentsView = ({
   checkoutCourse, getCheckoutInProgress, filterActive, paypalChecked, coupon, testimonials,
   offers,
}) => {
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

   return (
      <BackdropFilter active={ filterActive }>
         <div className='studentsView'>
            <MainHubHeader />
            <div className='studentsView__main'>
               <div className='studentsView__cards'>
                  <div className='leftSide'>
                     {!getCheckoutInProgress && <SummaryCard coupon={ coupon } checkoutCourse={ checkoutCourse } /> }
                     <div className='m-b-m' />
                     <AccountCard />
                     <div className='m-b-m' />
                     <PaymentCard checked={ paypalChecked } />
                     <div className='m-b-m' />
                  </div>
                  <div className='rightSide'>
                     {!getCheckoutInProgress && testimonials.length !== 0 && (
                     <><OpinionCard testimonials={ testimonials } />
                        <div className='m-b-m' />
                     </>
                     )}

                     {!getCheckoutInProgress && offers.length !== 0 && <GettingCard offers={ offers } /> }
                  </div>
               </div>
               <CheckBox label={ [label] } />
               <div className='footerBtnBlock'>
                  {!getCheckoutInProgress
                  && (
                     <BaseButton
                        text={ checkoutCourse.checkout_button_text }
                        theme='darkGreen'
                        size='large'
                        style={ { backgroundColor: checkoutCourse.checkout_button_color } }
                     />
                  )
                  }
               </div>
            </div>
         </div>
         <div className='couponCardPopup'>
            <CouponCard />
         </div>
      </BackdropFilter>
   );
};

StudentsView.propTypes = {
   filterActive: PropTypes.bool,
   paypalChecked: PropTypes.bool,
   coupon: PropTypes.string,
   checkoutCourse: PropTypes.object,
   getCheckoutInProgress: PropTypes.bool,
   testimonials: PropTypes.array,
   offers: PropTypes.array,
};

StudentsView.defaultProps = {
   filterActive: false,
   paypalChecked: false,
   coupon: '',
};

export default StudentsView;
