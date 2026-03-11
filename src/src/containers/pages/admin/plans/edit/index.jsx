import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import { connect, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import ComponentProgress from 'components/modules/ComponentProgress';
import * as selectors from 'state/modules/plans/selectors';
import * as operations from 'state/modules/plans/operations';
import HeaderPLan from 'components/elements/HeaderTypes/HeaderPlan';
import QueryParams from 'utils/QueryParams';
import Tabs from 'components/elements/tabs';
import PlanEditView from 'views/pages/plansNew/edit';
import { appSelector, siteInfoSelector } from 'state/modules/common/selectors';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { deletePlanNew } from 'api';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { toast } from 'react-toastify';
import isPrint from 'state/modules/designCourse/edit/Error';

const tabVariants = [
   { value: 'main', key: 'Main Info', iconName: 'MainPLanM' },
   { value: 'pricing', key: 'Price', iconName: 'PricingPLanM' },
   { value: 'settings', key: 'Advance Settings', iconName: 'SettingsPlanM' },
   { value: 'upsell', key: 'Upsell', iconName: 'UpsellPlanM' },
   { value: 'tracking', key: 'Tracking', iconName: 'TrackingPlanM' },
   { value: 'checkout', key: 'Checkout Design', iconName: 'CheckoutPlanM' },
];

const PlanEdit = ({
   match, goBack, plan, progress, init, handleInputChange, addIntegration, app, goToIntegrations, initialPlan,
   saveSettings, goToOrderBump, planSaveProgress, handleAddTag, deleteOrderBump, goToOrderBumpEdit,
   addCustomField, deleteCustomField, authoresponderOptions, goToUpsellCreatePage, deleteUpsell,
   goToCheckout, makeActiveLanding, goToDownsellCraetePage, deleteDownsell, changeDownsellStatus,
   goToUpsellPreview, goToUpsellEdit, goToDownsellEdit, goToDownsellPreview, authoresponderListOptionsInProgress,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const [selectedTab, setSelectedTab] = useState('main');
   const { isMobile } = useWindowSizeChange();
   const [errorMessages, setErrorMessages] = useState({});

   useEffect(() => {
      init(match.params.id);
      setSelectedTab(QueryParams.getHash());
   }, []);
   const [deletePlan] = useSubmitForm(deletePlanNew, {
      successMessage: 'Plan has been deleted.',
   });

   const clearErrorMessages = () => {
      setErrorMessages({});
   };

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const addTemporaryErrorMessage = (fieldName, errMessage) => {
      const currentMessages = errorMessages[fieldName] || [];

      if (currentMessages.includes(errMessage)) return;

      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: [errMessage, ...currentMessages]
      }));

      setTimeout(() => {
         setErrorMessages(prev => ({
            ...prev,
            [fieldName]: prev[fieldName].filter(message => message !== errMessage)
         }));
      }, 1000);
   };

   const handleSelectTab = (tab) => {
      if (Array.isArray(permissions)) {
         setSelectedTab(tab);
         QueryParams.setHash(tab);
      } else if (!permissions.customize_checkout_fields && tab === 'checkout') {
         setShowPopup(true);
         setPopupTitle('Checkout');
      } else if (tab === 'upsell' && !permissions.upsell_downsell) {
         setShowPopup(true);
         setPopupTitle('Upsell');
      } else {
         setSelectedTab(tab);
         QueryParams.setHash(tab);
      }
   };

   const handleConnectIntegration = (integration, integrationSettings) => {
      let data;
      switch (integration) {
         case 'paypalv2':
            data = {
               paypal_client_id_v2: integrationSettings.paypal_client_id_v2,
               paypal_secret_v2:
                integrationSettings.paypal_secret_v2,
               uuid: app.uuid,
            };
            break;
         case 'braintree':
            data = {
               merchant_id: integrationSettings.merchant_id,
               public_key: integrationSettings.public_key,
               private_key: integrationSettings.private_key,
            };
            break;
         default:
            data = {};
      }
      addIntegration(integration, data);
   };

   const handleSaveErrors = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);
   };

   const handleSave = () => {
      const ids = [];
      initialPlan.pricings.forEach(element => {
         if (element.id) {
            const item = plan.pricings.some((e) => e.id === element.id);
            if (!item) {
               ids.push(element.id);
            }
         }
      });

      let planNew = { ...plan };
      if (plan.picture_src === null) {
         planNew = { ...plan, delete_file_id: plan.file_id };
      }

      if (planNew.setting.autoresponder) {
         if (planNew.setting.autoresponder === 'ConvertKit' || planNew.setting.autoresponder === 'MailChimp'
         || planNew.setting.autoresponder === 'ActiveCampaign' || planNew.setting.autoresponder === 'AWeber') {
            if (!planNew.setting.list) {
               if (isPrint('The list/sequence is required for the autoresponder, please add one.')) {
                  toast.error('The list/sequence is required for the autoresponder, please add one.');
               }
               return false;
            }
         } 
      }
      saveSettings(
         {
            ...planNew,
            deletedIds: ids,
         },
         handleSaveErrors
      );
   };

   const goToCheckoutPreview = (template) => {
      window.open(`/checkout/${ template.checkout_theme_name }/${ plan.id }/${ template.id }`, '_blank');
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            <ComponentProgress loading={ progress || plan.id === undefined }>
               <AdminContainer.Content>
                  {planSaveProgress && (
                     <LoaderSpinner />
                  )}
                  <div className='plan__content'>
                     <div className='plan__content__header'>
                        {
                           !isMobile && (
                              <BreadCrumb
                                 links={ [
                                    { goTo: () => goBack(), text: 'Bundles' },
                                    { goTo: () => {}, text: plan.name },
                                 ] }
                              />
                           )
                        }
                        <HeaderPLan
                           onDelete={ () => deletePlan(plan.id, () => goBack()) }
                           planName={ plan.name }
                           courses={ plan.courses }
                           isHaveCoursesToDelete={ plan.after_delete_courses_unpublished }
                           goBack={ () => goBack() }
                           onSave={ () => {
                              handleSave();
                           } }
                           isMobile={ isMobile }
                        />
                        <Tabs
                           variants={ tabVariants }
                           selectedVariant={ selectedTab }
                           isButton={ false }
                           hasIcon={ true }
                           onSelect={ (tab) => handleSelectTab(tab) }
                           isFullWidth={ true }
                        />
                     </div>
                     <PlanEditView
                        onChange={ handleInputChange }
                        plan={ plan }
                        deleteOrderBump={ (id) => deleteOrderBump(plan.id, id) }
                        goToOrderBump={ () => goToOrderBump(plan.id) }
                        goToPreview={ goToCheckoutPreview }
                        goToIntegrations={ goToIntegrations }
                        uuid={ app.uuid }
                        deleteDownsell={ (id) => deleteDownsell(plan.id, id) }
                        changeDownsellStatus={ (id) => changeDownsellStatus(plan.id, id) }
                        deleteUpsell={ (id, callBack) => deleteUpsell(plan.id, id, callBack) }
                        goToCreatePage={ () => goToUpsellCreatePage(plan.id) }
                        deleteCustomField={ deleteCustomField }
                        onPreviewUpsell={ (id) => goToUpsellPreview(id) }
                        handleConnectIntegration={ handleConnectIntegration }
                        goToDownsellPreview={ goToDownsellPreview }
                        goToUpsellEdit={ (id) => goToUpsellEdit(id, plan.id) }
                        goToDownsellEdit={ (id) => goToDownsellEdit(id, plan.id) }
                        selectedTab={ selectedTab }
                        authoresponderOptions={ authoresponderOptions }
                        makeActiveLanding={ (id, callBack) => makeActiveLanding(plan.id, id, callBack) }
                        goToCheckout={ (id, name) => goToCheckout(plan.id, id, name) }
                        addCustomField={ addCustomField }
                        goToOrderBumpEdit={ (id) => goToOrderBumpEdit(plan.id, id) }
                        handleAddTag={ handleAddTag }
                        onDownsell={ (id, offerId) => goToDownsellCraetePage(plan.id, id, offerId) }
                        isMobile={ isMobile }
                        authoresponderListOptionsInProgress={ authoresponderListOptionsInProgress }
                        errorMessages={ errorMessages }
                        clearErrorMessages={ clearErrorMessages }
                        removeErrorMessage={ removeErrorMessage }
                        addTemporaryErrorMessage={ addTemporaryErrorMessage }
                     />
                  </div>
               </AdminContainer.Content>
            </ComponentProgress>
         </AdminContainer>
      </>
   );
};

