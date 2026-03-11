import React from 'react';
import PropTypes from 'prop-types';
import { isLocalhost } from 'utils/Helpers';
import './index.scss';

const apiUrl = isLocalhost() ? process.env.REACT_APP_MAIN_LOCAL_ENDPOINT : process.env.REACT_APP_MAIN_DOMAIN_LIVE;

const Unfinished = ({ level }) => {
   return (
      <img src={ level.split('ucarecdn')[0] === 'https://' ? level : `${ apiUrl }${ level }` } alt='level icon' className='unfinished' />
   );
};

Unfinished.propTypes = {
   level: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
   ]),
};

export default Unfinished;
