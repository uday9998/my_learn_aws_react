import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Input from 'components/elements/inputNew';
import Select from 'components/elements/SelectNew';
import { ReportsContainerFilter } from 'views/newLayout/reports';

export const TransactionsFilter = ({ handleInputChange, data, offerOptions }) => {
   return (
      <div className='transactions-filter'>
         <ReportsContainerFilter>
            <Input
               classI='transactions-filter-input'
               value={ data.email }
               name='email'
               onChange={ handleInputChange }
               type='search'
               placeholder='Search by Email'
            />
            <Select
               placeholder='Select Class'
               type='select-transactions'
               name='offer_id'
               value={ data.offer_id }
               onChange={ handleInputChange }
               options={ offerOptions }
            />
            <Select
               placeholder='Select Payment Type'
               type='select-transactions'
               name='type'
               value={ data.type }
               onChange={ handleInputChange }
               options={ [
                  { value: 'all', label: 'All Payments' },
                  { value: 'one_time', label: 'One Time' },
                  { value: 'subscription', label: 'Subscription' },
               ] }
            />
            <Input
               classI='transactions-filter-input'
               type='date-period'
               from={ data.searchFrom }
               to={ data.searchTo }
               name='search'
               onChange={ handleInputChange }
               isPeriod={ true }
               placeholder='Select Date'
            />
         </ReportsContainerFilter>
      </div>
   );
};

TransactionsFilter.propTypes = {
   handleInputChange: PropTypes.func,
   data: PropTypes.object,
   offerOptions: PropTypes.array,
};
