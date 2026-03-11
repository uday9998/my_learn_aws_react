import React from 'react';
import PropTypes from 'prop-types';
import CouponCreateLeft from './Components/CreateLeft';
import './index.scss';
import CouponCreateRight from './Components/CreateRight';

const CouponCreateView = ({
   inputs,
   onCreate,
   offerOptions,
   handleInputChange,
   onCancel,
   generateCoupon,
   isCouponCodeGenerating,
   isMobile,
}) => {
   return (
      <div className='coupon__create__view'>
         <CouponCreateLeft
            inputs={ inputs }
            onChange={ handleInputChange }
            options={ offerOptions }
            onCancel={ onCancel }
            onCreate={ onCreate }
            generateCoupon={ generateCoupon }
            isCouponCodeGenerating={ isCouponCodeGenerating }
         />
         {
            !isMobile && (
               <CouponCreateRight
                  offers={ offerOptions }
                  inputs={ inputs }
               />
            )
         }
      </div>
   );
};

CouponCreateView.propTypes = {
   handleInputChange: PropTypes.func,
   inputs: PropTypes.object,
   offerOptions: PropTypes.array,
   onCancel: PropTypes.func,
   onCreate: PropTypes.func,
   generateCoupon: PropTypes.func,
   isCouponCodeGenerating: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default CouponCreateView;
