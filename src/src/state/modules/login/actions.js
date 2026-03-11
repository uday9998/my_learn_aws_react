import * as types from './types';

const setInput = (key, value) => ({
   type: types.SET_INPUT,
   payload: {
      key,
      value,
   },
});

const setRegisterInputs = (registerkey, registervalue) => ({
   type: types.SET_REGISTER_INPUT,
   payload: {
      registerkey,
      registervalue,
   },
});

const loginStart = () => ({
   type: types.LOGIN_START,
});

const loginCompleted = () => {
   return {
      type: types.LOGIN_COMPLETED,
   };
};


const loginFailed = (errors) => ({
   type: types.LOGIN_FAILED,
   payload: {
      errors,
   },
});

const forgotPasswordStart = () => ({
   type: types.FORGOT_PASSWORD_START,
});

const forgotPasswordCompleted = () => {
   return {
      type: types.FORGOT_PASSWORD_COMPLETED,
   };
};

const forgotPasswordFailed = (errors) => ({
   type: types.FORGOT_PASSWORD_FAILED,
   payload: {
      errors,
   },
});

const resetPasswordStart = () => ({
   type: types.RESET_PASSWORD_START,
});

const resetPasswordCompleted = () => {
   return {
      type: types.RESET_PASSWORD_COMPLETED,
   };
};

const resetPasswordFailed = (errors) => ({
   type: types.RESET_PASSWORD_FAILED,
   payload: {
      errors,
   },
});

const registerStudentStart = () => ({
   type: types.REGISTER_STUDENT_START,
});

const registerStudentCompleted = () => {
   return {
      type: types.REGISTER_STUDENT_COMPLETED,
   };
};

const registerStudentFailed = (errors) => ({
   type: types.REGISTER_STUDENT_FAILED,
   payload: {
      errors,
   },
});


export {
   setInput,
   setRegisterInputs,
   loginStart,
   loginCompleted,
   loginFailed,
   forgotPasswordStart,
   forgotPasswordCompleted,
   forgotPasswordFailed,
   resetPasswordStart,
   resetPasswordCompleted,
   resetPasswordFailed,
   registerStudentStart,
   registerStudentCompleted,
   registerStudentFailed,
};
