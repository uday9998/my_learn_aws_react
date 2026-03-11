import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Container from 'views/layout/AdminContainer';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { settingsGetOperation } from 'state/modules/settings/operations';
import { integrationSettingsSelector } from 'state/modules/settings/selectors';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import {
   setInput as setInputAction,
   setSignUpInput as setSignUpInputAction,
   updateSettingsInput as updateSettingsAction,
} from 'state/modules/designCourse/create/actions';
import * as selectors from 'state/modules/designCourse/create/selectors';
import * as operations from 'state/modules/designCourse/create/operations';
import { CourseHeader } from 'views/layout/DesignCourse/CourseHeader';
// import CourseEmpty from 'views/pages/DesignCourse/courseMaterial/CourseEmpty';
import Settings from 'views/pages/DesignCourse/settings';
import Plan from 'views/pages/DesignCourse/plan';
import SignUp from 'views/pages/DesignCourse/signUp';
import CourseMaterial from 'views/pages/DesignCourse/courseMaterial';
import CourseLive from 'views/pages/DesignCourse/CourseLive';
import TabSwitch from 'components/elements/TabSwitch';
import getFormFields from 'utils/getFormfields';
import NavBar from 'components/modules/designCourse/header/NavBar';
import getDeff from 'utils/getDeff';
import isPrint from 'state/modules/designCourse/edit/Error';

class CoursesContainer extends Component {
   static propTypes = {
      setInput: PropTypes.func.isRequired,
      courseMaterial: PropTypes.object,
      settings: PropTypes.object,
      createSection: PropTypes.func,
      createCourse: PropTypes.func,
      createPlan: PropTypes.func,
      plan: PropTypes.object,
      createSignUp: PropTypes.func,
      signUp: PropTypes.object,
      setSignUpInput: PropTypes.func.isRequired,
      goTo: PropTypes.func.isRequired,
      updateSettingsInput: PropTypes.func,
   };

   constructor(props) {
      super(props);
      this.state = {
         addingSection: false,
         activeSettingsTabIsMobile: '',
         mobilePlanTanbels: null,
      };
      this.settingformKeys = {
         'course-details': ['name', 'subtitle', 'description', 'url', 'landing_url'],
         'instructor-details': ['author', 'bio_description', 'picture_src'],
         'seo': ['seo_title', 'seo_keywords', 'seo_description'],
         'site-changes': ['theme_name', 'theme_font', 'item_button_color'],
         'thank-you-page': ['thank_you_page', 'thank_you_page_url'],
         'completion-message': ['finish_message'],
      };
      this.signUpformKeys = {
         'order-summary': ['checkout_text'],
         'testimonials': ['author_name', 'text', 'picture_src'],
         'bullet-points': ['text'],
         'buy-bottom': ['checkout_button_color', 'checkout_button_text'],
      };
      this.autoResponders = {
         MailChimp: 'mailchimp',
         ConvertKit: 'convertkit',
         AWeber: 'aweber',
      };
   }

   componentDidMount() {
      const { getIntegrations, getTags } = this.props;
      getTags();
      getIntegrations();
   }

   getAutoresponderOptions() {
      const { integrations: { autoresponders } = {} } = this.props;
      if (!autoresponders) return [];
      return Object.keys(autoresponders).reduce((arr, key) => {
         arr.push({ label: autoresponders[key], value: autoresponders[key] });
         return arr;
      }, []);
   }

   getAutoresponderListOptions(label, value) {
      const { signUp: { advanced: { lists } = {} } = {} } = this.props;
      if (!lists) return [];
      return lists.map(list => {
         return { label: list[label], value: `${ list[value] }_${ list[label] }` };
      });
   }

   handleAttachTag = tagId => {
      const { addTag } = this.props;
      addTag({ operation: 'attach', id: tagId });
   }

   handleAddTag = name => {
      const { addTag } = this.props;
      addTag({ operation: 'create', name });
   }

   handleAddingSection = (bool) => {
      this.setState({
         addingSection: bool,
         activeSettingsTabIsMobile: null,
      });
   }

   handleInternalInputChange = (name, value) => {
      this.setState({
         [name]: value,
      });
   }

   handleInputChange = (name, value, target) => {
      const { setInput, updateSettingsInput } = this.props;
      if (target && (target === 'thank-you-page' || target === 'completion-message')) {
         updateSettingsInput(name, value);
      }
      setInput(name, value, target);
   }


   handleSettingsSave= (currentTab) => {
      const { createCourse, settings } = this.props;
      const keysArray = this.settingformKeys[currentTab];
      const changedFields = getDeff(settings, keysArray);
      const formData = getFormFields(keysArray, changedFields);
      Object.keys(formData).forEach((key) => (formData[key] === '') && delete formData[key]);

      if (Object.keys(formData).length > 0) {
         createCourse(formData, currentTab);
      } else if (isPrint('Please fill at least one field.')) {
         toast.error('Please fill at least one field.');
      }
   }


   createSection = (title) => {
      const { createSection } = this.props;
      createSection(title);
   }

   handleAddingPlan = (type) => {
      const { createPlan } = this.props;
      createPlan(type);
      this.setState({
         mobilePlanTanbels: true,
      });
   }

   handleInputSignUpChange = (name, value, target) => {
      const { setSignUpInput, getAutoResponderLists } = this.props;
      if (target === 'advanced' && name === 'autoResponder_type') {
         getAutoResponderLists(value);
      }
      setSignUpInput(name, value, target);
   }

