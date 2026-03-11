import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPES as txtTypes } from 'components/elements/TextNew';
import { v4 as uuidv4 } from 'uuid';

const AccountInvoicesPage = ({ plans }) => {
   const { subscriptions: invoices } = plans;

   return (
      <div className='account__invoices__page'>
         {invoices && invoices.length ? (
            <div className='account__invoices__page__data'>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <Text
                              inner='Date'
                              type={ txtTypes.mediumLarge }
                              size={ txtSizes.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Description'
                              type={ txtTypes.mediumLarge }
                              size={ txtSizes.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Receipt'
                              type={ txtTypes.mediumLarge }
                              size={ txtSizes.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Total Price'
                              type={ txtTypes.mediumLarge }
                              size={ txtSizes.small }
                           />
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {invoices.map((invoice) => {
                        return (
                           <tr className='account__tr' key={ uuidv4() }>
                              <td>
                                 <Text
                                    inner={ invoice.amount_date.split('/').reverse().join('/') }
                                    type={ txtTypes.regularDefault }
                                    size={ txtSizes.small }
                                 />
                              </td>
                              <td>
                                 <Text
                                    inner={ invoice.plan }
                                    type={ txtTypes.regularDefault }
                                    size={ txtSizes.small }
                                 />
                              </td>
                              <td>
                                 <Text
                                    inner={ invoice.status.replace('_', ' ') }
                                    type={ txtTypes.regularDefault }
                                    size={ txtSizes.small }
                                 />
                              </td>
                              <td>
                                 <div className='invoice_url'>
                                    <Text
                                       inner={ `$${ invoice.amount }.00` }
                                       type={ txtTypes.regularDefault }
                                       size={ txtSizes.small }
                                    />
                                    {!!invoice.invoice_url && (
                                       <a href={ invoice.invoice_url } download title='Download'>
                                          <Icon name='Bulk' />
                                       </a>
                                    )}
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className='account__invoices__page__empty'>
               <IconNew
                  name='AccountInvoicesL'
               />
               <Text
                  inner='No information yet. Here you will see all your invoices.'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: '#444C4B', marginTop: '16px' } }
               />
               {/* <Text
                  inner='see all your invoices'
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: '#444C4B' } }
               /> */}
            </div>
         )}
      </div>
   );
};

AccountInvoicesPage.propTypes = {
   plans: PropTypes.object,
};

export default AccountInvoicesPage;
