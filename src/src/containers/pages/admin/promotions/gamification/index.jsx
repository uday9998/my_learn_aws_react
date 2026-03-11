import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Gamification from 'views/pages/Promotions/Gamification';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import * as operations from 'state/modules/gamifications/operations';
import * as selectors from 'state/modules/gamifications/selectors';
import * as actions from 'state/modules/gamifications/actions';
import withLoading from 'utils/withLoading';

const GamificationIsLoading = withLoading(Gamification);
class GamificationContainer extends Component {
   static propTypes = {
      createGamifications: PropTypes.func,
      deleteGamifications: PropTypes.func,
      getGamifications: PropTypes.func,
      updateGamifications: PropTypes.func,
      badges: PropTypes.array,
      courses: PropTypes.array,
      getBadgeInProgress: PropTypes.bool,
      createBadgeinProgress: PropTypes.bool,
      chooseBadge: PropTypes.func,
      resetStateChange: PropTypes.func,
      currentBadge: PropTypes.object,
      setInput: PropTypes.func,
      chooseBadgeInProgress: PropTypes.bool.isRequired,
      switchAddingBadge: PropTypes.func.isRequired,
      addingBadge: PropTypes.bool.isRequired,
      updateMobileStateAction: PropTypes.func,
      mobileShowCurrentBudge: PropTypes.bool,
      goToBackDashboard: PropTypes.func,
   };

   constructor(props) {
      super(props);
      this.state = {
         gamificationInputs: {
            title: '',
            success_message: '',
            lesson_id: '',
            badge_src: '/images/badges/level1.png',
            badge_bg_color: '#ffffff',
            badge_btn_color: '#006dff',
            badge_btn_text: 'Got it',
            badge_btn_text_color: '#ffffff',
         },
         selectedCourseId: null,
         freeLessons: [],
      };
   }

   componentDidMount() {
      const { getGamifications } = this.props;
      getGamifications();
   }

   componentDidUpdate() {
      const {
         currentBadge, chooseBadgeInProgress, addingBadge,
      } = this.props;
      const { selectedCourseId } = this.state;
      if (!chooseBadgeInProgress && !addingBadge && currentBadge !== null
         && currentBadge !== undefined && Object.keys(currentBadge).length !== 0) {
         if (!selectedCourseId) {
            const { lesson: { section: { course: { id } } } } = currentBadge;

            this.handleSelectCourse(id);
         }
      }
   }

