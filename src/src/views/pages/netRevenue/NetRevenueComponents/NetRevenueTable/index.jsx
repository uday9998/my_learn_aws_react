import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import { uniqueId } from 'lodash';
import LoaderMini from 'components/elements/loaderMini';
import { parseFloat } from 'utils/numberParseFloat';
import moment from 'moment';

export const NetRevenueTable = ({ data }) => {
   return (
      <div className='net-revenue-table scroll'>
         <div className='net-revenue-table-header'>
            <div className='net-revenue-table-item net-revenue-table-item-start'>
               <Text inner='Start Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='net-revenue-table-item '>
               <Text inner='Payments' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='net-revenue-table-item '>
               <Text inner='Revenue' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='net-revenue-table-item '>
               <Text inner='Refunds' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='net-revenue-table-item '>
               <Text inner='Offers' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
         </div>
         {data.all_payments_count !== undefined && (
            <div className='net-revenue-table-line' key={ uniqueId() }>
               <div className='net-revenue-table-item net-revenue-table-item-start'>
                  <Text
                     inner='Summary'
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               <div className='net-revenue-table-item net-revenue-table-item'>
                  <Text
                     inner={ data.all_payments_count }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               <div className='net-revenue-table-item net-revenue-table-item'>
                  <Text
                     inner={ parseFloat(data.price_revenue) }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               <div className='net-revenue-table-item net-revenue-table-item'>
                  <Text
                     inner={ parseFloat(data.price_refund) }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
               <div className='net-revenue-table-item net-revenue-table-item'>
                  <Text
                     inner={ data.all_offers_count }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
               </div>
            </div>
         )}
         {data.table_data !== undefined ? (
            <>
               {Object.keys(data.table_data).map((e) => {
                  return (
                     <div className='net-revenue-table-line' key={ uniqueId() }>
                        <div className='net-revenue-table-item net-revenue-table-item-start'>
                           <Text
                              inner={ moment(data.table_data[e].date).format('MMMM DD, YYYY') }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                        <div className='net-revenue-table-item net-revenue-table-item'>
                           <Text
                              inner={ data.table_data[e].payments_count }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                        <div className='net-revenue-table-item net-revenue-table-item'>
                           <Text
                              inner={ parseFloat(data.table_data[e].revenues_price) }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                        <div className='net-revenue-table-item net-revenue-table-item'>
                           <Text
                              inner={ parseFloat(data.table_data[e].refunds_price) }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                        <div className='net-revenue-table-item net-revenue-table-item'>
                           <Text
                              inner={ data.table_data[e].offers_count }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </div>
                     </div>
                  );
               })}
            </>
         ) : (
            <div className='net-revenue-chart-loader'>
               <LoaderMini color='#131f1e' />
            </div>
         )}
      </div>
   );
};

NetRevenueTable.propTypes = {
   data: PropTypes.array,
};
