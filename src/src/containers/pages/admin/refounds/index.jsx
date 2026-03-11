/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import RefoundsView from 'views/pages/Refounds';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   getRefunds, runReportsJob,
} from 'api';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { appSelector } from 'state/modules/common/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Container from 'views/layout/AdminContainer';
import socketIOClient from 'socket.io-client';

const Refounds = ({ app }) => {
   const [refunds, setRefounds] = useState('procesed');
   const socket = useRef(null);

   useEffect(() => {
      getRefunds().then(() => {
         // bind socket
         const bindSocketEvents = () => {
            socket.current.on('connect', () => {
               socket.current.emit('subscribe');
               runReportsJob(['refunds', { delimeter: 'week' }]);
            });

            socket.current.on('reports.refunds-data', (data) => {
               setRefounds({ ...data });
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

   const [getRefundsFunc, { loading: loadingRefound }] = useSubmitForm(runReportsJob, {
      successMessage: '',
   });

   const [inputs, setInputs] = useState({
      delimeter: 'week',
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
      getRefundsFunc(['refunds', filters], (res) => {
         setRefounds(res);
      });
   };

   const handleRefoundMetrics = (name, value) => {
      const filters = {
         ...inputs,
         [name]: value,
      };
      setInputs(filters);
      if (name !== 'searchFrom' && name !== 'searchTo') {
         getRefundsFunc(['refunds', filters], (res) => {
            setRefounds(res);
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
         <Container>
            <RefoundsView
               refunds={ refunds }
               loading={ loadingRefound }
               delimeter={ inputs.delimeter }
               handleRefoundMetrics={ handleRefoundMetrics }
               handleSearch={ (from, to) => handleSearch(from, to) }
               searchFrom={ inputs.searchFrom }
               searchTo={ inputs.searchTo }
            />
         </Container>
      </>
   );
};

Refounds.propTypes = {
   app: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      app: appSelector(state),
   };
};

export default connect(mapStateToProps)(Refounds);
