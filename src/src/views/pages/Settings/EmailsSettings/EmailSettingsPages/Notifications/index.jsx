import React from 'react';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import { getNotificationsById } from 'utils/notificationHelpers';
import NotificationList from './NotificationList';

const NotificationsEmailSettingsPage = ({
   handleSaveNotifications, notifications, handleChangeNotify, handleSelectNotification,
}) => {
   return (
      <div className='email__notify'>
         <div className='email__notify__items'>
            <NotificationList
               list={ getNotificationsById(notifications, 'general') }
               handleSelectNotification={ handleSelectNotification }
               onChange={ handleChangeNotify }
               section='General'
            />
            <div className='divider' />
            <NotificationList
               handleSelectNotification={ handleSelectNotification }
               list={ getNotificationsById(notifications, 'message') }
               onChange={ handleChangeNotify }
               section='Message'
            />
            <div className='divider' />
            <NotificationList
               handleSelectNotification={ handleSelectNotification }
               list={ getNotificationsById(notifications, 'product') }
               onChange={ handleChangeNotify }
               section='Program'
            />
         </div>
         <div>
            <BaseButton
               text='Save Changes'
               onClick={ () => handleSaveNotifications() }
            />
         </div>
      </div>
   );
};

NotificationsEmailSettingsPage.propTypes = {
   notifications: PropTypes.array,
   handleChangeNotify: PropTypes.func,
   handleSelectNotification: PropTypes.func,
   handleSaveNotifications: PropTypes.func,
};

export default NotificationsEmailSettingsPage;
