import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';
import { CommunityMessengerContext } from 'containers/modules/community/messengar/context';
import MessengerUserProfile from '../UserProfile';


const CommunityMessengerLeftGroup = ({
   time, messagesNotificationsCount, isActive, id, lastMessage, isLocaltime, setIsOpenLeft,
}) => {
   const { handleSelectMember } = React.useContext(CommunityMessengerContext);
   const lastMessageText = lastMessage && lastMessage.type === 'file_unlock' ? 'File' : lastMessage.text;
   return (
      <div
         className='community__messenger__left__group'
         role='presentation'
         style={ { background: isActive ? '#24554E' : '#fff' } }
         onClick={ () => {
            setIsOpenLeft(false);
            handleSelectMember(id, true, messagesNotificationsCount);
         } }
      >
         <MessengerUserProfile
            text={ lastMessageText ? `${ lastMessage.user.username || lastMessage.user.name }: ${ lastMessageText }` : 'No message yet' }
            name='Group Chat'
            isOnline={ false }
            isGroup={ true }
            chatRoomId={ id }
            isActive={ isActive }
         />
         <div className='community__messenger__left__group__right'>
            {time && !!time.length ? (
               <Text
                  inner={ `${ isLocaltime ? (moment.utc(time)).format('HH:mm') : (moment(time)).format('HH:mm') } am` }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: isActive ? '#A6C9C5' : '#444C4B' } }
               />
            ) : (
               <div />
            )}
            {messagesNotificationsCount !== 0 && (
               <div className='community__messenger__left__group__right__messages'>
                  <Text
                     inner={ messagesNotificationsCount }
                     type={ types.medium150 }
                     size={ sizes.xsmall }
                     style={ { color: '#fff' } }
                  />
               </div>
            )}
         </div>
      </div>
   );
};

CommunityMessengerLeftGroup.propTypes = {
   messagesNotificationsCount: PropTypes.number,
   time: PropTypes.string,
   isActive: PropTypes.bool,
   lastMessage: PropTypes.object,
   id: PropTypes.number,
   isLocaltime: PropTypes.bool,
   setIsOpenLeft: PropTypes.func,
};

export default CommunityMessengerLeftGroup;
