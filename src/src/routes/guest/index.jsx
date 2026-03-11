import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';
import Router from 'routes/router';

const LoginStudentContainer = lazy(() => import('containers/pages/guest/auth/LoginStudentContainer'));
const ForgotPasswordContainer = lazy(() => import('containers/pages/guest/auth/ForgotPasswordContainer'));
const ResetPasswordContainer = lazy(() => import('containers/pages/guest/auth/ResetPasswordContainer'));
const SignupStudentContainer = lazy(() => import('containers/pages/guest/auth/SignupStudentContainer'));
const NotFound = lazy(() => import('views/pages/404'));


export default () => {
   return (
      <Switch>
         <Route exact={ Router.route('LOGIN').isExact() } path={ Router.route('LOGIN').getMask() } component={ LoginStudentContainer } />
         <Route exact={ Router.route('FORGOT_PASSWORD').isExact() } path={ Router.route('FORGOT_PASSWORD').getMask() } component={ ForgotPasswordContainer } />
         <Route exact={ Router.route('RESET_PASSWORD').isExact() } path={ Router.route('RESET_PASSWORD').getMask() } component={ ResetPasswordContainer } />
         <Route exact={ Router.route('SIGNUP_STUDENT').isExact() } path={ Router.route('SIGNUP_STUDENT').getMask() } component={ SignupStudentContainer } />
         <Route component={ NotFound } />
      </Switch>
   );
};
