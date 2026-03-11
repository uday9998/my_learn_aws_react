import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import lock from 'assets/images/checkout/lock.png';
import CheckoutForm from '../CheckoutForm';
import CreditCardForm from '../CreditCardForm';

const TrialCard = ({ formView, creditCardFormView }) => {
   return (
      <>
         <SelectedWrapper hasShadow>
            <div className='trialCard'>
               <div className='m-b-m'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner='Start Your Free 14-Day Trial'
                  />
               </div>
               { formView && <CheckoutForm /> }
               { creditCardFormView && <CreditCardForm /> }
               <div className='flex justify-end trialCard__btn'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text={ (creditCardFormView && 'Start my Free  Trial') || 'Get Started' }
                  />
               </div>
            </div>
         </SelectedWrapper>
         <div className='cardInfoSecure flex align-center'>
            <img src={ lock } alt='lock' />
            <Text
               type={ TextType.regular }
               size={ TextSize.extraSmall }
               inner='Card information is stored on a secure server.'
            />
         </div>
      </>
   );
};

TrialCard.propTypes = {
   formView: PropTypes.bool,
   creditCardFormView: PropTypes.bool,
};

TrialCard.defaultProps = {
   formView: true,
   creditCardFormView: true,
};

export default TrialCard;
