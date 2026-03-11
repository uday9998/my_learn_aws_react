import React from 'react';
import './index.mob.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import SearchFilter from 'components/elements/SearchFilter/index.mob';
import AffiliateCommission from 'components/elements/promotions/affiliates/AffiliateCommission';
import TextInput from 'components/elements/form/TextInput';

const AffiliatesCard = () => {
   return (
      <ItemWrapper>
         <div className='mob-affiliate' style={ { padding: '24px 24px 32px 24px' } }>
            <Text
               className='text-center'
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Affiliate'
            />
            <div className='m-t-exl m-b-exl'>
               <SearchFilter nameExist={ false } labelExist={ false } btnText='Show' />
            </div>
            <div className='itemWrapper-n'>
               <AffiliateCommission name='Payable Commission' />
            </div>
            <div className='itemWrapper-n m-t-exl m-b-exl'>
               <AffiliateCommission name='Paid Commission' />
            </div>
            <div className='itemWrapper-n m-b-exl'>
               <AffiliateCommission name='Total Commission' />
            </div>
            <div className='p-t-exl mob-textInput'>
               <TextInput
                  placeholder='courses.miestro.com/affiliate'
                  label='Affiliate Signup'
                  icon='Copy'
               />
            </div>
         </div>
      </ItemWrapper>
   );
};

export default AffiliatesCard;
