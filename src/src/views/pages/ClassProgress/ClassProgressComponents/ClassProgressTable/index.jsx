import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import ProgressChart from 'components/modules/progressChart';
import moment from 'moment';

const ClassProgressTable = ({ data, goTo }) => {
   return (
      <div className='class__progress__table__container scroll'>
         <table className='class__progress__table'>
            <thead>
               <tr>
                  <th>
                     <Text inner='Member Name' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Product Progress' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th className='t-right'>
                     <Text inner='Logins' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Start Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
                  <th>
                     <Text inner='Last Activity' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
                  </th>
               </tr>
            </thead>
            <tbody>
               {data.map((user) => {
                  return (
                     <tr key={ user.member_id }>
                        <td className='table-col-1'>
                           <Text
                              inner={ user.member_name }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                              onClick={ () => goTo(user.member_id) }
                           />
                        </td>
                        <td className='table-col-2'>
                           <Text
                              inner={ `${ parseInt(user.progress_percentage, 10) }%` }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                           <ProgressChart type='progress' prsent={ parseInt(user.progress_percentage, 10) } />
                        </td>
                        <td className='table-col-3 t-right'>
                           <Text
                              inner={ user.logins_count }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </td>
                        <td>
                           <Text
                              inner={ moment(user.created_at, 'DD/MM/YY').format('MMMM DD, YYYY') }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </td>
                        <td>
                           <Text
                              inner={ moment(user.last_activty, 'DD/MM/YY').format('MMMM DD, YYYY') }
                              type={ txtTypes.regularDefault }
                              size={ txtSizes.small }
                           />
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

ClassProgressTable.propTypes = {
   data: PropTypes.array,
   goTo: PropTypes.func,
};

export default ClassProgressTable;
