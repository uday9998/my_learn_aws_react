import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Router from 'routes/router';
import { siteDetailsInitOperation } from 'state/modules/common/operations';
import { resetCommonDetails } from 'state/modules/common/actions';
import { push } from 'connected-react-router';
import { authUserSelector, isSiteInitedSelector } from 'state/modules/common/selectors';
import SocketLayout from 'views/layout/Socket';
import ap3cCheckAndInit from 'utils/ap3cCheckAndInit';


class Guest extends Component {
   static propTypes = {
      authUser: PropTypes.object,
      isSiteInited: PropTypes.bool.isRequired,
      component: PropTypes.any,
      init: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      goToHomePage: PropTypes.func.isRequired,
   };

   componentDidMount() {
      const { init } = this.props;
      init();
      ap3cCheckAndInit();
   }

   componentDidUpdate() {
      const {
         isSiteInited, authUser, goToHomePage,
      } = this.props;
      // if (isSiteInited && authUser && authUser.is_affiliate) {
      //    window.location = '/affiliate/dashboard';
      // }
      if (isSiteInited && authUser) {
         goToHomePage();
      }
      ap3cCheckAndInit();
   }

   render() {
      const {
         component: ChildComponent, authUser, isSiteInited, ...rest
      } = this.props;
      if (isSiteInited && !authUser) {
         return (
            <SocketLayout>
               <Route
                  { ...rest }
                  render={ (matchProps) => {
                     return <ChildComponent { ...matchProps } />;
                  } }
               />
            </SocketLayout>
         );
      }
      return null;
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      isSiteInited: isSiteInitedSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => ({
   init: () => {
      dispatch(siteDetailsInitOperation());
   },
   reset: () => {
      dispatch(resetCommonDetails());
   },
   goToHomePage: () => {
      dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
   },
});

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
