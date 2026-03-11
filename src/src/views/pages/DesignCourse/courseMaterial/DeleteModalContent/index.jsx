import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';

const DeleteModalContent = ({
   onCancel, onDelete, title, content, acceptText, cancelText,
}) => {
   return (
      <div>
         <div className='delete_section_modal'>
            <div className='delete_section_closeModal'>
               <div
                  role='presentation'
                  className='closeIcon'
                  onClick={ () => onCancel() }
               >
                  <Icon name='CloseXNew' />
               </div>
            </div>
            <div className='delete_section_content'>
               <div className='delete_section_modal_title'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.large }
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
                  <BaseButton
                     size={ btnSize.large }
                     theme={ btnTheme.grey }
                     text={ cancelText }
                     onClick={ () => onCancel() }
                  />
                  <BaseButton
                     size={ btnSize.large }
                     text={ acceptText }
                     onClick={ () => onDelete() }
                  />
               </div>
            </div>

         </div>
      </div>
   );
};

DeleteModalContent.defaultProps = {
   acceptText: 'Delete',
   cancelText: 'Cancel',
};

DeleteModalContent.propTypes = {
   onCancel: PropTypes.func,
   onDelete: PropTypes.func,
   title: PropTypes.string,
   content: PropTypes.string,
   acceptText: PropTypes.string,
   cancelText: PropTypes.string,
};

export default DeleteModalContent;
