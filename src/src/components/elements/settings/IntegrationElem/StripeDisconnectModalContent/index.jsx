import React from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';


const DeleteModalContent = ({
   learnMore, onDisconnect, title, cancelBtnText,
}) => {
   return (
      <div>
         <div className='stripeDisconnectModal'>
            <div className='m-b-s'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ `Disconnect ${ title || 'Stripe' }` }
               />
            </div>
            <div className='field__2'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.small14 }
                  inner="We don't recommend disconnecting if you have already accepted payments, unless absolutely necessarily. Doing so will automatically unpublish all products using this method, and you'll need to reset the payment method for each one."
               />
               {/* <a
                  href='https://support.miestro.com/594449-How-to-Disconnect-Stripe'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='red_color'
                  onClick={ (e) => { e.preventDefault(); learnMore(); } }
               >
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small14 }
                     inner='review the entire article'
                     style={ { color: '#b74051' } }
                  />
               </a>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.small14 }
                  inner=' before disconnecting.'
               /> */}
            </div>
            <div className='deleteModal__btns'>
               <div className='memberUpdate__btn cancel__btn'>
                  <BaseButton
                     size={ btnSize.medium }
                     theme={ btnTheme.school }
                     text={ cancelBtnText || 'Learn More' }
                     onClick={ () => learnMore() }
                  />

               </div>
               <div className='memberUpdate__btn' onClick={ (e) => onDisconnect(e) } role='presentation'>
                  <BaseButton
                     color='red'
                     size={ btnSize.medium }
                     style={ { backgroundColor: '#b74051' } }
                     text='Disconnect'
                     onClick={ () => {} }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

DeleteModalContent.propTypes = {
   learnMore: PropTypes.func,
   onDisconnect: PropTypes.func,
   title: PropTypes.string,
   cancelBtnText: PropTypes.string,
};

export default DeleteModalContent;
