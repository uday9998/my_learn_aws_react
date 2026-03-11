/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import Dashboard from 'views/pages/Dashboard';
import Container from 'views/layout/AdminContainer';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import * as selectors from 'state/modules/revenueReports/selectors';
import * as operations from 'state/modules/revenueReports/operations';
import { defaultNamesSelector, fetchDefaultNamesSelector } from 'state/modules/designCourse/courses/selectors';
import { getDefaultNamesOperation, chooseDefaultNameOperation } from 'state/modules/designCourse/courses/operations';
import Modal from 'components/elements/Modal';
import ChooseCoursePaths from 'components/modules/designCourse/courseMaterial/AddCoursePaths';
import { authUserSelector } from 'state/modules/common/selectors';
import MaterialModal from 'components/elements/MaterialModal';
import { customLogIn } from 'utils/userMaven';
import withLoading from 'utils/withLoading';
import { portalId } from 'utils/constants';

const ChooseCoursePathsLoading = withLoading(ChooseCoursePaths);
class DashboardContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      getRevenueStatistic: PropTypes.func,
      getRevenueFilterStatistic: PropTypes.func,
      reports: PropTypes.object,
      fetchData: PropTypes.bool,
      fetchFilterData: PropTypes.bool,
      getGhost: PropTypes.func,
      ghostData: PropTypes.array,
      fetchGhostData: PropTypes.bool,
      defaultNames: PropTypes.array,
      fetchDefaultNames: PropTypes.bool,
      chooseDefaultName: PropTypes.func,
      getDefaultNames: PropTypes.func,
      goTo: PropTypes.func,
      steps: PropTypes.array,
      getSteps: PropTypes.func,
      fetchStepsData: PropTypes.bool,
      authUser: PropTypes.object,
      location: PropTypes.object,
   };

   state={
      courseId: '',
      modalType: null,
      openModal: false,
      courseName: '',
      courseType: '',
      modalOpen: false,
   }

   componentDidMount() {
      const {
         getRevenueStatistic, getSteps, getGhost, authUser, location, history,
      } = this.props;
      if (authUser.role !== 3 && authUser.role !== 4) {
         getRevenueStatistic();
      }
      customLogIn(location);
      // getGhost();
      // getSteps();
      if (window.isFirstVisit) {
         if (window?.gtag) {
            window?.gtag('event', 'conversion', {
               'send_to': 'AW-696728704/CkQcCIr6-fIBEID5nMwC',
               'value': 1.0,
               'currency': 'USD',
            });
         }

         // this.setState({ modalOpen: true });
         window.history.replaceState(null, document.title, '/admin');
         delete window.isFirstVisit;
      }

      if (window.showIntro) {
         this.setState({ modalOpen: true });
         delete window.showIntro;
      }

      if (window.isOrtto) {
         history.push(`${ Router.route('ADMIN_ACCOUNT').getCompiledPath() }#plans`);
      }
   }

   closeIntroModal = () => this.setState({ modalOpen: false })


   handleFilterChange = (name, value) => {
      this.setState({ courseId: value }, () => {
         const { getRevenueFilterStatistic } = this.props;
         getRevenueFilterStatistic(value);
      });
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }

   switchCoursePaths = (type, bool) => {
      this.setState({
         modalType: type,
         openModal: bool,
         courseName: '',
      });
   }

   onChooseCoursePath = (type) => {
      const { getDefaultNames } = this.props;

      switch (type) {
         case 'scratch':
            // addingCourse();
            this.setState({
               modalType: 'add-name',
            });
            break;
         case 'choose':
            getDefaultNames();
            this.setState({
               modalType: 'choose-name',
            });
            break;
         case 'micro':
         case 'full':
         case 'webinar':
            this.setState({
               courseType: type,
               modalType: 'add-name',
            });
            break;

         default:
            break;
      }
   }

   onInputChange = (name, value) => {
      this.setState({ [name]: value });
   }

   onPassStep = (slug) => {
      const { goTo } = this.props;
      switch (slug) {
         case 'added-lesson':
            goTo('ADMIN_COURSES', '');
            break;
         case 'connected-payment':
            goTo('ADMIN_SETTINGS', 'integrations');
            break;
         case 'updated-settings':
            goTo('ADMIN_SETTINGS', 'mainhub');
            break;

         default:
            break;
      }
   }

   goToPages = (item) => {
      const pages = {
         'Courses': 'ADMIN_COURSES',
         'Emails': 'ADMIN_EMAILS',
         // 'Email Notifications': 'ADMIN_TEMPLATES',
         'Member Detail': 'ADMIN_MEMBERS',
         'Transactions': 'ADMIN_TRANSACTIONS',
         'Course Reports': 'ADMIN_REPORTS',
         'Revenue Reports': 'ADMIN_REVENUE_REPORTS',
         'Gamification': 'ADMIN_GAMIFICATION',
      };
      const { goTo } = this.props;
      if (pages[item]) {
         goTo(pages[item]);
      }
   }


   render() {
      const {
         reports, fetchData,
         fetchFilterData, ghostData,
         fetchGhostData,
         fetchDefaultNames,
         defaultNames,
         chooseDefaultName,
         steps,
         fetchStepsData,
         authUser,
      } = this.props;
      const {
         courseId, openModal, modalType, courseName, courseType, modalOpen,
      } = this.state;
      return (
         <>
            <MobileHeader>
               <SiteHeader
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            {/* <Container> */}
            {/* <Container.Content> */}
            <Dashboard
               reportsData={ {
                  reports, fetchData, fetchFilterData, courseId, handleFilterChange: this.handleFilterChange,
               } }
               ghostData={ ghostData }
               fetchGhostData={ false }
               creatNewCourse={ () => this.switchCoursePaths('choose-path', true) }
               steps={ steps }
               onPassStep={ this.onPassStep }
               goToPages={ this.goToPages }
               fetchStepsData={ false }
               authUser={ authUser }
            />
            {/* {modalOpen && (
               <MaterialModal open onClose={ this.closeIntroModal }>
                  <div style={ { width: '100%', maxWidth: '700px', background: '#fff' } }>
                     <div style={ { padding: '56.25% 0 0 0', position: 'relative' } }><iframe
                        src='https://player.vimeo.com/video/507928020?autoplay=1&title=0&byline=0&portrait=0'
                        style={ {
                           position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        } }
                        frameBorder='0'
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        title='intro'
                     />
                     </div><script src='https://player.vimeo.com/api/player.js' />
                  </div>
               </MaterialModal>
            )} */}
            {
               openModal && (
                  <Modal
                     blurColor='rgba(63, 79, 101, 0.6)'
                     contentBgColor='#fff'
                     contentPosition={ window.innerWidth >= 721 ? 'center' : 'full-screen' }
                     closeOnClickOutside={ true }
                     contentWidth={ window.innerWidth >= 721 ? 'auto' : '100%' }
                     onClose={ () => this.switchCoursePaths(null, false) }
                     className='chooseCoursePaths-modals'
                  >
                     <ChooseCoursePathsLoading
                        isLoading={ fetchDefaultNames }
                        onChooseCoursePath={ this.onChooseCoursePath }
                        modalType={ modalType }
                        onClickCancel={ (name, bool) => this.switchCoursePaths(name, bool) }
                        courseName={ courseName }
                        onClickCreate={ () => chooseDefaultName(courseName, courseType) }
                        onInputChange={ this.onInputChange }
                        defaultNames={ defaultNames }
                     />

                  </Modal>
               )
            }
            {/* </Container.Content> */}
            {/* </Container> */}
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      fetchData: selectors.fetchDataSelector(state),
      ftechFilterData: selectors.fetchFilterDataSelector(state),
      reports: selectors.reportsSelector(state),
      fetchGhostData: selectors.fetchGhostDataSelector(state),
      ghostData: selectors.ghostSelector(state),
      defaultNames: defaultNamesSelector(state),
      fetchDefaultNames: fetchDefaultNamesSelector(state),
      steps: selectors.stepsSelector(state),
      fetchStepsData: selectors.fetchStepsDataSelector(state),
      authUser: authUserSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId))); 
      },
      getRevenueStatistic: (param) => {
         dispatch(operations.getRevenueStatisticOperation(param));
      },
      getRevenueFilterStatistic: (param) => {
         dispatch(operations.getRevenueFilterStatisticOperation(param));
      },
      getGhost: () => {
         dispatch(operations.getGhostOperation());
      },
      getDefaultNames: () => {
         dispatch(getDefaultNamesOperation());
      },
      chooseDefaultName: (name, type) => {
         dispatch(chooseDefaultNameOperation(name, type));
      },
      getSteps: (name, type) => {
         dispatch(operations.getStepsOperation(name, type));
      },
      addingCourse: () => {
         dispatch(push(Router.route('ADMIN_COURSES_CREATE').getMask()));
      },
      goTo: (location, hash) => {
         dispatch(push({
            pathname: Router.route(location).getMask(),
            hash,
         }));
      },

   };
};


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
