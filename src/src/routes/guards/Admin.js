import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Auth from 'utils/Auth';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { resetCommonDetails } from 'state/modules/common/actions';
// import {
//    authUserRoleSelector, authUserSelector, isSiteInitedSelector, siteInfoSelector, appSelector, mainAppSelector,
//    authMetasSelector,
// } from 'state/modules/common/selectors';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import Layout from 'views/layout/AdminLayout';
import SideBar from 'containers/modules/sidebar';
import { userMaven } from 'utils/userMaven';
import OnboardingContainer from 'containers/modules/onboarding';
import Trial from 'components/elements/Trial';
import moment from 'moment';
import VerifyEmailModal from 'containers/modules/verifyEmail';
import ap3cCheckAndInit from 'utils/ap3cCheckAndInit';
import { portalId } from 'utils/constants';
import {
   authUserRoleSelector,
   authUserSelector,
   isSiteInitedSelector,
   siteInfoSelector,
   appSelector,
   mainAppSelector,
   authMetasSelector,
} from 'state/modules/common/selectors';
// import VerificationModal from 'containers/modules/verifyPhone';
import AIAssistantModal from 'components/modules/AiAssistant/AIAssistantModal';
import SaveCreditCardPage from 'containers/modules/creditCard';
import { checkCreditCardStatus, shouldShowSaveCreditCardPage } from 'services/creditCardService';

// const LiveStreamMainVideo = lazy(() => import('components/elements/liveStream/liveStreamMainVideo'))

class Admin extends Component {
   callPerformed = false;

   static propTypes = {
      authUser: PropTypes.object,
      siteInfo: PropTypes.object,
      authUserRole: PropTypes.any,
      isSiteInited: PropTypes.bool.isRequired,
      goToMemberArea: PropTypes.func.isRequired,
      goToDashboard: PropTypes.func.isRequired,
      component: PropTypes.any,
      init: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      location: PropTypes.object,
      app: PropTypes.object,
      metas: PropTypes.object,
      mainApp: PropTypes.object,
   };

   constructor(props) {
      super(props);

      const storedSeconds = JSON.parse(sessionStorage.getItem('timer')) || 0;

      this.state = {
         seconds: storedSeconds,
         aiAssistantModalOpen: false,
         creditCardStatus: null,
         isCreditCardStatusLoading: true,
      };
   }

