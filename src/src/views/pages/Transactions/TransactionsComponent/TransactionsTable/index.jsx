import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import moment from 'moment';
import { uniqueId } from 'lodash';
import Icon from 'components/elements/Icon';
import getCurrencySumbol from 'utils/getCurrencySymbol';
import chartEmpty from 'assets/images/report/chart_empty.svg';
import { parseFloatNewWithoutPrice } from 'utils/numberParseFloat';

const TransactionsTable = ({ data, goTo }) => {
   function typeFunc(transactionType) {
      if (transactionType) {
         return 'Subscription';
      }
      return 'One Time';
   }
   const TransactionPaymentIcon = (payment) => {
      switch (payment) {
         case 'paypal':
            return 'TransactionPaypal';
         case 'stripe':
            return 'TransactionStripe';
         default:
            return 'TransactionBraintree';
      }
   };

   return (
      <div className='transactions-content scroll'>
         <table className='transactions-content-table'>
            <thead>
               <tr className='transactions-content-table-line'>
                  <th>
                     <Text inner='Name' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Email' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Offer' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Status' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Type' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Amount' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
               </tr>
            </thead>
            <tbody>
               {data && !data.length && (
                  <tr>
                     <td colSpan='7'>
                        <div className='transactions-content-empty'>
                           <Text
                              inner='No Transactions Yet'
                              type={ txtTypes.mediumLargeGrey }
                              size={ txtSizes.new_size_28 }
                           />
                           <img src={ chartEmpty } alt='chart' />
                        </div>
                     </td>

                  </tr>
               )}
               {data.map((transaction) => {
                  return (
                     <tr key={ uniqueId() }>
                        <td className='table-col-3 table-image-col'>
                           <img src={ transaction.user.picture_full_src } alt='' className='table-image' />
                           <Text
                              inner={ transaction.user.name }
                              className='table-name table-decorate-name'
                              type={ txtTypes.regular }
                              size={ txtSizes.small }
                              onClick={ () => goTo(transaction.user.id) }
                           />
                        </td>
                        <td className='table-col-3'>
                           <Text inner={ transaction.user.email } className='table-name' type={ txtTypes.regular } size={ txtSizes.small } />
                        </td>
                        <td className='table-col-2'>
                           <Text inner={ moment(transaction.created_at).format('MMMM DD, YYYY') } type={ txtTypes.regular } size={ txtSizes.small } />
                        </td>
                        <td className='table-col-3'>
                           <Text inner={ transaction.plan ? transaction.plan.name : '' } className='table-name' type={ txtTypes.regular } size={ txtSizes.small } />
                        </td>
                        <td className='table-col-2'>
                           <Text inner={ transaction.status } className={ `table-tipe table-tipe-${ transaction.status }` } type={ txtTypes.regular } size={ txtSizes.small } />
                        </td>
                        <td className='table-col-3'>
                           {!transaction.amount
                              ? (
                                 <Text inner='Free' type={ txtTypes.regular } className='table-tipe table-tipe-free' size={ txtSizes.small } />
                              ) : (
                                 <Text inner={ typeFunc(transaction.subscription_id) } className={ `table-tipe table-tipe-${ typeFunc(transaction.subscription_id).split(' ').join('') }` } type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                              )}
                        </td>
                        <td className='table-col-1'>
                           <Icon name={ TransactionPaymentIcon(transaction.type) } />
                           <Text inner={ `${ getCurrencySumbol(transaction.currency) }${ parseFloatNewWithoutPrice(transaction.amount.toFixed(2) || 0) }` } type={ txtTypes.regular } size={ txtSizes.small } />
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>

      </div>
   );
};

TransactionsTable.propTypes = {
   data: PropTypes.array,
   goTo: PropTypes.func,
};

export default TransactionsTable;
