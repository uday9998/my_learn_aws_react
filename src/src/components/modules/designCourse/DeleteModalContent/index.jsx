import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';


const DeleteModalContent = ({ onCancel, onApprove }) => {
   return (
      <div>
         <div className='deleteModal'>
            <div className='m-b-exl'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Delete Product'
               />
            </div>
            <div className='field__2'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='Are you sure you want to delete this product?'
               />
            </div>
            <div className='deleteModal__btns'>
               <div className='memberUpdate__btn cancel__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     theme={ btnTheme.grey }
                     text='Cancel'
                     onClick={ () => onCancel() }
                  />

               </div>

               <div className='memberUpdate__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Yes'
                     onClick={ () => onApprove() }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

DeleteModalContent.propTypes = {
   onCancel: PropTypes.func,
   onApprove: PropTypes.func,
};

export default DeleteModalContent;
