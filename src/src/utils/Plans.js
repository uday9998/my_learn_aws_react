export const getProperlyPlanName = (plan) => {
   if ([
      'miestro-starter-plan-monthly', 'miestro-starter-plan-yearly', 'miestro-starter-plan-yearly-with-trial',
      'miestro-starter-plan-monthly-with-trial', 'miestro-starter-plan-monthly-with-trial-30',
      'miestro-starter-plan-yearly-with-trial-30', 'miestro-starter-plan-monthly-old-49',
      'miestro-starter-plan-monthly-with-trial-card', 'newmiestro-essential-plan-yearly', 'newmiestro-essential-plan-monthly',
   ].includes(plan)) {
      return 'Essential Plan';
   }
   if ([
      'miestro-professional-plan-monthly', 'miestro-professional-plan-yearly', 'miestro-professional-plan-monthly-with-trial',
      'miestro-professional-plan-yearly-with-trial', 'miestro-professional-plan-monthly-99', 'miestro-professional-plan-monthly-with-trial-30',
      'miestro-professional-plan-yearly-with-trial-30', 'miestro-professional-plan-6-month', 'miestro-professional-plan-yearly-797',
      'miestro-professional-plan-monthly-with-trial-30-affected',
      '3-pay-plan-997', 'newmiestro-surge-plan-monthly', 'newmiestro-surge-plan-yearly',
   ].includes(plan)) {
      return 'Surge Plan';
   }
   if ([
      'miestro-business-plan-monthly', 'miestro-business-plan-yearly', 'miestro-business-plan-monthly-with-trial',
      'miestro-business-plan-yearly-with-trial', 'miestro-business-plan-monthly-with-trial-30',
      'miestro-business-plan-yearly-with-trial-30', 'miestro-business-plan-6-month', 'newmiestro-infinite-plan-yearly',
      'newmiestro-infinite-plan-monthly',
   ].includes(plan)) {
      return 'Infinite Plan';
   }
   return plan;
};

export const getProperlyPlanNameNew = (plan) => {
   if ([
      'miestro-starter-plan-monthly', 'miestro-starter-plan-yearly', 'miestro-starter-plan-yearly-with-trial',
      'miestro-starter-plan-monthly-with-trial', 'miestro-starter-plan-monthly-with-trial-30',
      'miestro-starter-plan-yearly-with-trial-30', 'miestro-starter-plan-monthly-old-49',
      'miestro-starter-plan-monthly-with-trial-card',
   ].includes(plan)) {
      return 'Launch Plan';
   }
   if ([
      'miestro-professional-plan-monthly', 'miestro-professional-plan-yearly', 'miestro-professional-plan-monthly-with-trial',
      'miestro-professional-plan-yearly-with-trial', 'miestro-professional-plan-monthly-99', 'miestro-professional-plan-monthly-with-trial-30',
      'miestro-professional-plan-yearly-with-trial-30', 'miestro-professional-plan-6-month', 'miestro-professional-plan-yearly-797',
      'miestro-professional-plan-monthly-with-trial-30-affected',
      '3-pay-plan-997',
   ].includes(plan)) {
      return 'Premium Plan';
   }
   if ([
      'miestro-business-plan-monthly', 'miestro-business-plan-yearly', 'miestro-business-plan-monthly-with-trial',
      'miestro-business-plan-yearly-with-trial', 'miestro-business-plan-monthly-with-trial-30',
      'miestro-business-plan-yearly-with-trial-30', 'miestro-business-plan-6-month',
   ].includes(plan)) {
      return 'Growth Plan';
   }
   return plan;
};

export const getProperlyPlanNameMember = (plan) => {
   if ([
      'miestro-starter-plan-monthly', 'miestro-starter-plan-yearly', 'miestro-starter-plan-yearly-with-trial',
      'miestro-starter-plan-monthly-with-trial', 'miestro-starter-plan-monthly-with-trial-30',
      'miestro-starter-plan-yearly-with-trial-30', 'miestro-starter-plan-monthly-old-49',
      'miestro-starter-plan-monthly-with-trial-card',
   ].includes(plan)) {
      return 'Launch';
   }
   if ([
      'miestro-professional-plan-monthly', 'miestro-professional-plan-yearly', 'miestro-professional-plan-monthly-with-trial',
      'miestro-professional-plan-yearly-with-trial', 'miestro-professional-plan-monthly-99', 'miestro-professional-plan-monthly-with-trial-30',
      'miestro-professional-plan-yearly-with-trial-30', 'miestro-professional-plan-6-month', 'miestro-professional-plan-yearly-797',
      'miestro-professional-plan-monthly-with-trial-30-affected',
      '3-pay-plan-997',
   ].includes(plan)) {
      return 'Premium';
   }
   if ([
      'miestro-business-plan-monthly', 'miestro-business-plan-yearly', 'miestro-business-plan-monthly-with-trial',
      'miestro-business-plan-yearly-with-trial', 'miestro-business-plan-monthly-with-trial-30',
      'miestro-business-plan-yearly-with-trial-30', 'miestro-business-plan-6-month',
   ].includes(plan)) {
      return 'Growth';
   }
   if ([
      'miestro-starter-plan-monthly', 'miestro-starter-plan-yearly', 'miestro-starter-plan-yearly-with-trial',
      'miestro-starter-plan-monthly-with-trial', 'miestro-starter-plan-monthly-with-trial-30',
      'miestro-starter-plan-yearly-with-trial-30', 'miestro-starter-plan-monthly-old-49',
      'miestro-starter-plan-monthly-with-trial-card',
   ].includes(`new-${ plan }`)) {
      return 'Launch';
   }
   if ([
      'miestro-professional-plan-monthly', 'miestro-professional-plan-yearly', 'miestro-professional-plan-monthly-with-trial',
      'miestro-professional-plan-yearly-with-trial', 'miestro-professional-plan-monthly-99', 'miestro-professional-plan-monthly-with-trial-30',
      'miestro-professional-plan-yearly-with-trial-30', 'miestro-professional-plan-6-month', 'miestro-professional-plan-yearly-797',
      'miestro-professional-plan-monthly-with-trial-30-affected',
      '3-pay-plan-997',
   ].includes(`new-${ plan }`)) {
      return 'Premium';
   }
   if ([
      'miestro-business-plan-monthly', 'miestro-business-plan-yearly', 'miestro-business-plan-monthly-with-trial',
      'miestro-business-plan-yearly-with-trial', 'miestro-business-plan-monthly-with-trial-30',
      'miestro-business-plan-yearly-with-trial-30', 'miestro-business-plan-6-month',
   ].includes(`new-${ plan }`)) {
      return 'Growth';
   }
   return plan;
};
