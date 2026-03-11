import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import { authUserSelector } from 'state/modules/common/selectors';
import { customLogout } from 'utils/userMaven';
import { portalId } from 'utils/constants';

class SiteContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      authUser: PropTypes.object,
   };

   handleLogout = () => {
      const { logout, authUser } = this.props;
      customLogout(authUser);
      logout();
   }

   render() {
      return (
         <div style={ {
            backgroundColor: 'green',
            height: '500px',
            display: 'flex',
         } }
         >
            <div style={ {
               margin: '0 auto',
            } }
            >
               Hello from Admin Site
               <br />
               <Link to={ Router.route('LOGIN').getMask() }>Go to Login</Link>
               <br />
               <button type='button' onClick={ this.handleLogout }>Logout</button>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('COURSES').getCompiledPath(portalId)));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteContainer);
