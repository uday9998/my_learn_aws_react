import React from 'react';
import PropTypes from 'prop-types';
import PlanTemplate from '../../../PlanTemplate';
import './index.scss';

const getFilteredFunctions = (current, forFilter) => {
   const arrayToReturn = [];
   current.forEach((item) => {
      const searchItem = forFilter.filter((i) => i === item);
      if (!searchItem[0]) {
         arrayToReturn.push(item);
      }
   });
   return arrayToReturn;
};

const plansArray = ['newmiestro-essential-plan-monthly', 'newmiestro-essential-plan-yearly', 'newmiestro-surge-plan-monthly', 'newmiestro-surge-plan-yearly', 'newmiestro-infinite-plan-monthly', 'newmiestro-infinite-plan-yearly'];

const AccountPlanMonthly = ({
   currentPlan, plans, onSelectPlan, isNotSpecialPlans,
}) => {
   const isUpgradetedButton = (plan) => {
      if (currentPlan) {
         const plantoCheck = currentPlan.plan_name;
         const currentPlanToCheck = plan;
         if (plansArray.indexOf(plantoCheck) < plansArray.indexOf(currentPlanToCheck)) {
            return true;
         }
         return false;
      }
      return false;
   };

   return (
      <div className='account__plan__monthly'>
         <PlanTemplate
            type='Essential'
            price={ plans.plan_prices['newmiestro-essential-plan-monthly'] }
            isNotSpecialPlans={ isNotSpecialPlans }
            functions={ plans.plan_features['miestro-essential'] }
            currentPlan={ currentPlan }
            onSelectPlan={ () => onSelectPlan({ id: 'newmiestro-essential-plan-monthly', plans }) }
            isUpgradeButton={ isUpgradetedButton('newmiestro-essential-plan-monthly') }
            isActive={ currentPlan && currentPlan.plan_name === 'newmiestro-essential-plan-monthly' }
         />
         <PlanTemplate
            type='Surge'
            onSelectPlan={ () => onSelectPlan({ id: 'newmiestro-surge-plan-monthly', plans }) }
            isNotSpecialPlans={ isNotSpecialPlans }
            currentPlan={ currentPlan }
            isUpgradeButton={ isUpgradetedButton('newmiestro-surge-plan-monthly') }
            functions={ getFilteredFunctions(plans.plan_features['miestro-surge'], plans.plan_features['miestro-essential']) }
            price={ plans.plan_prices['newmiestro-surge-plan-monthly'] }
            isActive={ currentPlan && currentPlan.plan_name === 'newmiestro-surge-plan-monthly' }
         />
         <PlanTemplate
            type='Infinite'
            currentPlan={ currentPlan }
            isNotSpecialPlans={ isNotSpecialPlans }
            onSelectPlan={ () => onSelectPlan({ id: 'newmiestro-infinite-plan-monthly', plans }) }
            isUpgradeButton={ isUpgradetedButton('newmiestro-infinite-plan-monthly') }
            functions={ getFilteredFunctions(plans.plan_features['miestro-infinite'], plans.plan_features['miestro-surge']) }
            price={ plans.plan_prices['newmiestro-infinite-plan-monthly'] }
            isActive={ currentPlan && currentPlan.plan_name === 'newmiestro-infinite-plan-monthly' }
         />
      </div>
   );
};

AccountPlanMonthly.propTypes = {
   currentPlan: PropTypes.object,
   plans: PropTypes.any,
   onSelectPlan: PropTypes.func,
   isNotSpecialPlans: PropTypes.func,
};

export default AccountPlanMonthly;
