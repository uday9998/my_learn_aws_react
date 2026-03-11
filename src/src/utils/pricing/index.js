import emoji from 'assets/images/pricing/emoji.png';
import emojiBatt from 'assets/images/pricing/emoji__batt.png';
import moment from 'moment';
import { currencySymbols } from 'constants/pricing';


export const getConstantData = (planName, plan, authUser) => {
   // If we have a current subscription, check if the plan_name is a Stripe price ID
   // and map it to the correct plan based on the mainApp.plan_name
   if (plan?.currentSubscription) {
      const currentPlan = plan.currentSubscription;
      
      // If the subscription's plan_name looks like a Stripe price ID (starts with 'price_')
      // and we have a planName from mainApp, use the mainApp planName for mapping
      if (currentPlan.plan_name?.startsWith('price_') && planName) {
         // TEMPORARY FIX: Map specific price IDs to correct plans when mainApp.plan_name is wrong
         const priceIdToPlanMap = {
            [process.env.REACT_APP_STRIPE_SURGE_MONTHLY_PRICE_ID]: 'surge', // Surge monthly
            [process.env.REACT_APP_STRIPE_ESSENTIAL_MONTHLY_PRICE_ID]: 'essential', // Essential monthly  
            [process.env.REACT_APP_STRIPE_INFINITE_MONTHLY_PRICE_ID]: 'infinite', // Infinite monthly
            [process.env.REACT_APP_STRIPE_ESSENTIAL_YEARLY_PRICE_ID]: 'essential', // Essential yearly
            [process.env.REACT_APP_STRIPE_SURGE_YEARLY_PRICE_ID]: 'surge', // Surge yearly
            [process.env.REACT_APP_STRIPE_INFINITE_YEARLY_PRICE_ID]: 'infinite', // Infinite yearly
         };
         
         const correctPlanFromPriceId = priceIdToPlanMap[currentPlan.plan_name];
         if (correctPlanFromPriceId && correctPlanFromPriceId !== planName) {
            planName = correctPlanFromPriceId; // Override with correct plan
         }
         
         // Continue to the mapping logic below using the corrected planName
      } else {
         return plan;
      }
   } if (planName?.includes('essential-monthly')) {
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'month').format('MMM DD, YYYY') : moment().add(1, 'month').format('MMM DD, YYYY'),
            plan_name: 'miestro-essential-monthly2',
            price: '49.00',
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('essential') && !planName?.includes('yearly')) {
      // Handle "essential" without monthly/yearly suffix - default to monthly
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'month').format('MMM DD, YYYY') : moment().add(1, 'month').format('MMM DD, YYYY'),
            plan_name: 'miestro-essential-monthly2',
            price: '69.00', // Use the correct price for Essential monthly
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('essential-yearly')) {
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'year').format('MMM DD, YYYY') : moment().add(1, 'year').format('MMM DD, YYYY'),
            plan_name: 'miestro-essential-yearly2',
            price: '468.00',
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('surge-plan-monthly')) {
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'month').format('MMM DD, YYYY') : moment().add(1, 'month').format('MMM DD, YYYY'),
            plan_name: 'miestro-surge-monthly2',
            price: '99.00',
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('surge') && !planName?.includes('yearly')) {
      // Handle "surge" without monthly/yearly suffix - default to monthly  
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'month').format('MMM DD, YYYY') : moment().add(1, 'month').format('MMM DD, YYYY'),
            plan_name: 'miestro-surge-monthly2',
            price: '119.00', // Use the correct price for Surge monthly
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('miestro-surge-yearly2')) {
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'year').format('MMM DD, YYYY') : moment().add(1, 'year').format('MMM DD, YYYY'),
            plan_name: 'miestro-surge-yearly2',
            price: '948.00',
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('miestro-infinite-monthly')) {
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'month').format('MMM DD, YYYY') : moment().add(1, 'month').format('MMM DD, YYYY'),
            plan_name: 'miestro-infinite-monthly',
            price: '199.00',
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('infinite') && !planName?.includes('yearly')) {
      // Handle "infinite" without monthly/yearly suffix - default to monthly  
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'month').format('MMM DD, YYYY') : moment().add(1, 'month').format('MMM DD, YYYY'),
            plan_name: 'miestro-infinite-monthly',
            price: '199.00', // Use the correct price for Infinite monthly
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   } if (planName?.includes('miestro-infinite-yearly')) {
      return {
         currentSubscription: {
            next_billing_at: authUser?.created_at ? moment(authUser.created_at).add(1, 'year').format('MMM DD, YYYY') : moment().add(1, 'year').format('MMM DD, YYYY'),
            plan_name: 'miestro-infinite-yearly',
            price: '1 908.00',
            status: 1,
            trial_start: authUser?.created_at ? moment(authUser.created_at).format('MMM DD, YYYY') : moment().format('MMM DD, YYYY'),
            isCustom: true,
         },
         subscriptions: [],
      };
   }
   return {
      currentSubscription: {
         next_billing_at: null,
         plan_name: 'miestro-starter',
         price: '0.00',
         status: 1,
         trial_start: authUser?.created_at ? moment(authUser.created_at) : moment().format('MMM DD, YYYY'),
         isCustom: true,
      },
      subscriptions: [],
   };
};

