import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/elements/Modal';
// import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import './index.scss';

const ModalNew = ({
   onCloseModal, children, className, isUpload,
}) => {
   if (isUpload) {
      return (
         <div className='modal__new'>
            <div className='modal__new__background' role='presentation' onClick={ () => onCloseModal() } />
            {/* <ClickOutside onClick={ onCloseModal }> */}
            <div className={ className ? ` modal__new__content ${ className }` : 'modal__new__content' }>
               {children}
            </div>
            {/* </ClickOutside> */}
         </div>
      );
   }

   return (
      <Modal>
         <div
            className={ className ? ` 'modal__new' ${ className }` : 'modal__new' }
            role='presentation'
            onClick={ (e) => onCloseModal(e)
            }>
            <div className='modal__new__background' />
            {/* <ClickOutside onClick={ onCloseModal }> */}
            <div
               className={ className ? ` modal__new__content ${ className }` : 'modal__new__content' }
               onClick={ (e) => { e.stopPropagation(e); } }
               role='presentation'>
               {children}
            </div>
            {/* </ClickOutside> */}
         </div>
      </Modal>

   );
};

ModalNew.propTypes = {
   onCloseModal: PropTypes.func,
   children: PropTypes.any,
   className: PropTypes.string,
   isUpload: PropTypes.bool,
};

export default ModalNew;
