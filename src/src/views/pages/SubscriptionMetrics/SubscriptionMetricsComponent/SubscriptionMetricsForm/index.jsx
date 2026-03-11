import React from 'react';
import PropTypes from 'prop-types';
import { ReportsContainerFilter } from 'views/newLayout/reports';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import './index.scss';


const SubscriptionMetricsForm = ({
   offer, handleInputChange, courses, searchFrom, searchTo,
}) => {
   const OfferOptions = courses.map((course) => {
      return { value: course.id, label: course.name };
   });
   OfferOptions.unshift({ value: 'all_courses', label: 'All Offers' });
   return (
      <div className='subscription__metric__form'>
         <ReportsContainerFilter>
            <div className='transactions-filters'>
               <div>
                  <Select
                     type='select-transactions'
                     onChange={ (name, value) => handleInputChange(name, value) }
                     name='offer_id'
                     value={ offer }
                     placeholder='Select Bundle'
                     options={ OfferOptions }
                  />
               </div>
               <div>
                  <Input
                     classI='transactions-filter-input'
                     type='date-period'
                     from={ searchFrom }
                     to={ searchTo }
                     name='search'
                     onChange={ handleInputChange }
                     isPeriod={ true }
                     placeholder='Select Date'
                  />
               </div>
            </div>
         </ReportsContainerFilter>
      </div>
   );
};

SubscriptionMetricsForm.propTypes = {
   offer: PropTypes.any,
   handleInputChange: PropTypes.func,
   courses: PropTypes.object,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
};

export default SubscriptionMetricsForm;