   componentDidMount() {
      const {
         init,
         isSiteInited,
         logout,
         authUser,
         siteInfo,
         authUserRole,
         mainApp,
         goToMemberArea,
         goToDashboard,
      } = this.props;
      window.rightClickIsOn = false;

      if (!isSiteInited) {
         init((user) => {
            // fixed crush if usermaven is not defined
            if (user && user.uuid) {
               userMaven(user);
            }
         });
      } else if (isSiteInited && !authUser) {
         // eslint-disable-next-line react/prop-types
         logout(siteInfo.status ? 'OFFERS' : 'LOGIN');
      } else if (isSiteInited && authUser && authUser.is_affiliate) {
         window.location = '/affiliate/dashboard';
      } else if (isSiteInited && authUser && authUserRole === 'member') {
         goToMemberArea();
      } else if (isSiteInited && authUser && authUserRole === 'sub-admin' && this.subAdminNotAllow()) {
         goToDashboard();
      } else if (isSiteInited && authUser && authUserRole === 'assistant' && this.assistantNotAllow()) {
         goToDashboard();
      } else if (isSiteInited && authUser && authUserRole === 'support' && this.supportNotAllow()) {
         goToDashboard();
      } else if (isSiteInited && authUser && (authUserRole === 'admin' || authUserRole === 'sub-admin' || authUserRole === 'support' || authUserRole === 'assistant')) {
         // Check credit card status for admin users
         if (this.state.isCreditCardStatusLoading) {
            this.checkUserCreditCardStatus();
         }
         
         if (mainApp.stripe_customer_id && authUser.uuid) {
            const existScript = document.getElementById('onboardFlow');
            if (!existScript) {
               const onboardFlowScript = document.createElement('script');
               onboardFlowScript.setAttribute('id', 'onboardFlow');
               onboardFlowScript.innerHTML = `window.onboardFlowSettings = {
                        "site_key":             "yZpuacpx",
                        "user": {
                           "id":               ${JSON.stringify(authUser.uuid)},
                           "customer_id":      ${JSON.stringify(mainApp.stripe_customer_id)},
                           "email":            ${JSON.stringify(authUser.email)},
                           "image_url":        ${JSON.stringify(authUser.picture_full_src)},
                        },
                        "custom_properties": {
                           'total': 0
                        }
                  };
                  (function() {var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;
                  po.src = "https://media.onboardflow.com/gen/tracker/yZpuacpx.min.js";
                  po.onload = po.onreadystatechange = function() {var rs = this.readyState; if (rs && rs != 'complete' && rs != 'loaded') return;
                  OnboardFlowLoader = new OnboardFlowLoaderClass(); OnboardFlowLoader.identify(window.onboardFlowSettings);};
                  var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);})();`;
               document.querySelector('head').append(onboardFlowScript);
            }
         }
         if (authUser && authUser.uuid) {
            const existProfitWellScript = document.getElementById('profitwell-js');
            if (!existProfitWellScript) {
               const ProfitWellScript = document.createElement('script');
               ProfitWellScript.setAttribute('id', 'profitwell-js');
               ProfitWellScript.setAttribute('data-pw-auth', '567ba3b54f805ac9db77e9089eec84c3');
               ProfitWellScript.innerHTML = `(function(i,s,o,g,r,a,m){i[o]=i[o]||function(){(i[o].q=i[o].q||[]).push(arguments)}; a=s.createElement(g);m=s.getElementsByTagName(g)[0];a.async=1;a.src=r+'?auth='+s.getElementById(o+'-js').getAttribute('data-pw-auth');m.parentNode.insertBefore(a,m);})(window,document,'profitwell','script','https://public.profitwell.com/js/profitwell.js');
               profitwell('start', { 'user_email': ${JSON.stringify(authUser.email)} });`;
               document.querySelector('head').append(ProfitWellScript);
            }

            if (typeof window.Beacon === 'function') {
               window.Beacon('identify', {
                  name: authUser.name,
                  email: authUser.email,
               });
            }
            const TruConversion = document.createElement('script');
            TruConversion.innerHTML = `var _tip = _tip || [];
            (function(d,s,id){
                var js, tjs = d.getElementsByTagName(s)[0];
                if(d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.async = true;
                js.src = d.location.protocol + '//app.truconversion.com/ti-js/17882/b1533.js';
                tjs.parentNode.insertBefore(js, tjs);
            }(document, 'script', 'ti-js'));`;
            document.querySelector('head').append(TruConversion);
            userMaven(authUser);
         }
      }
      ap3cCheckAndInit();
   }

