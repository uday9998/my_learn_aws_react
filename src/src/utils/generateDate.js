import moment from 'moment';

const generateServerDate = () => {
   const date = moment().format(); // Get the current date and time
   const isoString = moment(date).toISOString();
   return isoString;
};

export default generateServerDate;
