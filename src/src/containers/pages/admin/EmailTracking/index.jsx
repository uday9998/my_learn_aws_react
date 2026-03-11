import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmailTrackingView from 'views/pages/EmailTracking';
import * as operations from 'state/modules/emailTracking/operations.js';
import * as selectors from 'state/modules/emailTracking/selectors.js';
import { isLocalhost } from 'utils/Helpers';
import socketIOClient from 'socket.io-client';
import { appSelector } from 'state/modules/common/selectors';
import { socketAddItem } from 'state/modules/emailTracking/actions';

const EmailTracking = ({
   getData, isProgress, data, filter, app, onSocket,
}) => {
   const apiUrl = (isLocalhost() || window.location.hostname === 'areg.miestro.loc') ? process.env.REACT_APP_API_LOCAL_ENDPOINT : `https://${ window.location.host }`;
   const [filterInputs, setFilterInputs] = useState({
      name: '',
      searchFrom: null,
      searchTo: null,
   });
   const socket = useRef(null);

   useEffect(() => {
      getData();
   }, []);
   const bindSocketEvents = () => {
      socket.current.on('reports.emails-data', (a) => {
         onSocket(a);
         if (a.disconnect) {
            socket.current.disconnect();
         }
      });
   };
   useEffect(() => {
      const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=${ app.uuid }`;
      socket.current = socketIOClient(socketUrl);
      bindSocketEvents();
      socket.current.emit('subscribe');
   }, []);
   const handleFilter = (name, value) => {
      if (name && value) {
         if (name === 'searchTo' && value !== null) {
            filter({
               ...filterInputs,
               [name]: value,
            });
         } else if (name !== 'searchFrom') {
            filter({
               ...filterInputs,
               [name]: value,
            });
         }
      }
   };

   const handleChangeFilterInputsData = (name, value) => {
      handleFilter(name, value);
      setFilterInputs({
         ...filterInputs,
         [name]: value,
      });
   };

   const handleExport = () => {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = `${ apiUrl }/api/v1/reports/email/csv-export-new`;
      hiddenElement.click();
   };

   return (
      <EmailTrackingView
         setFilterData={ handleChangeFilterInputsData }
         filterData={ filterInputs }
         data={ data }
         exportCSV={ handleExport }
         isLoadingEmail={ isProgress }
      />
   );
};

EmailTracking.propTypes = {
   getData: PropTypes.func,
   data: PropTypes.object,
   filter: PropTypes.func,
   isProgress: PropTypes.bool,
   app: PropTypes.object,
   onSocket: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      data: selectors.emailsDataSelector(state),
      app: appSelector(state),
      isProgress: selectors.emailsProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getData: () => dispatch(operations.GetEmailTrackingOperation()),
      onSocket: (item) => dispatch(socketAddItem(item)),
      filter: (inputs) => dispatch(operations.filterEmailTrackingOperation(inputs)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTracking);
