import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import { uniqueId } from 'lodash';
import moment from 'moment';
import LoaderMini from 'components/elements/loaderMini';

export const PageRoomViewTable = ({ data, uniqueUsersAllCount, usersCountAll }) => {
   return (
      <div className='communityPage-view-table'>
         <div className='communityPage-view-table-line'>
            <div className='communityPage-view-table-item-large communityPage-view-table-item-start'>
               <Text inner='Date' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='communityPage-view-table-item-large communityPage-view-table-item-start'>
               <Text inner='Room' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='communityPage-view-table-item'>
               <Text inner='Views' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
            <div className='communityPage-view-table-item'>
               <Text inner='Unique Views' type={ txtTypes.mediumLarge } size={ txtSizes.small } />
            </div>
         </div>
         {data !== undefined ? (
            <>
               <div className='communityPage-view-table-line' key={ uniqueId() }>
                  <div className='communityPage-view-table-item-large communityPage-view-table-item-start'>
                     <Text inner='Summary' type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
                  <div className='communityPage-view-table-item-large communityPage-view-table-item-start'>
                     <Text inner='-' type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
                  <div className='communityPage-view-table-item'>
                     <Text inner={ usersCountAll || 0 } type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
                  <div className='communityPage-view-table-item'>
                     <Text inner={ uniqueUsersAllCount || 0 } type={ txtTypes.regular } size={ txtSizes.small } />
                  </div>
               </div>
               {data.map((item) => {
                  if (item.all_view_count === 0 && item.unique_view_count === 0) {
                     return null;
                  }
                  return (
                     <div className='communityPage-view-table-line' key={ uniqueId() }>
                        <div className='communityPage-view-table-item-large communityPage-view-table-item-start'>
                           <Text inner={ moment(item.date).format('MMMM DD, YYYY') } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                        <div className='communityPage-view-table-item-large communityPage-view-table-item-start'>
                           <Text inner={ item.room?.name } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                        <div className='communityPage-view-table-item'>
                           <Text inner={ item.views } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                        <div className='communityPage-view-table-item'>

                           <Text inner={ item.unique_views } type={ txtTypes.regular } size={ txtSizes.small } />
                        </div>
                     </div>
                  );
               })}
            </>
         ) : (
            <div className='communityPage-view-table-loader'>
               <LoaderMini color='#131f1e' />
            </div>
         )}
      </div>
   );
};

PageRoomViewTable.propTypes = {
   data: PropTypes.array,
   usersCountAll: PropTypes.number,
   uniqueUsersAllCount: PropTypes.number,
};