PlanEdit.propTypes = {
   match: PropTypes.object,
   goBack: PropTypes.func,
   progress: PropTypes.bool,
   init: PropTypes.func,
   plan: PropTypes.object,
   handleInputChange: PropTypes.func,
   handleAddTag: PropTypes.func,
   app: PropTypes.object,
   addIntegration: PropTypes.func,
   goToIntegrations: PropTypes.func,
   goToOrderBump: PropTypes.func,
   initialPlan: PropTypes.object,
   saveSettings: PropTypes.func,
   planSaveProgress: PropTypes.bool,
   deleteOrderBump: PropTypes.func,
   goToOrderBumpEdit: PropTypes.func,
   addCustomField: PropTypes.func,
   deleteCustomField: PropTypes.func,
   authoresponderOptions: PropTypes.object,
   goToUpsellCreatePage: PropTypes.func,
   deleteUpsell: PropTypes.func,
   goToCheckout: PropTypes.func,
   makeActiveLanding: PropTypes.func,
   goToDownsellCraetePage: PropTypes.func,
   deleteDownsell: PropTypes.func,
   changeDownsellStatus: PropTypes.func,
   goToUpsellPreview: PropTypes.func,
   goToUpsellEdit: PropTypes.func,
   goToDownsellEdit: PropTypes.func,
   goToDownsellPreview: PropTypes.func,
   authoresponderListOptionsInProgress: PropTypes.bool,
};

