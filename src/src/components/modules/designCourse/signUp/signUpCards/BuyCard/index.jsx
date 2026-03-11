import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import '../index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import ColorInput from 'components/elements/form/ColorInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const BuyCard = ({
   signUp, handleInputSignUpChange, handleSignUpSave, previewCheckout, settings,
}) => {
   return (
      <ItemWrapper>
         <div className='signUpCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Buy Button'
            />
            <div className='buyCard__colorInput'>
               <ColorInput
                  label='Button Color'
                  subLabel="Customize your template's buy button below"
                  name='checkout_button_color'
                  value={ signUp['buy-bottom'].checkout_button_color }
                  onChange={ (key, value) => handleInputSignUpChange(key, value) }
               />
            </div>

            <div className='signUpCard__content' id='buyCard__content'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner='Button Text'
               />
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner="Enter the text for your buy button (Suggestions: ''Buy Now!'' or ''Complete Order'')"
                  color='#8a94a2'
               />
               <TextInput
                  label=''
                  placeholder='Button text'
                  name='checkout_button_text'
                  value={ signUp['buy-bottom'].checkout_button_text }
                  onChange={ (key, value) => handleInputSignUpChange(key, value) }
               />
            </div>
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
                  onClick={ () => handleSignUpSave('buy-bottom') }
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

BuyCard.propTypes = {
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   handleInputSignUpChange: PropTypes.func,
   settings: PropTypes.object,
};

export default BuyCard;
