import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Select from 'components/elements/form/Select';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import AffiliateCommission from 'components/elements/promotions/affiliates/AffiliateCommission';
import moment from 'moment';
import { parseFloat } from 'utils/numberParseFloat';

const dateOptions = [
   { label: '1 Week', value: 'one_week' },
   { label: '2 Week', value: 'two_week' },
   { label: '1 Month', value: 'one_month' },
   { label: '3 Month', value: 'three_month' },
   { label: '1 Year', value: 'one_year' },
   { label: '1 MTD', value: 'one_mtd' },
   { label: '1 QTD', value: 'one_qtd' },
   { label: '1 YTD', value: 'one_ytd' },
   { label: 'ALL', value: 'all' },
   { label: 'Custom', value: 'custom' },
];

const CourseCommissions = ({
   reports, handleFilterChange, authCreatedAt, handleFilterSave, coursesOption, courseValue,
}) => {
   const [selectedDateType, setSelectedDateType] = useState('one_week');
   const dateOption = {
      one_week: moment().subtract(1, 'week').format('YYYY-MM-DD'),
      two_week: moment().subtract(2, 'week').format('YYYY-MM-DD'),
      one_month: moment().subtract(1, 'month').format('YYYY-MM-DD'),
      three_month: moment().subtract(3, 'month').format('YYYY-MM-DD'),
      one_year: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      one_mtd: moment().startOf('month').format('YYYY-MM-DD'),
      one_qtd: moment().startOf('quarter').format('YYYY-MM-DD'),
      one_ytd: moment().startOf('year').format('YYYY-MM-DD'),
      all: moment(authCreatedAt).format('YYYY-MM-DD'),
   };

   function handleDateOptionChange(key, value) {
      if (dateOption[value]) {
         handleFilterChange(key, dateOption[value]);
      }
      setSelectedDateType(value);
   }


   return (
      <div className='courseCommissions__container'>
         <div className='courseCommission__row'>
            <div className='courseCommission__item'>
               <div className='mob-courseSelect'>
                  <Select
                     typeOval
                     icon='TriangleDown'
                     hasBorder
                     padding='7px 16px 7px 24px'
                     placeholder='All Classes'
                     style={ { minWidth: '264px' } }
                     name='course_id'
                     options={ coursesOption }
                     onChange={ (x, y) => handleFilterChange(x, y) }
                     value={ courseValue }
                  />
               </div>
               <Select
                  typeOval
                  icon='TriangleDown'
                  hasBorder
                  padding='7px 16px 7px 24px'
                  options={ dateOptions }
                  name='from'
                  onChange={ handleDateOptionChange }
                  value={ selectedDateType }
                  placeholder='1 Week'
               />
            </div>
            {selectedDateType === 'custom' && (
               <>
                  <div className='courseCommission__item'>
                     <TextInput
                        placeholder='2019/07/10'
                        name='from'
                        type='date'
                        value={ reports.filter.from ? reports.filter.from : moment().subtract(1, 'week').format('YYYY-MM-DD') }
                        onChange={ (key, value) => handleFilterChange(key, value) }
                     />
                  </div>
                  <div className='courseCommission__item'>
                     <TextInput
                        placeholder='2019/07/11'
                        name='to'
                        type='date'
                        value={ reports.filter.to ? reports.filter.to : moment().format('YYYY-MM-DD') }
                        onChange={ (key, value) => handleFilterChange(key, value) }
                     />
                  </div>
               </>
            )}
            <div className='searchFilter-c__btn courseCommission__item'>
               <BaseButton
                  theme={ btnTheme.lightBlue }
                  size={ btnSize.full }
                  text='Filter'
                  onClick={ handleFilterSave }
               />
            </div>
         </div>
         <div className='courseCommission__row m-t-exl'>
            <div className='courseCommission__item'>
               <AffiliateCommission title={ parseFloat(reports.sales) } name='Gross Volume' />
            </div>
            <div className='courseCommission__item'>
               <AffiliateCommission title={ `${ reports.new_users_count }` } name='New Customers' />
            </div>
            <div className='courseCommission__item'>
               <AffiliateCommission title={ `${ reports.sales_count }` } name='Successful Payments' />
            </div>
            <div className='courseCommission__item'>
               <AffiliateCommission title={ `${ reports.course_completitions }` } name='Class Completions' />
            </div>
         </div>
      </div>
   );
};

CourseCommissions.propTypes = {
   reports: PropTypes.object,
   handleFilterChange: PropTypes.func,
   handleFilterSave: PropTypes.func,
   authCreatedAt: PropTypes.string,
   coursesOption: PropTypes.array,
   courseValue: PropTypes.any,
};

export default CourseCommissions;
