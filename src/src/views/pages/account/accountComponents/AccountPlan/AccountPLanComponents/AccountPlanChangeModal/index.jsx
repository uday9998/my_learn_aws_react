import ModalNew from 'components/elements/ModalNew';
import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';

const AccountPlanChangeModal = ({ onChange, onClose }) => {
   return (
      <ModalNew onCloseModal={ onClose }>
         <div className='account__plan__modal__content'>
            <Text
               inner='Change Plan'
               type={ txtTypes.medium }
               size={ txtSize.xxlarge }
            />
            <div className='card__buttons'>
               <BaseButton
                  text='Close'
                  theme={ btnThemes.secondary }
                  onClick={ () => onClose() }
               />
               <BaseButton
                  text='Change'
                  theme={ btnThemes.primary }
                  onClick={ () => onChange() }
               />
            </div>
         </div>
      </ModalNew>
   );
};

AccountPlanChangeModal.propTypes = {
   onChange: PropTypes.func,
   onClose: PropTypes.func,
};

export default AccountPlanChangeModal;
