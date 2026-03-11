import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import { uniqueId } from 'lodash';
import moment from 'moment';
import LoaderMini from 'components/elements/loaderMini';

export const PageViewTable = ({ data, uniqueUsersAllCount, usersCountAll }) => {
   return (
      <div className='page-view-table'>
         <div className='page-view-table-line'>
            <div className='page-view-table-item-large page-view-table-item-start'>
               <Text inner='Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='page-view-table-item-large'>
               <Text inner='Views' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='page-view-table-item'>
               <Text inner='Unique Views' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
         </div>
         {data !== undefined ? (
            <>
               <div className='page-view-table-line' key={ uniqueId() }>
                  <div className='page-view-table-item-large page-view-table-item-start'>
                     <Text inner='Summary' type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
                  <div className='page-view-table-item-large'>
                     <Text inner={ usersCountAll } type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
                  <div className='page-view-table-item'>

                     <Text inner={ uniqueUsersAllCount || 0 } type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
               </div>
               {data.map((item) => {
                  if (item.all_view_count === 0 && item.unique_view_count === 0) {
                     return null;
                  }
                  return (
                     <div className='page-view-table-line' key={ uniqueId() }>
                        <div className='page-view-table-item-large page-view-table-item-start'>
                           <Text inner={ moment(item.date[1]).format('MMMM DD, YYYY') } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                        <div className='page-view-table-item-large'>
                           <Text inner={ item.all_view_count } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                        <div className='page-view-table-item'>

                           <Text inner={ item.unique_view_count } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                     </div>
                  );
               })}
            </>
         ) : (
            <div className='page-view-table-loader'>
               <LoaderMini color='#131f1e' />
            </div>
         )}
      </div>
   );
};

PageViewTable.propTypes = {
   data: PropTypes.array,
   usersCountAll: PropTypes.number,
   uniqueUsersAllCount: PropTypes.number,
};
