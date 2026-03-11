import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as selectors from 'state/modules/webhooks/selectors';
import * as operations from 'state/modules/webhooks/operations';
import WebHookEmptyMain from 'views/pages/WebHook/emptyMain';
import WebHookMain from 'views/pages/WebHook/main';
import DeleteModalContentWebhook from 'views/pages/WebHook/deleteModalContent';
import WebHookCreateEdit from 'views/pages/WebHook/createEdit';
import WebHookLogs from 'views/pages/WebHook/logs';
import withLoading from 'utils/withLoading';
import {
   setInput as setInputAction,
   resetWebhook as resetWebhookAction,
} from 'state/modules/webhooks/actions';
import Popup from 'components/modules/Popup';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const WebhookIsLoading = withLoading('div');

const WebHookMainContainer = ({
   webHooks,
   webHook,
   getWebhooks,
   getWebhookById,
   getWebHookLogs,
   webHookLogs,
   createWebhook,
   deleteWebhook,
   updateWebHook,
   isFetchingData,
   setInput,
   resetWebhook,
}) => {
   const [webhookUrl, setWebhookUrl] = useState(webHook.url || 'http//example.com/webhook');
   const [deleteModal, setDeleteModal] = useState(false);
   const [currentdeletingWebhookID, setCurrentdeletingWebhookID] = useState();
   const [webHooksList, setWebHooksList] = useState(true);
   const [editMode, setEditMode] = useState(false);
   const [creatMode, setCreateMode] = useState(false);
   const [editHookId, setEditHookId] = useState();
   const [trianglesData, setTrianglesData] = useState([
      {
         id: 1,
         type: 'All',
         text: 'All triggered events',
         checked: webHook.metas.is_all_on === undefined ? true : webHook.metas.is_all_on,
      },
      {
         id: 2,
         type: 'Free Access',
         text: 'When a member enrolls in a free class',
         checked: !webHook.metas.is_sale_free_on ? false : webHook.metas.is_sale_free_on,
      },
      {
         id: 3,
         type: 'One Time Sale',
         text: 'When a member enrolls in fully paid class',
         checked: !webHook.metas.is_sale_one_time_on ? false : webHook.metas.is_sale_one_time_on,
      },
      {
         id: 4,
         type: 'New Subscription',
         text: 'When a member enrolls in a subscription',
         checked: !webHook.metas.is_sale_reccuring_on ? false : webHook.metas.is_sale_reccuring_on,
      },
      {
         id: 5,
         type: 'New Member Enrolled',
         text: 'When a new member enrolls in free/paid class',
         checked: !webHook.metas.is_member_created_on ? false : webHook.metas.is_member_created_on,
      },
      {
         id: 6,
         type: 'Delete Member',
         text: 'When you delete a member',
         checked: !webHook.metas.is_member_deleted_on ? false : webHook.metas.is_member_deleted_on,
      },
      {
         id: 7,
         type: 'Class Published',
         text: 'When a class is published',
         checked: !webHook.metas.is_course_published_on ? false : webHook.metas.is_course_published_on,
      },
      {
         id: 8,
         type: 'Class Unpublished',
         text: 'When a class is unpublished',
         checked: !webHook.metas.is_course_unpublished_on ? false : webHook.metas.is_course_unpublished_on,
      },
      {
         id: 9,
         type: 'Class Deleted',
         text: 'When you delete a class',
         checked: !webHook.metas.is_course_deleted_on ? false : webHook.metas.is_course_deleted_on,
      },
      {
         id: 10,
         type: 'Class Completed',
         text: 'When a member completes the class',
         checked: !webHook.metas.is_course_completed_on ? false : webHook.metas.is_course_completed_on,
      },
      {
         id: 11,
         type: 'Quiz Completed',
         text: 'When a member completes the quiz',
         checked: !webHook.metas.is_quiz_completed_on ? false : webHook.metas.is_quiz_completed_on,
      },
      {
         id: 12,
         type: 'New Affiliate Enrolled',
         text: 'When a new affiliate enrolls in free/paid class',
         checked: !webHook.metas.is_affiliate_created_on ? false : webHook.metas.is_affiliate_created_on,
      },
      {
         id: 13,
         type: 'Delete Affiliate',
         text: 'When you delete a affiliate',
         checked: !webHook.metas.is_affiliate_deleted_on ? false : webHook.metas.is_affiliate_deleted_on,
      },
   ]);


   useEffect(() => {
      getWebhooks();
      // getWebhookById(5);
      // getWebHookLogs(1);
   }, []);

   const selectDeleteingWebhookById = (id) => {
      return (
         // deleteWebhook(id),
         setCurrentdeletingWebhookID(id),
         getWebhooks(),
         setDeleteModal(true)
      );
   };

   const goToCreateMode = () => {
      return (
         setCreateMode(true)
      );
   };

   const goToEditMode = (id) => {
      return (
         setEditHookId(id),
         setEditMode(true),
         setCreateMode(false),
         getWebhookById(id)
      );
   };

   const goToWebHooksList = () => {
      return (
         setWebHooksList(true),
         setEditMode(false),
         setCreateMode(false)
      );
   };

   const changeWebhookUrl = (url) => setWebhookUrl(url);

   const handleInputChange = (name, value, target) => {
      setInput(name, value, target);
   };

   const goToLogs = (id) => {
      setWebHooksList(false);
      getWebHookLogs(id);
   };
   const createWebHookFunc = async () => {
      if (webHook.url !== undefined && webHook.url !== '') {
         await createWebhook({
            url: webHook.url || 'https://example.com/webhook',
            name: webHook.name || '',
            is_all_on: trianglesData[0].checked,
            is_sale_free_on: trianglesData[1].checked,
            is_sale_one_time_on: trianglesData[2].checked,
            is_sale_reccuring_on: trianglesData[3].checked,
            is_member_created_on: trianglesData[4].checked,
            is_member_deleted_on: trianglesData[5].checked,
            is_course_published_on: trianglesData[6].checked,
            is_course_unpublished_on: trianglesData[7].checked,
            is_course_deleted_on: trianglesData[8].checked,
            is_course_completed_on: trianglesData[9].checked,
            is_quiz_completed_on: trianglesData[10].checked,
            is_affiliate_created_on: trianglesData[11].checked,
            is_affiliate_deleted_on: trianglesData[12].checked,
         });
         await goToWebHooksList();
         resetWebhook();
      } else if (isPrint('Webhook URL is required.')) {
         toast.error('Webhook URL is required.');
      }
   };

   const updateWebHookFunc = async () => {
      if (webHook.url !== '') {
         await updateWebHook(editHookId, {
            url: webHook.url || 'https://example.com/webhook',
            name: webHook.name || '',
            is_all_on: trianglesData[0].checked,
            is_sale_free_on: trianglesData[1].checked,
            is_sale_one_time_on: trianglesData[2].checked,
            is_sale_reccuring_on: trianglesData[3].checked,
            is_member_created_on: trianglesData[4].checked,
            is_member_deleted_on: trianglesData[5].checked,
            is_course_published_on: trianglesData[6].checked,
            is_course_unpublished_on: trianglesData[7].checked,
            is_course_deleted_on: trianglesData[8].checked,
            is_course_completed_on: trianglesData[9].checked,
            is_quiz_completed_on: trianglesData[10].checked,
            is_affiliate_created_on: trianglesData[11].checked,
            is_affiliate_deleted_on: trianglesData[12].checked,
         });
         await getWebhooks();
         await goToWebHooksList();
         resetWebhook();
      } else if (isPrint('Webhook URL is required.')) {
         toast.error('Webhook URL is required.');
      }
   };
   return (
      <WebhookIsLoading isLoading={ isFetchingData }>
         <div>
            {deleteModal && (
               <Popup
                  isOpen={ deleteModal }
                  onAccept={ () => {
                     return (
                        deleteWebhook(currentdeletingWebhookID),
                        setDeleteModal(false)
                     );
                  } }
                  onAcceptText='Delete'
                  title='Delete Webhook'
                  onClose={ () => {
                     setDeleteModal(false);
                  } }
                  cancelText='Cancel'
               >
                  <DeleteModalContentWebhook
                     hook={ webHooks.filter((hook) => hook.id === currentdeletingWebhookID)[0] }
                  />
               </Popup>

            )}
            {webHooksList ? (
               <WebHookMain
                  data={ webHooks }
                  deleteWebhook={ selectDeleteingWebhookById }
                  goToEditMode={ goToEditMode }
                  goToCreateMode={ goToCreateMode }
                  goToLogs={ goToLogs }
               />
            ) : ''}
            {
               ((editMode && webHook) || creatMode) && (
                  <Popup
                     isOpen={ creatMode || editMode }
                     title={ creatMode ? 'New Webhook' : 'Edit Webhook' }
                     onAcceptText='Save Webhook'
                     onAccept={ () => (creatMode
                        ? createWebHookFunc() : updateWebHookFunc()) }
                     cancelText='Cancel'
                     onClose={ () => {
                        setCreateMode(false);
                        setEditMode(false);
                     } }
                  >
                     <WebHookCreateEdit
                        createWebhook={ createWebhook }
                        getWebhooks={ getWebhooks }
                        trianglesData={ trianglesData }
                        setTrianglesData={ setTrianglesData }
                        updateWebHook={ updateWebHook }
                        webhookUrl={ webhookUrl }
                        changeWebhookUrl={ changeWebhookUrl }
                        goToWebHooksList={ goToWebHooksList }
                        creatMode={ creatMode }
                        editHookId={ editHookId }
                        webHook={ webHook }
                        handleInputChange={ handleInputChange }
                     />
                  </Popup>
               )
            }
            {!webHooksList && !creatMode && !editMode && (
               <WebHookLogs
                  data={ webHookLogs }
                  goBack={ () => { setWebHooksList(true); } }
               />
            )}

         </div>
      </WebhookIsLoading>
   );
};

