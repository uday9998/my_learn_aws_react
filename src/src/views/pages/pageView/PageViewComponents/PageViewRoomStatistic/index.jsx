import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import LineChart from 'components/elements/charts/lineChart2';
import PropTypes from 'prop-types';
import LoaderMini from 'components/elements/loaderMini';

export const PageViewRoomStatistic = ({ landingStatistic }) => {
   return (
      <div className='communityPage-view-status'>
         <div className='communityPage-view-status-info'>
            <div className='communityPage-view-status-header'>
               <div className='communityPage-view-status-header-left'>
                  <Text 
                     inner='Community View'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                  />
               </div>
            </div>
            {landingStatistic !== undefined ? (
               <LineChart datas={ landingStatistic } isCommunity={ true } />
            ) : (
               <div className='communityPage-view-status-loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
            <div className='communityPage-view-chart-circles'>
               <div>
                  <div className='green_circle' />
                  <Text
                     inner='Views'
                     size={ txtSizes.small }
                     type={ txtTypes.regular }
                  />
               </div>
               <div>
                  <div className='purple_circle' />
                  <Text
                     inner='Unique Views'
                     size={ txtSizes.small }
                     type={ txtTypes.regular }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

PageViewRoomStatistic.propTypes = {
   landingStatistic: PropTypes.array,
};
