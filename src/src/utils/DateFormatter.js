import moment from 'moment';

const dateFormatter = (date) => date && moment(date).format('MMM D, YYYY');

export default dateFormatter;