   handleBadgeInputChange = (name, value) => {
      this.setState((state) => {
         const { gamificationInputs } = state;
         return {
            ...state,
            gamificationInputs: {
               ...gamificationInputs,
               [name]: value,
            },
         };
      });
   };

   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }


   swithToAddBadge = () => {
      const { switchAddingBadge } = this.props;
      switchAddingBadge();
      this.setState({
         gamificationInputs: {
            title: '',
            success_message: '',
            lesson_id: '',
            badge_src: '/images/badges/level1.png',
            badge_bg_color: '#ffffff',
            badge_btn_color: '#006dff',
            badge_btn_text: 'Got it',
            badge_btn_text_color: '#ffffff',
         },
         selectedCourseId: null,
         freeLessons: [],
      });
   }

   onCancelClick = (id) => {
      const { resetStateChange, addingBadge } = this.props;
      if (addingBadge) {
         this.resetState();
      } else {
         resetStateChange(id);
      }
   };


   handleSave = (inputs) => {
      const { createGamifications } = this.props;
      createGamifications(inputs);
   };

   deleteGamificationsClick = (id) => {
      const { deleteGamifications } = this.props;
      deleteGamifications(id);
   }

   handleUpdate = (id, inputs) => {
      const { updateGamifications } = this.props;

      updateGamifications(id, inputs);
   }

   handleChooseBadge = async (badgeId) => {
      const { chooseBadge } = this.props;

      await chooseBadge(badgeId);

      const { currentBadge } = this.props;
      const { lesson: { section: { course: { id } } } } = currentBadge;
      this.handleSelectCourse(id);
   }

   handleSelectCourse = (id, isAddingBadge) => {
      const {
         courses, currentBadge, badges,
      } = this.props;
      const selectedCourse = courses.find(course => course.id === id);
      const usedLeesons = badges.map(item => {
         return item.lesson.id;
      });
      const freeLessons = selectedCourse.lessons.filter(lesson => {
         if (isAddingBadge) {
            if (!usedLeesons.includes(lesson.id)) {
               return (
                  lesson.lesson_badge === null || (currentBadge && lesson.id === currentBadge.lesson_id)
               );
            }
         } else {
            return (
               lesson.lesson_badge === null || (currentBadge && lesson.id === currentBadge.lesson_id)
            );
         }
      });

      this.setState({
         freeLessons,
         selectedCourseId: id,
      });
   }

   goToBack = () => {
      const { updateMobileStateAction, mobileShowCurrentBudge, goToBackDashboard } = this.props;
      if (mobileShowCurrentBudge) {
         updateMobileStateAction(false);
      } else {
         goToBackDashboard();
      }
   }


   resetState() {
      const { gamificationInputs } = this.state;
      this.setState({
         gamificationInputs: {
            ...gamificationInputs,
            title: '',
            success_message: '',
            lesson_id: '',
            badge_src: '/images/badges/level1.png',
            badge_bg_color: '#ffffff',
            badge_btn_color: '#006dff',
            badge_btn_text: 'Got it',
            badge_btn_text_color: '#ffffff',
         },
      });
   }


   render() {
      const {
         badges, courses, getBadgeInProgress, createBadgeinProgress,
         currentBadge, chooseBadgeInProgress, addingBadge, mobileShowCurrentBudge,
      } = this.props;
      const {
         gamificationInputs, freeLessons, selectedCourseId,
      } = this.state;
      const addBadgeBtn = (
         <BaseButton
            theme={ btnTheme.darkGreen }
            size={ btnSize.large }
            text='Add Badge'
            onClick={ () => this.swithToAddBadge() }
         />
      );

      return (
         <Container>
            <Container.Header>
               <SiteHeader
                  title='Gamification'
                  right={ addBadgeBtn }
                  tooltip='You can make your classes more fun by uploading or selecting one of our completion badges.'
               />
               <SiteHeaderMobile
                  title='Gamification'
                  goToBack={ () => this.goToBack() }
                  goBack
                  isLeftAction
                  tooltip='You can make your classes more fun by uploading or selecting one of our completion badges.'
               />
            </Container.Header>
            <Container.Content>
               <GamificationIsLoading
                  isLoading={ getBadgeInProgress }
                  badges={ badges }
                  createBadgeinProgress={ createBadgeinProgress }
                  chooseBadgeInProgress={ chooseBadgeInProgress }
                  addBadge={ () => this.swithToAddBadge() }
                  addingBadge={ addingBadge }
                  currentBadge={ currentBadge }
                  freeLessons={ freeLessons }
                  selectedCourseId={ selectedCourseId }
                  courses={ courses }
                  gamificationInputs={ gamificationInputs }
                  onSaveClick={ (inputs) => this.handleSave(inputs) }
                  onCancelClick={ this.onCancelClick }
                  deleteGamificationsClick={ this.deleteGamificationsClick }
                  handleBadgeInputChange={ (name, value) => this.handleBadgeInputChange(name, value) }
                  handleInputChange={ (name, value) => this.handleInputChange(name, value) }
                  handleChooseBadge={ (badgeId) => this.handleChooseBadge(badgeId) }
                  handleUpdate={ (id, inputs) => this.handleUpdate(id, inputs) }
                  handleSelectCourse={ (id, isAddingBadge) => this.handleSelectCourse(id, isAddingBadge) }
                  mobileShowCurrentBudge={ mobileShowCurrentBudge }
               />
            </Container.Content>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      badges: selectors.bagdesSelector(state),
      courses: selectors.coursesSelector(state),
      getBadgeInProgress: selectors.getBadgeInProgressSelector(state),
      createBadgeinProgress: selectors.createBadgeinProgressSelector(state),
      currentBadge: selectors.currentBadgeSelector(state),
      chooseBadgeInProgress: selectors.chooseBadgeInProgressSelector(state),
      addingBadge: selectors.addingBadgeSelector(state),
      mobileShowCurrentBudge: selectors.mobileShowCurrentBudgeSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setInput: (key, value) => {
         dispatch(actions.setInput(key, value));
      },
      chooseBadge: async (badgeId) => {
         await dispatch(actions.chooseBadgeStart());
         await dispatch(actions.chooseBadgeCompleted(badgeId));
      },
      switchAddingBadge: async () => {
         await dispatch(actions.chooseBadgeStart());
         dispatch(actions.switchAddingBadge());
      },
      getGamifications: () => {
         dispatch(operations.getGamificationsOperation());
      },
      createGamifications: (inputs) => {
         dispatch(operations.createGamificationsOperation(inputs));
      },
      deleteGamifications: (id) => {
         dispatch(operations.deleteGamificationsOperation(id));
      },
      updateGamifications: (id, inputs) => {
         dispatch(operations.updateGamificationsOperation(id, inputs));
      },
      updateMobileStateAction: (bool) => {
         dispatch(actions.updateMobileStateCompleted(bool));
      },
      goToBackDashboard: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      resetStateChange: (id) => {
         dispatch(actions.resetStateChangeCompleted(id));
      },
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(GamificationContainer);
