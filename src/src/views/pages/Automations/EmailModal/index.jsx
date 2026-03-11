/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const EmailModal = ({ children, onClose }) => {
   const handleCloseModal = (e) => {
      if (e.target.className === 'modal__wrapper') {
         onClose('');
      }
   };
    
   return (
      <div className='modal__wrapper' onClick={ handleCloseModal } role='presentation'>
         {children}
      </div>
   );    
};

EmailModal.propType = {
   children: PropTypes.any,
   onClose: PropTypes.func,
};

export default EmailModal;