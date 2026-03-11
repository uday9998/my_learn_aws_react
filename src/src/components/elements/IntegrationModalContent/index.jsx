import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import NoCreditSvg from 'assets/images/nocreditcard.svg';
import Icon from 'components/elements/Icon';

const IntegrationModalContent = ({
   onCancel, onApprove, content,
}) => {
   return (
      <div>
         <div className='integrationModal'>
            <div role='presentation' className='closeX' onClick={ () => onCancel() } title='close'>
               <Icon name='CloseXNew' />
            </div>
            <img src={ NoCreditSvg } alt='noCredit' />
            <div className='field__2'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.large }
                  inner={ content }
               />
            </div>
            <div className='deleteModal__btns'>
               <div className='memberUpdate__btn cancel__btn'>
                  <BaseButton
                     size={ btnSize.medium }
                     theme={ btnTheme.lightGreen }
                     text='Go Back'
                     onClick={ () => onCancel() }
                  />

               </div>

               <div className='memberUpdate__btn' onClick={ (e) => onApprove(e) } role='presentation'>
                  <BaseButton
                     size={ btnSize.medium }
                     text='Go to Integrations'
                     onClick={ () => {} }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

IntegrationModalContent.propTypes = {
   onCancel: PropTypes.func,
   onApprove: PropTypes.func,
   content: PropTypes.string,
};

IntegrationModalContent.defaultProps = {
   content: 'Hang On! You’ll need to integrate with a payment processor first',
   onCancel: () => {},
   onApprove: () => {},

};


export default IntegrationModalContent;
