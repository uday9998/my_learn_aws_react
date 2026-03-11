// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Router from 'routes/router';
// import Auth from 'utils/Auth';
// import { push } from 'connected-react-router';
// import { connect } from 'react-redux';
// import * as selectors from 'state/modules/studentAccount/selectors';
// import { resetCommonDetails } from 'state/modules/common/actions';
// import { setInput as setInputAction, cancelChanges as cancelChangesAction } from 'state/modules/studentAccount/actions';
// import * as operations from 'state/modules/studentAccount/operations';
// import StudentAccount from 'views/pages/StudentAccount';
// import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
// import withLoading from 'utils/withLoading';
// import MultiLang from 'utils/MultiLang/MultiLang';
// import { customLogout } from 'utils/userMaven';

// const StudentAccountLoading = withLoading(StudentAccount);
// class AccountContainer extends Component {
//    static propTypes = {
//       logout: PropTypes.func.isRequired,
//       setAccount: PropTypes.func.isRequired,
//       accountStudent: PropTypes.object,
//       getAccount: PropTypes.func.isRequired,
//       setInput: PropTypes.func.isRequired,
//       cancelChanges: PropTypes.func.isRequired,
//       dataIsFetching: PropTypes.bool.isRequired,
//       getAccountInProgress: PropTypes.bool.isRequired,
//       updateStudent: PropTypes.func,
//       allAccount: PropTypes.object.isRequired,
//       courses: PropTypes.object,
//       resetAccountCourse: PropTypes.func,
//       authUser: PropTypes.any,
//       goToCourses: PropTypes.func,
//       cancelSubscription: PropTypes.func,
//       siteInfo: PropTypes.object,
//       orders: PropTypes.object,
//       accountImgChanged: PropTypes.string,
//    };

//    constructor(props) {
//       super(props);
//       this.state = {
//          pageLimit: 10,
//          currentPage: 1,
//          mobileisActiveAccountTab: false,
//       };
//       this.currentTab = '';
//       this.currentAccount = {};
//    }


//    async componentDidMount() {
//       const { setAccount, siteInfo } = this.props;
//       if (siteInfo.favicon) {
//          document.querySelector("link[rel*='icon']").href = siteInfo.favicon;
//       }
//       await setAccount();
//       this.currentTab = 'account';
//       const { allAccount } = this.props;
//       this.currentAccount = allAccount.account;
//    }

//    componentWillUnmount() {
//       document.querySelector("link[rel*='icon']").href = '/favicon.ico';
//    }


//    onSwitchTab = async (tabId) => {
//       const { getAccount } = this.props;
//       const { currentPage, pageLimit } = this.state;
//       this.currentTab = tabId;
//       if (tabId === 'courses') {
//          await getAccount(tabId, currentPage, pageLimit);
//       } else {
//          await getAccount(tabId);
//       }
//       if (window.innerWidth < 1024) {
//          this.setState({
//             mobileisActiveAccountTab: true,
//          });
//       }
//       const { allAccount } = this.props;
//       this.currentAccount = allAccount[tabId];
//    }


//    handleInputChange = (name, value) => {
//       const { setInput } = this.props;
//       const target = this.currentTab;
//       setInput(target, name, value);
//    }


//    handleCancelChanges = () => {
//       const { cancelChanges } = this.props;
//       const cancelInputs = {
//          id: this.currentAccount.id,
//          picture_src: this.currentAccount.picture_src,
//          name: this.currentAccount.name,
//          email: this.currentAccount.email,
//          current_password: '',
//          password: '',
//          password_confirmation: '',
//       };
//       cancelChanges(cancelInputs, this.currentTab);
//    }

//    handleFormSubmit = (id, inputs) => {
//       const { updateStudent } = this.props;
//       const newInputs = {
//          id,
//          name: inputs.name,
//          email: inputs.email,
//          current_password: inputs.current_password,
//          password: inputs.password,
//          password_confirmation: inputs.password_confirmation,
//          picture_src: inputs.picture_src,
//       };
//       if (newInputs.password === '') {
//          delete newInputs.password;
//       }
//       if (newInputs.password_confirmation === '') {
//          delete newInputs.password_confirmation;
//       }


