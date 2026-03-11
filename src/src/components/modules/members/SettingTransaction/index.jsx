import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import MembersTable from 'components/elements/members/MembersTable';
import NoCreditSvg from 'assets/images/no-credit-card.svg';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Text from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const transactionHeaders = [
   'Class', 'Status', 'Amount', 'Date',
];

const subscriptionHeaders = [
   'Class', 'Status',
];

const SettingTransaction = ({ memberTransactions }) => {
   const { subscriptions, transactions } = memberTransactions;

   return (
      <DynamicWrapper
         isOpen={ false }
         title='Transactions'
         borderColor='#cddaf1'
      >
         <div className='settingTransaction'>
            <div className='settingTransaction__transaction'>
               {transactions.length === 0 ? (
                  <div className='settingTransaction__transaction_empty'>
                     <img src={ NoCreditSvg } alt='noCredit' />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No Transactions'
                     />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No data available in table'
                        style={ { fontSize: '12px' } }
                     />
                  </div>
               ) : (
                  <div className='m-t-l m-b-exl transaction'>
                     <MembersTable
                        headings={ transactionHeaders }
                        content={ transactions }
                     />
                  </div>
               )}
            </div>
            <div className='settingTransaction__subscription'>
               <div className='subscriptionTitle'>
                  <Text
                     size='medium'
                     type='bold'
                     inner='Subscription'
                  />
               </div>
               { subscriptions.length === 0 ? (
                  <div className='settingTransaction__subscription_empty'>
                     <img src={ NoSearchSvg } alt='noCredit' />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No Subscriptions'
                     />
                     <Text
                        size='small'
                        type='normal'
                        color='#8a94a2'
                        inner='No data available in table'
                        style={ { fontSize: '12px' } }
                     />
                  </div>
               ) : (
                  <div className='m-t-l m-b-l subscription'>
                     <MembersTable
                        headings={ subscriptionHeaders }
                        content={ subscriptions }
                     />
                     {/* <div className='settingTransaction__subscription_btns'>
                        <div className='m-l-l'>
                           <BaseButton
                              theme={ btnTheme.darkBlue }
                              size={ btnSize.medium }
                              text='Export CSV'
                           />
                        </div>
                     </div> */}
                  </div>
               )}
            </div>
         </div>
      </DynamicWrapper>
   );
};

SettingTransaction.propTypes = {
   memberTransactions: PropTypes.object,
};

export default SettingTransaction;
