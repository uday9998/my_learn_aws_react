/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import ReportsContainer from 'views/newLayout/reports';
import ReportsHeader from 'components/modules/reportsHeader';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import LoaderMini from 'components/elements/loaderMini';
import ReportDashboardRecentTransactions from './ReportDashboardComponents/ReportDashboardRecentTransactions';
import ReportDashboardRecentActivity from './ReportDashboardComponents/ReportDashboardRecentActivity';
import ReportDashboardStatic from './ReportDashboardComponents/ReportDashboardStatic';
import ReportDashboardMetric from './ReportDashboardComponents/ReportDashboardMetric';
import ReportDashboardOther from './ReportDashboardComponents/ReportDashboardOthers';


const DashboardReport = ({
   goTo, reports, handleFilterChange, auth, handleFilterSave, courseValue, inputs, loadingReport, transactions,
   activity, delimeter, changeDelimeter, loadingActivityDelimeter, isHaveTracking,
}) => {
   const coursesOption = [
      { label: 'All Classes', value: '' },
   ];
   return (
      <div className='report-dashboard'>
         <ReportsContainer>
            <ReportsHeader title='Dashboard' />
            <div className='report-dashboard-content'>
               <div className='report-dashboard-left'>
                  <ReportDashboardStatic reports={ reports } />
                  <ReportDashboardMetric
                     loadingReport={ loadingReport }
                     reports={ reports }
                     handleFilterChange={ handleFilterChange }
                     authCreatedAt={ auth.created_at }
                     handleFilterSave={ handleFilterSave }
                     coursesOption={ coursesOption }
                     courseValue={ courseValue }
                     inputs={ inputs }
                  />
                  <ReportDashboardOther goTo={ goTo } isHaveTracking={ isHaveTracking } />
               </div>
               <div className='report-dashboard-right'>
                  <ReportDashboardRecentActivity
                     activity={ activity }
                     delimeter={ delimeter }
                     changeDelimeter={ changeDelimeter }
                     loadingActivityDelimeter={ loadingActivityDelimeter }
                  />
                  <ReportDashboardRecentTransactions goTo={ goTo } transactions={ transactions } />
               </div>
            </div>
         </ReportsContainer>
      </div>
   );
};

DashboardReport.propTypes = {
   goTo: PropTypes.func,
   handleFilterChange: PropTypes.func,
   handleFilterSave: PropTypes.func,
   isHaveTracking: PropTypes.bool,
   reports: PropTypes.object,
   auth: PropTypes.object,
   courseValue: PropTypes.any,
   loadingActivityDelimeter: PropTypes.bool,
};

export default DashboardReport;
