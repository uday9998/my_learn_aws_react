/* eslint-disable camelcase */
import React, { Component } from 'react';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { Redirect } from 'react-router-dom';
import { mainAppSelector } from 'state/modules/common/selectors';
import Suspended from 'views/pages/Suspended';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

class SuspendedContainer extends Component {
   static propTypes = {
      goToPlans: PropTypes.func,
      mainApp: PropTypes.object,
   };

   constructor(props) {
      super(props);
      const { mainApp: { subscription_status } } = props;
      this.headerTxt = subscription_status === null ? 'Your Free Trial Has Ended' : 'We’re Sorry But Your Account Was Cancelled';
      this.contentTxt = subscription_status === null
         ? `The 14 day trial period for your account has ended but your account
        information has been saved and is still available. To access your class, you’ll need to
        activate to a paid account. Click below to active.`
         : `If you did not cancel the account yourself, then it’s highly likely that your credit card failed after a few attempts.
         But no worries, you can restore your account below.`;
   }

   componentDidMount() {
      if (window.faildPayment) {
         if (isPrint('Sorry, we were not been able to proceed with the payment. Please try to connect to the plan from the plans page.')) {
            toast.error('Sorry, we were not been able to proceed with the payment. Please try to connect to the plan from the plans page.');
         }
         setTimeout(() => {
            delete window.faildPayment;
         }, 2000);
      }
   }

   render() {
      const { goToPlans, mainApp: { status } } = this.props;
      if (status) {
         return <Redirect to={ Router.route('ADMIN_DASHBOARD').getMask() } />;
      }
      return (
         <>
            <MobileHeader>
               <SiteHeader
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <Container>
               <Container.Content>
                  <Suspended
                     contentTxt={ this.contentTxt }
                     headerTxt={ this.headerTxt }
                     onBtnClick={ goToPlans }
                  />
               </Container.Content>
            </Container>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      mainApp: mainAppSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToPlans: () => {
         dispatch(push({
            pathname: Router.route('ADMIN_ACCOUNT').getMask(),
            hash: 'plans',
         }));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuspendedContainer);
