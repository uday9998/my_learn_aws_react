import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Select from 'components/elements/SelectNew';
import LineChart from 'components/elements/charts/lineChart2';
import PropTypes from 'prop-types';
import LoaderMini from 'components/elements/loaderMini';

export const PageViewStatistic = ({ landingStatistic, handleLandingStatisticChange, delimeter }) => {
   return (
      <div className='page-view-status'>
         <div className='page-view-status-info'>
            <div className='page-view-status-header'>
               <div className='page-view-status-header-left'>
                  <Text 
                     inner='Page View'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                  />
                  <Text
                     inner={ landingStatistic.users_count_all || 0 }
                     size={ txtSizes.size_28 }
                     type={ txtTypes.medium }
                  />
               </div>
               <Select
                  iconName='ArrowSelectM'
                  options={ [{ label: 'Daily', value: 'day' },
                     { label: 'Weekly', value: 'week' },
                     { label: 'Monthly', value: 'month' }] }
                  placeholder='Daily'
                  value={ delimeter }
                  name='delimeter'
                  onChange={ (name, value) => handleLandingStatisticChange(name, value) }
               />
            </div>
            {landingStatistic.with_dates !== undefined ? (
               <LineChart datas={ landingStatistic.with_dates } />
            ) : (
               <div className='page-view-status-loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )}
            <div className='page-view-chart-circles'>
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

PageViewStatistic.propTypes = {
   landingStatistic: PropTypes.object,
   handleLandingStatisticChange: PropTypes.func,
   delimeter: PropTypes.string,
};
