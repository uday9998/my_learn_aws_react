import React, { useEffect, Fragment } from 'react';
import './index.scss';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import moment from 'moment';
import PropTypes from 'prop-types';
import CommunityMessage from '../../../Message';
import MessengerDayLine from '../../../DayLine';
import MessengerRightSearch from '../MessengerRightSearch';

const MessengerRightContent = ({ handleScroll }) => {
   const containerRef = React.useRef();
   const {
      selectedConverstation, role, userUuid, isSearchActive,
   } = React.useContext(CommunityMessengerContext);
   const messages = selectedConverstation[role]?.chat_room ? selectedConverstation[role].chat_room.messages : [];
   const messagesByDate = messages.reduce((acc, message) => {
      const date = message.created_at || message.sentAt;
      // eslint-disable-next-line no-prototype-builtins
      if (acc.hasOwnProperty(date.split('T')[0])) {
         acc[date.split('T')[0]].push(message);
      } else {
         acc[date.split('T')[0]] = [message];
      }
      return acc;
   }, {});
   const objectKeys = Object.keys(messagesByDate);

   const isHaveMessageBecome = (index, itemDate) => {
      if (messagesByDate[itemDate][index + 1] !== undefined) {
         return messagesByDate[itemDate][index].member_uuid === messagesByDate[itemDate][index + 1].member_uuid;
      }
      return false;
   };
   useEffect(() => {
      if (containerRef.current) {
         containerRef.current.scroll({ top: containerRef.current.scrollHeight });
      }
   }, [selectedConverstation]);
   // if (selectedConverstation.isGroup) {
   //    return (
   //       <div>
   //          asd
   //       </div>
   //    );
   // }
   if (isSearchActive) {
      return <MessengerRightSearch />;
   }

   return (
      <div className='messenger__content' onScroll={ handleScroll } ref={ containerRef }>
         {objectKeys.map((e) => {
            return (
               <Fragment key={e}>
                  <MessengerDayLine
                     text={ moment(e).format('MMMM D') }
                  />
                  {messagesByDate[e].map((item, index) => {
                     return (
                        <CommunityMessage
                           key={ index }
                           user={ item.user }
                           text={ item.text }
                           id={ item.id }
                           isFile={ item.type === 'file_unlock' }
                           fileOptions={ item.type === 'file_unlock' ? item.unlock_details : {} }
                           isFrom={ userUuid !== item.member_uuid }
                           time={ item.isLocalTime ? (moment(item.created_at || item.sent_at)).format('HH:mm') : (moment.utc(item.created_at || item.sent_at)).format('HH:mm') }
                           isHaveMessageBecome={ isHaveMessageBecome(index, e) }
                        />
                     );
                  })}
               </Fragment>
            );
         })}
      </div>
   );
};

MessengerRightContent.propTypes = {
   handleScroll: PropTypes.func,
};

export default MessengerRightContent;
