import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
// import { authUserSelector } from 'state/modules/common/selectors';
import HomePage from 'views/pages/HomePage';
import { portalId } from 'utils/constants';

class LandingContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,

   };


   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }


   render() {
      return (
         <HomePage />
      );
   }
}

const mapStateToProps = () => {
   return {

   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },

   };
};


export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