//       const cancelInputs = {
//          id,
//          name: inputs.name,
//          email: inputs.email,
//          picture_src: inputs.picture_src,
//          current_password: '',
//          password: '',
//          password_confirmation: '',
//       };

//       updateStudent(id, newInputs);
//       this.currentAccount = cancelInputs;
//    }

//    handleCourseReset = (id) => {
//       const { resetAccountCourse } = this.props;
//       resetAccountCourse(id);
//    }

//    handleLogout = () => {
//       const { logout, authUser } = this.props;
//       customLogout(authUser);
//       logout();
//    }

//    goToBack = () => {
//       const { mobileisActiveAccountTab } = this.state;
//       const { goToCourses } = this.props;
//       if (mobileisActiveAccountTab) {
//          this.setState({ mobileisActiveAccountTab: false });
//       } else {
//          goToCourses();
//       }
//    }

//    removeFile = () => {
//    }


//    render() {
//       const {
//          dataIsFetching, getAccountInProgress, accountStudent, courses, authUser, siteInfo, orders, accountImgChanged, cancelSubscription,
//       } = this.props;
//       const { mobileisActiveAccountTab } = this.state;
//       return (
//          <MultiLang>
//             <div className='flex flex-col account__container' style={ siteInfo && siteInfo.school_theme_mode === 'dark' ? { backgroundColor: '#131313', minHeight: '100vh' } : { backgroundColor: '#f8f8f8', minHeight: '100vh' } }>
//                <StudentAccountLoading
//                   isLoading={ dataIsFetching }
//                   accountStudent={ accountStudent }
//                   getAccountInProgress={ getAccountInProgress }
//                   onChange={ (name, value) => this.handleInputChange(name, value) }
//                   onSwitchTab={ (tabId) => this.onSwitchTab(tabId) }
//                   handleFormSubmit={ (id, inputs) => this.handleFormSubmit(id, inputs) }
//                   handleCancelChanges={ formName => this.handleCancelChanges(formName) }
//                   courses={ courses }
//                   handleCourseReset={ (id) => this.handleCourseReset(id) }
//                   loggedIn={ !!authUser }
//                   authUser={ authUser }
//                   handleLogout={ this.handleLogout }
//                   mobileisActiveAccountTab={ mobileisActiveAccountTab }
//                   goToBack={ this.goToBack }
//                   siteInfo={ siteInfo }
//                   orders={ orders }
//                   removeFile={ this.removeFile }
//                   accountImgChanged={ accountImgChanged }
//                   cancelSubscription={ cancelSubscription }
//                />
//             </div>
//          </MultiLang>
//       );
//    }
// }

// const mapStateToProps = (state) => {
//    return {
//       accountStudent: selectors.accountStudentSelector(state),
//       dataIsFetching: selectors.dataIsFetchingSelector(state),
//       getAccountInProgress: selectors.getAccountInProgressSelector(state),
//       allAccount: selectors.getAllAccountSelector(state),
//       courses: selectors.getAccountCoursesSelector(state),
//       orders: selectors.getOrdersSelector(state),
//       authUser: authUserSelector(state),
//       siteInfo: siteInfoSelector(state),
//       accountImgChanged: selectors.accountImgChangedSelector(state),
//    };
// };

