import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import TextInput from 'components/elements/form/TextInput';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const AddAffiliateCard = () => {
   return (
      <ItemWrapper secondShadow>
         <div className='addAffiliateCard'>
            <TextInput
               placeholder='justin@miestro.com'
               label='Email Address'
            />
            <TextInput
               placeholder='justin@miestro.com'
               label='PayPal Email (For Payout)'
            />
            <TextInput
               placeholder='Justin'
               label='Full Name'
            />
            <TextInput
               placeholder='Justin'
               label='Password'
            />
            <div className='addAffiliateCard__btns'>
               <div className='addAffiliates__btn-cancel'>
                  <BaseButton
                     theme={ btnTheme.grey }
                     size={ btnSize.large }
                     text='Cancel'
                  />
               </div>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  text='Add Affiliate'
               />

            </div>
         </div>
      </ItemWrapper>
   );
};

export default AddAffiliateCard;
