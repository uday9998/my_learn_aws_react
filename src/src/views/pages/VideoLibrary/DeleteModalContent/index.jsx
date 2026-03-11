import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';


const DeleteModalContent = ({
   onCancel, onApprove, title, content,
}) => {
   return (
      <div>
         <div className='deleteVideoModal'>
            <div className='m-b-exl'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner={ title }
               />
            </div>
            <div className='field__2'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner={ content }
               />
            </div>
            <div className='deleteModal__btns'>
               <div className='videoUpdate__btn cancel__btn'>
                  <BaseButton
                     size={ btnSize.large }
                     theme={ btnTheme.grey }
                     text='Cancel'
                     onClick={ () => onCancel() }
                  />

               </div>

               <div className='videoUpdate__btn' onClick={ (e) => onApprove(e) } role='presentation'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Yes'
                     onClick={ () => {} }
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
   title: PropTypes.string,
   content: PropTypes.string,
};

export default DeleteModalContent;
