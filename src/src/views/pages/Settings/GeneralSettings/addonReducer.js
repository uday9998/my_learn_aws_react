const TYPES = {
   CREATE_DOMAIN_COMPLETED: 'CREATE_DOMAIN_COMPLETED',
   DELETE_DOMAIN_COMPLETED: 'DELETE_DOMAIN_COMPLETED',
};

export const ACTIONS = {
   createDomainCompleted: (domain) => ({
      type: TYPES.CREATE_DOMAIN_COMPLETED,
      payload: { domain },
   }),
   deleteDomainCompleted: () => ({
      type: TYPES.DELETE_DOMAIN_COMPLETED,
   }),
};

export default {
   [TYPES.CREATE_DOMAIN_COMPLETED]: (state, action) => {
      const { payload: { domain } } = action;
      return {
         ...state,
         domain: {
            ...state.domain,
            data: { ...state.domain.data, domain },
         },
      };
   },
   [TYPES.DELETE_DOMAIN_COMPLETED]: (state) => {
      return {
         ...state,
         domain: {
            ...state.domain,
            data: { ...state.domain.data, domain: '' },
         },
      };
   },
};
