import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import HorizontalBarChart from 'components/elements/charts/horizontalBarChart';

export const PageViewChart = ({ data }) => {
   const filteredData = useRef(undefined);
   useEffect(() => {
      if (data !== undefined) {
         filteredData.current = data.filter((landing) => landing.all_view_count !== 0);
      }
   }, [data]);
   if (data === undefined || data.length === 0) {
      return null;
   }
   return (
      <div className='page-view-chart'>
         <Text
            inner='View By Landing Page'
            type={ txtTypes.regularDefault }
            size={ txtSizes.medium }
         />
         <Text
            inner='No Views On Landing Page'
            type={ txtTypes.regularDefault }
            size={ txtSizes.medium }
            style={ {
               textAlign: 'center',
               color: '#ADADAD',
            } }
         />
         <div className='page-view-chart-content'>
            <div className='page-view-chart-info'>
               {filteredData.current && filteredData.current.length > 0 && (
                  <HorizontalBarChart data={ filteredData.current } />
               )}
            </div>
         </div>
      </div>
   );
};

PageViewChart.propTypes = {
   data: PropTypes.array,
};
