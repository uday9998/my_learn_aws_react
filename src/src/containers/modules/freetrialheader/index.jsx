import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminFreeTrial from 'views/layout/AdminFreeTrial';
import { mainAppSelector } from 'state/modules/common/selectors';


class FreeTrialContainer extends Component {
   static propTypes = {
      mainApp: PropTypes.any,
   };


   render() {
      const {
         mainApp,
      } = this.props;
      if (!mainApp.status) return null;
      return (
         <AdminFreeTrial inTrial={ mainApp.in_trial } trialDays={ mainApp.trial_days } />
      );
   }
}


const mapStateToProps = (state) => {
   return {
      mainApp: mainAppSelector(state),
   };
};
const mapDispatchToProps = () => {
   return {

   };
};
export default connect(mapStateToProps, mapDispatchToProps)(FreeTrialContainer);
