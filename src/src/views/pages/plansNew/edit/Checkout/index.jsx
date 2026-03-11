import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CheckoutImage1 from 'assets/images/checkout/template7.png';
import CheckoutLeftTemplates from './components/CheckoutLeft';
import CheckoutRightPreview from './components/CheckoutRightPreview';

const PlanEditCheckout = ({
   plan, goToCheckout, makeActiveLanding, goToPreview, isMobile,
}) => {
   const activeLanding = plan.landings.find((e) => !!e.is_active) || plan.landings[0];
   const isActive = Boolean(activeLanding.is_active);
   
   return (
      <div className='plan__edit__checkout'>
         <CheckoutLeftTemplates
            isMobile={isMobile}
            isActive={isActive}
            makeActiveLanding={() => {
               makeActiveLanding(
                  activeLanding.id,
                  () => {}
               );
            }}
            onPreview={() => goToPreview({
               id: activeLanding.id,
               checkout_theme_name: 'template1',
            })}
         />
         {
            !isMobile && (
               <CheckoutRightPreview
                  selectedCheckoutId={activeLanding.id}
                  planId={plan.id}
                  onEdit={() => goToCheckout(activeLanding.id, 'template1')}
                  onPreview={() => goToPreview({
                     id: activeLanding.id,
                     checkout_theme_name: 'template1',
                  })}
                  image={CheckoutImage1}
                  makeActiveLanding={() => {
                     makeActiveLanding(
                        activeLanding.id,
                        () => {}
                     );
                  }}
                  isActive={isActive}
               />
            )
         }
      </div>
   );
};

PlanEditCheckout.propTypes = {
   plan: PropTypes.object,
   goToCheckout: PropTypes.func,
   goToPreview: PropTypes.func,
   makeActiveLanding: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default PlanEditCheckout;