import React from 'react';
import PropTypes from 'prop-types';
import { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import momentTimezone from 'moment-timezone';
// import { copyToClipBoard } from 'utils/copy';
import './index.scss';

const GoogleCalendarButton = ({
   date, textProps, description, name, duration,
}) => {
   const BASE_URL = 'https://calendar.google.com/calendar/render?action=TEMPLATE';

   const backendTimezone = 'UTC';
   // const userTimeZone = momentTimezone.tz.guess();

   const convertToUserTz = (dateNew, format = 'YYYY-MM-DD HH:mm:ss') => {
      const result = momentTimezone.tz(dateNew, backendTimezone);
      return result.format(format);
   };

   const addDatev2 = (dateNew, diffSeconds) => {
      if (date) {
         const userDate = momentTimezone.tz(dateNew, backendTimezone);
         // .tz(userTimeZone);
         const dateTime = userDate.add(diffSeconds, 'seconds');
         return dateTime;
      }
      return null;
   };

   const generateUrl = () => {
      const startDate = convertToUserTz(date, 'YYYYMMDDTHHmmSSZ');
      const addedDate = addDatev2(date, duration * 60);

      const endDate = convertToUserTz(addedDate, 'YYYYMMDDTHHmmSSZ');
      const eventDate = `&dates=${ startDate }/${ endDate }`;
      const text = name ? `&text=${ name }` : '';
      const details = description ? `&details=${ description }` : '';
      const url = BASE_URL + eventDate + text + details;
      return url;
   };

   return (
      <div className='google__calendar__button'>
         <TextWithIcon
            inner='Add to My Calendar'
            iconName='calendarM'
            type={ types.regularDefaultSmall }
            size={ sizes.xsmall }
            { ...textProps }
            onClick={ () => window.open(generateUrl(), '_blank') }
         />
      </div>
   );
};

GoogleCalendarButton.propTypes = {
   date: PropTypes.string,
   textProps: PropTypes.object,
   name: PropTypes.string,
   description: PropTypes.string,
   duration: PropTypes.number,
};

export default GoogleCalendarButton;
