import React, { useContext } from 'react';
import './index.scss';
import { MainAffiliateContext } from 'containers/pages/admin/affiliate/Main';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import moment from 'moment';
import IconButton from 'components/elements/buttons/IconButton';

const AffiliateUsers = () => {
   const {
      users, editUser, inviteUsers, exportUsers,
   } = useContext(MainAffiliateContext);
   return (
      <div className='affiliate__users'>
         <div className='affiliate__users__top'>
            <Text
               inner='Users'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <div className='affiliate__users__top__filter'>
               {/* <Button
                  text='Invite Users'
                  theme={ themes.secondary }
                  isIconLeft={ false }
                  isIconRight={ true }
                  onClick={ () => inviteUsers() }
                  iconName='AffiliatePlusM'
               /> */}
               <Button
                  text='Export'
                  iconName='AffiliateExportUserM'
                  isIconLeft={ false }
                  onClick={ () => exportUsers() }
                  isIconRight={ true }
                  theme={ themes.secondary }
               />
            </div>
         </div>
         <div className='affiliate__users__table'>
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
                        inner='Join Date'
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
                  {users.map((e) => {
                     const user = e.users[0];
                     return (
                        <tr
                           key={ e.id }
                           role='presentation'
                           onClick={ () => editUser(e.id) }
                        >
                           <td>
                              <div className='affiliate__users__table__td'>
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
                                    inner={ e.paypal_email || '' }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                    tooltipWithoutIcon={ e.paypal_email || '' }
                                    nameLength={ 17 }
                                 />
                              </div>
                           </td>
                           <td>
                              <div>
                                 <Text
                                    inner={ `${ moment(e.created_at).format('MMMM DD, YYYY') }` }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                 />
                              </div>
                           </td>
                           <td style={ { textAlign: 'end' } }>
                              <Text
                                 inner={ `$${ e.your_income }` }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                                 style={ { textDecoration: 'underline', textAlign: 'end' } }
                              />
                           </td>
                           <td>
                              <div style={ { textAlign: 'end' } }>
                                 <Text
                                    inner={ `$${ e.income }` }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { textDecoration: 'underline' } }
                                 />
                              </div>
                           </td>
                           <td>
                              <div className='affiliate__users__table__actions'>
                                 <IconButton
                                    name='AffiliateEditM'
                                    onClick={ () => {} }
                                 />
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

AffiliateUsers.propTypes = {

};

export default AffiliateUsers;
