import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Select from 'components/elements/SelectNew';
import LineChart from 'components/elements/charts/lineChartRevenue';
import PropTypes from 'prop-types';
import LoaderMini from 'components/elements/loaderMini';
import { parseFloat } from 'utils/numberParseFloat';

const NetRevenueStatus = ({ data, delimeter, handleInputChange }) => {
   return (
      <div className='net-revenue-status'>
         <div className='net-revenue-status-info'>
            <div className='net-revenue-status-header'>
               <div className='net-revenue-status-header-left'>
                  <Text inner='Net Revenue' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                  {data.price_revenue && (
                     <Text
                        inner={ parseFloat(data.price_revenue) }
                        size={ txtSizes.size_28 }
                        type={ txtTypes.medium } />
                  )}
               </div>
               <Select
                  iconName='ArrowSelectM'
                  options={ [{ label: 'Daily', value: 'daily' },
                     { label: 'Weekly', value: 'week' },
                     { label: 'Monthly', value: 'month' }] }
                  placeholder='Daily'
                  value={ delimeter }
                  name='delimeter'
                  onChange={ (name, value) => handleInputChange(name, value) }
                  withoutWidth={ true }
               />
            </div>
            {data.data_refund !== undefined ? (
               <LineChart refund={ data.data_refund } revenue={ data.data_revenue } />
            ) : (
               <div className='net-revenue-status-loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
            <div className='revenue-chart-circles'>
               <div>
                  <div className='green_circle' />
                  <Text
                     inner='Revenue'
                     size={ txtSizes.small }
                     type={ txtTypes.regular }
                  />
               </div>
               <div>
                  <div className='purple_circle' />
                  <Text
                     inner='Refunds'
                     size={ txtSizes.small }
                     type={ txtTypes.regular }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

NetRevenueStatus.propTypes = {
   data: PropTypes.object,
   delimeter: PropTypes.string,
   handleInputChange: PropTypes.func,
};

export default NetRevenueStatus;
