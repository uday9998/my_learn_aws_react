import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import SliceAndConnectText from 'utils/getSplitedText';
import IconButton from 'components/elements/buttons/IconButton';
import { copyToClipBoard } from 'utils/copy';
import Input from 'components/elements/inputNew';
import IconNew from 'components/elements/iconsSize';

const AffiliateUserOffer = ({ offer }) => {
   const [isOpenCharts, setIsOpenCharts] = useState(false);
   return (
      <div className='affiliate__user__offer'>
         <div className='affiliate__user__offer__top'>
            <div className='affiliate__user__offer__top__left'>
               <img src={ offer.picture_src } alt='' />
               <div className='info'>
                  <Text
                     inner='Design Master Class'
                     type={ types.regular148 }
                     size={ sizes.medium }
                  />
                  <div className='info__bottom'>
                     <TextWithIcon
                        inner={ `$${ offer.income }` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        iconName='AffiliateMoneyS'
                        isIconRight={ false }
                     />
                     <Text
                        inner='Your Total Revenue'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                     <div className='info__bottom__line' />
                     <TextWithIcon
                        inner={ `$${ offer.affiliateIncome }` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        iconName='AffiliateMoneyS'
                        isIconRight={ false }
                     />
                     <Text
                        inner='Affiliate Total Revenue'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
               </div>
            </div>
            <div className='affiliate__user__offer__top__right'>
               <Input
                  type='number'
                  label='Commission'
                  minNumber={ 0 }
                  helpText='Percents, %'
                  disabled={ offer.pricings.length === 1 && offer.pricings[0].pricing_type === 0 }
                  maxNumber={ 100 }
                  value={ offer.commission }
                  onChange={ (name, value) => {} }
               />
               <div
                  className='affiliate__user__offer__top__right__icon'
                  role='presentation'
                  onClick={ () => setIsOpenCharts(!isOpenCharts) }
                  style={ { transform: isOpenCharts ? 'rotate(180deg)' : 'rotate(0deg)' } }
               >
                  <IconNew name='AffiliateArrowL' />
               </div>
            </div>
         </div>
         {isOpenCharts && (
            <div className='affiliate__user__offer__charts'>
               Charts Income
            </div>
         )}
         <div className='affiliate__user__offer__bottom'>
            <div className='affiliate__user__offer__bottom__item'>
               <Text
                  inner='Landing Page'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <div className='inputView'>
                  <Text
                     inner={ SliceAndConnectText(offer.landing_url, 20) }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <IconButton
                     name='AffiliateCopyM'
                     onClick={ () => copyToClipBoard(offer.landing_url) }
                  />
               </div>
            </div>
            <div className='affiliate__user__offer__bottom__item'>
               <Text
                  inner='Portal'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <div className='inputView'>
                  <Text
                     inner={ SliceAndConnectText(offer.schoolRoom_url, 20) }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <IconButton
                     name='AffiliateCopyM'
                     onClick={ () => copyToClipBoard(offer.schoolRoom_url) }
                  />
               </div>
            </div>
            <div className='affiliate__user__offer__bottom__item'>
               <Text
                  inner='Checkout Page'
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <div className='inputView'>
                  <Text
                     inner={ SliceAndConnectText(offer.checkout_url, 20) }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
                  <IconButton
                     name='AffiliateCopyM'
                     onClick={ () => copyToClipBoard(offer.checkout_url) }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

AffiliateUserOffer.propTypes = {
   offer: PropTypes.object,
};

export default AffiliateUserOffer;
