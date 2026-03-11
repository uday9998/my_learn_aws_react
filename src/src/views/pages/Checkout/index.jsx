import React from 'react';
import CheckoutHeader from 'components/modules/checkout/CheckoutHeader';
import LeftSideComponent from 'components/modules/checkout/LeftComponent';
import RightSideComponent from 'components/modules/checkout/RightComponent';
import './index.scss';


const Checkout = () => {
   return (
      <div className='checkoutPage'>
         <CheckoutHeader />
         <div className='checkoutPage-content'>
            <div className='left-component'>
               <LeftSideComponent />
            </div>

            <div className='right-component'>
               <RightSideComponent />
            </div>
         </div>
      </div>
   );
};


export default Checkout;
