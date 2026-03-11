import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Select from 'components/elements/SelectNew';
import PropTypes from 'prop-types';
import LineChartMrr from 'components/elements/charts/lineChartMrr';
import Input from 'components/elements/inputNew';
import LoaderMini from 'components/elements/loaderMini';
import { parseFloat } from 'utils/numberParseFloat';

const RefoundsChart = ({
   data, delimeter, handleRefoundMetrics, searchFrom, searchTo,
}) => {
   return (
      <div className='refounds-status'>
         <div className='refounds-status-info'>
            <div className='refounds-status-header'>
               <div className='refounds-status-header-left'>
                  <Text inner='Refunds' size={ txtSizes.medium } type={ txtTypes.regularDefault } />
                  {data.refund_price_with_date !== undefined && (
                     <Text
                        inner={ parseFloat(data.refund_price_with_date) }
                        size={ txtSizes.size_28 }
                        type={ txtTypes.medium } />
                  )}
               </div>
               <div className='refounds-status-header-right'>
                  <div>
                     <Input
                        classI='transactions-filter-input'
                        type='date-period'
                        from={ searchFrom }
                        to={ searchTo }
                        name='search'
                        onChange={ handleRefoundMetrics }
                        isPeriod={ true }
                        placeholder='Select Date'
                     />
                  </div>
                  <div>
                     <Select
                        iconName='ArrowSelectM'
                        options={ [{ label: 'Daily', value: 'daily' },
                           { label: 'Weekly', value: 'week' },
                           { label: 'Monthly', value: 'month' }] }
                        placeholder='Daily'
                        value={ delimeter }
                        name='delimeter'
                        onChange={ (name, value) => handleRefoundMetrics(name, value) }
                     />
                  </div>
               </div>
            </div>
            {data.data !== undefined ? (
               <LineChartMrr datas={ data.data } isRefunds={ true } />
            ) : (
               <div className='refounds-status-loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
         </div>
      </div>
   );
};

RefoundsChart.propTypes = {
   data: PropTypes.object,
   handleRefoundMetrics: PropTypes.func,
   delimeter: PropTypes.string,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
};

export default RefoundsChart;
