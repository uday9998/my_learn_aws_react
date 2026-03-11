import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/studentsView/selectors';
import { resetCommonDetails } from 'state/modules/common/actions';
import * as operations from 'state/modules/studentsView/operations';
// import { authUserSelector } from 'state/modules/common/selectors';
import StudentsView from 'views/pages/DesignCourse/StudentsView';
import { portalId } from 'utils/constants';

class StudentsViewContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      checkoutCourse: PropTypes.object,
      getCourseCheckout: PropTypes.func,
      getCheckoutInProgress: PropTypes.bool,
      match: PropTypes.object,
      offers: PropTypes.array,
      testimonials: PropTypes.array,
   };

   componentDidMount() {
      const {
         getCourseCheckout, match,
      } = this.props;
      const courseId = match.params.id;
      getCourseCheckout(courseId);
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }


   render() {
      const {
         checkoutCourse, offers, testimonials, getCheckoutInProgress,
      } = this.props;
      return (
         <div>
            <StudentsView
               checkoutCourse={ checkoutCourse }
               offers={ offers }
               testimonials={ testimonials }
               getCheckoutInProgress={ getCheckoutInProgress }

            />
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      checkoutCourse: selectors.checkoutCourseSelector(state),
      getCheckoutInProgress: selectors.getCheckoutInProgressSelector(state),
      offers: selectors.offersSelector(state),
      testimonials: selectors.testimonialsSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId)));
      },
      getCourseCheckout: (courseId) => {
         dispatch(operations.getCourseCheckoutOperation(courseId));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(StudentsViewContainer);
