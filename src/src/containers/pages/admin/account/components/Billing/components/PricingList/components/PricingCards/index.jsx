import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updatePricingPlan, connectToPlan } from 'api';
import { getConnectPlanType, getCurrencyPrice, getConstantData, getPlanType } from 'utils/pricing';
import { currencySymbols } from 'constants/pricing';
import { mainAppSelector, authUserSelector } from 'state/modules/common/selectors';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

import block from 'assets/images/pricing/blocks.png';
import hat from 'assets/images/pricing/hat.png';
import DowngradePopup from './components/DowngradePopup';

import './index.scss';

const PricingCards = ({
   plans,
   pricingCardData,
   type,
   currency,
}) => {
   const [updatePlan] = useSubmitForm(updatePricingPlan);
   const [connectPlan] = useSubmitForm(connectToPlan);
   const [showDowngradePopup, setShowDowngradePopup] = useState({
      isShow: false,
      title: '',
   });
   
   // Get the corrected plan data using the same logic as the main billing section
   const mainApp = useSelector(mainAppSelector);
   const authUser = useSelector(authUserSelector);
   const correctedPlanData = getConstantData(mainApp.plan_name, plans, authUser);
   const currentPlanType = getPlanType(correctedPlanData, mainApp);

   const handleUpdatePlan = (planName) => {
      if (!plans.currentSubscription?.plan_name || plans.currentSubscription.plan_name?.includes('starter')) {
         connectPlan(getConnectPlanType(type, planName), res => {
            window.open(res.url);
            localStorage.removeItem('showPlans');
         });
      } else {
         updatePlan(getConnectPlanType(type, planName), res => {
            window.open(res.url);

            localStorage.removeItem('showPlans');
         });
      }
   };

   const handleDownGrade = (title) => {
      setShowDowngradePopup(prevState => {
         return {
            isShow: !prevState.isShow,
            title: title || '',
         };
      });
   };

   // Get the current plan data using the corrected plan information
   const currentPlanData = pricingCardData.find(
      data => currentPlanType.title?.toLowerCase() === data.title.toLowerCase()
   );

   return (
      <div className='cards__wrapper'>
         {
            showDowngradePopup.isShow && (
               <DowngradePopup
                  handleClosePopup={handleDownGrade}
                  handleUpdatePlan={handleUpdatePlan}
                  title={showDowngradePopup.title}
               />
            )
         }

         {
            pricingCardData.map(priceCardData => {
               // Check if this specific card is the current plan using corrected data
               const titleMatches = currentPlanType.title?.toLowerCase() === priceCardData.title.toLowerCase();
               
               // Also check if the billing period matches (monthly vs yearly)
               // Check if current plan is monthly/yearly by checking both subscription and mainApp data
               const currentPlanIncludesMonthly = plans.currentSubscription?.plan_name?.includes('monthly') || 
                                                  mainApp.plan_name?.includes('monthly');
               const currentPlanIncludesYearly = plans.currentSubscription?.plan_name?.includes('yearly') || 
                                                 mainApp.plan_name?.includes('yearly');
               
               // If it's a Stripe price ID, check against our environment variables
               let currentIsMonthly = currentPlanIncludesMonthly;
               if (plans.currentSubscription?.plan_name?.startsWith('price_')) {
                  const currentPriceId = plans.currentSubscription.plan_name;
                  currentIsMonthly = [
                     process.env.REACT_APP_STRIPE_ESSENTIAL_MONTHLY_PRICE_ID,
                     process.env.REACT_APP_STRIPE_SURGE_MONTHLY_PRICE_ID,
                     process.env.REACT_APP_STRIPE_INFINITE_MONTHLY_PRICE_ID
                  ].includes(currentPriceId);
               } else if (currentPlanIncludesYearly) {
                  currentIsMonthly = false;
               }
               
               const cardIsMonthly = type === 'monthly';
               const billingPeriodMatches = currentIsMonthly === cardIsMonthly;
               
               const isCurrentPlan = titleMatches && billingPeriodMatches;

               return (
                  <div
                     style={{
                        background: priceCardData.backgroundColor,
                        height: priceCardData.title === 'Surge' ? '940px' : '',
                     }}
                     className='card__wrapper'
                  >
                     <div className='top__section__wrapper'>
                        <Text
                           inner={priceCardData.topTitle}
                           size={sizes.xsmall}
                           type={types.bold700}
                           style={{
                              color: priceCardData.topTitleColor,
                              textTransform: 'uppercase',
                           }}
                        />
                        <div className='title__wrapper'>
                           <Text
                              inner={priceCardData.title}
                              size={sizes.new_size_44}
                              type={types.bold700}
                              style={{
                                 color: priceCardData.color,
                                 textTransform: 'uppercase',
                              }}
                           />
                        </div>
                        <div className='subtitle__wrapper'>
                           <Text
                              inner={priceCardData.subtitle}
                              size={sizes.xlarge_new}
                              style={{
                                 color: priceCardData.statusColor,
                              }}
                           />
                        </div>
                        <div className='background__img__wrapper'>
                           <img src={block} alt='blocks' />
                           {
                              priceCardData.isHat && <img src={hat} alt='hat' />
                           }
                        </div>
                     </div>
                     <div className='center__section__wrapper'>

                        <div className='center__section__price'>
                           {priceCardData.title === "Custom" ? (
                              <a
                                 href="https://training.miestro.com/demo"
                                 style={{
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: priceCardData.pricingTypeColor
                                 }}
                              >
                                 <Text
                                    inner="Contact us"
                                    size={sizes.new36}
                                    style={{
                                       color: priceCardData.pricingTypeColor,
                                    }}
                                 />
                              </a>
                           ) : (
                              <Text
                                 inner={getCurrencyPrice(priceCardData.title, priceCardData.pricingType, currency)}
                                 size={sizes.new36}
                                 style={{
                                    color: priceCardData.pricingTypeColor,
                                 }}
                              />
                           )}
                           {priceCardData.pricingTypeSectondText && (
                              <Text
                                 inner={priceCardData.pricingTypeSectondText}
                                 size={sizes.xxlarge}
                                 style={{
                                    color: priceCardData.pricingTypeColor,
                                 }}
                              />
                           )}
                        </div>
                        <BaseButton
                           text={
                              priceCardData.title === "Custom"
                                 ? "Talk to a Real Human"
                                 : isCurrentPlan
                                    ? 'Current Plan'
                                    : currentPlanData && currentPlanData?.id > priceCardData.id
                                       ? `Downgrade to ${priceCardData.title}`
                                       : `Upgrade to ${priceCardData.title}`
                           }
                           disabled={isCurrentPlan}
                           theme={
                              isCurrentPlan
                                 ? themes.secondary
                                 : themes[priceCardData.buttonTheme]
                           }
                           onClick={() => {
                              if (priceCardData.title === "Custom") {
                                 window.open("https://training.miestro.com/demo", "_blank");
                              } else if (currentPlanData && currentPlanData?.id > priceCardData.id) {
                                 handleDownGrade(priceCardData.title);
                              } else {
                                 handleUpdatePlan(priceCardData.title);
                              }
                           }}
                           style={{
                              marginTop: priceCardData.title === 'Surge' && '18px',
                           }}
                        />
                     </div>
                     {
                        priceCardData.optionsTitle && (
                           <div className='opions__title__wrapper'>
                              <Text
                                 inner={priceCardData.optionsTitle}
                                 size={sizes.small}
                                 type={types.new_bold}
                                 style={{
                                    color: priceCardData.color,
                                 }}
                              />
                           </div>
                        )
                     }
                     <div className='icons__wrapper'>
                        {
                           priceCardData.options.map(option => {
                              return (
                                 <div className='icons__text__wrapper'>
                                    <div
                                       className='icon'
                                       style={{
                                          background: priceCardData.optionsIconsColor,
                                          border: `1px solid ${priceCardData.optionIconsBorderColor}`,
                                       }} />
                                    <Text
                                       inner={option}
                                       size={sizes.large}
                                       style={{
                                          color: priceCardData.optionTextColor,
                                       }}
                                    />
                                 </div>
                              );
                           })
                        }
                     </div>
                  </div>
               );
            })
         }
      </div>
   );
};

PricingCards.propTypes = {
   plans: PropTypes.object,
   currency: PropTypes.object,
   pricingCardData: PropTypes.array,
   type: PropTypes.string,
};

export default PricingCards;