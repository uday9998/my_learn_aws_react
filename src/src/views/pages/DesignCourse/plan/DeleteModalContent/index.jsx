import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';

const DeleteModalContent = ({ onCancel, onDelete }) => {
   return (
      <div>
         <div className='delete_plan_modal'>
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
                     inner='Delete Plan'
                  />
               </div>
               <div className='field__2'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner='Are you sure you want to delete this plan?'
                  />
               </div>
            </div>
            <div className='deleteModal__btns'>
               <BaseButton
                  size={ btnSize.large }
                  text='Delete'
                  onClick={ () => onDelete() }
               />
               <BaseButton
                  size={ btnSize.large }
                  theme={ btnTheme.grey }
                  text='Cancel'
                  onClick={ () => onCancel() }
               />
            </div>
         </div>
      </div>
   );
};

DeleteModalContent.propTypes = {
   onCancel: PropTypes.func,
   onDelete: PropTypes.func,
};

export default DeleteModalContent;