// const mapDispatchToProps = (dispatch) => {
//    return {
//       logout: () => {
//          Auth.logout();
//          dispatch(resetCommonDetails());
//          dispatch(push(Router.route('COURSES').getMask()));
//       },
//       goToCourses: () => {
//          dispatch(push(Router.route('COURSES').getMask()));
//       },
//       setInput: (target, key, value) => {
//          dispatch(setInputAction(target, key, value));
//       },
//       setAccount: async (key) => {
//          await dispatch(operations.accountInitOperation(key));
//       },
//       getAccount: async (key, pageNum, count) => {
//          await dispatch(operations.accountGetOperation(key, pageNum, count));
//       },
//       updateStudent: (id, inputs) => {
//          dispatch(operations.updateAccountOperation(id, inputs));
//       },
//       resetAccountCourse: (id) => {
//          dispatch(operations.resetAccountCourseOperation(id));
//       },
//       cancelChanges: (initialFields, currentTab) => {
//          dispatch(cancelChangesAction(initialFields, currentTab));
//       },
//       cancelSubscription: (subId) => {
//          dispatch(operations.cancelSubscriptionOperation(subId));
//       },
//    };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import QueryParams from 'utils/QueryParams';
import AdminContainer from 'views/layout/AdminContainer';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import { useHistory } from 'react-router';
import MyAccountPage from 'views/pages/MyAccount';
import * as selectors from 'state/modules/studentAccount/selectors';
import { authUserSelector, siteInfoSelector } from 'state/modules/common/selectors';
import Router from 'routes/router';
import Auth from 'utils/Auth';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { resetCommonDetails } from 'state/modules/common/actions';
import { useApiQuery } from 'utils/hooks/useQuery';
import { myAccountInformation } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { portalId } from 'utils/constants';
import useUITranslation from 'hooks/useUITranslation';

export const MyAccountContext = React.createContext();

const tabsNames = {
   'my-portal': 'My Portal',
   'communities': 'My Communities',
   'tags': 'Tags',
   'certificates': 'Certificates',
   'comments': 'Comments',
   'saved': 'Saved Courses',
   'notes': 'Notes',
   'settings': 'Settings',
};

const AccountContainer = ({ authUser, logout }) => {
   const [tab, setTab] = React.useState(QueryParams.getHash() || 'courses');
   const { data, setData, loading } = useApiQuery(myAccountInformation);
   const history = useHistory();
   const { t } = useUITranslation();
   
   // Get translated tab name or fallback to original
   const getTabName = (tabKey) => {
      switch(tabKey) {
         case 'my-portal': return t('myPortal');
         case 'communities': return t('communities');
         case 'certificates': return t('certificates');
         case 'settings': return t('settings');
         default: return tabsNames[tabKey] || tabKey;
      }
   };
   
   const activeTabName = getTabName(tab);

   const handleChangeUser = (newUser) => {
      setData({
         ...data,
         user_data: newUser,
      });
   };

   return (
      <div style={ { backgroundColor: '#fff' } } className='my__account'>
         <AdminContainer.Content>
            <ComponentProgress loading={ loading }>
               <MyAccountContext.Provider value={ {
                  user: data ? data.user_data : null, tab, setTab, logout, changeUser: handleChangeUser, t, getTabName,
               } }
               >
                  <div className='my__account__wrapper'>
                     <BreadCrumb
                        links={ [
                           {
                              text: t('portal'),
                              goTo: () => {
                                 const pathName = localStorage.getItem('isOnlineCourse');
                                 if (pathName) {
                                    history.push(`/portal/${ pathName }`);
                                    localStorage.removeItem('isOnlineCourse');
                                 } else {
                                    history.push('/portal/membership');
                                 }
                              }, 
                           },
                           { text: activeTabName, goTo: () => {} },
                        ] }
                     />
                     <MyAccountPage />
                  </div>
               </MyAccountContext.Provider>
            </ComponentProgress>
         </AdminContainer.Content>
      </div>
   );
};

AccountContainer.propTypes = {
   authUser: PropTypes.object,
   logout: PropTypes.func,
};

const mapStateToProps = (state) => {
   return {
      accountStudent: selectors.accountStudentSelector(state),
      dataIsFetching: selectors.dataIsFetchingSelector(state),
      getAccountInProgress: selectors.getAccountInProgressSelector(state),
      allAccount: selectors.getAllAccountSelector(state),
      courses: selectors.getAccountCoursesSelector(state),
      orders: selectors.getOrdersSelector(state),
      authUser: authUserSelector(state),
      siteInfo: siteInfoSelector(state),
      accountImgChanged: selectors.accountImgChangedSelector(state),
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


export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
