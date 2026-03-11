const initialState = {
   inputs: {
      email: '',
      password: '',
      password_confirmation: '',
   },
   registerInputs: {
      emailregister: '',
      nameregister: '',
      passwordregister: '',
      password_confirmationregister: '',
   },
   isInProgress: false,
   errors: {},
   forgetPasswordisInProgress: true,
   resetPasswordisInProgress: true,
   registerStudentisInProgress: true,
};

export default initialState;
