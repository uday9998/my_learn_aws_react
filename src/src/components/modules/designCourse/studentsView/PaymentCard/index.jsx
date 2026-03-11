/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import ViewCard from 'components/modules/designCourse/studentsView/ViewCard';
import CardNumberInput from 'components/elements/form/CardNumberInput';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';
import './index.scss';
import {
   visa,
   masterCard,
   discover,
   americanExpress,
   paypal,
} from 'assets/images/checkout';

const PaymentCard = ({ checked }) => {
   const [check1, setCheck1] = useState(!checked);
   const [check2, setCheck2] = useState(checked);

   const checkChanges = (check) => {
      if (check === 1) {
         setCheck1(true);
         setCheck2(false);
      } else {
         setCheck2(true);
         setCheck1(false);
      }
   };

   return (
      <ViewCard
         title='Payment Information'
         content={ (
            <div className='paymentContent'>
               <div className='paymentCreditsBlock'>
                  <div className='paymentCredits m-r-l'>
                     <div onClick={ () => checkChanges(1) } className='m-r-exs'>
                        <Icon name={ (check1 && 'CheckedCircle') || 'UncheckedCircle' } />
                     </div>
                     <img src={ visa } alt='visa' />
                     <img src={ masterCard } alt='master card' />
                     <img src={ discover } alt='discover' />
                     <img src={ americanExpress } alt='american express' />
                  </div>
                  <div className='paymentCredits'>
                     <div onClick={ () => checkChanges(2) } className='m-r-exs'>
                        <Icon name={ (check2 && 'CheckedCircle') || 'UncheckedCircle' } />
                     </div>
                     <img src={ paypal } alt='paypal' />
                  </div>
               </div>
               {check1 && <CardNumberInput /> }
            </div>
         ) }
      />
   );
};

PaymentCard.propTypes = {
   checked: PropTypes.bool,
};

PaymentCard.defaultProps = {
   checked: false,
};

export default PaymentCard;
