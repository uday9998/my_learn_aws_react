import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


export const Modal = ({
   type, title, text, onClose, onDelete,
}) => {
   switch (type) {
      default:
         return (
            <div className='modal' role='presentation'>
               <div className='modal-body-delete modal-body'>
                  <div className='modal-body-header'>
                     <div className='modal-body-title'>{title}</div>
                     <div className='modal-body-text'>{text}</div>
                  </div>
                  <div className='modal-body-footer'>
                     <button type='button' className='modal-cancel' onClick={ onClose }>Cancel</button>
                     <button type='button' className='modal-delete' onClick={ onDelete }>Delete Product</button>
                  </div>
               </div>
               <div className='modal-back' role='presentation' onClick={ onClose } />
            </div>
         );
   }
};

Modal.propTypes = {
   type: PropTypes.string,
   title: PropTypes.string,
   text: PropTypes.string,
   onClose: PropTypes.func,
   onDelete: PropTypes.func,
};
