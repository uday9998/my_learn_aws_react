/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import PlanItemsList from 'components/modules/plans/PlanItemsList';
import PlanCard from 'components/modules/plans/PlanCard';
import PlanSubscription from 'components/modules/plans/PlanSubscription';

import PlanSubscriptionHistory from 'components/modules/plans/PlanSubscriptionHistory';
import Modal from 'components/elements/Modal';
import PropTypes from 'prop-types';
import CustomSwitch from 'components/elements/form/CustomSwitch';

import ConnectCardModalContent from 'components/modules/plans/ConnectCardModalContent';
import UpdateCardModalContent from 'components/modules/plans/UpdateCardModalContent';
import ChangePlanErrorModal from 'components/modules/plans/ChangePlanErrorModal';

const Plans = ({
   plans, subscription, handleCancelPlan, handleChangePlan, onPlanModalOpen,
   onCloseModal, updateCardModalOpen, setupdateCardModalOpen, setPlansModalOpen,
   plansModalOpen, handleUpdateCard, status, plansModalStateInProgress,
   changePlanError, onCloseErrorModal, changePlanErrors, mainApp, refunded,
   cardUpdateModalIsInProgress, setCardUpdateModalState,
}) => {
   const currentName = subscription && subscription.current ? subscription.current.plan_name : '';
   const [switchLeftorRight, setswitchLeftorRight] = useState((currentName && currentName.indexOf('yearly') !== -1) ? 2 : 1);
   const intervalRef = useRef(null);
   const actionRef = useRef(false);
   const planCards = [
      {
         title: 'LAUNCH PLAN',
         name: 'miestro-starter-plan-monthly',
         annuallyName: 'miestro-starter-plan-yearly',
         price: plans.plan_prices['miestro-starter-plan-monthly'],
         annuallyPrice: parseInt(plans.plan_prices['miestro-starter-plan-yearly'] / 12, 10),
         orders: plans.plan_features['miestro-starter'],
      },
      {
         title: 'PREMIUM PLAN',
         name: 'miestro-professional-plan-monthly',
         annuallyName: 'miestro-professional-plan-yearly',
         price: plans.plan_prices['miestro-professional-plan-monthly'],
         annuallyPrice: parseInt(plans.plan_prices['miestro-professional-plan-yearly'] / 12, 10),
         orders: plans.plan_features['miestro-professional'],
      },
      {
         title: 'GROWTH PLAN',
         name: 'miestro-business-plan-monthly',
         annuallyName: 'miestro-business-plan-yearly',
         price: plans.plan_prices['miestro-business-plan-monthly'],
         annuallyPrice: parseInt(plans.plan_prices['miestro-business-plan-yearly'] / 12, 10),
         orders: plans.plan_features['miestro-business'],
      },
   ];


   function changeModal() {
      setPlansModalOpen(false);
      setTimeout(() => { setupdateCardModalOpen(true); }, 500);
   }

   function handleSwitchChange(name, value) {
      setswitchLeftorRight(value);
   }

   function isActive(current, nam, annuallyName) {
      const name = switchLeftorRight === 2 ? annuallyName : nam;
      let isActiveName = false;
      if (current && current.indexOf('trial') !== -1) {
         isActiveName = `${ name }-with-trial` === current;
      } else {
         isActiveName = current === name;
      }
      if (isActiveName) return switchLeftorRight;
      return 0;
   }

   function handleCloseModal(modal) {
      switch (modal) {
         case 'card':
            setupdateCardModalOpen(false);
            break;
         case 'plans':
            setPlansModalOpen(false);
            break;
         default:
            break;
      }
      onCloseModal();
   }

   function openModal(plan) {
      onPlanModalOpen(plan);
      setPlansModalOpen(true);
   }

   function updateModalPlanName(plan) {
      onPlanModalOpen(plan);
   }

   useEffect(() => {
      // window.HelpCrunch('showChatWidget');
      if (typeof window.Beacon === 'function') {
         window.Beacon('init', process.env.REACT_APP_HELPSCUOT_BEACON_ID);
      }
   }, []);

   function onUnload() {
      window.location.reload();
   }

   function listenPopUpChange() {
      const el = document.querySelector('iframe[src*=cancellation-saver]');
      if (actionRef.current && !el) {
         onUnload();
      }
      if (el) {
         actionRef.current = true;
         el.addEventListener('DOMNodeRemoved', onUnload);
      }
   }
   useEffect(() => {
      intervalRef.current = setInterval(listenPopUpChange, 2000);
      return () => {
         clearInterval(intervalRef.current);
      };
   }, []);

   const isNotSpecialPlans = () => {
      switch (currentName) {
         case 'miestro-professional-plan-monthly-99':
         case 'miestro-professional-plan-yearly-797':
         case '3-pay-plan-997':
         case 'miestro-professional-plan-6-month':
         case 'miestro-business-plan-6-month':
            return false;
         default:
            return true;
      }
   };

   return (
      <div className='d-plan'>
         {isNotSpecialPlans() && (
            <>
               <div className='d-switch'>
                  <CustomSwitch
                     firstOption={ { inner: 'Monthly', value: 1 } }
                     secondOption={ { inner: 'Annually', value: 2 } }
                     checked={ switchLeftorRight }
                     onClick={ (name, value) => handleSwitchChange(name, value) }
                     backgroundColor='#fff'
                     checkedBackground='#7cb740'
                     textColor='#3f4f65'
                     checkedTextColor='#fff'
                  />
               </div>

               <div className='d-planCard'>
                  {
                     planCards.map(planCard => {
                        let active;
                        switch (currentName) {
                           case 'miestro-starter-plan-monthly-with-trial-30':
                           case 'miestro-starter-plan-monthly-with-trial':
                           case 'miestro-starter-plan-monthly-old-49':
                           case 'miestro-starter-plan-monthly-with-trial-card':
                              active = isActive('miestro-starter-plan-monthly', planCard.name, planCard.annuallyName);
                              break;
                           case 'miestro-starter-plan-yearly-with-trial-30':
                           case 'miestro-starter-plan-yearly-with-trial':
                              active = isActive('miestro-starter-plan-yearly', planCard.name, planCard.annuallyName);
                              break;
                           case 'miestro-professional-plan-monthly-with-trial-30':
                           case 'miestro-professional-plan-monthly-with-trial':
                           case 'miestro-professional-plan-monthly-with-trial-30-affected':
                           case 'miestro-professional-plan-monthly-99':
                              active = isActive('miestro-professional-plan-monthly', planCard.name, planCard.annuallyName);
                              break;
                           case 'miestro-professional-plan-yearly-with-trial-30':
                           case 'miestro-professional-plan-yearly-with-trial':
                              active = isActive('miestro-professional-plan-yearly', planCard.name, planCard.annuallyName);
                              break;
                           case 'miestro-business-plan-monthly-with-trial-30':
                           case 'miestro-business-plan-monthly-with-trial':
                              active = isActive('miestro-business-plan-monthly', planCard.name, planCard.annuallyName);
                              break;
                           case 'miestro-business-plan-yearly-with-trial-30':
                           case 'miestro-business-plan-yearly-with-trial':
                              active = isActive('miestro-business-plan-yearly', planCard.name, planCard.annuallyName);
                              break;
                           default:
                              active = isActive(currentName, planCard.name, planCard.annuallyName);
                              break;
                        }

                        const plan = switchLeftorRight === 1 ? planCard.name : planCard.annuallyName;
                        return (
                           <div key={ planCard.title }>
                              <PlanCard
                                 title={ planCard.title }
                                 orders={ planCard.orders }
                                 active={ active }
                                 price={ planCard.price }
                                 showChangePlan={ status }
                                 annuallyPrice={ planCard.annuallyPrice }
                                 openPlanModal={ () => openModal(plan) }
                                 updateModalPlanName={ () => updateModalPlanName(plan) }
                                 annually={ switchLeftorRight }
                                 popular={ planCard.title === 'Professional' }
                                 name={ planCard.name }
                                 annuallyName={ planCard.annuallyName }
                                 setupdateCardModalOpen={ setupdateCardModalOpen }
                                 // eslint-disable-next-line max-len
                                 isConnect={ !!((mainApp.chargebee_customer_id === null && mainApp.subscription_status === null)) }
                              />
                           </div>
                        );
                     })
                  }
               </div>
            </>
         )}
         <div className='m-b-m'>
            <PlanItemsList />
         </div>
         {((subscription && !subscription.current) || (subscription && Array.isArray(subscription.current) && !subscription.current.length)) ? '' : (
            <PlanSubscription
               subscription={ subscription.current }
               onCancel={ handleCancelPlan }
               refunded={ refunded }
               openUpdatCardModal={ () => setupdateCardModalOpen(true) }
            />
         )}
         <div className='m-b-m' />
         {subscription && subscription.history.length === 0 ? '' : (
            <PlanSubscriptionHistory
               history={ subscription.history }
            />
         ) }
         <div style={ { marginBottom: '30px' } } />
         {
            updateCardModalOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='white'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  onClose={ () => handleCloseModal('update') }
               >
                  <UpdateCardModalContent
                     setupdateCardModalOpen={ setupdateCardModalOpen }
                     handleConnectToPlan={ handleUpdateCard }
                     plansModalStateInProgress={ plansModalStateInProgress }
                     cardUpdateModalIsInProgress={ cardUpdateModalIsInProgress }
                     setCardUpdateModalState={ setCardUpdateModalState }
                     isConnect={ !!((mainApp.chargebee_customer_id === null && mainApp.subscription_status === null)) }
                  />
               </Modal>
            )
         }
         {
            plansModalOpen && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='white'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  onClose={ () => handleCloseModal('card') }
               >
                  <ConnectCardModalContent
                     changeModal={ changeModal }
                     handleChangePlan={ () => handleChangePlan() }
                     setPlansModalOpen={ setPlansModalOpen }
                     showChangePlan={ !!status }
                     subscription={ subscription.current }
                     plansModalStateInProgress={ plansModalStateInProgress }
                  />
               </Modal>
            )
         }
         {
            changePlanError && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='white'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  onClose={ () => onCloseErrorModal('changePlanError') }
               >
                  <ChangePlanErrorModal onCloseErrorModal={ onCloseErrorModal } changePlanErrors={ changePlanErrors } />
               </Modal>
            )
         }
      </div>
   );
};

PlanCard.propTypes = {
   plans: PropTypes.object,
   subscription: PropTypes.object,
   handleConnectToPlan: PropTypes.func,
   plansModalStateInProgress: PropTypes.bool,
   status: PropTypes.any,
   mainApp: PropTypes.object,
   refunded: PropTypes.any,
};

export default Plans;
