import React from 'react';
import './index.scss';
import PopupWrapper from 'components/elements/wrappers/PopupWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const CancelPopup = ({ hidden, onClose, onConfirm }) => {
   if (hidden) return null
   return (
      <PopupWrapper closeClick={onClose} hasShadow >
         <div className='deleteLesson'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Cancel Subscription'
            />
            <div className='m-t-s m-b-exl'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='Are you sure you want to cancel the subscripiton?'
                  bold
               />
            </div>
            <div className='deleteLesson__btns'>
               <div>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     onClick={ onClose }
                     text='No'
                  />
               </div>
               <div className='m-l-l'>
                  <BaseButton
                     size={ btnSize.large }
                     onClick={ onConfirm }
                     text='Yes'
                  />
               </div>
            </div>
         </div>
      </PopupWrapper>
   );
};

export default CancelPopup;
