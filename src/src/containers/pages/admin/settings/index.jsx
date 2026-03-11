import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import * as AuthApi from 'api/AuthApi';
import { getFonts, getTimeZones } from 'utils/StaticData';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/settings/selectors';
import { resetCommonDetails } from 'state/modules/common/actions';
import {
   setInput as setInputAction, cancelChanges as cancelChangesAction, getSettingsCompleted,
   colorSwitch as colorSwitchAction, setDnsSettingsState as setDnsSettingsStateAction,
   enableIntegration as enableIntegrationAction, changeNotify,
} from 'state/modules/settings/actions';
import { toast } from 'react-toastify';
import * as operations from 'state/modules/settings/operations';
import Container from 'views/layout/AdminContainer';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Settings from 'views/pages/Settings';
import getFormFields from 'utils/getFormfields';
import getDeff from 'utils/getDeff';
import withLoading from 'utils/withLoading';
import {
   authUserSelector, appSelector, siteInfoSelector, screenWidthSelector,
} from 'state/modules/common/selectors';
import isPrint from 'state/modules/designCourse/edit/Error';
import DeleteModal from 'components/elements/DeleteModal';
import { getIdNotify } from 'utils/notificationHelpers';
import { updateGoogleVerificationAccount } from 'state/modules/common/operations';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import MobileHeader from 'views/layout/MobileHeader';
import { portalId } from 'utils/constants';

const SettingsLoading = withLoading(Container);

class SettingsContainer extends Component {
   static propTypes = {
      logout: PropTypes.func.isRequired,
      integrationSettings: PropTypes.object.isRequired,
      setSettings: PropTypes.func.isRequired,
      getSettings: PropTypes.func.isRequired,
      setInput: PropTypes.func.isRequired,
      putSettings: PropTypes.func.isRequired,
      cancelChanges: PropTypes.func.isRequired,
      dataIsFetching: PropTypes.bool.isRequired,
      getSettingsInProgress: PropTypes.bool.isRequired,
      emailsSettings: PropTypes.object.isRequired,
      accountSettings: PropTypes.object.isRequired,
      allSettings: PropTypes.object.isRequired,
      videoAnalytics: PropTypes.object,
      fromEmail: PropTypes.object,
      history: PropTypes.object,
      getVideos: PropTypes.func,
      getVideosbyDate: PropTypes.func,
      tabName: PropTypes.string,
      addIntegration: PropTypes.func,
      disconnectIntegration: PropTypes.func,
      goToBack: PropTypes.func,
      getSettingsAction: PropTypes.func,
      location: PropTypes.object,
      colorSwitch: PropTypes.func,
      setDnsSettingsState: PropTypes.func,
      updateFromEmail: PropTypes.func,
      deleteAccountDomain: PropTypes.func,
      authUser: PropTypes.object,
      app: PropTypes.object,
      getApiKey: PropTypes.func,
      apiData: PropTypes.object,
      allCourses: PropTypes.array,
      getAllCourses: PropTypes.func,
      getApiKeyInProgress: PropTypes.bool,
      updateLanguages: PropTypes.func,
      createApiKey: PropTypes.func,
      putSettingsInProgress: PropTypes.bool,
      languages: PropTypes.object,
      disableDisconnectSelector: PropTypes.bool,
      enableIntegration: PropTypes.func,
      getNotifications: PropTypes.func,
      isFetchingNotifications: PropTypes.bool,
      notifications: PropTypes.array,
      handleChangeNotify: PropTypes.func,
      goTo: PropTypes.func,
      handleSaveNotifications: PropTypes.func,
      initialNotifications: PropTypes.array,
      handleSaveSchoolCodes: PropTypes.func,
      getSchoolCodes: PropTypes.func,
      codes: PropTypes.object,
      updateGoogleVerifyId: PropTypes.func,
      siteInfo: PropTypes.object,
      screenWidth: PropTypes.number,
   };

