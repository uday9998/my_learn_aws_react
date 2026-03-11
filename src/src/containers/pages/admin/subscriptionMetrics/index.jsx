/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import SubscriptionMetricsView from 'views/pages/SubscriptionMetrics';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getOnlyOffers, getSubscriptionMetrics, runReportsJob,
} from 'api';
import withLoading from 'utils/withLoading';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import Container from 'views/layout/AdminContainer';
import moment from 'moment';
import { appSelector } from 'state/modules/common/selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import socketIOClient from 'socket.io-client';

const SubscriptionMetricsViewLoading = withLoading(SubscriptionMetricsView);

const SubscriptionMetrics = ({ app }) => {
   const {
      data: courses, loading: loadingCourses,
   } = useApiQuery(getOnlyOffers);
   const [data, setData] = useState('procesed');
   const socket = useRef(null);

   useEffect(() => {
      getSubscriptionMetrics().then(() => {
         // bind socket
         const bindSocketEvents = () => {
            socket.current.on('connect', () => {
               socket.current.emit('subscribe');
               runReportsJob(['subscription-metrics', { delimeter: 'daily' }]);
            });

            socket.current.on('reports.subscription-data', (data) => {
               setData({ ...data });
            });
         };
         const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=${ app.uuid }`;
         socket.current = socketIOClient(socketUrl);
         bindSocketEvents();
      });

      return () => {
         if (socket.current) {
            socket.current.disconnect();
         }
      };
   }, []);

   const [getSubscriptionMetricsWithFilter, { loading: loadingUpdate }] = useSubmitForm(runReportsJob, {
      successMessage: '',
   });

   const [inputs, setInputs] = useState({
      offer_id: 'all_courses',
      delimeter: 'daily',
      to: '',
      from: '',
      searchFrom: '',
      searchTo: '',
   });


   const [isMrr, setIsMrrr] = useState(true);

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
      getSubscriptionMetricsWithFilter(['subscription-metrics', filters]);
   };

   const handleSubscriptionMetrics = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      if (name !== 'searchFrom' && name !== 'searchTo') {
         getSubscriptionMetricsWithFilter(['subscription-metrics', filters]);
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
         <Container>
            <SubscriptionMetricsViewLoading
               isLoading={ loadingCourses }
               isMrr={ isMrr }
               onChangeChart={ () => setIsMrrr(!isMrr) }
               inputs={ inputs }
               courses={ courses }
               dataAnalytics={ data }
               handleSubscriptionMetrics={ handleSubscriptionMetrics }
               loadingUpdate={ loadingUpdate }
            />
         </Container>
      </>
   );
};

SubscriptionMetrics.propTypes = {
   app: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};

export default connect(mapStateToProps)(SubscriptionMetrics);
