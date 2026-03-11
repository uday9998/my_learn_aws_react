import React from 'react';
import PropTypes from 'prop-types';

const TriangleSvgIcon = ({ isOpen, color }) => {
   if (!isOpen) {
      return (
         <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' clipRule='evenodd' d='M12 5.1582C12.2761 5.1582 12.5 5.38206 12.5 5.6582V12.1582H19C19.2761 12.1582 19.5 12.3821 19.5 12.6582C19.5 12.9343 19.2761 13.1582 19 13.1582H12.5V19.6582C12.5 19.9343 12.2761 20.1582 12 20.1582C11.7239 20.1582 11.5 19.9343 11.5 19.6582V13.1582H5C4.72386 13.1582 4.5 12.9343 4.5 12.6582C4.5 12.3821 4.72386 12.1582 5 12.1582H11.5V5.6582C11.5 5.38206 11.7239 5.1582 12 5.1582Z' fill={color} />
         </svg>
      );
   }
   return (
      <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <path fillRule='evenodd' clipRule='evenodd' d='M5.64645 6.30465C5.84171 6.10939 6.15829 6.10939 6.35355 6.30465L12 11.9511L17.6464 6.30465C17.8417 6.10939 18.1583 6.10939 18.3536 6.30465C18.5488 6.49991 18.5488 6.81649 18.3536 7.01176L12.7071 12.6582L18.3536 18.3047C18.5488 18.4999 18.5488 18.8165 18.3536 19.0118C18.1583 19.207 17.8417 19.207 17.6464 19.0118L12 13.3653L6.35355 19.0118C6.15829 19.207 5.84171 19.207 5.64645 19.0118C5.45118 18.8165 5.45118 18.4999 5.64645 18.3047L11.2929 12.6582L5.64645 7.01176C5.45118 6.81649 5.45118 6.49991 5.64645 6.30465Z' fill={color} />
      </svg>
   );
};

TriangleSvgIcon.propTypes = {
   isOpen: PropTypes.bool,
   color: PropTypes.string,
};

export default TriangleSvgIcon;
