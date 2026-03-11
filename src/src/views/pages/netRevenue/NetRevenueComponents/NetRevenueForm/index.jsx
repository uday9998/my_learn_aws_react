import React from 'react';
import './index.scss';
import Select from 'components/elements/SelectNew';
import { ReportsContainerFilter } from 'views/newLayout/reports';
import Input from 'components/elements/inputNew';
import PropTypes from 'prop-types';

function NetRevenueForm({ offers, inputs, handleInputChange }) {
   const offersForSelectOption = offers.map(offer => ({ label: offer.name, value: offer.id }));
   offersForSelectOption.unshift({ value: 'all_offers', label: 'All Offers' });
   return (
      <div className='net-revenue-form'>
         <ReportsContainerFilter>
            <div>
               <Select
                  type='select-transactions'
                  options={ offersForSelectOption }
                  onChange={ (name, value) => handleInputChange(name, value) }
                  placeHolder='Select Class'
                  value={ inputs.offer_id }
                  name='offer_id'
               />
            </div>
            <div>
               <Select
                  type='select-transactions'
                  placeHolder='Select Payment Type'
                  name='payment_type'
                  value={ inputs.payment_type }
                  onChange={ handleInputChange }
                  options={ [
                     { value: 'all', label: 'All Payments' },
                     { value: 'one_time', label: 'One Time' },
                     { value: 'subscription', label: 'Subscription' },
                  ] }
               />
            </div>
            <div>
               <Input
                  classI='transactions-filter-input'
                  type='date-period'
                  from={ inputs.searchFrom }
                  to={ inputs.searchTo }
                  name='search'
                  onChange={ handleInputChange }
                  isPeriod={ true }
                  placeholder='Select Date'
               />
            </div>
         </ReportsContainerFilter>
      </div>
   );
}

NetRevenueForm.propTypes = {
   offers: PropTypes.object,
   inputs: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default NetRevenueForm;
