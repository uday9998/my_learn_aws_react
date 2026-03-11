import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import LoaderMini from 'components/elements/loaderMini';
import StatusPrsent from 'components/elements/StatusPrsent';
import { parseFloat } from 'utils/numberParseFloat';

const ReportsTimeData = ({ data }) => {
   return (
      <div className='reports-sales'>
         <div className='reports-sales-wrapper'>
            <div className='reports-sales-item reports-sales-current'>
               {data.current !== undefined ? (
                  <>
                     <Text
                        inner={ parseFloat(data.current) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge } />
                     <Text
                        className='reports-sales-time'
                        inner='Current'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall } />
                  </>
               ) : (
                  <LoaderMini color='#131f1e' />
               )}
            </div>
            <div className='line' />
            <div className='reports-sales-item reports-sales-monthly'>
               {data.last_month !== undefined ? (
                  <>
                     <Text
                        inner={ parseFloat(data.last_month) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge } />
                     <Text
                        className='reports-sales-time'
                        inner='1 month ago'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall } />
                  </>
               ) : (
                  <LoaderMini color='#131f1e' />
               )}

               {
                  data.recurringData && (

                     <StatusPrsent status={ data.recurringData.six_month === 0 || data.recurringData.one_month > 0 ? 'Up' : 'Down' } prsent={ data.recurringData.one_month } isZero={ data.recurringData.one_month } />
                  )
               }
            </div>
            <div className='line' />
            <div className='reports-sales-item reports-sales-monthly'>
               {data.last_tree_months !== undefined ? (
                  <>
                     <Text
                        inner={ parseFloat(data.last_tree_months) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge } />
                     <Text
                        className='reports-sales-time'
                        inner='3 month ago'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall } />
                  </>
               ) : (
                  <LoaderMini color='#131f1e' />
               )}
               {
                  data.recurringData && (

                     <StatusPrsent status={ data.recurringData.six_month === 0 || data.recurringData.tree_month > 0 ? 'Up' : 'Down' } prsent={ data.recurringData.tree_month } isZero={ data.recurringData.one_month } />
                  )
               }

            </div>
            <div className='line' />
            <div className='reports-sales-item reports-sales-monthly'>
               {data.last_six_months !== undefined ? (
                  <>
                     <Text
                        inner={ parseFloat(data.last_six_months) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge } />
                     <Text
                        className='reports-sales-time'
                        inner='6 month ago'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall } />
                  </>
               ) : (
                  <LoaderMini color='#131f1e' />
               )}
               {
                  data.recurringData && (

                     <StatusPrsent status={ data.recurringData.six_month === 0 || data.recurringData.six_month > 0 ? 'Up' : 'Down' } prsent={ data.recurringData.six_month } isZero={ data.recurringData.one_month } />
                  )
               }

            </div>
            <div className='line' />
            <div className='reports-sales-item reports-sales-monthly'>
               {data.last_year !== undefined ? (
                  <>
                     <Text
                        inner={ parseFloat(data.last_year) }
                        type={ txtTypes.medium }
                        size={ txtSizes.xxlarge } />
                     <Text
                        className='reports-sales-time'
                        inner='12 month ago'
                        type={ txtTypes.regularLarge }
                        size={ txtSizes.xsmall } />
                  </>
               ) : (
                  <LoaderMini color='#131f1e' />
               )}
               {
                  data.recurringData && (

                     <StatusPrsent status={ data.recurringData.six_month === 0 || data.recurringData.year > 0 ? 'Up' : 'Down' } prsent={ data.recurringData.year } isZero={ data.recurringData.one_month } />
                  )
               }

            </div>
         </div>
      </div>
   );
};

ReportsTimeData.propTypes = {
   data: PropTypes.object,
};

export default ReportsTimeData;
