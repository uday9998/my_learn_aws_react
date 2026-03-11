import React from 'react';
import './index.scss';
import PopupWrapper from 'components/elements/wrappers/PopupWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const DeleteLesson = () => {
   return (
      <PopupWrapper>
         <div className='deleteLesson'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Delete Lesson'
            />
            <div className='m-t-s m-b-exl'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='Are you sure you want to delete this lesson?'
                  bold
               />
            </div>
            <div className='deleteLesson__btns'>
               <div>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Keep file'
                  />
               </div>
               <div className='m-l-l'>
                  <BaseButton
                     size={ btnSize.large }
                     text='Delete'
                  />
               </div>
            </div>
         </div>
      </PopupWrapper>
   );
};

export default DeleteLesson;