   componentDidUpdate() {
      const {
         authUser, authUserRole, isSiteInited, logout, goToMemberArea, siteInfo,
         goToDashboard, mainApp,
      } = this.props;

      if (isSiteInited && !authUser) {
         // eslint-disable-next-line react/prop-types
         logout(siteInfo.status ? 'OFFERS' : 'LOGIN');
      } else if (isSiteInited && authUser && authUser.is_affiliate) {
         window.location = '/affiliate/dashboard';
      } else if (isSiteInited && authUser && authUserRole === 'member') {
         goToMemberArea();
      } else if (isSiteInited && authUser && authUserRole === 'sub-admin' && this.subAdminNotAllow()) {
         goToDashboard();
      } else if (isSiteInited && authUser && authUserRole === 'assistant' && this.assistantNotAllow()) {
         goToDashboard();
      } else if (isSiteInited && authUser && authUserRole === 'support' && this.supportNotAllow()) {
         goToDashboard();
      } else if (isSiteInited && authUser && (authUserRole === 'admin' || authUserRole === 'sub-admin' || authUserRole === 'support' || authUserRole === 'assistant')) {
         // Check credit card status for admin users
         if (this.state.isCreditCardStatusLoading) {
            this.checkUserCreditCardStatus();
         }
         
         // if (this.callPerformed === false && authUser.uuid) {
         //    getPaykickCustomer(authUser.email).then((response) => {
         //       if (response.status === 200 && response.data && response.data.status && response.data.sub_id) {
         //          const paykickIframe = document.createElement('iframe');
         //          paykickIframe.setAttribute('src', `https://app.paykickstart.com/in-app/notifications/iframe/xlxp2Nq2qLVIYMkUleEFoE73BMoOZIdZ2QxpxN99FWZubtT9Yq/${ response.data.secret }/${ response.data.sub_id }`);
         //          paykickIframe.setAttribute('frameborder', '0');
         //          document.querySelector('body').append(paykickIframe);
         //          const paykickScript = document.createElement('script');
         //          paykickScript.setAttribute('src', 'https://app.paykickstart.com/in-app/notifications/js/xlxp2Nq2qLVIYMkUleEFoE73BMoOZIdZ2QxpxN99FWZubtT9Yq');
         //          document.querySelector('body').append(paykickScript);
         //       }
         //    });
         //    this.callPerformed = true;
         // }

         // USERGUIDING REMOVED
         // const userGuidingScript = document.createElement('script');
         // userGuidingScript.setAttribute('id', 'userGuiding');
         // userGuidingScript.innerHTML = '(function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src=\'https://static.userguiding.com/media/user-guiding-\'+s+\'-embedded.js\';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=[\'previewGuide\',\'finishPreview\',\'track\',\'identify\',\'triggerNps\',\'hideChecklist\',\'launchChecklist\'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,\'script\',\'userGuiding\',\'userGuidingLayer\',\'3286268ID\');';
         // document.querySelector('head').append(userGuidingScript);

         if (mainApp.stripe_customer_id && authUser.uuid) {
            const existScript = document.getElementById('onboardFlow');
            if (!existScript) {
               const onboardFlowScript = document.createElement('script');
               onboardFlowScript.setAttribute('id', 'onboardFlow');
               onboardFlowScript.innerHTML = `window.onboardFlowSettings = {
                        "site_key":             "yZpuacpx",
                        "user": {
                           "id":               ${JSON.stringify(authUser.uuid)},
                           "customer_id":      ${JSON.stringify(mainApp.stripe_customer_id)},
                           "email":            ${JSON.stringify(authUser.email)},
                           "image_url":        ${JSON.stringify(authUser.picture_full_src)},
                        },
                        "custom_properties": {
                           'total': 0
                        }
                  };
                  (function() {var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;
                  po.src = "https://media.onboardflow.com/gen/tracker/yZpuacpx.min.js";
                  po.onload = po.onreadystatechange = function() {var rs = this.readyState; if (rs && rs != 'complete' && rs != 'loaded') return;
                  OnboardFlowLoader = new OnboardFlowLoaderClass(); OnboardFlowLoader.identify(window.onboardFlowSettings);};
                  var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);})();`;
               document.querySelector('head').append(onboardFlowScript);
            }
         }
         if (authUser && authUser.uuid) {
            // const user = {
            //    email: authUser.email,
            //    name: authUser.name,
            //    user_id: authUser.uuid,
            //    company: authUser.company_name,
            //    custom_data: {
            //       register_date: authUser.created_at,
            //       last_login: authUser.last_login_at,
            //       domain: authUser.domain,
            //       is_https_active: authUser.is_https_active,
            //       is_domain_pointed_to_miestro: authUser.is_domain_pointed,
            //       next_billing_date: authUser.next_billing_date,
            //       paypal_email: authUser.paypal_email,
            //       subdomain: `${ authUser.subdomain }.miestro.com`,
            //    },
            // };
            // window.HelpCrunch('updateUser', user, authUser.uuid, () => {});

            const existProfitWellScript = document.getElementById('profitwell-js');
            if (!existProfitWellScript) {
               const ProfitWellScript = document.createElement('script');
               ProfitWellScript.setAttribute('id', 'profitwell-js');
               ProfitWellScript.setAttribute('data-pw-auth', '567ba3b54f805ac9db77e9089eec84c3');
               ProfitWellScript.innerHTML = `(function(i,s,o,g,r,a,m){i[o]=i[o]||function(){(i[o].q=i[o].q||[]).push(arguments)}; a=s.createElement(g);m=s.getElementsByTagName(g)[0];a.async=1;a.src=r+'?auth='+s.getElementById(o+'-js').getAttribute('data-pw-auth');m.parentNode.insertBefore(a,m);})(window,document,'profitwell','script','https://public.profitwell.com/js/profitwell.js');
               profitwell('start', { 'user_email': ${JSON.stringify(authUser.email)} });`;
               document.querySelector('head').append(ProfitWellScript);
            }

            if (typeof window.Beacon === 'function') {
               window.Beacon('identify', {
                  name: authUser.name,
                  email: authUser.email,
               });
            }
            const TruConversion = document.createElement('script');
            TruConversion.innerHTML = `var _tip = _tip || [];
            (function(d,s,id){
                var js, tjs = d.getElementsByTagName(s)[0];
                if(d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.async = true;
                js.src = d.location.protocol + '//app.truconversion.com/ti-js/17882/b1533.js';
                tjs.parentNode.insertBefore(js, tjs);
            }(document, 'script', 'ti-js'));`;
            document.querySelector('head').append(TruConversion);
            userMaven(authUser);
         }
      }
      ap3cCheckAndInit();
   }

