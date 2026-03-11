import InnerWrapper from 'components/elements/wrappers/InnerWrapper';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Tabs from 'components/elements/tabs';
import Text, { SIZES as txtSize, TYPES as txtTypes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import AccountPlanMonthly from './AccountPLanComponents/AccountPlansMonthly';
import AccountPlanYearly from './AccountPLanComponents/AccountPlansYearly';
import AccountPLanFeatures from './AccountPLanComponents/AccountPlanFeatures';
import AccountPlanCancel from './AccountPLanComponents/AccountPlanCancel';
import AccountTrial from '../AccountTrial';
import UpdatePlanModal from './AccountPLanComponents/AccountPLanUpdateModal';
import UpdatePlanCardModal from './AccountPLanComponents/AccountPLanCardUpdateModal';

const variants = [
   { value: 'm', key: 'Monthly' },
   { value: 'y', key: 'Annually' },
];

const AccountPlan = ({
   plans, onCancel, onReactivate, updatePlan, changePlan, authUser, isOneTimeUser, mainApp, connectToPlan, progressPlanConnect,
}) => {
   const [selectedVariantPlan, setSelectedPlanVariant] = useState('m');
   const [isOpenPlanModal, setIsOpenPlanModal] = useState(false);
   const [isOpenPlanCardModal, setIsOpenPlanCardModal] = useState(false);
   const [selectedPlan, setSelectedPlan] = useState({});
   const isNotSpecialPlans = () => {
      if (isOneTimeUser) {
         return false;
      }
      if (!plans.currentSubscription) {
         return true;
      }
      switch (plans.currentSubscription.plan_name) {
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
      <InnerWrapper title='Plans' tooltip='View your current plans, downgrade, or upgrade to a different plan.'>
         <div className='account__plans'>
            {!plans.currentSubscription && isNotSpecialPlans()
            && (<AccountTrial authUser={ authUser } mainApp={ mainApp } />)}
            {isOpenPlanModal && !plans.customer_id && (
               <UpdatePlanModal
                  //  handleConnectToPlan={ (token) => updatePlan(token, selectedPlan.id) }
                  handleConnectToPlan={ (token) => connectToPlan(token, selectedPlan.id) }
                  onClose={ () => setIsOpenPlanModal(false) }
                  selectedPlan={ selectedPlan }
                  setSelectedPlan={ setSelectedPlan }
                  progressPlanConnect={ progressPlanConnect }
               />
            )}
            {isOpenPlanModal && plans.customer_id && (
               <UpdatePlanModal
                  changePlan={ () => changePlan(selectedPlan.id) }
                  onClose={ () => setIsOpenPlanModal(false) }
                  isConnect={ true }
                  selectedPlan={ selectedPlan }
                  setSelectedPlan={ setSelectedPlan }
               />
            )}
            {isOpenPlanCardModal && (
               <UpdatePlanCardModal
                  handleConnectToPlan={ (token) => updatePlan(token, selectedPlan.id) }
                  onClose={ () => setIsOpenPlanCardModal(false) }
                  isUdpateCard={ true }
               />
            )}
            <div className='account__plans__content'>
               {isNotSpecialPlans() && (
                  <div className='account__plans__content__switch'>
                     <Tabs
                        selectedVariant={ selectedVariantPlan }
                        onSelect={ (value) => setSelectedPlanVariant(value) }
                        variants={ variants }
                        isFullWidth={ true }
                        withGradient='_gradient'
                     />
                     <div className={ `save__20 save__20__${ selectedVariantPlan }` } style={ selectedVariantPlan !== 'm' ? { background: 'linear-gradient(180deg, #DDED7C -15.53%, #CFFF91 170.57%)' } : {} }>
                        <Text
                           inner='SAVE 20%'
                           size={ txtSize.xx_small }
                           type={ txtTypes.bold }
                        />
                     </div>
                  </div>
               )}
               {selectedVariantPlan === 'm' ? (
                  <AccountPlanMonthly
                     currentPlan={ plans.currentSubscription }
                     isNotSpecialPlans={ isNotSpecialPlans }
                     plans={ plans.plans_info }
                     onSelectPlan={ (plan) => {
                        setSelectedPlan(plan);
                        setIsOpenPlanModal(true);
                     } }
                  />
               ) : (
                  <AccountPlanYearly
                     currentPlan={ plans.currentSubscription }
                     plans={ plans.plans_info }
                     onSelectPlan={ (plan) => {
                        setSelectedPlan(plan);
                        setIsOpenPlanModal(true);
                     } }
                  />
               )}
            </div>

            <AccountPLanFeatures />
            {isNotSpecialPlans() && (
               <AccountPlanCancel
                  onCancel={ onCancel }
                  plans={ plans }
                  onReactivate={ () => onReactivate(plans.currentSubscription.id) }
                  isCancelled={ plans.currentSubscription
                     && !plans.currentSubscription.status && plans.currentSubscription.id }
                  setIsOpenPlanCardModal={ setIsOpenPlanCardModal }
               />
            )}
         </div>
      </InnerWrapper>
   );
};

AccountPlan.propTypes = {
   plans: PropTypes.object,
   onCancel: PropTypes.func,
   onReactivate: PropTypes.func,
   changePlan: PropTypes.func,
   updatePlan: PropTypes.func,
   authUser: PropTypes.object,
   isOneTimeUser: PropTypes.bool,
   mainApp: PropTypes.object,
   connectToPlan: PropTypes.func,
   progressPlanConnect: PropTypes.bool,
};

export default AccountPlan;
