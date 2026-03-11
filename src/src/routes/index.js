import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import Router from 'routes/router';
import SocketInit from 'utils/userOnlinSocket';
import { ToastContainer } from 'react-toastify';
import LoaderSpinner from 'components/elements/LoaderSpiner';

import BlockedIp from 'containers/modules/blockedIp';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import AdminRoutes from './admin';
import MixedRoutes from './mixed';
import AffiliateRoutes from './affiliate';
import Admin from './guards/Admin';
import Member from './guards/Member';
import Guest from './guards/Guest';
import Mixed from './guards/Mixed';
import Affiliate from './guards/Affiliate';

const AttemptContainer = lazy(() => import('containers/pages/guest/auth/AttemptContainer'));
const AccountContainer = lazy(() => import('containers/pages/member/account'));
const LoginStudentContainer = lazy(() => import('containers/pages/guest/auth/LoginStudentContainer'));
const ForgotPasswordContainer = lazy(() => import('containers/pages/guest/auth/ForgotPasswordContainer'));
const ResetPasswordContainer = lazy(() => import('containers/pages/guest/auth/ResetPasswordContainer'));
const SignupStudentContainer = lazy(() => import('containers/pages/guest/auth/SignupStudentContainer'));
const StudentsRoomContainer = lazy(() => import('containers/pages/member/studentsRoom'));
const StudentsViewContainer = lazy(() => import('containers/pages/guest/studentsView'));
const MemberUnsubscribeEmailContainer = lazy(() => import('containers/pages/mixed/memberUnsubscribe'));
const UnsubscribeEmailContainer = lazy(() => import('containers/pages/mixed/unsubscribe'));
const BlogPreviewContainer = lazy(() => import('containers/pages/mixed/blogPreview'));
const BlogListingContainer = lazy(() => import('containers/pages/mixed/blogListing'));
const ThankYouContainer = lazy(() => import('containers/pages/member/thankyou'));
const LandingPagesPreviewContainer = lazy(() => import('containers/pages/mixed/landingPages/preview'));
const CheckoutPreviewContainer = lazy(() => import('containers/pages/mixed/checkoutPreview'));
const SchoolRoomPreviewContainer = lazy(() => import('containers/pages/mixed/schoolroomPreview'));
const CheckoutTempPreviewContainer = lazy(() => import('containers/pages/mixed/checkoutPreview/temp'));
const SchoolRoomTempPreviewContainer = lazy(() => import('containers/pages/mixed/schoolroomPreview/temp'));
const SecureLoginContainer = lazy(() => import('containers/pages/mixed/securelogin'));
const NotFound = lazy(() => import('views/pages/404'));
const offersPage = lazy(() => import('containers/pages/mixed/offers'));
const OtherPagesPreview = lazy(() => import('containers/pages/mixed/otherPagesPreview'));

