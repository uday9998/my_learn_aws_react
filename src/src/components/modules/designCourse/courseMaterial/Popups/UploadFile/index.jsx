import React from 'react';
import './index.scss';
import PopupWrapper from 'components/elements/wrappers/PopupWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import UploadFileItem from 'components/elements/designCourse/courseMaterial/UploadFileItem';
import Icon from 'components/elements/Icon';

const UploadFile = () => {
   return (
      <PopupWrapper>
         <div className='uploadFileCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Upload a File'
            />
            <div className='m-t-exs m-b-exl'>
               <UploadFileItem icon='Image' uploaded file='awesome-file.jpg' />
               <UploadFileItem icon='Video' />
               <UploadFileItem icon='Multimedia' uploaded file='Important Doc' />
            </div>
            <div className='flex justife-between uploadActions'>
               <div className='addIcon-wrapp'>
                  <Icon name='Add' />
               </div>
               <div className='uploadFileCard__btns'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                     />
                  </div>
                  <div className='m-l-l'>
                     <BaseButton
                        size={ btnSize.large }
                        text='Uploading'
                     />
                  </div>
               </div>
            </div>
         </div>
      </PopupWrapper>
   );
};

export default UploadFile;
