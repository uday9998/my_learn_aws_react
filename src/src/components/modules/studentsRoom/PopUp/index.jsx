import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Modal from 'components/elements/Modal';
import './index.scss';

const PopUp = ({
   closeModal, text, darkMode, onButtonClick, buttonMessage,
}) => {
   return (
      <Modal
         contentBgColor='#fff'
         contentPosition='center'
         roundedModal='8px'
         contentWidth='552px'
         closeOnClickOutside={ true }
         onClose={ closeModal }
      >
         <div className='dripModal' style={ darkMode ? { backgroundColor: 'rgb(39, 39, 39)' } : { backgroundColor: '#fff' } }>
            <div
               className='congratulationsCloseIcon'
               role='presentation'
               onClick={ closeModal }
            >
               <Icon name='CloseXNew' color={ darkMode ? '#fff' : '#3f4f65' } />
            </div>
            <div className='congratulationsRectangle'>
               <div className='titleRectangle'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.large }
                     inner={ text }
                     className='congratulationsTitle'
                     color={ darkMode ? '#fff' : '#3f4f65' }
                  />
               </div>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  text={ buttonMessage }
                  onClick={ () => {
                     onButtonClick();
                     closeModal();
                  } }
               />
            </div>

         </div>
      </Modal>
   );
};

PopUp.propTypes = {
   closeModal: PropTypes.func,
   onButtonClick: PropTypes.func,
   text: PropTypes.string,
   darkMode: PropTypes.bool,
   buttonMessage: PropTypes.string,
};

export default PopUp;
