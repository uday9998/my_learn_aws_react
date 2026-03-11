import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTypes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Modal from 'components/elements/Modal';

const Popup = ({
   children, isOpen = false, onClose, title, onAcceptText, onAccept, isAcceptDisabled, cancelText = 'Close',
   className,
}) => {
   return (
      <Modal>
         <div className={ `popup ${ isOpen && 'popup__open' } ${ className }` }>
            <div className='popup__back' role='presentation' onClick={ onClose } />
            <div className={ `popup__body ${ isOpen && 'popup__body__open' }` }>
               <div className='popup__header'>
                  {title && (
                     <Text inner={ title } className='popup__title' size={ txtSizes.xxlarge } type={ txtTypes.medium } />
                  )}
                  {children}
               </div>
               <div className='popup__footer'>
                  <BaseButton
                     text={ cancelText }
                     onClick={ onClose }
                     theme={ btnTypes.secondary }
                     style={ { minWidth: '120px' } }
                     size={ btnSizes.large }
                  />
                  {onAccept && (
                     <BaseButton
                        text={ onAcceptText }
                        onClick={ onAccept }
                        style={ { minWidth: '120px' } }
                        theme={ btnTypes.primary }
                        disabled={ isAcceptDisabled }
                        size={ btnSizes.large }
                        className={ onAcceptText.includes('Delete') ? 'button__delete__popup' : '' }
                     />
                  )}
               </div>
            </div>
         </div>
      </Modal>
   );
};

Popup.propTypes = {
   children: PropTypes.any,
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
   cancelText: PropTypes.string,
   title: PropTypes.string,
   onAcceptText: PropTypes.string,
   isAcceptDisabled: PropTypes.bool,
   className: PropTypes.string,
   onAccept: PropTypes.func,
};

export default Popup;
