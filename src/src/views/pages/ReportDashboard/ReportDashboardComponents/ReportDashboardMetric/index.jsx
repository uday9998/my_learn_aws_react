
import React, { useState } from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Select from 'components/elements/SelectNew';
import Input from 'components/elements/inputNew';
import LineChart from 'components/elements/charts/lineChart';
import moment from 'moment';
import './index.scss';
import withLoading from 'utils/withLoading';
import LoaderMini from 'components/elements/loaderMini';
import { parseFloat } from 'utils/numberParseFloat';

const LineChartLoading = withLoading(LineChart);

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


const ReportDashboardMetric = ({
   reports, handleFilterChange, authCreatedAt,
   handleFilterSave, inputs, loadingReport,
}) => {
   const [selectedDateType, setSelectedDateType] = useState('all');

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
      custom: moment(authCreatedAt).format('YYYY-MM-DD'),
   };
   const handleDateOptionChange = (key, value) => {
      setSelectedDateType(value);
      handleFilterChange('search', new Date(dateOption[value]));
   };
   return (
      <div className='report-dashboard-metric'>
         <div className='salesHeader'>
            <div>
               <div className='m-b-exs'>
                  <Text
                     inner='Sales'
                     size={ txtSizes.medium }
                     type={ txtTypes.regular }
                     style={ { color: '#131F1E' } }
                  />
               </div>
               <div>
                  {reports.all !== undefined && (
                     <Text
                        inner={ parseFloat(reports.all) }
                        size={ txtSizes.xxlarge }
                        type={ txtTypes.medium }
                        style={ { color: '#131F1E' } }
                     />
                  )}
               </div>
            </div>
            <div className='salesFilter'>
               {/* <div className='period-selector'>
                  <Select
                     iconName='ArrowSelectM'
                     options={ dateOptions }
                     name='date_type'
                     onChange={ handleDateOptionChange }
                     value={ selectedDateType }
                     placeholder='1 Week'
                  />
               </div> */}
               <div>
                  <Input
                     classI='transactions-filter-input'
                     type='date-period'
                     from={ inputs.searchFrom }
                     to={ inputs.searchTo }
                     name='search'
                     onChange={ handleFilterChange }
                     isPeriod={ true }
                     placeholder='Select Date'
                  />
               </div>
               <div className='delemeter'>
                  <Select
                     iconName='ArrowSelectM'
                     options={ [{ label: 'Daily', value: 'day' },
                        { label: 'Weekly', value: 'week' },
                        { label: 'Monthly', value: 'month' },
                        { label: 'Yearly', value: 'year' }] }
                     placeholder='Daily'
                     value={ inputs.delimeter }
                     name='delimeter'
                     onChange={ (name, value) => handleFilterSave(name, value) }
                  />
               </div>
            </div>
         </div>
         {reports.with_dates !== undefined ? (
            <LineChartLoading isLoading={ loadingReport } datas={ reports.with_dates } />
         ) : (
            <div className='report-dashboard-metric-loader'>
               <LoaderMini color='#131f1e' />
            </div>
         )}
      </div>

   );
};

ReportDashboardMetric.propTypes = {
   handleFilterChange: PropTypes.func,
   handleFilterSave: PropTypes.func,
   reports: PropTypes.object,
   authCreatedAt: PropTypes.string,
   inputs: PropTypes.object,
   loadingReport: PropTypes.bool,
};

export default ReportDashboardMetric;
