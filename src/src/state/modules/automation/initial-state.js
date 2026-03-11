const initialState = {
   getCoursesInProgress: false,
   getAutomationInProgress: true,
   getActionInProgress: false,
   getTriggerInProgress: false,
   getallMembersInProgress: false,
   getallQuizzesInProgress: false,
   quizzes: [],
   members: [],
   courses: [],
   initialAutomationsLength: undefined,
   tags: [],
   coupons: [],
   automation: {
      triggers: [],
      actions: [],
   },
   automations: [],
   currentTrigger: {},
   currentAction: {},
   conditions: [{
      id: 0,
      key: 'tag_name',
      match: 'contain',
      value: '',
   }],
};

export default initialState;
