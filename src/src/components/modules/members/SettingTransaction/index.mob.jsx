import React from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import MembersTable from 'components/elements/members/MembersTable';
import NoCreditSvg from 'assets/images/no-credit-card.svg';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Text from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const data1 = {
   head: [
      'Class', 'Status', 'Amount', 'Date',
   ],
   body: [
      {
         id: 1,
         course: 'Masterclass Code',
         status: 'Active',
         amount: '$50',
         date: '2019/04/03',
      },
      {
         id: 2,
         course: 'Facebook Ads That Convert',
         status: 'Active',
         amount: '$100',
         date: '2019/06/12',
      },
   ],
};

const data2 = {
   head: [
      'Class', 'Status',
   ],
   body: [
      {
         id: 1,
         course: 'Masterclass Code',
         status: 'Active',
      },
      {
         d: 2,
         course: 'Facebook Ads That Convert',
         status: 'Active',
      },
   ],
};

const SettingTransaction = ({ isOpen, empty }) => {
   return (
      <DynamicWrapper
         isOpen={ isOpen }
         title='Transactions'
         borderColor='#cddaf1'
      >
         <div className='mob-settingTransaction'>
            <div className='settingTransaction__transaction'>
               {empty ? (
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
                  data1.body.map(data => (
                     <div className='m-t-l m-b-exl transaction'>
                        <MembersTable headings={ data1.head } content={ [data] } />
                     </div>
                  ))
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
               { empty ? (
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
                     <MembersTable headings={ data2.head } content={ [data2.body[0]] } />
                     <div className='settingTransaction__subscription_btns'>
                        <div>
                           <BaseButton
                              theme={ btnTheme.lightBlue }
                              size={ btnSize.medium }
                              text='Refund'
                           />
                        </div>
                        <div className='m-t-s'>
                           <BaseButton
                              theme={ btnTheme.darkBlue }
                              size={ btnSize.medium }
                              text='Export CSV'
                           />
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </DynamicWrapper>
   );
};

SettingTransaction.propTypes = {
   isOpen: PropTypes.bool,
   empty: PropTypes.bool,
};

SettingTransaction.defaultProps = {
   isOpen: false,
   empty: false,
};

export default SettingTransaction;
