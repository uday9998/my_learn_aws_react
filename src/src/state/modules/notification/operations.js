import { getEmailNotifications, getEmailNotificationsFromMeta, saveEmailNotification } from 'api';
import { toast } from 'react-toastify';
import isPrint from '../designCourse/edit/Error';
import * as actions from './action';

export const NotificationInit = (key) => {
   return async (dispatch) => {
      dispatch(actions.updateCurrentNotifyStart());
      try {
         const { data } = await getEmailNotifications();
         const metaData = await getEmailNotificationsFromMeta();
         const toCurrent = data.filter((i) => i.id === key)[0];
         let metaDataDefault = {};
         if (metaData && metaData.data) {
            metaDataDefault = metaData.data.filter((i) => i.id === key)[0];
         }
         dispatch(actions.updateCurrentNotifyCompleted(toCurrent, metaDataDefault));
      } catch (error) {
         dispatch(actions.updateCurrentNotifyFailed());
         if (error.response && error.response.status !== 401) {
            if (isPrint('Something went wrong.')) {
               toast.error('Something went wrong.');
            }
         }
      }
   };
};

export const NotificationSaveOperation = (data) => {
   return async (dispatch) => {
      dispatch(actions.saveNotificationStart());
      try {
         await saveEmailNotification([data]);
         if (isPrint('Email Notification Updated Successfully.')) {
            toast.success('Email Notification Updated Successfully.');
         }
         dispatch(actions.saveNotificationCompleted());
      } catch (error) {
         dispatch(actions.saveNotificationFailed());
      }
   };
};
