import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import ReportsTimeData from 'components/modules/reports/ReportsTimeData';
import withLoading from 'utils/withLoading';

import RefoundsChart from './RefoundsComponents/RefoundsChart';

const RefoundsLoading = withLoading('div');


const RefoundsView = ({
   refunds, loading, delimeter, handleRefoundMetrics,
   handleSearch, searchFrom, searchTo,
}) => {
   return (
      <div className='refouds'>
         <ReportsContainer>
            <ReportsHeader
               title='Refunds'
            />
            <RefoundsLoading isLoading={ loading }>
               <ReportsTimeData data={ refunds } />
               <RefoundsChart
                  data={ refunds }
                  handleRefoundMetrics={ handleRefoundMetrics }
                  delimeter={ delimeter }
                  handleSearch={ handleSearch }
                  searchFrom={ searchFrom }
                  searchTo={ searchTo }
               />
            </RefoundsLoading>
         </ReportsContainer>
      </div>
   );
};


RefoundsView.propTypes = {
   refunds: PropTypes.any,
   loading: PropTypes.bool,
   delimeter: PropTypes.string,
   handleRefoundMetrics: PropTypes.func,
   handleSearch: PropTypes.func,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
};

export default RefoundsView;
