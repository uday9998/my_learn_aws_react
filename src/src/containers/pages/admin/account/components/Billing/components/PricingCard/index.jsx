/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   cancelPlan,
   reactivateSub,
   sendSession, sendSubscriptionUpdate, updateCard,
} from 'api';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import DropTriggle from 'components/elements/newDropTriggle';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';

import blocks from 'assets/images/pricing/blocks.png';
import moment from 'moment';

import './index.scss';

const PricingCard = ({
   plans,
   handleShowPricingList,
   mainApp,
   getPlans,
   handleChangeModal,
   handleToggleLoading,
   priceData,
   init,
}) => {
   const { hash } = useLocation();
   const history = useHistory();
   const [checkoutSessionSend] = useSubmitForm(sendSession);
   const [reactivatePlan] = useSubmitForm(reactivateSub);
   const [subscriptionUpdate] = useSubmitForm(sendSubscriptionUpdate);
   const [updatePaymentInfo] = useSubmitForm(updateCard);

   useEffect(() => {
      if (hash && hash.includes('connect_checkout_success=true')) {
         const sessiontPart = hash.split('&').find(part => part.includes('session_id='));
         const sessionId = sessiontPart ? sessiontPart.split('=')[1] : false;

         if (sessionId) {
            handleToggleLoading();
            checkoutSessionSend({
               session: sessionId,
            }, () => {
               history.push(history.pathname);
               getPlans();
               handleToggleLoading();
            });
         }
      } else if (hash.includes('subscription_update=true')) {
         subscriptionUpdate({}, () => {
            history.push(history.pathname);
            getPlans();
            init();
         });
      }
   }, []);

   const handleUpdatePaymentInfo = () => {
      updatePaymentInfo({}, res => {
         window.open(res.url);
      });
   };

   const handleReactivatePlan = () => {
      reactivatePlan(plans.currentSubscription.id, () => {
         getPlans();
      });
   };

   const handleChangeStatus = (isCancel) => {
      if (isCancel) {
         handleChangeModal();
      } else {
         handleReactivatePlan();
      }
   };
   return (
      <div
         style={ {
            backgroundImage: `url(${ blocks }), url(${ priceData.icon })`,
            height: priceData.title === 'Starter' ? '196px' : 'auto',
            backgroundPosition: priceData.isPaused && '-11px 88%, 22% 59%',
         } }
         className='billing__card__wrapper'>
         <div className='left__wrapper'>
            <div className='left__subtitle__wrapper'>
               <Text
                  inner={ priceData.subtitle }
                  type={ types.bold }
                  size={ sizes.xsmall }
                  style={ {
                     color: '#444C4B',
                     textTransform: 'uppercase',
                  } }
               />
            </div>
            <div className='left__title__wrapper'>
               <Text
                  inner={ mainApp?.plan_name && mainApp.plan_name.toLowerCase().includes('infinite') ? 'Infinite' : mainApp?.plan_name && mainApp.plan_name.toLowerCase().includes('life') ? 'Lifetime' : priceData.title }
                  type={ types.bold }
                  size={ sizes.new_size_44 }
                  style={ {
                     color: '#131F1E',
                     textTransform: 'uppercase',
                  } }
               />
            </div>
            <div className='left__type__wrapper'>
               <Text
                  inner='Plan'
                  size={ sizes.xlarge_new }
                  style={ {
                     color: '#7E9997',
                  } }
               />
            </div>
         </div>

         <div
            style={ {
               marginTop: !(mainApp?.plan_name && !mainApp?.plan_name.toLowerCase().includes('life')) && '42px',
            } }
            className='center__wrapper'>
            {
               mainApp?.plan_name && !mainApp?.plan_name.toLowerCase().includes('life') && (
                  <>
                     <div className='center__title__wrapper'>
                        <Text
                           inner={ priceData.centerSectionTitle }
                           type={ types.bold }
                           size={ sizes.xxlarge }
                           style={ {
                              color: '#3060BD',
                           } }
                        />
                     </div>
                     <div className='center__small__text__wrapper'>
                        <Text
                           inner='Member Since'
                           size={ sizes.small14 }
                           style={ {
                              color: '#727978',
                           } }
                        />
                        {
                           (plans?.nextPayment || plans?.currentSubscription?.next_billing_at) && (
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
                     <div className='center__subtitle__wrapper'>
                        <Text
                           inner={ priceData.trialStart }
                           size={ sizes.large_new }
                           style={ {
                              color: '#131F1E',
                           } }
                        />
                        {
                           !priceData.status && priceData.title !== 'Starter' ? (
                              <div className='canceled__subscription__wrapper'>
                                 <span>Subscription Canceled</span>
                              </div>
                           ) : (plans?.currentSubscription?.next_billing_at) && (
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
                  </>
               )
            }
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
            {
               (!priceData.summaryTextsKey.includes('goat_annual') && !priceData.summaryTextsKey.includes('goat_monthly')) && (
                  <div className='center__button__wrapper'>
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
                              disabled={ Boolean(priceData.isCustom) && !plans.customer_id }
                              newTooltipText={ Boolean(priceData.isCustom) && !plans.customer_id ? 'Please subscribe first to a plan' : undefined }
                              isPricing={ true }
                           />
                        )
                     }
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
                                    onClick: () => { handleChangeStatus(priceData?.status); },
                                    disabled: Boolean(priceData.isCustom || priceData.isPaused),
                                    tooltipText: priceData.isCustom ? 'There is no active subscription' : undefined,
                                 },

                              ] }
                           />
                        )
                     }
                  </div>
               )
            }
         </div>
         <div className='right__wrapper'>
            <Text
               inner='Current Plan'
               size={ sizes.xsmall }
               type={ types.bold }
               style={ {
                  color: '#727978',
               } }
            />
         </div>
      </div>
   );
};

PricingCard.propTypes = {
   plans: PropTypes.object,
   mainApp: PropTypes.object,
   handleShowPricingList: PropTypes.func,
   getPlans: PropTypes.func,
   handleChangeModal: PropTypes.func,
   handleToggleLoading: PropTypes.func,
   priceData: PropTypes.object,
   init: PropTypes.func,
};

export default PricingCard;
