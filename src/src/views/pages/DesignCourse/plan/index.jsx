import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddFirstPlan from 'components/modules/designCourse/plan/AddFirstPlan';
import AddPlanTutorial from 'components/modules/designCourse/plan/AddPlanTutorial';
import PricingPlans from 'components/modules/designCourse/plan/PricingPlans';
import FreePlan from 'components/modules/designCourse/plan/FreePlan';
import OneTimePlan from 'components/modules/designCourse/plan/OneTimePlan';
import SubscriptionPlan from 'components/modules/designCourse/plan/SubscriptionPlan';
import SavedCoupons from 'components/modules/designCourse/plan/SavedCoupons';
import './index.scss';
import AddCouponPopup from 'components/modules/designCourse/plan/AddCouponPopup';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import PlanTypeMenu from 'components/modules/designCourse/plan/PlanTypeMenu';
import Modal from 'components/elements/Modal';
import { useHistory } from 'react-router';

const Plan = ({
   plan, goTo, handleAddingPlan,
   handleSelectPricingPlans, handlePlanSave,
   handleInputPlanChange, handleShowCouponPopup, handleInputCouponChange, handleCouponSave, deletePlan,
   handlePricingHideShow, deleteCoupon, mobilePlanTanbels, goToIntegration, chooseCourses, onAddValue, onRemoveValue,
   setShowDrawer, showDrawer, settingsData, courseId, initDataInProgress,
}) => {
   const isMobile = window.innerWidth < 1024;
   const [showMenu, setShowMenu] = useState(false);
   const modalContent = useRef(null);
   const history = useHistory();

   const closePlanModal = () => {
      document.querySelector('#modal-content').style.transform = 'translateX(100%)';
      setTimeout(() => {
         setShowDrawer(false);
         history.replace(`${ history.location.pathname }#plan`);
      }, 250);
   };

   useEffect(() => {
      if (showDrawer && document.querySelector('#modal-content')) {
         document.querySelector('#modal-content').style.transform = 'translateX(0%)';
      }
   }, [showDrawer]);

   useEffect(() => {
      if (chooseCourses && plan && !initDataInProgress) {
         if (history.location.hash === '#plan/one-time') {
            handleAddingPlan(1);
         } else if (history.location.hash === '#plan/subscription') {
            handleAddingPlan(2);
         } else if (history.location.hash === '#plan/free') {
            if (!plan.pricings.filter(pricing => pricing.pricing_type === 0).length) { handleAddingPlan(0); }
         }
      }
   }, [initDataInProgress, history.location.hash]);

   const renderPlanType = () => {
      const currentPricing = [
         <FreePlan
            plan={ plan }
            handlePlanSave={ handlePlanSave }
            handleInputPlanChange={ (key, value) => handleInputPlanChange(key, value) }
            deletePlan={ pricingId => deletePlan(pricingId) }
         />,
         <OneTimePlan
            plan={ plan }
            goTo={ goTo }
            handlePlanSave={ handlePlanSave }
            handleShowCouponPopup={ handleShowCouponPopup }
            handleInputPlanChange={ (key, value) => handleInputPlanChange(key, value) }
            deletePlan={ pricingId => deletePlan(pricingId) }
            goToIntegration={ goToIntegration }
            chooseCourses={ chooseCourses }
            onAddValue={ onAddValue }
            onRemoveValue={ onRemoveValue }
            settingsData={ settingsData }
            courseId={ courseId }
         />,
         <SubscriptionPlan
            plan={ plan }
            goTo={ goTo }
            handlePlanSave={ handlePlanSave }
            handleShowCouponPopup={ handleShowCouponPopup }
            handleInputPlanChange={ (key, value) => handleInputPlanChange(key, value) }
            deletePlan={ pricingId => deletePlan(pricingId) }
            goToIntegration={ goToIntegration }
            chooseCourses={ chooseCourses }
            onAddValue={ onAddValue }
            onRemoveValue={ onRemoveValue }
            courseId={ courseId }
         />,
      ];
      return currentPricing[plan.currentPricingType];
   };

   return (
      <div className={ `d-settings courses-plan ${ plan.addingFirstPlan ? 'plans-table-view' : '' } w-full flex` }>
         {!plan.addingFirstPlan ? (
            <>
               <div className='content_left left-side-first'>
                  <div className='m-r-exl left-side-first-content'>
                     <AddFirstPlan
                        handleAddingPlan={ (type) => {
                           handleAddingPlan(type);
                        } }
                        planTypes={ plan.planTypes }
                        plan={ plan }
                        goToIntegration={ goToIntegration }
                     />
                  </div>
               </div>
               <div className='content_right right-side-first'>
                  <div className='m-l-exl right-side-first-content'>
                     <AddPlanTutorial />
                  </div>
               </div>
            </>
         ) : (
            <>
               {plan.showCouponPopup
               && (
                  <AddCouponPopup
                     couponInputs={ plan.couponInputs }
                     handleShowCouponPopup={ handleShowCouponPopup }
                     handleInputCouponChange={ (key, value) => handleInputCouponChange(key, value) }
                     handleCouponSave={ handleCouponSave }
                     pricingType={ plan.currentPricingType }
                  />
               )
               }
               {
                  (!isMobile || !mobilePlanTanbels) && (
                     <>
                        {
                           isMobile && plan.pricings && plan.pricings.length === 0 && (
                           <>
                              <div className='content_left left-side-first'>
                                 <div className='m-r-exl left-side-first-content'>
                                    <AddFirstPlan
                                       handleAddingPlan={ (type) => handleAddingPlan(type) }
                                       planTypes={ plan.planTypes }
                                       plan={ plan }
                                       goToIntegration={ goToIntegration }
                                    />
                                 </div>
                              </div>
                              <div className='content_right right-side-first'>
                                 <div className='m-l-exl right-side-first-content'>
                                    <AddPlanTutorial />
                                 </div>
                              </div>
                           </>
                           )}
                           {
                              (!isMobile || (plan.pricings && plan.pricings.length !== 0)) && (
                                 <div className='content_left left-side-second' style={ { flex: '2 1' } }>
                                    <div className='left-side-second-content'>
                                       <PricingPlans
                                          plans={ plan.pricings }
                                          checkedId={ plan.selectedPricing.id }
                                          planTypes={ plan.planTypes }
                                          onClick={ (obj) => {
                                             handleSelectPricingPlans(obj);
                                          } }
                                          handleAddingPlan={ (type) => {
                                             handleAddingPlan(type);
                                          } }
                                          handlePricingHideShow={ (pricingId, data) => handlePricingHideShow(pricingId, data) }
                                          deletePlan={ pricingId => deletePlan(pricingId) }
                                          plan={ plan }
                                          goToIntegration={ goToIntegration }
                                       />
                                       <div className='m-t-exl'>
                                          <SavedCoupons
                                             coupons={ plan.pricings }
                                             deleteCoupon={ (pricingId, couponId) => deleteCoupon(pricingId, couponId) }
                                          />
                                       </div>
                                       {
                                          isMobile && (
                                             <div className='w-full align-center justify-end m-t-exl d-hidden-button'>
                                                <div className='add-plan'>
                                                   <BaseButton
                                                      theme={ buttonTheme.blueBordered }
                                                      size={ buttonSizes.full }
                                                      text='Add Plan'
                                                      style={ { width: '224px' } }
                                                      onClick={ () => setShowMenu(!showMenu) }
                                                   />
                                                   { showMenu ? (
                                                      <PlanTypeMenu
                                                         planTypes={ plan.planTypes }
                                                         handleAddingPlan={ (type) => { handleAddingPlan(type); setShowMenu(!showMenu); } }
                                                         plan={ plan }
                                                         goToIntegration={ goToIntegration }
                                                      />
                                                   ) : null }
                                                </div>
                                             </div>
                                          )
                                       }
                                    </div>

                                 </div>
                              )
                           }

                     </>
                  )
               }
               {
                  (isMobile) && (
                     <div className='content_right right-side-second' style={ { flex: '1 1' } }>
                        <div className='m-l-exl right-side-content'>
                           {renderPlanType()}
                        </div>
                     </div>
                  )}
               {
                  (!isMobile) && showDrawer && (
                  // <Drawer
                  //    anchor='right'
                  //    open={ showDrawer }
                  //    onClose={ () => setShowDrawer(false) }
                  // >
                     <Modal
                        blurColor='rgba(63, 79, 101, 0.6)'
                        contentBgColor='#fff'
                        contentPosition='center'
                        roundedModal={ 0 }
                        closeOnClickOutside={ true }
                        onClose={ () => closePlanModal() }
                        className='planModal'
                        ref={ modalContent }
                     >
                        {renderPlanType()}

                     </Modal>
                  // </Drawer>
                  )}
            </>
         )
         }
      </div>
   );
};

Plan.propTypes = {
   plan: PropTypes.object,
   goTo: PropTypes.func,
   handleAddingPlan: PropTypes.func,
   handleSelectPricingPlans: PropTypes.func,
   handlePlanSave: PropTypes.func,
   handleInputPlanChange: PropTypes.func,
   handleShowCouponPopup: PropTypes.func,
   handleInputCouponChange: PropTypes.func,
   handleCouponSave: PropTypes.func,
   handlePricingHideShow: PropTypes.func,
   deleteCoupon: PropTypes.func,
   deletePlan: PropTypes.func,
   mobilePlanTanbels: PropTypes.bool,
   goToIntegration: PropTypes.func,
   chooseCourses: PropTypes.array,
   onAddValue: PropTypes.func,
   onRemoveValue: PropTypes.func,
   settingsData: PropTypes.object,
   setShowDrawer: PropTypes.func,
   showDrawer: PropTypes.bool,
   courseId: PropTypes.number,
   initDataInProgress: PropTypes.bool,
};


export default Plan;
