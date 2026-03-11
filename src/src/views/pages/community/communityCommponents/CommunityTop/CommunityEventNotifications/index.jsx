/* eslint-disable react/no-array-index-key */
import React from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import PropTypes from 'prop-types';
import Line from 'components/elements/Line';
import { connect } from 'react-redux';
import { onlineUsersSelector } from 'state/modules/common/selectors';
import NotificationUnread from './components/NotificationUnread';
import NotificationRead from './components/NotificationRead';
import NotificationEmpty from './components/NotificationEmpty';

const CommunityEventNotifications = ({
   notifications, markAsRead, communityOwnerId, onlineUsers, user,
}) => {
   const onMarkAll = () => {
      const ids = notifications.map((e) => e.id);
      markAsRead(ids);
   };
   const countOfNotifications = notifications.filter((e) => e.status === '0').length;

   // const getIsFollow = (users) => {
   //    const ids = users.map((e) => e.id);
   //    return ids.includes(communityOwnerId);
   // };

   return (
      <div className='community__notifications__content'>
         <div className='community__notifications__content__top'>
            <div className='left'>
               <Text
                  inner='Notifications'
                  type={ types.mediumLarge }
                  size={ sizes.small }
               />
               <Text
                  inner={ countOfNotifications }
                  type={ types.medium150 }
                  size={ sizes.xsmall }
                  style={ {
                     padding: '0px 4px', background: '#fff', border: '1px solid #E7E9E9', borderRadius: '4px',
                  } }
               />
            </div>
            {countOfNotifications > 0 && (
               <Text
                  inner='Mark All As Read'
                  onClick={ onMarkAll }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#24554E', cursor: 'pointer' } }
               />
            )}
         </div>
         <Line />
         {notifications.length > 0 ? (
            <>
               {notifications.map((e, index) => {
                  if (e.status !== '0') {
                     return (
                        <NotificationRead
                           notification={ e }
                           key={ index }
                           // isFollow={ getIsFollow(e.users.user_following) }
                           communityOwnerId={ communityOwnerId }
                           user={ user }
                           onlineUsers={ onlineUsers }
                        />
                     );
                  }
                  return (
                     <NotificationUnread
                        notification={ e }
                        communityOwnerId={ communityOwnerId }
                        //  isFollow={ getIsFollow(e.users.user_following) }
                        key={ index }
                        onRead={ (id) => markAsRead([id]) }
                        onlineUsers={ onlineUsers }
                        user={ user }
                     />
                  );
               })}
            </>
         ) : (
            <NotificationEmpty />
         )}

      </div>
   );
};

CommunityEventNotifications.propTypes = {
   communityOwnerId: PropTypes.number,
   markAsRead: PropTypes.func,
   notifications: PropTypes.array,
   onlineUsers: PropTypes.array,
   user: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      onlineUsers: onlineUsersSelector(state),
   };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityEventNotifications);
