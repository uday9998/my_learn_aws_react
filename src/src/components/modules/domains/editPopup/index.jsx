import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Modal from 'components/elements/Modal';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';


const EditPopup = ({ setIsEditPopupOpen }) => {
   return (
      <Modal
         blurColor='rgba(63, 79, 101, 0.6)'
         contentBgColor='white'
         contentPosition='center'
         contentWidth={ window.innerWidth >= 1024 ? '550px' : '80%' }
         closeOnClickOutside={ true }
         onClose={ () => setIsEditPopupOpen(false) }
         className='DomainsEditPopup__container'
      >
         <div className='DomainsEditPopup'>
            <div className='DomainsEditPopup__header'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner='Are You Sure?'
               />
               <div
                  className='DomainsEditPopup__close'
                  role='presentation'
                  onClick={ () => setIsEditPopupOpen(false) }
               >
                  <Icon name='CloseXNew' />
               </div>
            </div>
            <div className='DomainsEditPopup__content'>
               <div className='m-t-m'>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.extraSmall }
                     inner='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                  />
               </div>
               <div className='DomainsEditPopup__footer'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                        onClick={ () => setIsEditPopupOpen(false) }
                     />
                  </div>
                  <div>
                     <BaseButton
                        size={ btnSize.large }
                        text='Edit'
                        //  onClick={ () => onSubmit(inputs) }
                        // disabled={ isButtonDisabled }
                     />
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

EditPopup.propTypes = {
   setIsEditPopupOpen: PropTypes.func,
};

EditPopup.defaultProps = {
};

export default EditPopup;
