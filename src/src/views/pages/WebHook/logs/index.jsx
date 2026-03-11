import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import './index.scss';
import { v4 as uuidv4 } from 'uuid';
import IconNew from 'components/elements/iconsSize';


const WebHookLogs = ({ data, goBack }) => {
   return (
      <div className='logs'>
         <div className='logs__header'>
            <div className='logs__header__icon' role='presentation' onClick={ () => goBack() }>
               <IconNew name='LeftArrowL' />
            </div>
            <Text
               inner='All Logs'
               type={ textType.regularLarge }
               size={ textSize.medium }
            />
         </div>
         {!data.length ? (
            <Text
               inner='No logs yet'
               type={ textType.regularDefault }
               size={ textSize.small }
               style={ { color: '#727978', textAlign: 'center' } }
            />
         ) : (
            <div className='logs__table'>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <Text
                              inner='Attempted At'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Type'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Status'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((item) => {
                        return (
                           <tr key={ uuidv4() }>
                              <td>
                                 <Text
                                    inner={ item.created_at }
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                 />
                              </td>
                              <td>
                                 <Text
                                    inner={ item.type }
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                 />
                              </td>
                              <td>
                                 <Text
                                    inner={ item.status_code }
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                 />
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

WebHookLogs.propTypes = {
   data: PropTypes.array,
   goBack: PropTypes.func,
};

export default WebHookLogs;
