import React, { useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import { StripeProvider } from 'react-stripe-elements';
import Checkout from 'components/elements/CardForm';
import withLoading from 'utils/withLoading';

const UpdateCardModalContentIsLoading = withLoading('div');

const UpdateCardModalContent = ({
   setupdateCardModalOpen, handleConnectToPlan, isConnect, cardUpdateModalIsInProgress, setCardUpdateModalState,
}) => {
   const confirmStripeRef = useRef();

   return (
      <div className='updateCard createDomain'>
         <div
            className='createDomain__close'
            role='presentation'
            onClick={ () => setupdateCardModalOpen(false) }
         >
            <Icon name='CloseX' />
         </div>
         <div className='createDomain__body'>
            <div className='createDomain__header'>
               <Text
                  type={ TextType.large }
                  size={ TextSize.large }
                  inner={ isConnect ? 'Connect To Plan' : 'Update Card' }
               />
            </div>
            <div>
               <StripeProvider apiKey={ process.env.REACT_APP_STRIPE_API_KEY }>
                  <Checkout
                     ref={ confirmStripeRef }
                     getToken={ token => handleConnectToPlan(token) }
                     setUpdateCardInProgress={ setCardUpdateModalState }
                  />
               </StripeProvider>
            </div>
            <div className='updatecard__btns'>
               <div>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                     onClick={ () => setupdateCardModalOpen(false) }
                  />
               </div>
               <div>
                  <BaseButton
                     size={ btnSize.large }
                     text={ isConnect ? 'Connect' : 'Update Card' }
                     onClick={ () => { confirmStripeRef.current.handleConfirm(); } }
                     disabled={ cardUpdateModalIsInProgress }
                  />
               </div>
            </div>
         </div>
         <UpdateCardModalContentIsLoading isLoading={ cardUpdateModalIsInProgress } />
      </div>
   );
};

UpdateCardModalContent.propTypes = {
   setupdateCardModalOpen: PropTypes.func,
   handleConnectToPlan: PropTypes.func,
   isConnect: PropTypes.bool,
   cardUpdateModalIsInProgress: PropTypes.bool,
   setCardUpdateModalState: PropTypes.func,
};


export default UpdateCardModalContent;