   handleSignUpSave = (currentTab) => {
      const { createSignUp, signUp } = this.props;
      const currentSignUp = signUp[currentTab];
      let formData = {};
      if (currentTab === 'testimonials') {
         formData = signUp.newTestimonialInput;
      } else if (currentTab === 'bullet-points') {
         formData = signUp.newBulletInput;
      } else if (currentTab === 'advanced') {
         formData[`${ this.autoResponders[signUp.advanced.autoResponder_type] }_list`] = signUp.advanced.autoResponder_list;
         formData.autoresponder = signUp.advanced.autoResponder_type;
      } else {
         const keysArray = this.signUpformKeys[currentTab];
         const changedFields = getDeff(currentSignUp, keysArray);
         formData = getFormFields(keysArray, changedFields);
      }

      if (Object.keys(formData).length > 0) {
         createSignUp(formData, currentTab);
      } else if (isPrint('Please fill at least one field.')) {
         toast.error('Please fill at least one field.');
      }
   }

   goToBack = () => {
      const {
         addingSection,
         activeSettingsTabIsMobile,
         mobilePlanTanbels,
      } = this.state;
      const {
         goTo,
      } = this.props;
      if (addingSection || activeSettingsTabIsMobile || mobilePlanTanbels) {
         this.handleAddingSection(false);
      } else {
         goTo(Router.route('ADMIN_COURSES').getMask());
      }
   }

   onMobileSettingSwich = (tab) => {
      this.setState({
         activeSettingsTabIsMobile: tab,
      });
   }

   render() {
      const {
         addingSection,
         activeSettingsTabIsMobile, mobilePlanTanbels,
      } = this.state;
      const {
         courseMaterial, settings, plan, signUp, goTo,
      } = this.props;
      const autoresponderOptions = this.getAutoresponderOptions();
      const autoResponderListsOptions = this.getAutoresponderListOptions('name', 'id');
      return (
         <Container className='courses-create-edit'>
            <TabSwitch
               initialTab='course-material'
            >
               <Container.Header>
                  <SiteHeader
                     title='Design Class'
                     tooltip='This is the class name. The sections below will allow you to complete class creation.'
                     goToBack={ () => this.goToBack() }
                     goBack
                     isLeftAction
                     bottomContent={ (
                        <TabSwitch.Tab>
                           <NavBar
                              isMobile={ window.innerWidth < 1024 }
                           />
                        </TabSwitch.Tab>
                     ) }
                  />
                  <CourseHeader disableLive={ true } tooltip='This is the class name. The sections below will allow you to complete class creation.' />
               </Container.Header>
               <Container.Content>
                  <TabSwitch.Content>
                     <CourseMaterial
                        tabId='course-material'
                        addingSection={ addingSection }
                        handleAddingSection={ (bool) => this.handleAddingSection(bool) }
                        handleInputChange={ (name, value, target) => this.handleInputChange(name, value, target) }
                        sections={ courseMaterial.sections }
                        createSection={ (title) => this.createSection(title) }
                     />
                     <Settings
                        tabId='settings'
                        settingsData={ settings }
                        handleSettingsSave={ this.handleSettingsSave }
                        handleInputChange={ (name, value, target) => this.handleInputChange(name, value, target) }
                        isMobile={ window.innerWidth < 1024 }
                        activeTabIsMobile={ activeSettingsTabIsMobile === 'settings' ? null : activeSettingsTabIsMobile }
                        onSwitchTab={ (tab) => this.onMobileSettingSwich(tab) }
                     />
                     <Plan
                        tabId='plan'
                        plan={ plan }
                        mobilePlanTanbels={ mobilePlanTanbels }
                        handleAddingPlan={ this.handleAddingPlan }
                     />
                     <SignUp
                        tabId='sign-up'
                        signUp={ signUp }
                        handleInputSignUpChange={
                           (name, value, target) => this.handleInputSignUpChange(name, value, target)
                        }
                        autoresponderOptions={ autoresponderOptions }
                        autoResponderListsOptions={ autoResponderListsOptions }
                        handleSignUpSave={ this.handleSignUpSave }
                        goTo={ goTo }
                        addTag={ this.handleAddTag }
                        attachTag={ this.handleAttachTag }
                        isMobile={ window.innerWidth < 1024 }
                        activeTabIsMobile={ activeSettingsTabIsMobile === 'sign-up' ? null : activeSettingsTabIsMobile }
                        onSwitchTab={ (tab) => this.onMobileSettingSwich(tab) }
                        settings={ settings }
                     />
                     <CourseLive
                        tabId='live'
                        disableLive={ true }
                     />
                  </TabSwitch.Content>
               </Container.Content>
            </TabSwitch>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      courseMaterial: selectors.courseMaterialSelector(state),
      settings: selectors.settingsSelector(state),
      integrations: integrationSettingsSelector(state),
      plan: selectors.planSelector(state),
      signUp: selectors.signUpSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('OFFERS').getCompiledPath(portalId
      },

      createCourse: (params, currentTab) => {
         dispatch(operations.createCourseOperation(params, currentTab));
      },

      createSection: (title) => {
         dispatch(operations.createSectionOperation(title));
      },

      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
      getIntegrations: async () => {
         await dispatch(settingsGetOperation('integrations'));
      },
      getAutoResponderLists: async (integration) => {
         await dispatch(operations.getAutoResponderListsOperation(integration));
      },
      createPlan: (type) => {
         dispatch(operations.createPlanOperation(type));
      },

      createSignUp: (params, currentTab) => {
         dispatch(operations.createSignUpOperation(params, currentTab));
      },
      getTags: () => {
         dispatch(operations.getTagsOperation());
      },
      addTag: (params) => {
         dispatch(operations.addTagOperation(params));
      },

      setSignUpInput: (key, value, target) => {
         dispatch(setSignUpInputAction(key, value, target));
      },
      goTo: (location) => {
         dispatch(push(location));
      },
      updateSettingsInput: (key, value, target) => {
         dispatch(updateSettingsAction(key, value, target));
      },

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