   // eslint-disable-next-line react/sort-comp
   // componentWillMount() {
   //    window.rightClickIsOn = false;
   // }

   subAdminNotAllow = () => {
      const { location } = this.props;
      if (location.pathname === Router.route('ADMIN_PLANS').getMask()) {
         return true;
      }
      return false;
   }

   assistantNotAllow = () => {
      const { location } = this.props;
      if (location.pathname === Router.route('ADMIN_TRANSACTIONS').getMask()
         || location.pathname === Router.route('ADMIN_REVENUE_REPORTS').getMask()
         || location.pathname === Router.route('ADMIN_REPORTS').getMask()
         || location.pathname === Router.route('ADMIN_PLANS').getMask()
      ) {
         return true;
      }
      return false;
   }

   supportNotAllow = () => {
      const { location } = this.props;
      if (location.pathname === Router.route('ADMIN_TRANSACTIONS').getMask()
         || location.pathname === Router.route('ADMIN_REVENUE_REPORTS').getMask()
         || location.pathname === Router.route('ADMIN_REPORTS').getMask()
         || location.pathname === Router.route('ADMIN_PLANS').getMask()
      ) {
         return true;
      }
      return false;
   };

   openAIAssistantModal = () => {
      this.setState({ aiAssistantModalOpen: true });
   }

   closeAIAssistantModal = () => {
      this.setState({ aiAssistantModalOpen: false });
   }

   checkUserCreditCardStatus = async () => {
      const { authUser } = this.props;

      if (!authUser || !authUser.email) {
         this.setState({ 
            creditCardStatus: { has_credit_card: false, has_saved_credit_card: false },
            isCreditCardStatusLoading: false,
         });
         return;
      }

      try {
         const result = await checkCreditCardStatus(authUser.email);

         this.setState({ 
            creditCardStatus: result.data,
            isCreditCardStatusLoading: false,
         });
      } catch (error) {
         this.setState({ 
            creditCardStatus: { has_credit_card: false, has_saved_credit_card: false },
            isCreditCardStatusLoading: false,
         });
      }
   }

