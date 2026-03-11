const initialState = {
   dataIsFetching: true,
   updateAccountInProgress: true,
   getAccountInProgress: false,
   errors: {},
   courses: {},
   orders: {},
   account: {
      password: '',
      current_password: '',
      password_confirmation: '',
   },
   getResetCourseInProgress: true,
   accountImgChanged: '',
};

export default initialState;
