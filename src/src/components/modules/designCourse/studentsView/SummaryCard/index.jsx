import React from 'react';
import ViewCard from 'components/modules/designCourse/studentsView/ViewCard';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import img from 'assets/images/order.png';
import './index.scss';
import PropTypes from 'prop-types';

const SummaryCard = ({ coupon, checkoutCourse }) => {
   return (
      <ViewCard
         title='Order Summary'
         content={ (
            <>
               <div className='summaryText m-t-exs'>
                  <Text
                     size={ txtSizes.extraSmall }
                     type={ txtType.regular }
                     inner={ checkoutCourse.checkout_text }
                  />
               </div>
               <div className='courseContent'>
                  <div className='imgBlock'>
                     <img src={ img } alt='' />
                  </div>
                  <div className='couponsContainer'>
                     <div className='couponField'>
                        <Text
                           type={ txtType.normal }
                           size={ txtSizes.small }
                           inner={ checkoutCourse.course_name }
                           color='#8a94a2'
                        />
                        <Text
                           type={ txtType.normal }
                           size={ txtSizes.small }
                           inner='$9,000.00'
                        />
                     </div>
                     { (!!coupon && (
                        <div className='couponField'>
                           <Text
                              type={ txtType.normal }
                              size={ txtSizes.small }
                              inner='Coupon Code'
                              color='#8a94a2'
                           />
                           <div className='couponCode'>
                              <Text
                                 type={ txtType.regular }
                                 size={ txtSizes.extraSmall }
                                 inner={ coupon }
                                 bold
                              />
                              <div className='couponBtn'>
                                 <Text
                                    type={ txtType.regular }
                                    size={ txtSizes.extraSmall }
                                    inner='Remove'
                                    color='#006dff'
                                    bold
                                 />
                              </div>
                           </div>
                        </div>
                     )) || (
                        <div className='couponBtn applyCouponBtn'>
                           <Text
                              type={ txtType.regular }
                              size={ txtSizes.extraSmall }
                              inner='Apply Coupon'
                              bold
                              color='#006dff'
                           />
                        </div>
                     ) }
                  </div>
               </div>
               <div className='summaryTotal'>
                  <Text
                     type={ txtType.bold }
                     size={ txtSizes.medium }
                     inner='Total'
                  />
                  <Text
                     type={ txtType.normal }
                     size={ txtSizes.small }
                     inner='$9,000.00'
                  />
               </div>
            </>
         ) }
      />
   );
};

SummaryCard.propTypes = {
   coupon: PropTypes.string,
   checkoutCourse: PropTypes.object,
};

SummaryCard.defaultProps = {
   coupon: '',
};

export default SummaryCard;
