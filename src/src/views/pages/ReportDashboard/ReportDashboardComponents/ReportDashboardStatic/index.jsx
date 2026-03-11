import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import './index.scss';
import LoaderMini from 'components/elements/loaderMini';
import StatusPrsent from 'components/elements/StatusPrsent';
import { parseFloat } from 'utils/numberParseFloat';
// import StatusPrsent from 'components/elements/StatusPrsent';

const ReportDashboardStatic = ({ reports }) => {
   return (
      <div className='report-dashboard-report'>
         <div className='report-item'>
            {reports !== 'procesed' ? (
               <Text
                  inner={ `${ reports.last_month_purchases_count }` }
                  size={ txtSizes.size_28 }
                  type={ txtTypes.medium }
               />
            ) : (
               <LoaderMini color='#131f1e' />
            )}
            <Text inner='Purchases' size={ txtSizes.small } type={ txtTypes.regular } />
            {/* <Text inner='Last 30 days' size={ txtSizes.xsmall } type={ txtTypes.regularLarge } /> */}
            {/* {
               reports.recurringData && (

                  <StatusPrsent status={ reports.recurringData.count === 0 || reports.recurringData.count > 0 ? 'Up' : 'Down' } prsent={ reports.recurringData.count } isZero={ reports.recurringData.count } />
               )
            } */}
         </div>
         <div className='report-item-line' />
         <div className='report-item'>
            {reports !== 'procesed' ? (
               <Text
                  inner={ `${ parseFloat(Math.round(Number(reports.last_month_purchases_price) * 100) / 100) }` }
                  size={ txtSizes.size_28 }
                  type={ txtTypes.medium }
               />
            ) : (
               <LoaderMini color='#131f1e' />
            )}
            <Text inner='Revenue' size={ txtSizes.small } type={ txtTypes.regular } />
            {/* <Text inner='Last 30 days' size={ txtSizes.xsmall } type={ txtTypes.regularLarge } /> */}
            {/* {
               reports.recurringData && (

                  <StatusPrsent status={ reports.recurringData.price === 0 || reports.recurringData.price > 0 ? 'Up' : 'Down' } prsent={ reports.recurringData.price } isZero={ reports.recurringData.price } />
               )
            } */}
         </div>
         <div className='report-item-line' />
         <div className='report-item'>
            {reports !== 'procesed' ? (
               <Text
                  inner={ parseFloat(reports.all_time_purchases_price) }
                  size={ txtSizes.size_28 }
                  type={ txtTypes.medium }
               />
            ) : (
               <LoaderMini color='#131f1e' />
            )}
            <Text inner='Net Revenue' size={ txtSizes.small } type={ txtTypes.regular } />
            <Text inner='All Time' size={ txtSizes.xsmall } type={ txtTypes.regularLarge } />
            {
               reports !== 'procesed' && (
                  <div
                     className='empty__percent'
                  />
               )
            }
         </div>
      </div>
   );
};

ReportDashboardStatic.propTypes = {
   reports: PropTypes.object,
};

export default ReportDashboardStatic;
