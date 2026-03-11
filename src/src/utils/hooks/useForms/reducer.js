import reducersMap from './reducersMap';

export default (dynamicReducer = {}) => (state, action) => {
   const reducer = Object.assign(reducersMap, dynamicReducer);
   if (reducer[action.type]) {
      return reducersMap[action.type](state, action);
   }
   return { ...state };
};
