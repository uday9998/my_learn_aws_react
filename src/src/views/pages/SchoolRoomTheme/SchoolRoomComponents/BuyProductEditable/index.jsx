import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import './index.scss';

const BuyButtonEditable = ({
   list, setList, offers, landings,
}) => {
   const toSelectOffers = offers.map((e) => ({ label: e.name, value: e.id }));
   const toSelectLandings = landings.map((e) => ({ label: e.name, value: e.url }));
   const [goTo, setGoTo] = React.useState();
   const urlOptions = [
      { label: 'Go To Checkout', value: 'go_to_checkout' },
      { label: 'Go To Landing', value: 'go_to_landing' },
   ];
   const [selectedOffer, setSelectedOffer] = React.useState(null);
   const handleSelectOffer = (name, value) => {
      setSelectedOffer(value);
      setGoTo(!list[value] ? 'go_to_checkout' : 'go_to_landing');
   };

   const handleSelectLanding = (name, value) => {
      setList({ ...list, [selectedOffer]: value });
   };
   return (
      <div className='buy__button__editable'>
         <Select
            label='Select Bundle'
            value={ selectedOffer }
            options={ toSelectOffers }
            onChange={ handleSelectOffer }
            type='select-medium'
            placeholder='Offer'
            hasSearch
         />
         {selectedOffer && (
            <Select
               label='Destination'
               value={ goTo }
               options={ urlOptions }
               placeholder='desitnation'
               onChange={ (name, value) => {
                  setGoTo(value);
                  if (value === 'go_to_checkout') {
                     setList({ ...list, [selectedOffer]: null });
                  }
               } }
               type='select-medium'
            />
         )}
         {selectedOffer && goTo === 'go_to_landing' && (
            <Select
               label='Landing Page'
               value={ list[selectedOffer] }
               options={ toSelectLandings }
               placeholder='Select Landing'
               onChange={ handleSelectLanding }
               type='select-medium'
               hasSearch
            />
         )}
      </div>
   );
};

BuyButtonEditable.propTypes = {
   offers: PropTypes.array,
   setList: PropTypes.func,
   list: PropTypes.array,
   landings: PropTypes.array,
};

export default BuyButtonEditable;
