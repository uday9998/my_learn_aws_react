

import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import transactionImg from 'assets/images/dashboard/wingmoney.png';
import { ReportDashboardData } from '../ReportDashboardData';

const ReportDashboardRecentTransactions = ({ goTo, transactions }) => {
   return (
      <div className='report-dashboard-activity'>
         <div className='report-dashboard-activity-header'>
            <Text inner='Recent Transactions' size={ txtSizes.medium } type={ txtTypes.regularDefaultSmall } />
         </div>
         <div className='report-dashboard-activity-users'>
            { transactions && !transactions.length && (
               <div className='recent-activity-empty'>
                  <img src={ transactionImg } alt='recent-activity' />
                  <Text
                     inner='It seems that there has been no recent transactions.'
                     type={ txtTypes.regularDefaultGrey }
                     size={ txtSizes.small14 }
                  />
               </div>
            )}

            {transactions && !!transactions.length && transactions.map((transaction) => {
               return (
                  <ReportDashboardData
                     date={ transaction.date }
                     data={ transaction.transactions }
                     key={ transaction.date }
                  />
               );
            }) }
         </div>
         {transactions && !!transactions.length && (
            <div className='report-dashboard-activity-footer'>
               <Text inner='View All Transactions' onClick={ () => goTo('ADMIN_TRANSACTIONS') } type={ txtTypes.regularDefault } size={ txtSizes.small } />
            </div>
         )}
      </div>
   );
};

ReportDashboardRecentTransactions.propTypes = {
   goTo: PropTypes.func,
   transactions: PropTypes.array,
};

export default ReportDashboardRecentTransactions;
