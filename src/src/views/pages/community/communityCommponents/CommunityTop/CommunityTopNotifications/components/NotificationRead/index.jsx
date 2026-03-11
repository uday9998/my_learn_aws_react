import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SimpleStatus from 'components/elements/SimpleStatus';
import moment from 'moment';
import SliceAndConnectText from 'utils/getSplitedText';

const NotificationRead = ({
   notification, communityOwnerId, isFollow, onlineUsers,
}) => {
   const dateofvisit = moment(notification.created_at);
   const getTime = () => {
      const minute = moment().diff(dateofvisit, 'minutes');
      if (minute < 1) {
         return 'now';
      }
      if (minute < 60) {
         return `${ minute } m ago`;
      }
      const hours = moment().diff(dateofvisit, 'hours');
      if (hours < 24) {
         return `${ hours } h ago`;
      }
      const days = moment().diff(dateofvisit, 'days');
      return `${ days } d ago`;
   };
   return (
      <div className='community__notifications__content__notification notification__read'>
         <div className='community__notifications__content__notification__left'>
            <div className='user__image'>
               <img src={ notification.users.picture_src || notification.users.picture_full_src } alt='' />
               {!!notification.users && onlineUsers.includes(notification.user_id) && (
                  <div className='user__image__online' />
               )}
            </div>
            <div className='user__info'>
               <div className='user__info__top'>
                  <Text
                     inner={ SliceAndConnectText(notification.users.name, 15) }
                     type={ types.mediumLarge }
                     size={ sizes.small }
                  />
                  {(notification.users && notification.users.id === communityOwnerId) ? (
                     <SimpleStatus
                        color='black'
                        text='Admin'
                     />
                  ) : (
                     <>
                        {notification.users && isFollow && (
                           <SimpleStatus
                              color='follow'
                              text='You Follow'
                           />
                        ) }
                     </>
                  )}
               </div>
               <Text
                  inner={ notification.text }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#727978' } }
               />
            </div>
         </div>
         <div className='community__notifications__content__notification__right'>
            <Text
               inner={ getTime() }
               type={ types.regular148 }
               size={ sizes.xsmall }
               style={ { color: '#444C4B', whiteSpace: 'nowrap' } }
            />
         </div>
      </div>
   );
};

NotificationRead.propTypes = {
   notification: PropTypes.object,
   communityOwnerId: PropTypes.number,
   isFollow: PropTypes.bool,
   onlineUsers: PropTypes.array,
};

export default NotificationRead;