WebHookMainContainer.propTypes = {
   webHooks: PropTypes.array,
   getWebhooks: PropTypes.func,
   getWebhookById: PropTypes.func,
   getWebHookLogs: PropTypes.func,
   createWebhook: PropTypes.func,
   deleteWebhook: PropTypes.func,
   updateWebHook: PropTypes.func,
   webHook: PropTypes.object,
   webHookLogs: PropTypes.array,
   isFetchingData: PropTypes.bool,
   setInput: PropTypes.func,
   resetWebhook: PropTypes.func,
};

WebHookMainContainer.defaultProps = {
   webHook: {
      metas: {},
   },
};

const mapStateToProps = state => {
   return {
      webHooks: selectors.webHooksSelector(state),
      webHook: selectors.webHookByIdSelector(state),
      webHookLogs: selectors.webHookLogsSelector(state),
      isFetchingData: selectors.webHookIsFetchingData(state),

   };
};
const mapDispatchToProps = dispatch => {
   return {
      getWebhooks: () => {
         dispatch(operations.getWebHooksOperation());
      },
      getWebhookById: (id) => {
         dispatch(operations.getWebHookByIdOperation(id));
      },
      getWebHookLogs: (id) => {
         dispatch(operations.getWebHookLogsOperation(id));
      },
      createWebhook: async (params) => {
         await dispatch(operations.createWebHookOperation(params));
      },
      deleteWebhook: (id) => {
         dispatch(operations.deleteWebHookOperation(id));
      },
      updateWebHook: async (id, params) => {
         await dispatch(operations.updateWebHookOperation(id, params));
      },
      setInput: (key, value, target) => {
         dispatch(setInputAction(key, value, target));
      },
      resetWebhook: () => {
         dispatch(resetWebhookAction());
      },
   };
};


export default connect(
   mapStateToProps,
   mapDispatchToProps
)(WebHookMainContainer);
