
const inputsSelector = (state) => {
   return state.login.inputs;
};

const registerInputsSelector = (state) => {
   return state.login.registerInputs;
};
const isInProgressSelector = (state) => {
   return state.login.isInProgress;
};

const errorSelector = (state) => {
   return state.login.errors;
};

const errorVerificationSelector = (state) => {
   return state.login.errors;
};

const hasErrorsSelector = (state) => {
   return Object.getOwnPropertyNames(state.login.errors) > 0;
};

export {
   inputsSelector,
   isInProgressSelector,
   errorSelector,
   errorVerificationSelector,
   hasErrorsSelector,
   registerInputsSelector,
};
