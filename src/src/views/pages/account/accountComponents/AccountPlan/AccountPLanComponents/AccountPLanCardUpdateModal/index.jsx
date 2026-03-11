import ModalNew from 'components/elements/ModalNew';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Checkout from 'components/elements/CardForm';
import { StripeProvider } from 'react-stripe-elements';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import BaseButton, { THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import './index.scss';

const UpdatePlanCardModal = ({
   onClose, handleConnectToPlan,
}) => {
   const confirmStripeRef = useRef();
   const [cardProgress, setCardProgress] = useState(false);
   const onSumbit = (data) => {
      const { error, token } = data;
      if (error && error.message) {
         setCardProgress(false);
      } else {
         setCardProgress(false);
         handleConnectToPlan(token);
      }
   };


   return (
      <ModalNew onCloseModal={ onClose } className='account__card'>
         <div className='account__card__modal'>
            <div className='account__card__modal__content'>
               <Text
                  inner='Update Card'
                  type={ txtTypes.medium }
                  size={ txtSize.xxlarge }
               />
               <StripeProvider apiKey={ process.env.REACT_APP_STRIPE_API_KEY }>
                  <Checkout
                     ref={ confirmStripeRef }
                     getToken={ token => onSumbit(token) }
                     setUpdateCardInProgress={ (value) => setCardProgress(value) }
                  />
               </StripeProvider>
               <div className='card__buttons'>
                  <BaseButton
                     text='Close'
                     theme={ btnThemes.secondary }
                     onClick={ () => onClose() }
                  />
                  <BaseButton
                     text='Update'
                     theme={ btnThemes.primary }
                     onClick={ () => confirmStripeRef.current.handleConfirm() }
                  />
               </div>
            </div>
         </div>

         {cardProgress && (
            <LoaderSpinner />
         )}
      </ModalNew>
   );
};

UpdatePlanCardModal.propTypes = {
   onClose: PropTypes.func,
   handleConnectToPlan: PropTypes.func,
};

export default UpdatePlanCardModal;
