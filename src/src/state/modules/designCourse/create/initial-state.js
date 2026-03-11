export default {
   errors: {},
   createSectionInProgress: false,
   createSettingsInProgress: false,
   createProgramInProgress: false,
   createPlanInProgress: false,
   createSignUpInProgress: false,
   generateInprogress: false,
   courseMaterial: {
      sections: [],
   },
   settings: {
      theme: {
         name: '',
         theme_parts: {},
      },
      finish_message: null,
   },
   plan: {
      planTypes: [
         { name: 'Free Plan', icon: 'Dollar', type: 0 },
         { name: 'One Time Plan', icon: 'Money', type: 1 },
         { name: 'Subscription Plan', icon: 'Time', type: 2 },
      ],
      selectedPricing: {},
      addingFirstPlan: false,
   },
   signUp: {
      'order-summary': {},
      'testimonials': [],
      'bullet-points': [],
      'buy-bottom': {},
      'newTestimonialInput': {},
      'newBulletInput': {},
      advanced: { lists: [] },
   },
};
