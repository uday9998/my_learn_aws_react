import React, { useRef, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import { updateOnlineList, updateUserSocket } from 'state/modules/common/actions';


export const UserContext = createContext();

const SocketInit = ({
   siteInfo, children, auth, updateSocket, updateList,
}) => {
   const socket = useRef(null);
   const userRef = useRef();
   const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=${ siteInfo.site_uuid }`;


   useEffect(() => {
      if (!siteInfo.site_uuid || socket.current) {
         return;
      }
      socket.current = socketIOClient(socketUrl);
      socket.current.connect();

      updateSocket(socket.current);
      socket.current.emit('subscribe');
      socket.current.on('updateUserStatus', (data) => {
         updateList(data);
      });
   }, [siteInfo]);

   const userOnline = () => {
      userRef.current = auth;
      if (!socket.current || !auth) return;
      socket.current.emit('online', { 'user': auth });
   };

   useEffect(() => {
      userOnline();
   }, [auth]);

   if (!siteInfo.site_uuid) {
      return (
         <>
            {children}
         </>
      );
   }
   return (
      <>
         <UserContext.Provider value={ { userOnline } }>
            {children}
         </UserContext.Provider>
      </>
   );
};
const mapStateToProps = (state) => {
   return {
      siteInfo: siteInfoSelector(state),
      auth: authUserSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      updateSocket: (socket) => {
         dispatch(updateUserSocket(socket));
      },
      updateList: (list) => {
         dispatch(updateOnlineList(list));
      },
   };
};

SocketInit.propTypes = {
   siteInfo: PropTypes.object,
   children: PropTypes.any,
   auth: PropTypes.object,
   updateSocket: PropTypes.func,
   updateList: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketInit);
