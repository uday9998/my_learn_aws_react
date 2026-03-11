/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import PageViewsView from 'views/pages/pageView';
import {
   getNewLandingStatistics, runReportsJob,
} from 'api';
import withLoading from 'utils/withLoading';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import moment from 'moment';
import { appSelector } from 'state/modules/common/selectors';
import { connect } from 'react-redux';
// import * as actions from 'state/modules/plans/actions';
import PropTypes from 'prop-types';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import socketIOClient from 'socket.io-client';

const LandingPagesViews = withLoading(Container);

const PageView = ({ app }) => {
   const [data, setData] = useState('procesed');
   const socket = useRef(null);

   const [getLandingStatisticsByDelimer, { loading: loadingUpdate }] = useSubmitForm(runReportsJob, {
      successMessage: '',
   });

   useEffect(() => {
      getNewLandingStatistics().then(() => {
         // bind socket
         const bindSocketEvents = () => {
            socket.current.on('connect', () => {
               socket.current.emit('subscribe');
               runReportsJob(['page-views', {}]);
            });

            socket.current.on('reports.page-views-data', (data) => {
               setData({ ...data });
            });
         };
         const socketUrl = `${process.env.REACT_APP_SOCKET_ENDPOINT}?uuid=${app.uuid}`;
         socket.current = socketIOClient(socketUrl);
         bindSocketEvents();
      });

      return () => {
         if (socket.current) {
            socket.current.disconnect();
         }
      };
   }, []);

   const [inputs, setInputs] = useState({
      delimeter: 'day',
      landing_id: 'all',
      to: '',
      from: '',
      searchFrom: '',
      searchTo: '',
   });

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
      };
      setInputs(filters);
      getLandingStatisticsByDelimer(['page-views', filters], (res) => {
         setData(res);
      });
   };

   const handleLandingStatisticChange = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      if (name !== 'searchFrom' && name !== 'searchTo') {
         getLandingStatisticsByDelimer(['page-views', filters], (res) => {
            setData(res);
         });
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
         <LandingPagesViews>
            <PageViewsView
               delimeter={ inputs.delimeter }
               handleLandingStatisticChange={ handleLandingStatisticChange }
               landingId={ inputs.landing_id }
               landingStatistic={ data }
               searchFrom={ inputs.searchFrom }
               searchTo={ inputs.searchTo }
               loadingUpdate={ loadingUpdate }
            />
         </LandingPagesViews>
      </>
   );
};

PageView.propTypes = {
   app: PropTypes.object,
};
const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};

export default connect(mapStateToProps)(PageView);
