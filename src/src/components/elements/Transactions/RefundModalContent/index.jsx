import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';


const RefundModalContent = ({ onCancel, paymentMethod }) => {
   return (
      <div>
         <div className='refund_modal'>
            <div>
               <div className='delete_plan_closeModal'>
                  <div
                     role='presentation'
                     className='closeIcon'
                     onClick={ (e) => onCancel() }
                  >
                     <Icon name='CloseX' />
                  </div>
               </div>
               <div className='delete_plan_modal_title'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner='Refund'
                  />
               </div>
               <div className='field__2'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner='To refund the transaction please visit the payment process page using this link.'
                  />
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     // eslint-disable-next-line react/jsx-no-target-blank
                     inner={ [' ', <a className='refund-modal-content-link' href={ `${ paymentMethod === 'stripe' ? 'https://stripe.com/' : 'https://www.paypal.com/' }` } target='_blank'>{ paymentMethod }</a>] }
                  />
               </div>
            </div>
            <div className='deleteModal__btns'>
               <BaseButton
                  size={ btnSize.large }
                  theme={ btnTheme.grey }
                  text='Close'
                  onClick={ () => onCancel() }
               />
            </div>
         </div>
      </div>
   );
};

RefundModalContent.propTypes = {
   onCancel: PropTypes.func,
   paymentMethod: PropTypes.string,
};

export default RefundModalContent;
