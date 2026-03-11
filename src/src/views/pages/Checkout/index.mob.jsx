import React from 'react';
import AdvantagesBlock from 'components/modules/checkout/AdvantagesBlock';
import TrialCard from 'components/modules/checkout/TrialCard';
import './index.mob.scss';

const Checkout = () => {
   return (
      <div className='mob-checkoutPage'>
         <AdvantagesBlock />
         <TrialCard />
      </div>
   );
};

export default Checkout;
