import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import LineChartMrr from 'components/elements/charts/lineChartMrr';
import Select from 'components/elements/SelectNew';
import LoaderMini from 'components/elements/loaderMini';
import { parseFloat } from 'utils/numberParseFloat';

const SubscriptionChartMrr = ({ mrr, delimeter, handleSubscriptionMetrics }) => {
   return (
      <div className='subscription__chart'>
         <div className='subscription__chart__header'>
            <div>
               <div>
                  <Text
                     inner='Monthly Recurring Revenue'
                     type={ txtTypes.regularDefaultSmall }
                     size={ txtSizes.medium }
                  />
               </div>
               <div className='m-t-exs'>
                  {mrr.all_price_with_delimeter !== undefined && (
                     <Text
                        inner={ parseFloat(mrr.all_price_with_delimeter) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge }
                     />
                  )}
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
         {mrr.data !== undefined ? (
            <LineChartMrr datas={ mrr.data } />
         ) : (
            <div className='subscription__chart__loader'>
               <LoaderMini color='#131f1e' />
            </div>
         )}
      </div>
   );
};

SubscriptionChartMrr.propTypes = {
   mrr: PropTypes.object,
   delimeter: PropTypes.string,
   handleSubscriptionMetrics: PropTypes.func,
};

export default SubscriptionChartMrr;
