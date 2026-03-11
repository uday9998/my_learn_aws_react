import moment from 'moment-timezone';

export const localeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const TimezoneSelector = () => {
   const timezones = moment.tz.names().map(tz => {
      const offset = moment.tz(tz).format('Z');
      return {
         value: tz,
         label: `(UTC${ offset }) ${ tz }`,
      };
   });
   return timezones;
};