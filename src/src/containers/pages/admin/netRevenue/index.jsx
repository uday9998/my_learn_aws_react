/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import Container from 'views/layout/AdminContainer';
import NetRevenueView from 'views/pages/netRevenue';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getRevenue, getAllFrontCourses, getOnlyOffers, runReportsJob,
} from 'api';
import moment from 'moment';
import withLoading from 'utils/withLoading';
import { appSelector } from 'state/modules/common/selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import socketIOClient from 'socket.io-client';

const NetRevenueViewLoading = withLoading(NetRevenueView);

const NetRevenue = ({ app }) => {
   const {
      data: courses, loading: loadingCourses,
   } = useApiQuery(getAllFrontCourses);

   const {
      data: offers, loading: loadingOffers,
   } = useApiQuery(getOnlyOffers);


   const [getRevenueFunc, { loading: loadingRevenue }] = useSubmitForm(runReportsJob, {
      successMessage: '',
   });

   const [revenue, setRevenue] = useState('procesed');
   const socket = useRef(null);

   const [inputs, setInputs] = useState({
      delimeter: 'week',
      to: '',
      from: '',
      searchFrom: '',
      searchTo: '',
      offer_id: 'all_offers',
      payment_type: 'all',
   });

   useEffect(() => {
      getRevenue().then(() => {
         const bindSocketEvents = () => {
            socket.current.on('connect', () => {
               socket.current.emit('subscribe');
               runReportsJob(['net-revenue', { }]);
            });

            socket.current.on('reports.net-revenue-data', (data) => {
               setRevenue({ ...data });
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
      getRevenueFunc(['net-revenue', filters]);
   };

   const handleInputChange = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      if (name !== 'searchFrom' && name !== 'searchTo') {
         getRevenueFunc(['net-revenue', filters]);
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
            <NetRevenueViewLoading
               isLoading={ loadingOffers || revenue === 'procesed' }
               revenue={ revenue }
               courses={ courses }
               offers={ offers }
               loadingRevenue={ loadingRevenue }
               inputs={ inputs }
               handleInputChange={ handleInputChange }
            />
         </Container>
      </>
   );
};

NetRevenue.propTypes = {
   app: PropTypes.object,
};


const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};


export default connect(mapStateToProps)(NetRevenue);
