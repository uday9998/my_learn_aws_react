import React, { useContext } from 'react';
import './index.scss';
import { MainAffiliateContext } from 'containers/pages/admin/affiliate/Main';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import moment from 'moment';
import DropTriggle from 'components/elements/newDropTriggle';
import SimpleStatus from 'components/elements/SimpleStatus';

const AffiliateTransactions = () => {
   const {
      transactions, exportTransactions, markAsPaid,
   } = useContext(MainAffiliateContext);
   if (transactions.length === 0) {
      return (
         <div className='affiliate__transactions'>
            <div className='affiliate__transactions__top'>
               <Text
                  inner='Transactions'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='affiliate__transactions__top__filter'>
                  <Button
                     text='Export Transactions'
                     iconName='AffiliateExportUserM'
                     isIconLeft={ false }
                     onClick={ () => exportTransactions() }
                     isIconRight={ true }
                     theme={ themes.secondary }
                  />
               </div>
            </div>
            <Text
               inner='No Results.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978', textAlign: 'center' } }
            />
         </div>
      );
   }
   return (
      <div className='affiliate__transactions'>
         <div className='affiliate__transactions__top'>
            <Text
               inner='Transactions'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <div className='affiliate__transactions__top__filter'>
               <Button
                  text='Export Transactions'
                  iconName='AffiliateExportUserM'
                  isIconLeft={ false }
                  onClick={ () => exportTransactions() }
                  isIconRight={ true }
                  theme={ themes.secondary }
               />
            </div>
         </div>
         <div className='affiliate__transactions__table'>
            <table>
               <thead>
                  <th>
                     <Text
                        inner='Name'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th>
                     <Text
                        inner='Email'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th>
                     <Text
                        inner='Paypal Email'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th>
                     <Text
                        inner='Transaction Date'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th style={ { textAlign: 'end' } }>
                     <Text
                        inner='Your Income'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                        style={ { textAlign: 'end' } }
                     />
                  </th>
                  <th style={ { textAlign: 'end' } }>
                     <Text
                        inner='Affiliate Income'
                        type={ types.mediumLarge }
                        size={ sizes.small }
                     />
                  </th>
                  <th />
               </thead>
               <tbody>
                  {transactions.map((transaction) => {
                     const user = transaction.affiliate.users[0];

                     return (
                        <tr
                           key={ transaction.id }
                           role='presentation'
                           onClick={ () => {} }
                        >
                           <td>
                              <div className='affiliate__transactions__table__td'>
                                 <img src={ user.picture_full_src } alt='' width='24px' height='24px' />
                                 <Text
                                    inner={ user.name }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                 />
                              </div>
                           </td>
                           <td>
                              <div className='email__block'>
                                 <TextWithTooltip
                                    inner={ user.email }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                    tooltipWithoutIcon={ user.email }
                                    nameLength={ 17 }
                                 />
                              </div>
                           </td>
                           <td>
                              <div className='email__block'>
                                 <TextWithTooltip
                                    inner={ user.paypal_email || '' }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                    tooltipWithoutIcon={ user.paypal_email || '' }
                                    nameLength={ 17 }
                                 />
                              </div>
                           </td>
                           <td>
                              {transaction.transaction_date ? (
                                 <div>
                                    <Text
                                       inner={ `${ moment(transaction.transaction_date).format('MMMM D, YYYY') }` }
                                       type={ types.regularDefault }
                                       size={ sizes.small }
                                       style={ { textDecoration: 'underline' } }
                                    />
                                 </div>
                              ) : (
                                 <div>
                                    <SimpleStatus color='grey' text='Pending' />
                                 </div>
                              )}

                           </td>
                           <td style={ { textAlign: 'end' } }>
                              <Text
                                 inner={ `$${ transaction.offer.your_income }` }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                                 style={ { textDecoration: 'underline', textAlign: 'end' } }
                              />
                           </td>
                           <td>
                              <div style={ { textAlign: 'end' } }>
                                 <Text
                                    inner={ `$${ transaction.offer.income }` }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                 />
                              </div>
                           </td>
                           <td>
                              <div className='affiliate__transactions__table__actions'>
                                 {!transaction.transaction_date && (
                                    <DropTriggle
                                       activeStyles={ {
                                          background: '#E8F2F1',
                                          border: '1px solid #36796F',
                                          boxShadow: '0px 0px 4px #54938B',
                                          borderRadius: '8px',
                                       } }
                                       options={ [
                                          {
                                             trash: false, iconName: 'AffiliateMoneyM', name: 'Mark as paid', onClick: () => markAsPaid(transaction.id),
                                          },
                                       ] }
                                    />
                                 )}
                              </div>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

AffiliateTransactions.propTypes = {

};

export default AffiliateTransactions;
