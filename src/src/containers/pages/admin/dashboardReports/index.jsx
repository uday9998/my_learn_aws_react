/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import withLoading from 'utils/withLoading';
import DashboardReport from 'views/pages/ReportDashboard';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
   getCoursesStatistics, recentTransactions, recentActivity, runReportsJob,
} from 'api';
import moment from 'moment';
import { appSelector, authUserSelector } from 'state/modules/common/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import socketIOClient from 'socket.io-client';

const DashboardReportLoading = withLoading(DashboardReport);

const ReportsContainer = ({
   goTo, auth, isHaveTracking, app,
}) => {
   const [reports, setReports] = useState('procesed');
   const socket = useRef(null);

   useEffect(() => {
      getCoursesStatistics().then(res => {
         if (res.data === 'procesed') {
            // bind socket
            const bindSocketEvents = () => {
               socket.current.on('connect', () => {
                  socket.current.emit('subscribe');
                  runReportsJob(['dashboard', { delimeter: 'week' }]);
               });

               socket.current.on('reports.dashboard-data', (data) => {
                  setReports({ ...data });
               });
            };
            const socketUrl = `${process.env.REACT_APP_SOCKET_ENDPOINT}?uuid=${app.uuid}`;
            socket.current = socketIOClient(socketUrl);
            bindSocketEvents();
         }
      });
      return () => {
         if (socket.current) {
            socket.current.disconnect();
         }
      };
   }, []);

   const {
      data: transactions, loading: loadingTransactions,
   } = useApiQuery(recentTransactions);

   const {
      data: activity, loading: loadingRecentActivity, setData: setActivity,
   } = useApiQuery(recentActivity);


   const [getCoursesStatisticsFunc, { loading: loadingReport }] = useSubmitForm(runReportsJob, {
      successMessage: '',
   });

   const [recentActivityFunc, { loading: loadingActivityDelimeter }] = useSubmitForm(recentActivity, {
      successMessage: '',
   });

   const [delimeter, setDelimeter] = useState(0);
   const [inputs, setInputs] = useState({
      delimeter: 'week',
      to: '',
      from: '',
      searchFrom: '',
      searchTo: '',
      date_type: 'custom',
   });

   const changeDelimeter = (name, value) => {
      setDelimeter(value);
      recentActivityFunc({ delimeter: value }, (res) => {
         setActivity(res);
      });
   };

   const handleSearch = (from, to) => {
      let date_from = '';
      let date_to = '';
      if (to) {
         date_to = moment(to).format('YYYY-MM-DD');
      }

      if (from) {
         date_from = moment(from).format('YYYY-MM-DD');
      }
      const filters = {
         ...inputs,
         to: date_to,
         from: date_from,
         searchFrom: from,
         searchTo: to,
         date_type: 'custom',
      };
      setInputs(filters);
      getCoursesStatisticsFunc(['dashboard', filters]);
   };

   const handleFilterChange = (key, value) => {
      let filters = {};
      if (key === 'search') {
         filters = {
            ...inputs,
            searchTo: new Date(),
            searchFrom: value,
         };
         setInputs(filters);
         handleSearch(value, new Date());
      } else {
         filters = {
            ...inputs,
            [key]: value,
         };
         setInputs(filters);
         if (key === 'searchTo' && value) {
            handleSearch(inputs.searchFrom, value);
         }
      }
   };

   const handleFilterSave = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      if (name !== 'searchFrom' && name !== 'searchTo') {
         getCoursesStatisticsFunc(['dashboard', filters]);
      } else if (name === 'searchTo' && value) {
         handleSearch(inputs.searchFrom, value);
      }
   };

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <DashboardReportLoading
            isLoading={ loadingTransactions || loadingRecentActivity }
            reports={ reports }
            isHaveTracking={ isHaveTracking }
            inputs={ inputs }
            handleFilterSave={ handleFilterSave }
            handleFilterChange={ handleFilterChange }
            loadingReport={ loadingReport }
            goTo={ goTo }
            auth={ auth }
            transactions={ transactions }
            activity={ activity }
            delimeter={ delimeter }
            changeDelimeter={ changeDelimeter }
            loadingActivityDelimeter={ loadingActivityDelimeter }
         />
      </>
   );
};

ReportsContainer.propTypes = {
   goTo: PropTypes.func,
   isHaveTracking: PropTypes.bool,
   auth: PropTypes.object,
   app: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      isHaveTracking: !!Number.parseFloat(state.common.metas.email_tracking),
      auth: authUserSelector(state),
      app: appSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location, hash) => {
         dispatch(push({
            pathname: Router.route(location).getMask(),
            hash,
         }));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);
