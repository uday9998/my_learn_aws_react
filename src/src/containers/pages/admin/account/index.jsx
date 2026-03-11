/* eslint-disable react/no-unused-state */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Container from 'views/layout/AdminContainer';
import withLoading from 'utils/withLoading';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/account/selector';
import * as operations from 'state/modules/account/operations';
import PropTypes from 'prop-types';
import getDeff from 'utils/getDeff';
import Auth from 'utils/Auth';
import { resetCommonDetails } from 'state/modules/common/actions';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { authUserSelector, mainAppSelector, screenWidthSelector } from 'state/modules/common/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import Billing from './components/Billing';
import BillingHeader from './components/BillingHeader';

const AccountIsLoading = withLoading(Container);

class AdminAccount extends Component {
   static propTypes = {
      getAccountInfo: PropTypes.func,
      account: PropTypes.object,
      isFetching: PropTypes.bool,
      setSettings: PropTypes.func,
      fullAccount: PropTypes.object,
      getPlans: PropTypes.func,
      plans: PropTypes.object,
      planProgress: PropTypes.bool,
      updatePlan: PropTypes.func,
      onCancel: PropTypes.func,
      updateCard: PropTypes.func,
      changePlan: PropTypes.func,
      updateBilling: PropTypes.func,
      onReactivate: PropTypes.func,
      logout: PropTypes.func,
      progresBiling: PropTypes.bool,
      authUser: PropTypes.object,
      screenWidht: PropTypes.number,
      connectToPlan: PropTypes.func,
      progressPlanConnect: PropTypes.func,
      mainApp: PropTypes.object,
      
   };

   constructor(props) {
      super(props);
      this.state = {
         showPricings: false,
      };
   }
  

   componentDidMount() {
      const { getPlans, getAccountInfo } = this.props;
      getAccountInfo();
      getPlans();
      if (localStorage.getItem('showPlans') === 'showPlans') {
         this.setState({ showPricings: true });
      }
   }

   componentWillUnmount() {
      localStorage.removeItem('showPlans');
   }

   onSaveAccountInfo = (inputs) => {
      const { account, setSettings } = this.props;
      const deff = getDeff(account, inputs);
      setSettings(deff);
   }

   onSwitch = (label) => {
      const { getAccountInfo, getPlans } = this.props;
      switch (label) {
         case 'personal':
            getAccountInfo();
            break;
         default:
            getPlans();
      }
   }

   handleUpdatePlan = (token, plan) => {
      const { updatePlan } = this.props;
      const inputs = {
         cc_last4: token.card.last4,
         cc_exp_year: token.card.exp_year,
         cc_exp_month: token.card.exp_month,
         token: token.id,
         plan,
      };
      updatePlan(inputs);
   }

   handleChangePlan = (plan) => {
      const { changePlan } = this.props;
      changePlan(plan);
   }

   handleConnectToPlan = (token, plan) => {
      const { connectToPlan } = this.props;
      const inputs = {
         cc_last4: token.card.last4,
         cc_exp_year: token.card.exp_year,
         cc_exp_month: token.card.exp_month,
         token: token.id,
         plan,
      };
      connectToPlan(inputs);
   }

   handleShowPricingList = () => {
      const { showPricings } = this.state;
      this.setState({
         showPricings: !showPricings,
      });
   }


   render() {
      const {
         account, isFetching, fullAccount, plans, planProgress, onCancel, onReactivate, progresBiling, updateBilling,
         logout, updateCard, authUser, screenWidht, progressPlanConnect, mainApp, getPlans,
      } = this.props;

      const { showPricings } = this.state;

      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <Container>
               {
                  showPricings && (
                     <BillingHeader 
                        title='All Plans'
                        handleShowPricingList={ this.handleShowPricingList }
                     />
                  )
               }
               <Container.Content>
                  {
                     !showPricings && (
                        <HeaderTypeSecond
                           title='Billing'
                           tooltip='This is where you can manage the settings for multiple areas of your account.'
                           isHaveBaseButton={ false }
                           isHidenSearch={ true }
                        />
                     )
                  }
                  <Billing 
                     plans={ plans }
                     mainApp={ mainApp }
                     showPricings={ showPricings }
                     handleShowPricingList={ this.handleShowPricingList }
                     authUser={ authUser }
                     getPlans={ getPlans }
                  />
                  {/* <MyAccountView
                     changePlan={ this.handleChangePlan }
                     connectToPlan={ this.handleConnectToPlan }
                     plans={ plans }
                     updatePlan={ this.handleUpdatePlan }
                     onReactivate={ onReactivate }
                     account={ account }
                     onSaveBillingAddressData={ updateBilling }
                     onLogout={ logout }
                     onSwitchTab={ this.onSwitch }
                     onUpdateCard={ (id) => updateCard(id) }
                     onCancel={ onCancel }
                     onSaveAccountInformation={ this.onSaveAccountInfo }
                     isVerifiedEmail={ fullAccount ? !!fullAccount.is_verified_email : false }
                     isFetching={ isFetching || planProgress || progresBiling }
                     authUser={ authUser }
                     isMobile={ screenWidht < 1024 }
                     progressPlanConnect={ progressPlanConnect }
                  /> */}
               </Container.Content>
            </Container>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      account: selectors.getAccountInfo(state),
      isFetching: selectors.getProgress(state),
      fullAccount: selectors.getFullAccountInfo(state),
      plans: selectors.getPlans(state),
      planProgress: selectors.getPlansProgress(state),
      progresBiling: selectors.getBillingProgress(state),
      progressPlanConnect: selectors.getProgressPlanConnect(state),
      authUser: authUserSelector(state),
      screenWidht: screenWidthSelector(state),
      mainApp: mainAppSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getAccountInfo: () => {
         dispatch(operations.getAdmin());
      },
      setSettings: (inputs) => {
         dispatch(operations.SaveAccount(inputs));
      },
      getPlans: () => {
         dispatch(operations.getPlansInfo());
      },
      onCancel: () => {
         dispatch(operations.cancelCurrentAdmin());
      },
      onReactivate: (id) => {
         dispatch(operations.reactivateCurrentAdmin(id));
      },
      updatePlan: (data) => {
         dispatch(operations.updateCardOperation(data));
      },
      changePlan: (plan) => {
         dispatch(operations.changePlanOperation(plan));
      },
      updateBilling: (data) => {
         dispatch(operations.saveBillingData(data));
      },
      updateCard: (id) => {
         dispatch(operations.UpdatePaymentOperation(id));
      },
      connectToPlan: (plan) => {
         dispatch(operations.connectToPlanOperation(plan));
      },
      logout: (route) => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route(route).getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccount);
