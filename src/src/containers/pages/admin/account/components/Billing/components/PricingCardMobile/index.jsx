import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateCard } from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';


import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import DropTriggle from 'components/elements/newDropTriggle';

import blocks from 'assets/images/pricing/blocks.png';
import IconNew from 'components/elements/iconsSize';
import moment from 'moment';
import SummaryMobile from '../SummaryMobile';


import './index.scss';

const PricingCardMobile = ({
   plans,
   handleShowPricingList,
   priceData,
   handleChangeModal,
}) => {
   const [showSummary, setShowSummary] = useState(false);
   const [updatePaymentInfo] = useSubmitForm(updateCard);

   useEffect(() => {
      const adminContent = document.querySelector('.adminContent');
      const headerType = document.querySelector('.header__type__second');
      headerType.style.padding = '16px 16px';
      adminContent.style.padding = 0;

      return () => {
         adminContent.style.padding = '0 33px 0';
         headerType.style.padding = '34px 0px 32px';
      };
   }, []);

   const handleShowSummary = () => {
      setShowSummary(prevState => !prevState);
   };

   const handleUpdatePaymentInfo = () => {
      updatePaymentInfo({}, res => {
         window.open(res.url);
      });
   };
   // -6px 23%, 60% 25%
   return (
      <div
         style={ {
            backgroundImage: `url(${ blocks }), url(${ priceData.icon })`,
            backgroundPosition: showSummary ? '-6px 13.5%, 65.5% 15.5%' : priceData.isPaused ? '-6px 23%, 60% 25%' : '-6px 35%, 64% 31%',
         } }
         className='pricing__card__mobile__wrapper'>
         <div className='drop__menu'>
            {
               priceData.isUpgradePaymentInfo && (
                  <DropTriggle
                     isMob={ true }
                     isPlaylist={ true }
                     isIconButton={ true }
                     top='310px'
                     left='885px'
                     className='pricing__card__popover'
                     options={ [
                        {
                           trash: true,
                           iconName: !priceData?.status ? '' : 'CancelSubscription',
                           name: !priceData?.status ? 'Reactivate' : 'Cancel Subscription',
                           onClick: () => { handleChangeModal(); },
                           disabled: Boolean(priceData.isCustom),
                           tooltipText: priceData.isCustom ? 'There is no active subscription' : undefined,
                        },

                     ] }
                  />
               )
            }
         </div>
         <div className='top__section__wrapper'>
            <div className='top__title__wrapper'>
               <Text 
                  inner={ priceData.subtitle }
                  size={ sizes.xsmall }
                  type={ types.bold700 }
                  style={ {
                     textTransform: 'uppercase',
                     color: '#444C4B',
                  } }
               />
            </div>
            <div className='title__wrapper'>
               <Text 
                  inner={ priceData.title }
                  size={ sizes.new_size_44 }
                  type={ types.bold700 }
                  style={ {
                     textTransform: 'uppercase',
                     color: '#131F1E',
                  } }
               />
            </div>
            <div className='footer__text'>
               <Text 
                  inner='Plan'
                  size={ sizes.xlarge_new }
                  style={ {
                     color: '#7E9997',
                  } }
               />
            </div>
         </div>
         <div className='center__section__wrapper'>
            <div className='top__payment__wrapper'>
               <div className='left__section'>
                  <Text 
                     inner={ `${ priceData.title } Plan` }
                     size={ sizes.xxlarge }
                     style={ {
                        color: '#3060BD',
                     } }
                  />
               </div>
               <div className='current__plan__wrapper'>
                  <span>Current Plan</span>
               </div>
            </div>

            <div className='billing__date__wrapper'>
               <div className='payment__wrapper'>
                  <Text 
                     inner='Member Since'
                     size={ sizes.small14 }
                     style={ {
                        color: '#727978',
                     } }
                  />
                  {
                     (priceData.nextPayment) && (
                        <Text 
                           inner='Next Payment'
                           size={ sizes.small14 }
                           style={ {
                              color: '#727978',
                           } }
                        />
                     )
                  }
               </div>
               <div className='date__wrapper'>
                  <Text 
                     inner={ priceData.trialStart }
                     size={ sizes.large_new }
                  />
                  {
                     plans?.currentSubscription?.next_billing_at && (
                        <Text 
                           inner={ plans?.currentSubscription?.next_billing_at ? moment(plans.currentSubscription.next_billing_at, 'YYYY/MM/DD').format('MMM DD, YYYY') : '' }
                           size={ sizes.large_new }
                           style={ {
                              color: '#131F1E',
                           } }
                        />
                     )
                  }
               </div>
            </div>
         </div>
         {
            priceData.isPaused && (
               <div className='footer__wrapper'>
                  <div>
                     <IconNew name='infoM' />
                  </div>
                  <Text 
                     inner='Reactivate your subscription when ready'
                     size={ sizes.size_14 }
                     type={ types.new__weight__second }
                     style={ {
                        color: '#131F1E',
                        lineHeight: 1.7,
                     } }
                  />
               </div>
            ) 
         }
         <div className='buttons__wrapper'>
            <BaseButton 
               text={ priceData.isPaused ? 'Reactivate Plan' : priceData.isChangeButton ? 'Change Plan' : 'Upgrade Plan' }
               onClick={ handleShowPricingList }
            />
            {
               (priceData.isUpgradePaymentInfo || (plans.currentSubscription && plans.customer_id)) && (
                  <BaseButton
                     text='Update Payment Info'
                     theme={ themes.secondary }
                     onClick={ handleUpdatePaymentInfo }
                     disabled={ Boolean(priceData.isCustom) }
                     newTooltipText='Please subscribe first to a plan'
                     isPricing={ true }
                  />
               )
            }
            {showSummary && <SummaryMobile plans={ plans } />}
            <BaseButton 
               text={ showSummary ? 'Hide Plan Summary' : 'Show Plan Summary' }
               theme={ themes.new_privacy }
               onClick={ handleShowSummary }
            />
         </div>
      </div>
   );
};

PricingCardMobile.propTypes = {
   plans: PropTypes.object,
   priceData: PropTypes.object,
   handleShowPricingList: PropTypes.func,
   handleChangeModal: PropTypes.func,
};

export default PricingCardMobile;