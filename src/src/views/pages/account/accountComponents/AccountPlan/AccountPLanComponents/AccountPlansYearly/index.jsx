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

const AccountPlanYearly = ({ currentPlan, plans, onSelectPlan }) => {
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
      <div className='account__plan__yearly'>
         <PlanTemplate
            type='Essential'
            price={ parseInt(plans.plan_prices['newmiestro-essential-plan-yearly'] / 12, 10) }
            onSelectPlan={ () => onSelectPlan({ id: 'newmiestro-essential-plan-yearly', plans }) }
            isUpgradeButton={ isUpgradetedButton('newmiestro-essential-plan-yearly') }
            functions={ plans.plan_features['miestro-essential'] }
            currentPlan={ currentPlan }
            isActive={ currentPlan && currentPlan.plan_name === 'newmiestro-essential-plan-yearly' }
         />
         <PlanTemplate
            type='Surge'
            isUpgradeButton={ isUpgradetedButton('newmiestro-surge-plan-yearly') }
            onSelectPlan={ () => onSelectPlan({ id: 'newmiestro-surge-plan-yearly', plans }) }
            currentPlan={ currentPlan }
            functions={ getFilteredFunctions(plans.plan_features['miestro-surge'], plans.plan_features['miestro-essential']) }
            price={ parseInt(plans.plan_prices['newmiestro-surge-plan-yearly'] / 12, 10) }
            isActive={ currentPlan && currentPlan.plan_name === 'newmiestro-surge-plan-yearly' }
         />
         <PlanTemplate
            type='Infinite'
            onSelectPlan={ () => onSelectPlan({ id: 'newmiestro-infinite-plan-yearly', plans }) }
            currentPlan={ currentPlan }
            functions={ getFilteredFunctions(plans.plan_features['miestro-infinite'], plans.plan_features['miestro-surge']) }
            isUpgradeButton={ isUpgradetedButton('newmiestro-infinite-plan-yearly') }
            price={ parseInt(plans.plan_prices['newmiestro-infinite-plan-yearly'] / 12, 10) }
            isActive={ currentPlan && currentPlan.plan_name === 'newmiestro-infinite-plan-yearly' }
         />
      </div>
   );
};

AccountPlanYearly.propTypes = {
   currentPlan: PropTypes.object,
   plans: PropTypes.any,
   onSelectPlan: PropTypes.func,
};

export default AccountPlanYearly;
