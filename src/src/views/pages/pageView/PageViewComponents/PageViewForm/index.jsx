import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import './index.scss';
import { ReportsContainerFilter } from 'views/newLayout/reports';
import Input from 'components/elements/inputNew';


export const PageViewForm = ({
   landingStatistic, handleLandingStatisticChange, landingId, searchFrom, searchTo,
}) => {
   const options = landingStatistic.landing_page_by_views.map((landing) => {
      return { label: landing.landing_name, value: landing.landing_id };
   });
   options.unshift({ label: 'All Landings', value: 'all' });
   return (
      <div className='page-view-form'>
         <ReportsContainerFilter>
            <div className='page-view-filters'>
               <div>
                  <Select
                     className='page-view-form-select'
                     type='select-large'
                     options={ options }
                     placeholder='Select Landing Page'
                     value={ landingId }
                     name='landing_id'
                     onChange={ (name, value) => handleLandingStatisticChange(name, value, true) }
                     withoutWidth={ true }
                  />
               </div>
               <div>
                  <Input
                     classI='transactions-filter-input'
                     type='date-period'
                     from={ searchFrom }
                     to={ searchTo }
                     name='search'
                     onChange={ handleLandingStatisticChange }
                     isPeriod={ true }
                     placeholder='Select Date'
                  />
               </div>
            </div>
         </ReportsContainerFilter>
      </div>
   );
};
PageViewForm.propTypes = {
   landingStatistic: PropTypes.object,
   landingId: PropTypes.any,
   handleLandingStatisticChange: PropTypes.func,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
};
