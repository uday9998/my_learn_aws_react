import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import UpsellCreateLeft from './Components/UpsellCreateLeft';
import UpsellCreateRight from './Components/UpsellCreateRight';

const UpsellCreateView = ({
   inputs, onChange, offers, onCancel, onCreate, pricings, isDownSell, isEdit,
   errorMessages = {}
}) => {
   const selectedPrice = (inputs.pricing_id && pricings.length) 
      ? (pricings.find((e) => e.value === inputs.pricing_id)?.label || '$ -') 
      : '$ -';

   return (
      <div className='upsel__create__bottom'>
         <UpsellCreateLeft
            inputs={ inputs }
            offers={ offers }
            onCancel={ onCancel }
            isEdit={ isEdit }
            pricings={ pricings }
            onCreate={ onCreate }
            onChange={ onChange }
            isDownSell={ isDownSell }
            errorMessages={ errorMessages }
         />
         <UpsellCreateRight
            data={ inputs }
            selectedOffer={ inputs.offerView }
            isPriceVisible={ inputs.autoText }
            selectedPrice={ selectedPrice }
         />
      </div>
   );
};

UpsellCreateView.propTypes = {
   inputs: PropTypes.object,
   onCancel: PropTypes.func,
   onCreate: PropTypes.func,
   isEdit: PropTypes.bool,
   onChange: PropTypes.func,
   isDownSell: PropTypes.bool,
   offers: PropTypes.array,
   pricings: PropTypes.array,
   errorMessages: PropTypes.object,
};

export default UpsellCreateView;
