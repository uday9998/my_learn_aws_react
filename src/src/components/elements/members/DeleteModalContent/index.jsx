import React from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';


const DeleteModalContent = ({
   onCancel, onApprove, title, content, isLandingDraftModalContent, deleteText,
}) => {
   return (
      <div>
         <div className='deleteModal'>
            {!isLandingDraftModalContent && !!title && (
               <div className='m-b-exs'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.medium }
                     inner={ title }
                  />
               </div>
            )}
            <div className='field__2'>
               <Text
                  type={ TextType.mediumSmall }
                  size={ TextSize.xxlarge }
                  inner={ content }
               />
            </div>

            <div className='deleteModal__btns'>
               {!isLandingDraftModalContent
            && (
               <div className='memberUpdate__btn cancel__btn'>
                  <BaseButton
                     size={ btnSize.large120 }
                     theme={ btnTheme.secondary }
                     text='Cancel'
                     onClick={ () => onCancel() }
                  />

               </div>
            )}
               <div className='memberUpdate__btn' onClick={ (e) => onApprove(e) } role='presentation'>
                  <BaseButton
                     size={ btnSize.large120 }
                     theme={ btnTheme.red }
                     text={ deleteText || (isLandingDraftModalContent ? 'Ok' : 'Delete') }
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
   isLandingDraftModalContent: PropTypes.bool,
   deleteText: PropTypes.string,
};

export default DeleteModalContent;
