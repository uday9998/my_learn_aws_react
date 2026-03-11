import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import LineChart from 'components/elements/charts/lineChart';
import Select from 'components/elements/SelectNew';
import LoaderMini from 'components/elements/loaderMini';

const SubscriptionChartRate = ({ churnRate, delimeter, handleSubscriptionMetrics }) => {
   return (
      <div className='subscription__chart'>
         <div className='subscription__chart__header'>
            <div>
               <div>
                  <Text
                     inner='Churn Rate'
                     type={ txtTypes.regularDefaultSmall }
                     size={ txtSizes.medium }
                  />
               </div>
               <div className='m-t-exs'>
                  <Text
                     inner={ `$${ churnRate?.all_price }` }
                     type={ txtTypes.medium }
                     size={ txtSizes.xxlarge }
                  />
               </div>
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
                  onChange={ (name, value) => handleSubscriptionMetrics(name, value) }
               />
            </div>
         </div>
         {churnRate?.rates !== undefined ? (
            <LineChart
               datas={ churnRate?.rates }
               isChurnRate={ true }
            />
         ) : (
            <div className='subscription__chart__loader'>
               <LoaderMini color='#131f1e' />
            </div>
         )}
      </div>
   );
};

SubscriptionChartRate.propTypes = {
   churnRate: PropTypes.object,
   delimeter: PropTypes.string,
   handleSubscriptionMetrics: PropTypes.func,
};

export default SubscriptionChartRate;
