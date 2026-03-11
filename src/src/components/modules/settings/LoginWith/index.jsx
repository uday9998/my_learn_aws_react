import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
// import LoginItem from 'components/elements/settings/LoginItem';
// import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
// import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const LoginWith = () => (
   <ItemWrapper>
      <div className='loginWith'>
         {/* <Text
            type={ TextType.bold }
            size={ TextSize.medium }
            inner='Login With'
         />
         <div className='m-t-m' />
         <LoginItem name='Google' icon='GoogleGray' />
         <div className='loginWith__hasBorder'>
            <LoginItem name='Facebook' icon='FacebookGray' />
         </div>
         <LoginItem name='Twitter' icon='TwitterGray' />
         <div className='loginWith__btns'>
            <div>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSize.large }
                  text='Cancel'
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  text='Save'
               />
            </div>
         </div> */}
      </div>
   </ItemWrapper>
);

export default LoginWith;
