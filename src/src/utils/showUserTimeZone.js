
import momentTimezone from 'moment-timezone';

export const showUserTimeZone = (dateTime) => {
   const userTimeZone = momentTimezone.tz.guess();
   const dateUserTimeZone = momentTimezone.utc(dateTime).tz(userTimeZone);
   const dateUserTimeZoneFormat = dateUserTimeZone.format('MMMM DD, YYYY h:mm A');
   return dateUserTimeZoneFormat;
};