const mapStateToProps = (state) => {
   return {
      plan: selectors.planSelector(state),
      progress: selectors.planProgressSelector(state),
      app: appSelector(state),
      initialPlan: selectors.initalPlanSelector(state),
      planSaveProgress: selectors.planLoadingSelector(state),
      authoresponderOptions: selectors.authoresponderListOptionsSelector(state),
      authoresponderListOptionsInProgress: selectors.authoresponderListOptionsInProgressSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goBack: () => {
         dispatch(push(
            Router.route('ADMIN_PLANS').getCompiledPath()
         ));
      },
      init: (id) => {
         dispatch(operations.getPlanOperation(id));
      },
      handleInputChange: (name, value, isQuery) => {
         dispatch(operations.planInputChangeOperation(name, value, isQuery));
      },
      addIntegration: (integration, data) => {
         dispatch(operations.planIntegrationOperation(integration, data));
      },
      goToIntegrations: () => {
         dispatch(push(
            `${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`
         ));
      },
      saveSettings: (data, onError) => {
         dispatch(operations.planSaveOperation(data, onError));
      },
      goToOrderBump: (id) => {
         dispatch(
            push(`${ Router.route('ADMIN_ORDER_BUMP_CREATE').getCompiledPath({ id }) }`)
         );
      },

      handleAddTag: (inputs) => dispatch(operations.planAddTagOperation(inputs)),

      deleteOrderBump: (...params) => {
         dispatch(operations.deleteOrderBumpOperation(...params));
      },
      goToOrderBumpEdit: (planId, id) => {
         dispatch(push(
            Router.route('ADMIN_ORDER_BUMP').getCompiledPath({ planId, id })
         ));
      },
      addCustomField: (name) => {
         dispatch(operations.addCustomFieldsOperation(name));
      },
      deleteCustomField: (id) => {
         dispatch(operations.deleteCustomFieldOperation(id));
      },
      goToUpsellCreatePage: (offerId) => {
         dispatch(push(
            Router.route('ADMIN_UPSELL_CREATE').getCompiledPath({ offerId })
         ));
      },
      goToDownsellCraetePage: (offerId, id, upsellOfferId) => {
         dispatch(push(
            Router.route('ADMIN_DOWNSELL_CREATE').getCompiledPath({ offerId, id, upsellOfferId })
         ));
      },
      deleteUpsell: (planId, id, callBack) => {
         dispatch(operations.deleteUpsellOperation(planId, id, callBack));
      },
      goToCheckout: (planId, id, name) => {
         dispatch(push(
            Router.route('ADMIN_OFFER_CHECKOUT').getCompiledPath({ offerId: planId, id, name })
         ));
      },
      makeActiveLanding: (planId, landingId, callBack) => {
         dispatch(operations.makeActiveLandingOperation(planId, landingId, callBack));
      },
      deleteDownsell: (offerId, id) => {
         dispatch(operations.deleteDownsellOperation(offerId, id));
      },
      changeDownsellStatus: (offerId, id) => {
         dispatch(operations.changeDownselStatus(offerId, id));
      },
      goToUpsellPreview: (id) => {
         dispatch(
            push(`${ Router.route('ADMIN_UPSELL_PREVIEW').getCompiledPath({ upsellId: id }) }`)
         );
      },
      goToDownsellPreview: (id) => {
         dispatch(
            push(`${ Router.route('ADMIN_DOWNSELL_PREVIEW').getCompiledPath({ downsellId: id }) }`)
         );
      },
      goToUpsellEdit: (upsellId, offerId) => {
         dispatch(
            push(`${ Router.route('ADMIN_UPSELL_EDIT').getCompiledPath({ upsellId, offerId }) }`)
         );
      },
      goToDownsellEdit: (downsellId, offerId) => {
         dispatch(
            push(`${ Router.route('ADMIN_DOWNSELL_EDIT').getCompiledPath({ downsellId, offerId }) }`)
         );
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanEdit);
