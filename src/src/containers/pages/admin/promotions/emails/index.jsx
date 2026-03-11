import React, { useEffect, useState } from 'react';
import Container from 'views/layout/AdminContainer';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import Router from 'routes/router';
import { useHistory } from 'react-router';
import * as action from 'state/modules/designCourse/emails/actions';
import * as selectors from 'state/modules/designCourse/emails/selectors';
import * as operations from 'state/modules/designCourse/emails/operations';
import { push } from 'connected-react-router';
import { connect, useSelector } from 'react-redux';
import EmailStatuses from 'views/pages/EmailStatuses';
import { useSocket } from 'utils/hooks/useSocket';
import { appSelector, screenWidthSelector, siteInfoSelector } from 'state/modules/common/selectors';
// import LoaderSpinner from 'components/elements/LoaderSpiner';
import MobileHeader from 'views/layout/MobileHeader';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import PricingPopup from 'components/elements/PricingPopup';
import { createPortal } from 'react-dom';


const EmailStatusesIsLoading = withLoading(EmailStatuses);

const EmailsContainer = ({
   getEmailStatusesInProgress,
   emailStatuses,
   deleteEmailStatus,
   emailStatusesTotal,
   getEmailStatuses,
   goToEmailEdit,
   app,
   updateEmails,
   changeEmailStatusPage,
   initialLength,
   filter,
   isEmptyByFilter,
   isLoadingAction,
   multiDeleteEmails,
   duplicateEmail,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const history = useHistory();
   useSocket('promotion.email', (res) => { updateEmails(res); }, app);
   const [filterState, setFilterState] = useState({
      filter_by: 'not',
      sort: 'recently',
   });
   const [checkedIds, setCheckedIds] = useState([]);
   const screenWidth = useSelector(screenWidthSelector);

   const onChangeEmailStatusPage = (data) => {
      changeEmailStatusPage({ page: data.currentPage, count: 20 });
   };
   const handleEditEmailStatus = (id) => {
      goToEmailEdit(id);
   };


   useEffect(() => {
      getEmailStatuses('&field=updated_at&type=desc');
   }, []);


   const goToCreatePage = () => {
      history.push(`${ Router.route('ADMIN_EMAILS_CREATE').getCompiledPath() }`);
   };

   const filterDataChange = (name, value) => {
      const newData = {
         ...filterState,
         [name]: value,
      };
      setFilterState(newData);
      const fields = {
         'recently': 'updated_at',
         'newest': 'created_at',
         'oldest': 'created_at',
      };
      const typeSort = {
         'newest': 'desc',
         'oldest': 'asc',
         'recently': 'desc',
      };
      filter(`&field=${ fields[newData.sort] }&type=${ typeSort[newData.sort] }${ newData.filter_by !== 'not' ? `&filter_by=${ newData.filter_by }` : '' }`);
   };

   const handleCheckItem = (id) => {
      if (checkedIds.includes(id)) {
         setCheckedIds(checkedIds.filter(item => item !== id));
      } else {
         setCheckedIds([...checkedIds, id]);
      }
   };

   const handleCheckAllItems = (arr) => {
      setCheckedIds(arr);
   };

   const handleCreateEmail = () => {
      if (!Array.isArray(permissions)) {
         if (permissions.email_marketing) {
            goToCreatePage();
         } else {
            setPopupTitle('Email Marketing');
            setShowPopup(true);
         }
      } else {
         goToCreatePage();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <>
         {
            showPopup && createPortal(<PricingPopup 
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <Container>
            <Container.Content>
               <HeaderTypeSecond
                  title='Emails'
                  tooltip='Emails'
                  isHaveBaseButton={ true }
                  isHidenSearch={ true }
                  buttonProps={ {
                     text: 'Create New Email',
                     onClick: () => handleCreateEmail(),
                  } }
               />
               <EmailStatusesIsLoading
                  isLoading={ getEmailStatusesInProgress || isLoadingAction }
                  emailStatuses={ emailStatuses }
                  deleteEmailStatus={ deleteEmailStatus }
                  filterState={ filterState }
                  goToCreatePage={ goToCreatePage }
                  onChangeFilterState={ filterDataChange }
                  getEmailStatusesInProgress={ getEmailStatusesInProgress }
                  onChangeEmailStatusPage={ onChangeEmailStatusPage }
                  emailStatusesTotal={ emailStatusesTotal }
                  handleEditEmailStatus={
                     (id, type) => handleEditEmailStatus(id, type)
                  }
                  isMobile={ screenWidth < 1024 }
                  isEmptyByFilter={ isEmptyByFilter }
                  checkedIds={ checkedIds }
                  handleCheckItem={ handleCheckItem }
                  handleCheckAllItems={ handleCheckAllItems }
                  handleMultiDelete={ () => {
                     if (checkedIds.length === 0) return;
                     multiDeleteEmails(checkedIds, () => {
                        setCheckedIds([]);
                     });
                  } }
                  handleDuplicate={ duplicateEmail }
               />
            </Container.Content>
         </Container>
      </>
   );
};

EmailsContainer.propTypes = {
   // match: PropTypes.object,
   // formData: PropTypes.object,
   // setInputAction: PropTypes.func,
   // filterByCourses: PropTypes.func,
   // filterOptions: PropTypes.object,
   // setFilterEmails: PropTypes.array,
   // selectedFilters: PropTypes.array,
   // emails: PropTypes.array,
   // filterEmails: PropTypes.array,
   // setFilterEmailsAction: PropTypes.func,
   // removeFilterOptionAction: PropTypes.func,
   // addFilterOptionAction: PropTypes.func,
   // sendEmail: PropTypes.func,
   // filterByTags: PropTypes.func,
   // filterByTagsEmails: PropTypes.func,
   // getAdminsEmails: PropTypes.func,
   // getAllUsersEmails: PropTypes.func,
   // resetInputAction: PropTypes.func,
   // goToBack: PropTypes.func,
   // isEmailSent: PropTypes.bool,
   // getSettingsEmail: PropTypes.func,
   // settingsEmail: PropTypes.string,
   // getEmailInProgress: PropTypes.bool,
   // editEmailStatus: PropTypes.func,
   goToEmailEdit: PropTypes.func,
   getEmailStatusesInProgress: PropTypes.bool,
   getEmailStatuses: PropTypes.func,
   emailStatuses: PropTypes.array,
   deleteEmailStatus: PropTypes.func,
   // changeEmailStatusPage: PropTypes.func,
   emailStatusesTotal: PropTypes.number,
   // getFilterOptionsInProgress: PropTypes.bool,
   // getUsersEmailsInProgress: PropTypes.bool,
   // getAdminEmailsInProgress: PropTypes.bool,
   app: PropTypes.object,
   updateEmails: PropTypes.func,
   changeEmailStatusPage: PropTypes.func,
   initialLength: PropTypes.number,
   filter: PropTypes.func,
   isEmptyByFilter: PropTypes.bool,
   isLoadingAction: PropTypes.bool,
   multiDeleteEmails: PropTypes.func,
   duplicateEmail: PropTypes.func,
};


const mapStateToProps = state => {
   return {
      formData: selectors.formDataSelector(state),
      filterOptions: selectors.filterOptionsSelector(state),
      emails: selectors.emailsSelector(state),
      selectedFilters: selectors.selectedFiltersSelector(state),
      filterEmails: selectors.filterEmailsSelector(state),
      isEmailSent: selectors.isEmailSentSelector(state),
      sendEmailInProgress: selectors.sendEmailInProgressSelector(state),
      settingsEmail: selectors.settingsEmailSelector(state),
      getEmailInProgress: selectors.getEmailInProgressSelector(state),
      emailId: selectors.emailIdSelector(state),
      emailStatuses: selectors.emailStatusesSelector(state),
      getEmailStatusesInProgress: selectors.getEmailStatusesInProgressSelector(state),
      emailStatusesTotal: selectors.emailStatusesTotalSelector(state),
      getFilterOptionsInProgress: selectors.getFilterOptionsInProgressSelector(state),
      getUsersEmailsInProgress: selectors.getUsersEmailsInProgressSelector(state),
      getAdminEmailsInProgress: selectors.getAdminEmailsInProgressSelector(state),
      app: appSelector(state),
      initialLength: selectors.initalEmailsLengthSelector(state),
      isEmptyByFilter: selectors.isEmptyByFilterSelector(state),
      isLoadingAction: selectors.isLoadingActionSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      filterByCourses: () => dispatch(operations.filterByCoursesOperation()),
      filterByTags: () => dispatch(operations.filterByTagsOperation()),
      filterByTagsEmails: (option, id) => dispatch(operations.filterByTagsEmailsOperation(option, id)),
      getAdminsEmails: () => dispatch(operations.getAdminsEmailsOperation()),
      getAllUsersEmails: () => dispatch(operations.getAllUsersEmailsOperation()),
      setInputAction: (key, value) => dispatch(action.setInput(key, value)),
      resetInputAction: () => dispatch(action.resetInput()),
      addFilterOptionAction: option => dispatch(action.addFilterOption(option)),
      removeFilterOptionAction: option => dispatch(action.removeFilterOption(option)),
      updateEmails: option => dispatch(action.updateEmailsAction(option)),
      setFilterEmailsAction: filterEmails => dispatch(action.setFilterEmails(filterEmails)),
      sendEmail: async (body) => { await dispatch(operations.sendEmailOperation(body)); },
      goToBack: () => {
         dispatch(push(Router.route('ADMIN_DASHBOARD').getMask()));
      },
      goToEmailEdit: (id) => {
         dispatch(push(Router.route('ADMIN_EMAILS_EDIT').getCompiledPath({ id })));
      },
      getSettingsEmail: () => {
         dispatch(operations.settingsEmailOperation());
      },
      editEmailStatus: (id) => {
         dispatch(operations.editEmailStatusOperation(id));
      },
      getEmailStatuses: async (params) => {
         await dispatch(operations.getEmailStatusesOperation(params));
      },
      deleteEmailStatus: async (id) => {
         await dispatch(operations.deleteEmailStatusOperation(id));
      },
      changeEmailStatusPage: ({ ...params }) => {
         dispatch(operations.changeEmailStatusPageOperation(params));
      },
      filter: (params) => {
         dispatch(operations.filterEmailStatusesOperation(params));
      },
      multiDeleteEmails: (ids, callback) => {
         dispatch(operations.multiDeleteEmailsOperation(ids, callback));
      },
      duplicateEmail: (id) => {
         dispatch(operations.duplicateEmailOperation(id));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
