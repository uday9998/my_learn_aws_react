import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReportsContainer from 'views/newLayout/reports';
import withLoading from 'utils/withLoading';
import ReportsHeader from 'components/modules/reportsHeader';
import EmailTrackingFilter from './EmailTrackingComponents/EmailTrackingFilter';
import EmailTrackingData from './EmailTrackingComponents/EmailTrackingData';
import EmailTrackingTable from './EmailTrackingComponents/EmailTable';

const EmailTrackingContainerLoading = withLoading(ReportsContainer);

const EmailTrackingView = ({
   filterData, setFilterData, data, isLoadingEmail, exportCSV,
}) => {
   const [forData, setForData] = useState([]);
   useEffect(() => {
      if (data && data.msg_data) {
         let items = [];
         data.msg_data.forEach((item) => {
            items = [...items, ...(Object.values(item))];
         });
         setForData(items);
      }
   }, [data]);
   return (
      <div className='email__tracking'>
         <EmailTrackingFilter data={ data } filterData={ filterData } setFilterData={ setFilterData } />
         <EmailTrackingContainerLoading isLoading={ isLoadingEmail }>
            <ReportsHeader
               title='Emails Overview'
               printList={ () => {} }
               exportCSV={ () => exportCSV() }
            />
            <div className='email__tracking__content'>
               <EmailTrackingData numbers={ data } />
               {!!forData && (
                  <EmailTrackingTable tableData={ forData } isLoading={ data.msg_data === undefined } />
               )}
            </div>
         </EmailTrackingContainerLoading>
      </div>
   );
};

EmailTrackingView.propTypes = {
   data: PropTypes.object,
   filterData: PropTypes.object,
   exportCSV: PropTypes.func,
   setFilterData: PropTypes.func,
   isLoadingEmail: PropTypes.bool,
};

export default EmailTrackingView;