   render() {
      const {
         component: ChildComponent,
         authUser,
         app,
         authUserRole,
         isSiteInited,
         metas,
         mainApp,
         location,
         ...rest
      } = this.props;
      
      const { creditCardStatus, isCreditCardStatusLoading, aiAssistantModalOpen } = this.state;

      // FIRST PRIORITY: Check if we should show SaveCreditCard page before anything else
      const shouldCheckCreditCard = isSiteInited && authUser && (authUserRole === 'admin' || authUserRole === 'sub-admin' || authUserRole === 'support' || authUserRole === 'assistant');
      const isLoadingComplete = !isCreditCardStatusLoading;

      // Show loading state instead of dashboard flash while checking credit card status
      if (shouldCheckCreditCard && isCreditCardStatusLoading) {
         return (
            <div style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '100vh',
               backgroundColor: '#f9fafb'
            }}>
               <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
               }}>
                  <div className="spinner" style={{
                     width: '40px',
                     height: '40px',
                     border: '4px solid #e5e7eb',
                     borderTop: '4px solid #24554e'
                  }}></div>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</p>
               </div>
            </div>
         );
      }

      // Only show SaveCreditCard if loading is complete and user needs to save card
      if (shouldCheckCreditCard && isLoadingComplete) {
         const shouldShowPage = shouldShowSaveCreditCardPage(authUser, creditCardStatus);
         if (shouldShowPage) {
            return <SaveCreditCardPage />;
         }
      }

      // Only calculate other values if SaveCreditCard is not showing
      let diffTrialDays = 0;
      if (mainApp) {
         const dateCreated = moment(mainApp.created_at);
         const dateNow = moment(Date.now());
         const diffDays = dateNow.diff(dateCreated, 'days');
         diffTrialDays = mainApp.trial - diffDays;
      }

      const splittedPathname = location.pathname.split('/');
      const isMatchRouteForTrialHeader = (
         splittedPathname.includes('admin') && splittedPathname.includes('courses') && splittedPathname.includes('sections') && splittedPathname.includes('lessons')
      ) || (
            splittedPathname.includes('admin') && splittedPathname.includes('landings') && splittedPathname.includes('edit')
         ) || (
            splittedPathname.includes('admin') && splittedPathname.includes('portal') && splittedPathname.some(el => el.includes('template'))
         ) || (
            splittedPathname.includes('admin') && splittedPathname.includes('automations') && splittedPathname.some(el => el.includes('edit'))
         ) || (
            splittedPathname.includes('admin') && splittedPathname.includes('blog') && splittedPathname.some(el => el.includes('edit'))
         );

      if (isSiteInited && authUser && (authUserRole === 'admin' || authUserRole === 'sub-admin' || authUserRole === 'support' || authUserRole === 'assistant')) {
         return (
            <>

               {
                  app.checked_steps === 0 && (
                     <OnboardingContainer />
                  )
               }

               {
                  app.checked_steps !== 0 && authUser.is_verified_email === 0 && (
                     <VerifyEmailModal />
                  )
               }

               {/* {
                  (authUser.is_verified_phone === false ||
                     authUser.is_verified_phone === "" ||
                     authUser.is_verified_email === 1) && (
                     <VerificationModal />
                  )
               } */}
               {
                  mainApp && mainApp.trial < 50 && diffTrialDays > 0 && !isMatchRouteForTrialHeader && !mainApp.plan_name?.includes('starter') && (
                     <Trial diffTrialDays={diffTrialDays} />
                  )
               }

               <Layout
                  isShowTrial={mainApp && mainApp.trial < 50 && diffTrialDays > 0 && !mainApp.plan_name?.includes('starter') && !isMatchRouteForTrialHeader}
               >
                  <Layout.LeftBar>
                     <SideBar metas={metas} authUser={authUser} app={app} openAIAssistantModal={this.openAIAssistantModal} />
                  </Layout.LeftBar>
                  <Route
                     {...rest}
                     render={(matchProps) => {
                        return <ChildComponent {...matchProps} />;
                     }}
                  />
               </Layout>

               {aiAssistantModalOpen && (
                  <AIAssistantModal
                     isOpen={aiAssistantModalOpen}
                     onClose={this.closeAIAssistantModal}
                  />
               )}
            </>
         );
      }
      return null;
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      app: appSelector(state),
      metas: authMetasSelector(state),
      authUserRole: authUserRoleSelector(state),
      isSiteInited: isSiteInitedSelector(state),
      siteInfo: siteInfoSelector(state),
      mainApp: mainAppSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      init: (callback) => {
         dispatch(siteDetailsInitOperation(callback));
      },
      goToMemberArea: () => {
         window.location.href = '/portal';
         // dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      goToDashboard: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      logout: (route) => {
         Auth.logout();
         dispatch(resetCommonDetails());
         if (route === 'OFFERS') {
            dispatch(push(Router.route(route).getCompiledPath(portalId)));
         } else {
            dispatch(push(Router.route(route).getMask()));
         }
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
