import React from 'react';
import PropTypes from 'prop-types';

export const CheckboxIcon = ({ color }) => {
   return (

      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path fillRule='evenodd' clipRule='evenodd' d='M13.8401 3.44714C14.1455 3.72703 14.1661 4.20146 13.8862 4.5068L6.55289 12.5068C6.41466 12.6576 6.22083 12.7454 6.01631 12.7498C5.8118 12.7543 5.61434 12.675 5.46969 12.5303L2.13636 9.197C1.84346 8.90411 1.84346 8.42923 2.13636 8.13634C2.42925 7.84345 2.90412 7.84345 3.19702 8.13634L5.97646 10.9158L12.7805 3.49321C13.0604 3.18787 13.5348 3.16724 13.8401 3.44714Z' fill={ color } />
      </svg>

   );
};


CheckboxIcon.propTypes = {
   color: PropTypes.string,
};

CheckboxIcon.defaultProps = {
   color: '#ffffff',
};