export default () => {
   const { search } = useLocation();
   
   return (
      <>
         <Suspense fallback={ <LoaderSpinner /> }>
            <SocketInit>
               <Switch>
                  <Route
                     exact={ true }
                     path='/'
                     render={ (() => {
                        return <Redirect to={ search ? Router.route('ADMIN_DASHBOARD').getMask() : '/portal/membership' } />;
                     }) }
                  />
                  <Route exact={ Router.route('AUTH_ATTEMPT').isExact() } path={ Router.route('AUTH_ATTEMPT').getMask() } component={ AttemptContainer } />
                  <Route exact={ Router.route('BLOCKED_IP').isExact() } path={ Router.route('BLOCKED_IP').getMask() } component={ BlockedIp } />
                  <Guest exact={ Router.route('LOGIN').isExact() } path={ Router.route('LOGIN').getMask() } component={ LoginStudentContainer } />
                  <Guest exact={ Router.route('FORGOT_PASSWORD').isExact() } path={ Router.route('FORGOT_PASSWORD').getMask() } component={ ForgotPasswordContainer } />
                  <Guest exact={ Router.route('RESET_PASSWORD').isExact() } path={ Router.route('RESET_PASSWORD').getMask() } component={ ResetPasswordContainer } />
                  <Guest exact={ Router.route('SIGNUP_STUDENT').isExact() } path={ Router.route('SIGNUP_STUDENT').getMask() } component={ SignupStudentContainer } />
                  <Mixed exact={ Router.route('LANDING_PAGES_PREVIEW').isExact() } path={ Router.route('LANDING_PAGES_PREVIEW').getMask() } component={ LandingPagesPreviewContainer } />
                  <Mixed exact={ Router.route('BLOG_PREVIEW').isExact() } path={ Router.route('BLOG_PREVIEW').getMask() } component={ BlogPreviewContainer } />
                  <Mixed exact={ Router.route('BLOG_LISTING').isExact() } path={ Router.route('BLOG_LISTING').getMask() } component={ BlogListingContainer } />
                  <Member exact={ Router.route('MEMBER_ACCOUNT').isExact() } path={ Router.route('MEMBER_ACCOUNT').getMask() } component={ AccountContainer } />
                  <Mixed exact={ Router.route('STUDENTS_ROOM').isExact() } path={ Router.route('STUDENTS_ROOM').getMask() } component={ StudentsRoomContainer } />
                  <Mixed exact={ Router.route('STUDENTS_VIDEOROOM').isExact() } path={ Router.route('STUDENTS_VIDEOROOM').getMask() } component={ StudentsRoomContainer } />
                  <Mixed exact={ Router.route('STUDENTS_PLAYLISTROOM').isExact() } path={ Router.route('STUDENTS_PLAYLISTROOM').getMask() } component={ StudentsRoomContainer } />
                  <Mixed exact={ Router.route('CHECKOUT').isExact() } path={ Router.route('CHECKOUT').getMask() } component={ StudentsViewContainer } />
                  <Mixed exact={ Router.route('THANK_YOU').isExact() } path={ Router.route('THANK_YOU').getMask() } component={ ThankYouContainer } />
                  <Mixed exact={ Router.route('MEMBER_SECURE_LOGIN').isExact() } path={ Router.route('MEMBER_SECURE_LOGIN').getMask() } component={ SecureLoginContainer } />
                  <Route exact={ Router.route('MEMBER_SECURE_LOGIN_THANK_YOU').isExact() } path={ Router.route('MEMBER_SECURE_LOGIN_THANK_YOU').getMask() } component={ SecureLoginContainer } />
                  <Route exact={ Router.route('MEMBER_SECURE_COURSE_LOGIN').isExact() } path={ Router.route('MEMBER_SECURE_COURSE_LOGIN').getMask() } component={ SecureLoginContainer } />
                  <Route exact path='/courses'>
                     <Redirect to='/portal/membership' />
                  </Route>
                  {/* <Mixed exact={ false } path='/offers' component={ MixedRoutes } />
                  <Mixed exact={ false } path='/courses' component={ MixedRoutes } /> */}
                  <Mixed exact={ false } path='/portal' component={ MixedRoutes } />
                  <Affiliate exact={ false } path='/affiliate' component={ AffiliateRoutes } />
                  <Admin exact={ false } path='/admin' component={ AdminRoutes } />
                  <Mixed exact={ true } path={ Router.route('MEMBER_UNSUBSCRIBE_EMAIL').getMask() } component={ MemberUnsubscribeEmailContainer } />
                  <Mixed exact={ Router.route('CHECKOUT_PREVIEW').isExact() } path={ Router.route('CHECKOUT_PREVIEW').getMask() } component={ CheckoutPreviewContainer } />
                  <Mixed exact={ Router.route('CHECKOUT_TEMP_PREVIEW').isExact() } path={ Router.route('CHECKOUT_TEMP_PREVIEW').getMask() } component={ CheckoutTempPreviewContainer } />
                  <Mixed exact={ Router.route('SCHOOLROOM_PREVIEW').isExact() } path={ Router.route('SCHOOLROOM_PREVIEW').getMask() } component={ SchoolRoomPreviewContainer } />
                  <Mixed exact={ Router.route('SCHOOLROOM_TEMP_PREVIEW').isExact() } path={ Router.route('SCHOOLROOM_TEMP_PREVIEW').getMask() } component={ SchoolRoomTempPreviewContainer } />
                  <Mixed exact={ Router.route('OTHER_PAGES_PREVIEW').isExact() } path={ Router.route('OTHER_PAGES_PREVIEW').getMask() } component={ OtherPagesPreview } />
                  <Mixed exact={ true } path={ Router.route('UNSUBSCRIBE_EMAIL').getMask() } component={ UnsubscribeEmailContainer } />
                  <Mixed exact={ Router.route('BRIDGE').isExact() } path={ Router.route('BRIDGE').getMask() } component={ offersPage } />
                  <Route component={ NotFound } />
               </Switch>
            </SocketInit>
         </Suspense>
         {
            ReactDOM.createPortal(
               <ToastContainer
                  className='toast-container'
                  autoClose={ 6000 }
                  hideProgressBar
               />,
               document.getElementById('toasts_new')
            )
         }
      </>
   );
};
