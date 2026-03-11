import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import img from 'assets/images/couponEmpty.png';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';

const CouponsEmptyPage = ({ onCreateNewCoupon }) => {
   return (
      <div className='coupons__empty__page'>
         <img src={ img } alt='' />
         <Text
            inner="You don't have coupons yet"
            type={ types.regularDefault }
            size={ sizes.small }
         />
         <Text
            inner="Let's start creating coupons for your plans."
            type={ types.regularMin }
            size={ sizes.size_28 }
            style={ {
               textAlign: 'center',
            } }
         />
         <Button
            text='Create Coupon'
            onClick={ () => onCreateNewCoupon() }
         />
      </div>
   );
};

CouponsEmptyPage.propTypes = {
   onCreateNewCoupon: PropTypes.func,
};

export default CouponsEmptyPage;
