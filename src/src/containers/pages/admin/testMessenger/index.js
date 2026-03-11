import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';
/* const setRedis = () => {
   return axios.get('http://test11.miestro.loc/api/v1/community/8/set-redis/53b7ee2bc7d14e778f48e7e90eb11f38/?uuid=67cf2940b0b5914fcea9888a8f61b261',{
      headers:{
         Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
   })

} */


const AdminTestMessenger = ({ uuid }) => {
   const [message, setMessage] = React.useState('');
   const socket = React.useRef(null);

   React.useEffect(() => {
      // REACT_APP_API_LOCAL_ENDPOINT
      const socketUrl = 'http://test11.miestro.loc:7002/chat';

      socket.current = socketIOClient(socketUrl, {
         autoConnect: true,
         transports: ['websocket', 'polling'],
         forceNew: true,
         reconnectionDelay: 50,
         path: '/websocket',
         auth: (cb) => {
            cb({
               token: `${ localStorage.getItem('authToken') }:${ uuid }`,
            });
         },
      });
      socket.current.connect();
      socket.current.on('connect', () => {
         socket.current.emit('online');
         // alert(1)
      });

      socket.current.on('connect_error', (error) => {
      });
      socket.current.on('typing', (data) => {
      });
      socket.current.on('message:send', (data) => {
         const {
            message, conversationId, user,
         } = data;
         const messageData = {
            ...message, user, parent: message.parentMessage, sent_at: message.sentAt, unlock_details: message.unlockDetails,
         };
         alert(`ՆԱՄԱԿ ՈՒՆԵՔ ${ user.username }֊ից` + ` :: ${ messageData.text }`);
      });

      socket.current.on('connect_error', (error) => {
      });
   }, []);

   const onSendMessage = () => {
      socket.current.emit('message:send', {
         'type': 'file_unlock',
         'text': message,
         'sentAt': 1619016718241,
         'conversationId': 10,
         'resources': ['1.pdf', '23.pdf'],
         'unlockPrice': 12,
         'resourceType': 'pdf',
      });
      /*
      socket.current.emit('message:send', {
         "type": "text_message",
         "text":message,
         "sentAt": 1619016718241,
         "conversationId": 10,
         // "parentMessageId": 76,
      })
      */

      /* socket.current.emit('message:update', {
         "messageId": 148,
         "text": message,
         "conversationId": 10,
         // "parentMessageId": 76,
      }) */
      /* socket.current.emit('message:delete', {
         "messageId": 148,
         "conversationId": 10,
         // "parentMessageId": 76,
      }) */


      setMessage('');
   };


   const onTyping = (e) => {
      socket.current.emit('typing', {
         text: message,
         conversationId: 10,
      });
      setMessage(e.target.value);
   };
   /* return (
      <div>
         <input type='text' value={ message } onChange={ (e) => onTyping(e) } />
         <button onClick={ () => onSendMessage() } disabled={ message.length === 0 }>
            Click
         </button>
      </div>
   ); */
};

AdminTestMessenger.propTypes = {

};

const mapStateToProps = (state) => {
   return {
      uuid: state.common.authUser.uuid,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminTestMessenger);
