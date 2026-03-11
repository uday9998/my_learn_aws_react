import { Component } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import QueryParams from 'utils/QueryParams';
import { attempt } from 'api/GuestApi';
import Auth from 'utils/Auth';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';


class AttemptContainer extends Component {
   static propTypes = {
      goToDashboard: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
   };

   async componentDidMount() {
      const { goToDashboard } = this.props;
      Auth.logout();
      const token = QueryParams.get('token');
      if (!token) {
         this.unAuth();
         return;
      }
      try {
         const {
            data: {
               // user,
               token: jwtToken,
            },
         } = await attempt({ token });
         Auth.setToken(jwtToken);
         goToDashboard();
      } catch (error) {
         const {
            response: {
               status,
            },
         } = error;
         switch (status) {
            case 401:
               this.unAuth();
               break;
            default:
               // handle unexpected error
               break;
         }
      }
   }

   unAuth = () => {
      const { logout } = this.props;
      logout();
   }

   render() {
      return null;
   }
}

const mapStateToProps = () => {
   return {
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goToDashboard: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('LOGIN').getMask()));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttemptContainer);