   constructor(props) {
      super(props);
      this.state = {
         pageLimit: 10,
         currentPage: 1,
         viewVideoChange: 1,
         isInfoSaveButtonDisabled: true,
         integrationErrors: {},
         integrationLoading: {},
      };
      this.currentTab = '';
      this.currentSettings = {};
      this.formKeys = {
         emails: {
            template: ['email_font', 'email_footer_background_color', 'email_footer_font_size', 'email_footer_text', 'email_footer_text_color', 'email_header_bg_color', 'email_header_font_size', 'email_header_text_color', 'email_link_color', 'email_text_color'],
            settings: ['fromEmail', 'fromName', 'replyEmail'],
            timezone: ['email_send_time', 'timezone'],
         },
         account: {
            info: ['picture_src', 'picture_full_src', 'name', 'email', 'subdomain', 'support_email', 'default_currency', 'timezone', 'title', 'password', 'password_confirmation', 'domain'],
         },
      };
   }

   async componentDidMount() {
      const {
         setSettings, getApiKey, getAllCourses, getSchoolCodes,
      } = this.props;
      getAllCourses();
      if (this.memberPermissions() !== 'support') {
         await setSettings('emails');
         this.currentTab = 'emails';
         const { allSettings } = this.props;
         this.currentSettings = allSettings.emails;
      } else {
         await setSettings('videoanalytics');
         this.currentTab = 'videoanalytics';
         const { allSettings } = this.props;
         this.currentSettings = allSettings.videoanalytics;
      }
      getSchoolCodes();
      getApiKey();
   }

   componentDidUpdate() {
      const { emailsSettings, accountSettings } = this.props;
      const {
         error, success, account_error, paypal_error, message,
      } = queryString.parse(window.location.hash.split('?')[1]);
      const elem = document.getElementById('integrations');
      this.formKeys.emails.data = emailsSettings;
      this.formKeys.account.data = accountSettings;
      if (!elem) return;
      if (error || account_error || paypal_error) {
         const msg = paypal_error ? 'We were not able to connect your PayPal account, please be sure to use business account instead of personal.' : message || 'Something went wrong';
         if (isPrint(msg)) {
            toast.error(msg);
         }
         elem.click();
      } else if (success) {
         if (isPrint('Connected')) {
            toast.success('Connected');
         }
         elem.click();
      }
   }

   onSwitchTab = async (tabId) => {
      const { getSettings, getNotifications, getSchoolCodes } = this.props;
      const { currentPage, pageLimit } = this.state;
      this.currentTab = tabId;
      if (tabId === 'videoanalytics') {
         await getSettings(tabId, currentPage, pageLimit);
      } else if ((this.memberPermissions() === 'admin' || this.memberPermissions() === 'subAdminAssistant') && tabId !== 'globalbranding') {
         await getSettings(tabId, null, null);
      } else if ((this.memberPermissions() === 'support' && tabId !== 'integrations' && tabId !== 'emails') && tabId !== 'globalbranding') {
         await getSettings(tabId, null, null);
      }
      if (tabId === 'emails') {
         getNotifications();
      }
      if (tabId === 'codessettings') {
      }

      const { allSettings } = this.props;
      this.currentSettings = allSettings[tabId];
   }

   handleLogout = () => {
      const { logout } = this.props;
      logout();
   }

   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      const { integrationErrors } = this.state;
      const target = this.currentTab;
      
      const activeIntegration = Object.keys(integrationErrors).find(key => integrationErrors[key]);
      if (activeIntegration) {
         this.clearIntegrationError(activeIntegration);
      }
      