export const getPlanType = (plans, mainApp) => {
   if (plans?.currentSubscription?.plan_name?.includes('essential')) {
      return {
         subtitle: 'Build your learning foundation',
         title: 'Essential',
         icon: emojiBatt,
         centerSectionTitle: 'Essential Plan',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'essential',
         summaryPrice: plans.currentSubscription?.price && plans.currentSubscription.plan_name.includes('monthly') ? `$${ plans.currentSubscription?.price }/mo` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription ? plans.currentSubscription.status : plans.currentSubscription.status && mainApp?.subscription_status !== 'cancelled',
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('surge')) {
      return {
         subtitle: 'Scale your learning impact',
         title: 'Surge',
         icon: emojiBatt,
         centerSectionTitle: 'Surge Plan',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'surge',
         summaryPrice: plans.currentSubscription?.price && plans.currentSubscription.plan_name.includes('monthly') ? `$${ plans.currentSubscription?.price }/mo` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription ? plans.currentSubscription.status : plans.currentSubscription.status && mainApp?.subscription_status !== 'cancelled',
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('infinite')) {
      return {
         subtitle: 'without boundaries',
         title: 'Infinite',
         icon: emojiBatt,
         centerSectionTitle: 'Infinite Plan',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'infinite',
         summaryPrice: plans.currentSubscription?.price && plans.currentSubscription.plan_name.includes('monthly') ? `$${ plans.currentSubscription?.price }/mo` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription ? plans.currentSubscription.status : plans.currentSubscription.status && mainApp?.subscription_status !== 'cancelled',
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('price_1PjSgRApMyK85UEAXIsFrWPS')) {
      return {
         subtitle: 'without boundaries',
         title: 'Goat',
         icon: emojiBatt,
         centerSectionTitle: 'Goat University Monthly Plan',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'goat_monthly',
         summaryPrice: plans.currentSubscription?.price ? `$${ plans.currentSubscription?.price }/mo` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('price_1PjTDvApMyK85UEA2Iyzl71k')) {
      return {
         subtitle: 'without boundaries',
         title: 'Goat',
         icon: emojiBatt,
         centerSectionTitle: 'Goat University Annual Plan',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'goat_annual',
         summaryPrice: plans.currentSubscription?.price ? `$${ plans.currentSubscription?.price }` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name.includes('pause')) {
      return {
         subtitle: mainApp?.plan_name.includes('essential') ? 'Build your learning foundation' : mainApp?.plan_name.includes('surge') ? 'Scale your learning impact' : 'without boundaries',
         title: mainApp?.plan_name.includes('essential') ? 'Essential' : mainApp?.plan_name.includes('surge') ? 'Surge' : 'Infinite',
         icon: emojiBatt,
         centerSectionTitle: mainApp?.plan_name.includes('essential') ? 'Essential Plan' : mainApp?.plan_name.includes('surge') ? 'Surge Plan' : 'Infinite Plan',
         nextPayment: 'Paused',
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: mainApp?.plan_name.includes('essential') ? 'essential' : mainApp?.plan_name.includes('surge') ? 'surge' : 'infinite',
         summaryPrice: plans.currentSubscription?.price && plans.currentSubscription.plan_name.includes('monthly') ? `$${ plans.currentSubscription?.price }/mo` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: !!mainApp.pause_plan,
         isCustom: plans.currentSubscription.isCustom,
         isPaused: !!mainApp.pause_plan,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('price_1QDBr4ApMyK85UEAATty4Cml')) {
      return {
         subtitle: 'without boundaries',
         title: 'Goat',
         icon: emojiBatt,
         centerSectionTitle: 'Webinar Exclusive Offer - Starter Package',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'goat_annual',
         summaryPrice: plans.currentSubscription?.price ? `$${ plans.currentSubscription?.price }` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('price_1QDBr5ApMyK85UEAqfpXu0hC')) {
      return {
         subtitle: 'without boundaries',
         title: 'Goat',
         icon: emojiBatt,
         centerSectionTitle: 'Webinar Exclusive Offer - Superstar Package',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'goat_annual',
         summaryPrice: plans.currentSubscription?.price ? `$${ plans.currentSubscription?.price }` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes('price_1QFcwaApMyK85UEASrb0mCTm')) {
      return {
         subtitle: 'without boundaries',
         title: 'Goat',
         icon: emojiBatt,
         centerSectionTitle: 'Webinar Exclusive Offer -High Level Plan',
         nextPayment: (() => {
            if (plans.currentSubscription.isCustom) {
               return plans.currentSubscription.next_billing_at;
            }
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp vs date string
            const result = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return result;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'goat_annual',
         summaryPrice: plans.currentSubscription?.price ? `$${ plans.currentSubscription?.price }` : plans.currentSubscription?.price,
         trialStart: plans.currentSubscription.isCustom ? plans.currentSubscription.trial_start : moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes(process.env.REACT_APP_STRIPE_ESSENTIAL_MONTHLY_PRICE_ID)) {
      // Essential monthly
      return {
         subtitle: 'Build your learning foundation',
         title: 'Essential',
         icon: emojiBatt,
         centerSectionTitle: 'Essential Plan',
         nextPayment: (() => {
            // Always prioritize the API data since it's always correct
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp (numbers) vs date strings
            const formattedDate = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return formattedDate;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'essential',
         summaryPrice: `$${ plans.currentSubscription?.price }/mo`,
         trialStart: moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes(process.env.REACT_APP_STRIPE_SURGE_MONTHLY_PRICE_ID)) {
      // Surge monthly
      return {
         subtitle: 'Scale your learning impact',
         title: 'Surge',
         icon: emojiBatt,
         centerSectionTitle: 'Surge Plan',
         nextPayment: (() => {
            // Always prioritize the API data since it's always correct
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp (numbers) vs date strings
            const formattedDate = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return formattedDate;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'surge',
         summaryPrice: `$${ plans.currentSubscription?.price }/mo`,
         trialStart: moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes(process.env.REACT_APP_STRIPE_INFINITE_MONTHLY_PRICE_ID)) {
      // Infinite monthly
      return {
         subtitle: 'without boundaries',
         title: 'Infinite',
         icon: emojiBatt,
         centerSectionTitle: 'Infinite Plan',
         nextPayment: (() => {
            // Always prioritize the API data since it's always correct
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp (numbers) vs date strings
            const formattedDate = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return formattedDate;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'infinite',
         summaryPrice: `$${ plans.currentSubscription?.price }/mo`,
         trialStart: moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes(process.env.REACT_APP_STRIPE_ESSENTIAL_YEARLY_PRICE_ID)) {
      // Essential yearly
      return {
         subtitle: 'Build your learning foundation',
         title: 'Essential',
         icon: emojiBatt,
         centerSectionTitle: 'Essential Plan',
         nextPayment: (() => {
            // Always prioritize the API data since it's always correct
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp (numbers) vs date strings
            const formattedDate = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return formattedDate;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'essential',
         summaryPrice: `$${ plans.currentSubscription?.price }/year`,
         trialStart: moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes(process.env.REACT_APP_STRIPE_SURGE_YEARLY_PRICE_ID)) {
      // Surge yearly
      return {
         subtitle: 'Scale your learning impact',
         title: 'Surge',
         icon: emojiBatt,
         centerSectionTitle: 'Surge Plan',
         nextPayment: (() => {
            // Always prioritize the API data since it's always correct
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp (numbers) vs date strings
            const formattedDate = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return formattedDate;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'surge',
         summaryPrice: `$${ plans.currentSubscription?.price }/year`,
         trialStart: moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   } if (plans?.currentSubscription?.plan_name?.includes(process.env.REACT_APP_STRIPE_INFINITE_YEARLY_PRICE_ID)) {
      // Infinite yearly
      return {
         subtitle: 'without boundaries',
         title: 'Infinite',
         icon: emojiBatt,
         centerSectionTitle: 'Infinite Plan',
         nextPayment: (() => {
            // Always prioritize the API data since it's always correct
            const billingDate = plans.currentSubscription.next_billing_at;

            // Handle Unix timestamp (numbers) vs date strings
            const formattedDate = typeof billingDate === 'number' || !isNaN(Number(billingDate))
               ? moment.unix(billingDate).format('MMM DD, YYYY')
               : moment(billingDate, 'YYYY/MM/DD').format('MMM DD, YYYY');

            return formattedDate;
         })(),
         isChangeButton: true,
         isUpgradePaymentInfo: true,
         summaryTextsKey: 'infinite',
         summaryPrice: `$${ plans.currentSubscription?.price }/year`,
         trialStart: moment(plans.currentSubscription.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
         status: plans.currentSubscription.status,
         isCustom: plans.currentSubscription.isCustom,
      };
   }

   return {
      title: 'Starter',
      subtitle: 'starting point for growth',
      icon: emoji,
      summaryTextsKey: 'starter',
      centerSectionTitle: 'Starter Plan',
      summaryPrice: 'Free Plan',
      trialStart: moment(plans?.currentSubscription?.trial_start, 'YYYY/MM/DD').format('MMM DD, YYYY'),
      id: 0,
   };
};

export const getTableMobileText = (title, text) => {
   if (title === 'Number of Courses') {
      if (text.toLowerCase().includes('courses')) {
         return text.slice(0, text.toLowerCase().indexOf('courses'));
      }
      return text.slice(0, text.toLowerCase().indexOf('course'));
   } if (title === 'Number Of Rooms') {
      if (text.toLowerCase().includes('rooms')) {
         return text.slice(0, text.toLowerCase().indexOf('rooms'));
      }
      return text.slice(0, text.toLowerCase().indexOf('room'));
   } if (text === '1 ONBOARDING CALL') {
      return '1 Call';
   } if (text === '2 ONBOARDING CALLS') {
      return '2 Calls';
   }

   return text;
};

export const getPriceType = (pricingData, type) => {
   return pricingData.map(priceData => {
      if (type === 'monthly') {
         if (priceData.title === 'Essential') {
            return {
               ...priceData,
               pricingType: 69,
            };
         } if (priceData.title === 'Surge') {
            return {
               ...priceData,
               pricingType: 119,
            };
         } if (priceData.title === 'Infinite') {
            return {
               ...priceData,
               pricingType: 199,
            };
         }
      } else {
         if (priceData.title === 'Essential') {
            return {
               ...priceData,
               pricingType: 55,
            };
         } if (priceData.title === 'Surge') {
            return {
               ...priceData,
               pricingType: 95,
            };
         } if (priceData.title === 'Infinite') {
            return {
               ...priceData,
               pricingType: 159,
            };
         }
      }

      return priceData;
   });
};

export const getConnectPlanType = (type, planName) => {
   if (type === 'monthly') {
      if (planName === 'Essential') {
         return {
            price_id: process.env.REACT_APP_STRIPE_ESSENTIAL_MONTHLY_PRICE_ID, // Essential monthly
         };
      } if (planName === 'Surge') {
         return {
            price_id: process.env.REACT_APP_STRIPE_SURGE_MONTHLY_PRICE_ID, // Surge monthly
         };
      } if (planName === 'Infinite') {
         return {
            price_id: process.env.REACT_APP_STRIPE_INFINITE_MONTHLY_PRICE_ID, // Infinite monthly
         };
      }
   } else {
      if (planName === 'Essential') {
         return {
            price_id: process.env.REACT_APP_STRIPE_ESSENTIAL_YEARLY_PRICE_ID, // Essential yearly
         };
      } if (planName === 'Surge') {
         return {
            price_id: process.env.REACT_APP_STRIPE_SURGE_YEARLY_PRICE_ID, // Surge yearly
         };
      } if (planName === 'Infinite') {
         return {
            price_id: process.env.REACT_APP_STRIPE_INFINITE_YEARLY_PRICE_ID, // Infinite yearly
         };
      }
   }

   return {
      price_id: 'miestro-starter',
   };
};

export const getSummaryKey = (mainApp) => {
   if (mainApp.plan_name?.includes('surge')) {
      return {
         key: 'surge',
         iconColor: '#379552',
         title: 'Surge',
         summaryPrice: mainApp.plan_name?.includes('monthly') ? '$119/mo' : '$95',
      };
   } if (mainApp.plan_name?.includes('infinite')) {
      return {
         key: 'infinite',
         iconColor: '#DA47FF',
         title: 'Infinite',
         summaryPrice: mainApp.plan_name?.includes('monthly') ? '$199/mo' : '$159',
      };
   } if (mainApp.plan_name?.includes('essential')) {
      return {
         key: 'essential',
         iconColor: '#FFF6D7',
         title: 'Essential',
         summaryPrice: mainApp.plan_name?.includes('monthly') ? '$69/mo' : '$55',
      };
   } 
   return {
      key: 'starter',
      iconColor: '#2585EB',
      title: 'Starter',
      summaryPrice: 'Free',
   };
};

export const getCurrencyPrice = (title, pricingType, currency) => {
   if (title === 'Starter') {
      return 'Free';
   } if (currency.currencyAmount) {
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * pricingType) }`;
   } 
   return `${ currencySymbols[currency.currencyCode] }${ pricingType }`;
};

export const getPriceData = (name, currency, type) => {
   if (name === 'essential' && type === 'monthly') {
      if (!currency.currencyAmount) {
         return '$69';
      } 
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * 69) }`;
   } if (name === 'essential' && type === 'annual') {
      if (!currency.currencyAmount) {
         return '$55';
      } 
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * 55) }`;
   } if (name === 'infinite' && type === 'monthly') {
      if (!currency.currencyAmount) {
         return '$199';
      } 
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * 199) }`;
   } if (name === 'infinite' && type === 'annual') {
      if (!currency.currencyAmount) {
         return '$159';
      } 
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * 159) }`;
   } if (name === 'surge' && type === 'monthly') {
      if (!currency.currencyAmount) {
         return '$119';
      } 
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * 119) }`;
   } if (name === 'surge' && type === 'annual') {
      if (!currency.currencyAmount) {
         return '$95';
      } 
      return `${ currencySymbols[currency.currencyCode] }${ Math.floor(currency.currencyAmount * 95) }`;
   }
};