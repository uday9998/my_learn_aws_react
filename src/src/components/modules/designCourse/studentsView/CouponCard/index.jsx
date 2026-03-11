import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import PopupWrapper from 'components/elements/wrappers/PopupWrapper';

const CouponCard = () => {
   return (
      <PopupWrapper hasShadow>
         <div className='couponCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Have a Coupon Code'
            />
            <div className='couponCard__form m-t-m'>
               <TextInput
                  placeholder='MMDC2019'
                  label='Coupon Code'
               />
               <div className='btnWrapper'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.medium }
                     text='Apply'
                  />
               </div>
            </div>
         </div>
      </PopupWrapper>
   );
};

export default CouponCard;
