import React from 'react';
import './index.scss';
import Text, { SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import TotalXReport from 'components/elements/dashboard/TotalXReport';
import TotalReport from 'components/elements/dashboard/TotalReport';
import Select from 'components/elements/form/Select';
import SortButton from 'components/elements/buttons/SortButton';
import PropTypes from 'prop-types';

const CourseReport = ({
   reports, handleFilterChange, value, fetched,
}) => {
   // const coursesOption = [
   //    { label: 'All Products', value: '' },
   // ];
   const coursesOption = {
      allProducts: 'All Products',
   };
   // if (fetched) {
   //    reports.courses.map(item => coursesOption.push({ label: item.name, value: item.id }));
   // }

   return (
      <div className='courseReport'>
         <div className='courseReport__header'>
            <Text
               size={ textSize.large }
               type={ textType.bold }
               inner='Analytics'
               color='#333333'
            />
            <div>
               {/* <Select
                  icon='TriangleDown'
                  hasBorder
                  placeholder='All Products'
                  style={ { minWidth: '264px' } }
                  name='course_id'
                  options={ coursesOption }
                  onChange={ (x, y) => handleFilterChange(x, y) }
                  value={ value }
               /> */}
               <SortButton
                  value='allProducts'
                  placeholder='All Products'
                  onFilter={ (x) => handleFilterChange(x) }
                  options={ coursesOption }
               />
            </div>
         </div>
         <div className='grey_scale' />
         {fetched && (
            <div className='courseReport__content'>
               <TotalXReport
                  title={ `$${ reports.sales.alltime_sales } Total Sales` }
                  icon='Sales'
                  data={ [
                     { first: `$${ reports.sales.monthly_sales }`, second: 'Monthly' },
                     { first: `$${ reports.sales.weekly_sales }`, second: 'Weekly' },
                     { first: `$${ reports.sales.daily_sales }`, second: 'Daily' },
                  ] }
               />
               <div className='grey_scale' />
               <div className='courseReport__complations'>
                  {/* <TotalReport
                     bold={ `${ reports.course_completitions }` }
                     regular='Completions'
                     icon='CompletionsM'
                  /> */}
                  <TotalReport
                     bold={ reports.members_count }
                     regular='Total Members'
                     icon='TotalMembersM'
                  />
                  <TotalReport
                     bold={ reports.courses && reports.courses.length }
                     regular='Total Number Of Products'
                     icon='TotalProductsM'
                  />
               </div>
            </div>
         ) }
      </div>
   );
};

CourseReport.propTypes = {
   reports: PropTypes.object,
   handleFilterChange: PropTypes.func,
   value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
   fetched: PropTypes.bool,
};

export default CourseReport;
