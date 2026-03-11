import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import { uniqueId } from 'lodash';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import LoaderMini from 'components/elements/loaderMini';
import moment from 'moment';

const EmailTrackingTable = ({ tableData, isLoading }) => {
   const ths = useRef(['Email Name', 'Modified Date', 'Sends', 'Opened', 'Clicked', 'Bounce', 'Unsubscribed', 'Status']);
   return (
      <div
         className='email__tracking__table'
         style={ { minHeight: isLoading ? '200px' : 'min-content' } }
      >
         <table>
            <thead>
               <tr>
                  {ths.current.map((ther) => {
                     return (
                        <th key={ uniqueId() }>
                           <Text
                              inner={ ther }
                              type={ TextType.mediumSmall }
                              size={ TextSize.small }
                           />
                        </th>
                     );
                  })}
               </tr>
            </thead>
            {isLoading ? (
               <LoaderMini color='#131F1E' />
            ) : (
               <tbody>
                  {tableData.map((item) => {
                     return (
                        <tr key={ uniqueId() }>
                           <td>
                              <div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
                                 <IconNew name='EmailTrackingMailM' />
                                 <Text
                                    inner={ item.name }
                                    type={ TextType.regularDefault }
                                    className='email-col-large'
                                    size={ TextSize.small }
                                 />
                              </div>
                           </td>
                           <td>
                              <Text
                                 inner={ moment(item.send_date).format('MMMM DD, YYYY') }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </td>
                           <td>
                              <Text
                                 inner={ item.sent }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </td>
                           <td>
                              <Text
                                 inner={ item.open ? `${ (item.open * 100 / item.sent) } %` : '0 %' }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </td>
                           <td>
                              <Text
                                 inner={ item.click || 0 }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </td>
                           <td>
                              <Text
                                 inner={ item.bounce || 0 }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </td>
                           <td>
                              <Text
                                 inner={ `${ ((item.subscribe / item.sent) * 100) || 0 }%` }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           </td>
                           {/*  <td>
               <Text
                  inner={ item.sales }
                  type={ TextType.regularDefault }
                  size={ TextSize.small }
               />
            </td> */}
                           <td>
                              <div className='email__sent'>
                                 <IconNew name='EmailTrackingEyeM' />
                                 <Text
                                    inner='Sent'
                                    type={ TextType.regular148 }
                                    size={ TextSize.xsmall }
                                    style={ { color: '#24554E' } }
                                 />
                              </div>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            )}

         </table>
      </div>
   );
};

EmailTrackingTable.propTypes = {
   isLoading: PropTypes.func,
   tableData: PropTypes.array,
};

export default EmailTrackingTable;