      this.setState({ isInfoSaveButtonDisabled: false });
      if (this.currentSettings[name] === value) {
         this.setState({ isInfoSaveButtonDisabled: true });
      }
      setInput(target, name, value);
   }

   handleConectPaypal = async () => {
      const { data } = AuthApi.addIntegration('paypal', data);
   }

   clearIntegrationError = (integrationId) => {
      this.setState(prevState => ({
         integrationErrors: {
            ...prevState.integrationErrors,
            [integrationId]: null
         }
      }));
   }

   handleConnectIntegration = async (integration) => {
      const { integrationSettings, addIntegration, app } = this.props;
      
      this.setState(prevState => ({
         integrationLoading: {
            ...prevState.integrationLoading,
            [integration]: true
         },
         integrationErrors: {
            ...prevState.integrationErrors,
            [integration]: null
         }
      }));

      let data;
      switch (integration) {
         case 'paypalv2':
            data = {
               paypal_client_id_v2: integrationSettings.paypal_client_id_v2,
               paypal_secret_v2: integrationSettings.paypal_secret_v2,
               uuid: app.uuid,
            };
            break;
         case 'mailchimp':
            data = { mailchimp_api_key: integrationSettings.mailchimp_api_key };
            break;
         case 'convertkit':
            data = {
               convertkit_api_secret: integrationSettings.convertkit_api_secret,
               convertkit_api_key: integrationSettings.convertkit_api_key,
            };
            break;
         case 'drip':
            data = { drip_api_key: integrationSettings.drip_api_key, drip_account_id: integrationSettings.drip_account_id };
            break;
         case 'facebook-pixel':
            data = { facebook_pixel_code: integrationSettings.facebook_pixel_code };
            break;
         case 'google-analytics':
            data = { google_analytics_id: integrationSettings.google_analytics_id };
            break;
         case 'activecampaign':
            data = { active_campaign_api_key: integrationSettings.active_campaign_api_key, active_campaign_api_url: integrationSettings.active_campaign_api_url };
            break;
         case 'braintree':
            data = {
               merchant_id: integrationSettings.merchant_id,
               public_key: integrationSettings.public_key,
               private_key: integrationSettings.private_key,
            };
            break;
         case 'paystack':
            data = {
               public_key: integrationSettings.public_key,
               private_key: integrationSettings.secret_key,
            };
            break;
         case 'zoom':
            data = { api_key: integrationSettings.api_key, secret_key: integrationSettings.secret_key };
            break;
         default:
            data = {};
      }

      try {
         await addIntegration(integration, data);
         // toast.success(`${integration} connected successfully!`);
      } catch (error) {
         
         let errorMessage = 'Connection failed';
         
         if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
         } else if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
         } else if (error.message && !error.message.includes('status code')) {
            errorMessage = error.message;
         }


         this.setState(prevState => ({
            integrationErrors: {
               ...prevState.integrationErrors,
               [integration]: errorMessage
            }
         }));
      } finally {
         this.setState(prevState => ({
            integrationLoading: {
               ...prevState.integrationLoading,
               [integration]: false
            }
         }));
      }
   }

   handleDisconnect = async (integration) => {
      const { disconnectIntegration } = this.props;
      
      this.setState(prevState => ({
         integrationLoading: {
            ...prevState.integrationLoading,
            [integration]: true
         },
         integrationErrors: {
            ...prevState.integrationErrors,
            [integration]: null
         }
      }));

      try {
         await disconnectIntegration(integration);
         toast.success(`${integration} disconnected successfully!`);
      } catch (error) {
         const errorMessage = error.response?.data?.message || 'Disconnect failed';
         
         this.setState(prevState => ({
            integrationErrors: {
               ...prevState.integrationErrors,
               [integration]: errorMessage
            }
         }));
      } finally {
         this.setState(prevState => ({
            integrationLoading: {
               ...prevState.integrationLoading,
               [integration]: false
            }
         }));
      }
   }

   createDomain = (domain) => {
      const { putSettings } = this.props;
      putSettings({ 'domain': domain }, this.currentTab);
   }

   handleFormSubmit = (formName) => {
      const { putSettings } = this.props;
      const keysArray = this.formKeys[this.currentTab][formName];
      const data = this.formKeys[this.currentTab].data;
      const changedFields = getDeff(this.currentSettings, data);
      const formData = getFormFields(keysArray, changedFields);
      if (formData.password === '') {
         delete formData.password;
      }
      if (formData.support_email === '') {
         formData.support_email = null;
      }
      const settings = formData;
      if (Object.keys(settings).length) {
         putSettings(settings, this.currentTab);
      }
      const { allSettings, getSettingsInProgress } = this.props;
      if (!getSettingsInProgress && formName === 'info') {
         this.currentSettings = allSettings.account;
      }
      this.setState({ isInfoSaveButtonDisabled: true });
   }

   handleSaveFromEmail = (data, isDesign) => {
      const { updateFromEmail } = this.props;
      updateFromEmail(data, isDesign);
   }

   handleSaveDesignEmail = (data) => {
   }

   handleCancelChanges = (formName) => {
      const { cancelChanges } = this.props;
      this.setState({ isInfoSaveButtonDisabled: true });
      const keysArray = this.formKeys[this.currentTab][formName];
      const initialFields = getFormFields(keysArray, this.currentSettings);
      cancelChanges(initialFields, this.currentTab);
   }

   handleConnectStripe = async () => {
      const { data } = await AuthApi.getStripeConnectUrl();
      window.location.href = data;
   }

   handleVideoAnalyticsEdit = (id) => {
      const { history } = this.props;
      history.push(`/admin/video/${ id }/edit`);
   }

   changeVideosPage = data => {
      const tabId = 'videoanalytics';
      const { getVideos } = this.props;
      const { currentPage, pageLimit } = data;
      this.setState({ currentPage });
      getVideos(tabId, currentPage, pageLimit);
   }

   handleVideosSelectChange = (name, value) => {
      const { pageLimit, currentPage } = this.state;
      const { getVideosbyDate } = this.props;
      this.setState({
         viewVideoChange: value,
      });
      if (value === 1) {
         getVideosbyDate('desc', currentPage, pageLimit);
      } else if (value === 2) {
         getVideosbyDate('asc', currentPage, pageLimit);
      }
   }

   deleteAccountDomain = () => {
      const { deleteAccountDomain } = this.props;
      deleteAccountDomain();
   }

   removeFile = (uuid) => {
      AuthApi.removeFileFromUploadcare(uuid);
   }

   memberPermissions = () => {
      const { authUser } = this.props;
      let currentUser;
      switch (authUser.role) {
         case 2:
         case 3:
            currentUser = 'subAdminAssistant';
            break;
         case 4:
            currentUser = 'support';
            break;
         case 1:
            currentUser = 'admin';
            break;
         default:
            break;
      }
      return currentUser;
   }

   handleSelectNotification = (id) => {
      const { goTo } = this.props;
      goTo(`${ Router.route('EDIT_NOTIFICATIONS').getCompiledPath({ id: getIdNotify(id) }) }`);
   }

   render() {
      const {
         integrationSettings, emailsSettings, accountSettings, dataIsFetching, getSettingsInProgress,
         videoAnalytics, tabName, disconnectIntegration, goToBack, getSettingsAction, location, colorSwitch,
         app, getApiKeyInProgress, apiData, createApiKey, allCourses, handleSaveNotifications,
         languages, updateLanguages, putSettingsInProgress, fromEmail, setDnsSettingsState, initialNotifications,
         disableDisconnectSelector, enableIntegration, notifications, isFetchingNotifications, handleChangeNotify, goTo,
         handleSaveSchoolCodes, codes, siteInfo, updateGoogleVerifyId, screenWidth,
      } = this.props;
      
      const {
         viewVideoChange,
         isInfoSaveButtonDisabled,
         integrationErrors,
         integrationLoading,
      } = this.state;
      
      const fonts = getFonts();
      const zones = getTimeZones();
      let mobileHeaderTitle = tabName;
      if (!tabName) {
         mobileHeaderTitle = 'settings';
      } else if (tabName === 'videoanalytics') {
         mobileHeaderTitle = 'video analytics';
      }
      if (location.hash === '#account') {
         mobileHeaderTitle = 'account';
      }
      
      return (
         <>
            <MobileHeader>
               <SiteHeaderMobile
                  isLeftAction
                  goToBack={ () => {} }
               />
            </MobileHeader>
            <SettingsLoading isLoading={ dataIsFetching }>
               <Container.Header>
               </Container.Header>
               <Container.Content>
                  <HeaderTypeSecond
                     title='Settings'
                     tooltip='This is where you can manage the settings for multiple areas of your account.'
                     isHaveBaseButton={ false }
                     isHidenSearch={ true }
                  />
                  <Settings
                     isFetchingNotifications={ isFetchingNotifications }
                     integrationSettings={ integrationSettings }
                     emailSettings={ emailsSettings }
                     allCourses={ allCourses }
                     handleChangeNotify={ handleChangeNotify }
                     accountSettings={ accountSettings }
                     schoolCodes={ codes }
                     saveSchoolCodes={ handleSaveSchoolCodes }
                     videoAnalytics={ videoAnalytics }
                     setDnsSettingsState={ setDnsSettingsState }
                     handleVideoAnalyticsEdit={ (id) => this.handleVideoAnalyticsEdit(id) }
                     changeVideosPage={ (data) => this.changeVideosPage(data) }
                     getSettingsInProgress={ getSettingsInProgress }
                     fromEmailSettings={ fromEmail }
                     handleSaveFromEmail={ this.handleSaveFromEmail }
                     handleSaveDesignEmail={ this.handleSaveDesignEmail }
                     fonts={ fonts }
                     zones={ zones }
                     handleSaveNotifications={ () => handleSaveNotifications(initialNotifications, notifications) }
                     putSettingsInProgress={ putSettingsInProgress }
                     onChange={ (name, value) => this.handleInputChange(name, value) }
                     onSwitchTab={ (tabId) => this.onSwitchTab(tabId) }
                     handleFormSubmit={ (formName) => this.handleFormSubmit(formName) }
                     createDomain={ (domain) => this.createDomain(domain) }
                     handleCancelChanges={ formName => this.handleCancelChanges(formName) }
                     handleConnectStripe={ () => this.handleConnectStripe() }
                     handleConectPaypal={ () => this.handleConectPaypal() }
                     handleDisconnect={ integration => this.handleDisconnect(integration) }
                     handleConnectIntegration={ integration => this.handleConnectIntegration(integration) }
                     handleVideosSelectChange={ (name, value) => this.handleVideosSelectChange(name, value) }
                     viewVideoChange={ viewVideoChange }
                     tabName={ tabName }
                     removeFile={ (uuid) => this.removeFile(uuid) }
                     location={ location }
                     colorSwitch={ colorSwitch }
                     updateGoogleVerifyId={ updateGoogleVerifyId }
                     deleteAccountDomain={ this.deleteAccountDomain }
                     isInfoSaveButtonDisabled={ isInfoSaveButtonDisabled }
                     memberPermissions={ this.memberPermissions }
                     app={ app }
                     getApiKeyInProgress={ getApiKeyInProgress }
                     apiData={ apiData }
                     createApiKey={ createApiKey }
                     languages={ languages }
                     updateLanguages={ updateLanguages }
                     notifications={ notifications }
                     goTo={ goTo }
                     siteInfo={ siteInfo }
                     handleSelectNotification={ this.handleSelectNotification }
                     isMobile={ screenWidth < 1024 }
                     integrationErrors={ integrationErrors }
                     integrationLoading={ integrationLoading }
                     clearIntegrationError={ this.clearIntegrationError }
                  />
               </Container.Content>
               {disableDisconnectSelector && (
                  <DeleteModal
                     title='This integration is connected with one of your programs. You cannot disconnect it.'
                     deleteText='Disconnect'
                     onCancel={ () => enableIntegration() }
                  />
               )}
            </SettingsLoading>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      integrationSettings: selectors.integrationSettingsSelector(state),
      emailsSettings: selectors.emailsSettingsSelector(state),
      accountSettings: selectors.accountSettingsSelector(state),
      videoAnalytics: selectors.videoAnalyticsSelector(state),
      dataIsFetching: selectors.dataIsFetchingSelector(state),
      getSettingsInProgress: selectors.getSettingsInProgressSelector(state),
      allSettings: selectors.getAllSettingsSelector(state),
      tabName: selectors.tabNameSelector(state),
      error: selectors.errorSelector(state),
      authUser: authUserSelector(state),
      app: appSelector(state),
      apiData: selectors.apiDataSelector(state),
      getApiKeyInProgress: selectors.getApiKeyInProgressSelector(state),
      allCourses: selectors.allCoursesSelector(state),
      languages: selectors.languagesSelector(state),
      putSettingsInProgress: selectors.putSettingsInProgressSelector(state),
      fromEmail: selectors.fromEmailSelector(state),
      notifications: selectors.notificationsSelector(state),
      isFetchingNotifications: selectors.notificationsFetchingSelector(state),
      disableDisconnectSelector: selectors.disableDisconnectSelector(state),
      initialNotifications: selectors.initialNotificationsSelector(state),
      codes: selectors.codesSelector(state),
      siteInfo: siteInfoSelector(state),
      screenWidth: screenWidthSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
      logout: () => {
         Auth.logout();
         dispatch(resetCommonDetails());
         dispatch(push(Router.route('COURSES').getCompiledPath(portalId)));
      },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      setInput: (target, key, value) => {
         dispatch(setInputAction(target, key, value));
      },
      setSettings: async (key) => {
         await dispatch(operations.settingsInitOperation(key));
      },
      getSettings: async (key, pageNum, count) => {
         await dispatch(operations.settingsGetOperation(key, pageNum, count));
      },
      getApiKey: async () => {
         await dispatch(operations.getApiKeyOperation());
      },
      createApiKey: async () => {
         await dispatch(operations.createApiKeyOperation());
      },
      getVideos: async (key, pageNum, count) => {
         await dispatch(operations.videosGetOperation(key, pageNum, count));
      },
      addIntegration: async (integration, data) => {
         await dispatch(operations.addIntegrationOperation(integration, data));
      },
      disconnectIntegration: async (integration) => {
         await dispatch(operations.disconnectIntegrationOperation(integration));
      },
      getVideosbyDate: async (date, pageNum, count) => {
         await dispatch(operations.videosGetbyDateOperation(date, pageNum, count));
      },
      putSettings: (inputs, formName) => {
         dispatch(operations.settingsPutOperation(inputs, formName));
      },
      updateFromEmail: (inputs, isDesign) => {
         dispatch(operations.updateFromEmailOperation(inputs, isDesign));
      },
      getNotifications: () => {
         dispatch(operations.getNotifications());
      },
      setDnsSettingsState: (state) => {
         dispatch(setDnsSettingsStateAction(state));
      },
      deleteAccountDomain: () => {
         dispatch(operations.deleteAccountDomainOperation());
      },
      cancelChanges: (initialFields, currentTab) => {
         dispatch(cancelChangesAction(initialFields, currentTab));
      },
      getSettingsAction: () => {
         dispatch(getSettingsCompleted());
      },
      colorSwitch: (colorPallete) => {
         dispatch(colorSwitchAction(colorPallete));
      },
      getAllCourses: () => {
         dispatch(operations.getAllCoursesOperation());
      },
      updateLanguages: (value) => {
         dispatch(operations.updateLanguagesOperation(value));
      },
      enableIntegration: () => {
         dispatch(enableIntegrationAction());
      },
      handleChangeNotify: (key, name, value) => {
         dispatch(changeNotify(key, name, value));
      },
      handleSaveNotifications: (prev, next) => {
         dispatch(operations.saveNotifications(prev, next));
      },
      handleSaveSchoolCodes: (inputs) => {
         dispatch(operations.putSchoolCodesOperation(inputs));
      },
      getSchoolCodes: () => {
         dispatch(operations.getSchoolRoomCodesOperation());
      },
      updateGoogleVerifyId: (newId) => {
         dispatch(updateGoogleVerificationAccount(newId));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);