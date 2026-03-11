import React from 'react';
import PropTypes from 'prop-types';
import TotalXReport from 'components/elements/dashboard/TotalXReport';
import TotalReport from 'components/elements/dashboard/TotalReport';
import Select from 'components/elements/form/Select';
import { parseFloat } from 'utils/numberParseFloat';
import './style.scss';

const RevenueReports = ({
   sales, membersCount, courseValue, handleFilterChange, reports,
}) => {
   const coursesOption = [
      { label: 'All Classes', value: '' },
   ];
   reports.courses.map(item => coursesOption.push({ label: item.name, value: item.id }));
   return (
      <div className='revenue-reports'>
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
         <div className='revenue-reports_total-sales'>
            <TotalXReport
               title={ `${ parseFloat(sales.alltime_sales) } Total Sales` }
               icon='Sales'
               data={ [
                  { first: parseFloat(sales.monthly_sales), second: 'Monthly' },
                  { first: parseFloat(sales.weekly_sales), second: 'Weekly' },
                  { first: parseFloat(sales.daily_sales), second: 'Daily' },
               ] }
            />
         </div>
         <div className='revenue-reports_total-members'>
            <TotalReport bold={ membersCount } />
         </div>
      </div>
   );
};

RevenueReports.propTypes = {
   sales: PropTypes.object,
   membersCount: PropTypes.number,
   reports: PropTypes.object,
   courseValue: PropTypes.any,
   handleFilterChange: PropTypes.func,
};

export default RevenueReports;
