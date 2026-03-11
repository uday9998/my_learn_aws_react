import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Router from 'routes/router';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const NotFound = lazy(() => import('views/pages/404'));
const AffiliateDashboard = lazy(() => import('containers/pages/affiliate/dashboard'));
const AffiliatePasswordReset = lazy(() => import('containers/pages/affiliate/passwordReset'));
const AffiliateLogin = lazy(() => import('containers/pages/affiliate/login'));
const AffiliateRegister = lazy(() => import('containers/pages/affiliate/register'));
const AffiliateProducts = lazy(() => import('containers/pages/affiliate/products'));
const AffiliateProfile = lazy(() => import('containers/pages/affiliate/profile'));
const AffiliateReports = lazy(() => import('containers/pages/affiliate/reports'));

export default () => {
   useEffect(() => {
      document.querySelector('html').style.backgroundColor = '';
   }, []);
   return (
      <Suspense fallback={ <LoaderSpinner /> }>
         <Switch>
            <Route exact={ Router.route('AFFILIATE_DASHBOARD').isExact() } path={ Router.route('AFFILIATE_DASHBOARD').getMask() } component={ AffiliateDashboard } />
            <Route exact={ Router.route('AFFILIATE_FRONT_PASSWORD_RESET').isExact() } path={ Router.route('AFFILIATE_FRONT_PASSWORD_RESET').getMask() } component={ AffiliatePasswordReset } />
            <Route exact={ Router.route('AFFILIATE_FRONT_LOGIN').isExact() } path={ Router.route('AFFILIATE_FRONT_LOGIN').getMask() } component={ AffiliateLogin } />
            <Route exact={ Router.route('AFFILIATE_FRONT_REGISTER').isExact() } path={ Router.route('AFFILIATE_FRONT_REGISTER').getMask() } component={ AffiliateRegister } />
            <Route exact={ Router.route('AFFILIATE_FRONT_PRODUCTS').isExact() } path={ Router.route('AFFILIATE_FRONT_PRODUCTS').getMask() } component={ AffiliateProducts } />
            <Route exact={ Router.route('AFFILIATE_FRONT_PROFILE_SETTINGS').isExact() } path={ Router.route('AFFILIATE_FRONT_PROFILE_SETTINGS').getMask() } component={ AffiliateProfile } />
            <Route exact={ Router.route('AFFILIATE_FRONT_REPORTS').isExact() } path={ Router.route('AFFILIATE_FRONT_REPORTS').getMask() } component={ AffiliateReports } />
            <Route component={ () => <NotFound isAdmin /> } />
         </Switch>
      </Suspense>
   );
};
