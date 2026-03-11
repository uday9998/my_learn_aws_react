import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSize } from 'components/elements/TextNew';
import { v4 } from 'uuid';
import SitesItem from '../SitesItem';
import './index.scss';

const SitesTable = ({
   data, onEdit, onDelete, onView,
}) => {
   return (
      <table className='sites-table'>
         <tr>
            <th className='site-col-1'>
               <Text
                  inner='Portal Name'
                  type={ txtTypes.mediumLarge }
                  size={ txtSize.small }
               />
            </th>
            <th className='site-col-2'>
               <Text
                  inner='Subdomain'
                  type={ txtTypes.mediumLarge }
                  size={ txtSize.small }
               />
            </th>
            <th className='site-col-3'>
               <Text
                  inner='URL link'
                  type={ txtTypes.mediumLarge }
                  size={ txtSize.small }
               />
            </th>
         </tr>
         {data.length ? (
            <tbody>
               {data.map((site) => {
                  return (
                     <SitesItem
                        onDelete={ onDelete }
                        onEdit={ onEdit }
                        onView={ onView }
                        site={ site }
                        key={ v4() }
                     />
                  );
               })}
            </tbody>
         ) : ''}
      </table>
   );
};

SitesTable.propTypes = {
   data: PropTypes.array,
   onEdit: PropTypes.func,
   onDelete: PropTypes.func,
   onView: PropTypes.func,
};

export default SitesTable;
