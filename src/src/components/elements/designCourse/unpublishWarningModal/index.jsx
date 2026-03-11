import React from 'react';
import PropTypes from 'prop-types';
import ModalNew from 'components/elements/ModalNew';
import './style.scss';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';

const UnpublishWarningModal = ({
   onClose,
   planNames,
}) => {
   return (
      <ModalNew
         onCloseModal={ onClose }
         className='unpublish__warning__modal'
      >
         <span className='warning-top'>Warning</span>
         <span className='warning-center'>
            You can not unpublish the product, because this product is the only one in the following published plans.
         </span>
         <div
            className='plan-names-list'
         >
            {
               planNames.map(name => (
                  <span>Plan name: { name }</span>
               ))
            }
         </div>
         <div className='button-wrapper'>
            <Button
               onClick={ onClose }
               text='Okay'
               size={ btnSizes.large120 }
               theme={ themes.secondary }
            />
         </div>
      </ModalNew>
   );
};

UnpublishWarningModal.propTypes = {
   onClose: PropTypes.func,
   planNames: PropTypes.array,
};

export default UnpublishWarningModal;
