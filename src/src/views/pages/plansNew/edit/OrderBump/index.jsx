import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import OrderBumpLeft from './components/OrderBumpLeft';
import OrderBumpRight from './components/OrderBumpRight';

const OrderBumpCreate = ({
   inputs, onChange, goBack, onCreate, offers,
   errorMessages
}) => {
   const offersOptions = offers.map((e) => ({ label: e.name, value: e.id }));
   const selectedOffer = inputs.offer ? offers.filter((e) => e.id === inputs.offer)[0] : null;
   const pricingOptions = selectedOffer ? selectedOffer.pricings.map((e) => ({ label: e.name, value: e.id })) : [];
   const selectedPricing = inputs.pricing ? selectedOffer.pricings.filter((e) => e.id === inputs.pricing)[0] : null;

   return (
      <div className='plan__order__bump__view'>
         <OrderBumpLeft
            inputs={ inputs }
            pricingOptions={ pricingOptions }
            onChange={ onChange }
            onCreate={ onCreate }
            offers={ offersOptions }
            selectedPricing={ selectedPricing }
            goBack={ goBack }
            errorMessages={ errorMessages }
         />
         <OrderBumpRight
            selectedOffer={ selectedOffer }
            selectedPricing={ selectedPricing }
            inputs={ inputs }
            onChange={ onChange }
         />
      </div>
   );
};

OrderBumpCreate.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   goBack: PropTypes.func,
   offers: PropTypes.object,
   onCreate: PropTypes.func,
   errorMessages: PropTypes.object,
};

export default OrderBumpCreate;
