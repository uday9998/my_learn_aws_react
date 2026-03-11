import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { parseFloat } from 'utils/numberParseFloat';
import { uniqueId } from 'lodash';
import LoaderMini from 'components/elements/loaderMini';
import moment from 'moment';

const SubscriptionMetricsTable = ({
   data,
}) => {
   const summery = {
      date: 'Summary',
      price: data.sales,
      arpu: data.sales,
      active_subscription_count: data.active_subscription_all_count,
      new_subscription_count: data.new_subscription_all_count,
   };
   return (
      <div className='subscription__metrics__table'>
         <table>
            <thead>
               <tr>
                  <th className='t-start'>
                     <Text inner='Start Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Gross MRR' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Coupon Discounts' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='ARPU' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Active Subscriptions' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='New Subscriptions' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
               </tr>
            </thead>
            {data.data !== undefined ? (
               <tbody>
                  <tr key={ uniqueId() }>
                     <td className='t-start' colSpan='1'>
                        <Text
                           inner={ summery.date }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </td>
                     <td colSpan='1'>
                        <Text
                           inner={ parseFloat(summery.price) }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </td>
                     <td colSpan='1'>
                        <Text
                           inner='-'
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </td>
                     <td colSpan='1'>
                        <Text
                           inner={ parseFloat(summery.arpu) }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </td>
                     <td colSpan='1'>
                        <Text
                           inner={ summery.active_subscription_count }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </td>
                     <td colSpan='1'>
                        <Text
                           inner={ summery.new_subscription_count }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </td>
                  </tr>
                  {data.data.map((element) => {
                     return (
                        <tr key={ uniqueId() }>
                           <td className='t-start' colSpan='1'>
                              <Text
                                 inner={ moment(element.date).format('MMMM DD, YYYY') }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </td>
                           <td colSpan='1'>
                              <Text
                                 inner={ parseFloat(element.price) }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </td>
                           <td colSpan='1'>
                              <Text
                                 inner='-'
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </td>
                           <td colSpan='1'>
                              <Text
                                 inner={ parseFloat(element.arpu) }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </td>
                           <td colSpan='1'>
                              <Text
                                 inner={ element.active_subscription_count }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </td>
                           <td colSpan='1'>
                              <Text
                                 inner={ element.new_subscription_count }
                                 type={ txtTypes.regularDefault }
                                 size={ txtSizes.small }
                              />
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            ) : (
               <tbody>
                  <tr>
                     <div className='subscription__metrics__table__loader'>
                        <LoaderMini color='#131f1e' />
                     </div>
                  </tr>
               </tbody>
            )}
         </table>

      </div>
   );
};

SubscriptionMetricsTable.defaultProps = {
   data: {},
};

SubscriptionMetricsTable.propTypes = {
   data: PropTypes.object,
};

export default SubscriptionMetricsTable;
