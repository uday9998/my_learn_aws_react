import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import AffiliateCommission from 'components/elements/promotions/affiliates/AffiliateCommission';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import FromToForm from 'components/elements/promotions/affiliates/FromToForm';

const AffiliatesCard = () => {
   return (
      <ItemWrapper secondShadow>
         <div className='affiliatesCard'>
            <div className='affiliatesCard__title'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Affiliate'
               />
            </div>
            <div className='m-b-exl'>
               <FromToForm />
            </div>
            <div className='affiliatesCard__commissions'>
               <AffiliateCommission name='Payable Commission' />
               <div className='m-l-exl' />
               <AffiliateCommission name='Paid Commission' />
               <div className='m-l-exl' />
               <AffiliateCommission name='Total Commission' />
            </div>
            <div className='affiliate__signup'>
               <TextInput
                  placeholder='courses.miestro.com/affiliates/register/step1'
                  label='Affiliate Signup'
                  icon='Copy'
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

export default AffiliatesCard;
