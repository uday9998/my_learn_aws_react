import React from 'react';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import { Popover } from '@material-ui/core';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { myAccountReadNotification } from 'api';
import { MyAccountContext } from 'containers/pages/member/account';


const NotificationsMyAccount = ({ notifications }) => {
   const [isOpenTriangle, setIsOpenTriangle] = React.useState(false);
   const { changeUser, user } = React.useContext(MyAccountContext);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [read] = useSubmitForm(myAccountReadNotification);
   const handleReadNotification = (notificationId) => {
      read([notificationId], () => {
         changeUser({
            ...user,
            notifications: notifications.map((e) => {
               if (e.id === notificationId) {
                  return {
                     ...e,
                     status: '1',
                  };
               }
               return e;
            }),
         });
      });
   };
   const markAllReadFunction = () => {
      read(notifications.map((e) => e.id), () => {
         changeUser({
            ...user,
            notifications: notifications.map((e) => {
               return {
                  ...e,
                  status: '1',
               };
            }),
         });
      });
   };
   const [isOpenedMore, setIsOpenedMore] = React.useState(false);
   const getCommentBetweenDate = (createdAt) => {
      const currentDate = moment();
      const createdAtDate = moment(createdAt);
      const diffInMinutes = currentDate.diff(createdAtDate, 'minute');
      if (diffInMinutes > 60) {
         const diffInHours = currentDate.diff(createdAtDate, 'hour');
         if (diffInHours > 60) {
            const diffInDays = currentDate.diff(createdAtDate, 'day');
            return `${ diffInDays } day`;
         }
         return `${ diffInHours } hour`;
      }
      return `${ diffInMinutes } min`;
   };
   function sortArrayByStatus(arr) {
      // Filter array into two separate arrays for each status
      const status0Array = arr.filter(item => item.status === '0');
      const status1Array = arr.filter(item => item.status === '1');

      // Concatenate the two arrays together, with the status 1 array appearing first
      const sortedArray = status0Array.reverse().concat(status1Array.reverse());

      return sortedArray;
   }
   const sortedNotifications = () => {
      return sortArrayByStatus(notifications);
   };

   const unreadNotificationsCount = notifications.filter(not => not.status === '0').length;

   return (
      <div>
         <div
            className={ `drop__triggle__icon${ isOpenTriangle ? ' drop__triggle__icon__active' : '' }` }
            role='presentation'
            onClick={ (e) => {
               e.preventDefault();
               e.stopPropagation();
               setIsOpenTriangle(true);
               setAnchorEl(e.currentTarget);
            } }
         >
            <IconNew name='NotificationMyAccountM' />
            {
               Boolean(unreadNotificationsCount) && (
                  <div className='unreads_count_wrapper'>
                     <span>{unreadNotificationsCount}</span>
                  </div>
               )
            }
         </div>
         <Popover
            open={ isOpenTriangle }
            anchorEl={ anchorEl }
            onClose={ () => setIsOpenTriangle(false) }
            className='custom-popover'
            elevation={ 24 }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'right',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'right',
            } }
         >
            <div className='notifications'>
               <Text
                  inner='Notification'
                  type={ types.regularDefault }
                  size={ sizes.medium }
               />
               <div className='notifications__bottom'>
                  <Text
                     inner='Latest'
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <Text
                     inner='Mark all as read'
                     onClick={ () => markAllReadFunction() }
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { cursor: 'pointer' } }
                  />
               </div>
               <div className='notifications__list'>
                  {notifications.length === 0 ? (
                     <Text
                        inner='No notifications yet.'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { margin: '0px auto', color: '#727978' } }
                     />
                  ) : (
                     <>
                        {isOpenedMore ? (
                           <>
                              {sortedNotifications().map((e) => {
                                 return (
                                    <div className={ `notifications__list__item${ e.status === '0' ? ' notifications__list__item__active' : '' }` } key={ e.id } role='presentation' onClick={ () => handleReadNotification(e.id) }>
                                       <div className='notifications__list__item__circle'>
                                          <IconNew name='CheckRecMyAccountL' />
                                       </div>
                                       <div className='notifications__list__item__right'>
                                          <Text
                                             inner={ e.text }
                                             type={ types.regularDefault }
                                             style={ { color: e.status === '0' ? '#fff' : null } }
                                             size={ sizes.small }
                                          />
                                          <Text
                                             inner={ `${ getCommentBetweenDate(e.created_at) } ago` }
                                             type={ types.regular148 }
                                             size={ sizes.xsmall }
                                             style={ { color: '#A1A5A5' } }
                                          />
                                       </div>
                                    </div>
                                 );
                              })}
                           </>
                        ) : (
                           <>
                              {sortedNotifications().slice(0, 4).map((e) => {
                                 return (
                                    <div className={ `notifications__list__item${ e.status === '0' ? ' notifications__list__item__active' : '' }` } key={ e.id } role='presentation' onClick={ () => handleReadNotification(e.id) }>
                                       <div className='notifications__list__item__circle'>
                                          <IconNew name='CheckRecMyAccountL' />
                                       </div>
                                       <div className='notifications__list__item__right'>
                                          <Text
                                             inner={ e.text }
                                             type={ types.regularDefault }
                                             style={ { color: e.status === '0' ? '#fff' : null } }
                                             size={ sizes.small }
                                          />
                                          <Text
                                             inner={ `${ getCommentBetweenDate(e.created_at) } ago` }
                                             type={ types.regular148 }
                                             size={ sizes.xsmall }
                                             style={ { color: '#A1A5A5' } }
                                          />
                                       </div>
                                    </div>
                                 );
                              })}
                           </>
                        )}
                     </>
                  )}
               </div>
               { notifications.length !== 0 && (
                  <Text
                     type={ types.regularDefault }
                     size={ sizes.small }
                     isIconRight={ true }
                     inner={ isOpenedMore ? 'See Less notifications' : 'See All notifications' }
                     onClick={ () => setIsOpenedMore(!isOpenedMore) }
                     style={ { cursor: 'pointer', marginLeft: 'auto' } }
                  />
               )}
            </div>
         </Popover>
      </div>
   );
};

NotificationsMyAccount.propTypes = {
   notifications: PropTypes.array,
};

export default NotificationsMyAccount;
