import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import '../index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Tooltip from 'components/elements/members/Tooltip';

const OrderCard = ({
   signUp, handleInputSignUpChange, handleSignUpSave, previewCheckout, settings,
}) => {
   return (
      <ItemWrapper>
         <div className='signUpCard'>
            <div className='flex'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Order Summary'
               />
               <Tooltip
                  hintText='On this page you will be able to tell your customers a little bit about your course before they sign up.'
                  hintStyle={ { bottom: 'auto', top: '18px', width: '230px' } }
               />
            </div>

            <TextInput
               subLabel='Enter the summary of your class. Make sure you hightlight the selling points of your class.'
               placeholder='E.g - 8 Week Training Class'
               id='order-input'
               name='checkout_text'
               value={ signUp['order-summary'].checkout_text }
               onChange={ (key, value) => handleInputSignUpChange(key, value) }
            />
            <div className='btnsBlock'>
               {settings.pricings && settings.pricings.length !== 0 && (
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     onClick={ previewCheckout }
                     text='Preview'
                  />
               )}

               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  text='Save'
                  onClick={ () => handleSignUpSave('order-summary') }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

OrderCard.propTypes = {
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   handleInputSignUpChange: PropTypes.func,
   settings: PropTypes.object,
};

export default OrderCard;
