import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { putAccountSettings, updateAccountDomain, updateSettings, updateSettingsByGroup, getSettings } from 'api';
import getDeff from 'utils/getDeff';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import useForms from 'utils/hooks/useForms/index';
import * as selectors from 'state/modules/designCourse/courses/selectors';
import * as operations from 'state/modules/designCourse/courses/operations';
import { useIntegrationSettings } from 'utils/hooks/useIntegrationSettings';

import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import AddContentStep from './components/AddContentStep';
import PriceSubscriptionContent from './components/PriceSubscriptionContent';
import PrepareLaunchContent from './components/PrepareLaunchContent';
import ColorPicker from './components/ColorPicker';
import UploadImg from './components/UploadImg';
import NewUploadImage from './components/UploadImage';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';

const BrandMembershipContent = ({ uploadedImage, handleInputChange, onMoveToNextStep, onCompleteStep, subdomain }) => {
   const [updateBrandSettings] = useSubmitForm(updateSettingsByGroup('seo'), {
      successMessage: 'Brand settings updated successfully',
      onSuccess: () => {
         if (onCompleteStep) {
            onCompleteStep('brand-membership');
         }
      }
   });
   
   const [createDomain] = useSubmitForm(updateSettings('account'), {
      successMessage: 'Domain updated successfully',
      onSuccess: () => {
         if (onCompleteStep) {
            onCompleteStep('brand-membership');
         }
      }
   });
   
   const [localSubdomain, setLocalSubdomain] = useState(subdomain || '');
   const [primaryColor, setPrimaryColor] = useState('#379552');
   
   useEffect(() => {
      if (subdomain && subdomain !== localSubdomain) {
         setLocalSubdomain(subdomain);
      }
   }, [subdomain]);
   
   const handleSaveAndContinue = () => {
      let hasChanges = false;
      
      if (localSubdomain) {
         createDomain({ subdomain: localSubdomain });
         hasChanges = true;
      }
      
      updateBrandSettings({
         item_button_color: primaryColor
      });
      hasChanges = true;
      
      if (onCompleteStep) {
         onCompleteStep('brand-membership');
      }
      
      if (onMoveToNextStep) {
         onMoveToNextStep('brand-membership');
      }
   };
   
   const handleSubdomainChange = (e) => {
      setLocalSubdomain(e.target.value);
   };
   
   const handleColorChange = (newColor) => {
      setPrimaryColor(newColor);
   };
   
   const handleLogoChange = (file) => {
      if (file) {
         handleInputChange(null, file);
      }
   };
   
   return (
      <div className="brand-membership-content">
         <div className="site-information-section">
            <div className="section-header">
               <Icon name="Globe" className="section-icon" />
               <span className="section-title">Site Information</span>
            </div>
            
            <div className="form-group">
               <label className="form-label">Domain</label>
               <div className="domain-input-group">
                  <input 
                     type="text" 
                     className="form-input domain-input" 
                     placeholder="yourname"
                     value={localSubdomain}
                     onChange={handleSubdomainChange}
                  />
                  <div className="domain-suffix">.miestro.com</div>
               </div>
               <div className="form-hint">Choose a unique domain for your membership site</div>
            </div>
         </div>
         
         <div className="branding-section">
            <div className="section-header">
               <Icon name="PaintBrush" className="section-icon" />
               <span className="section-title">Branding</span>
            </div>
            
            <div className="form-group">
            <UploadImage 
                  isImageUpload={true}
                  label="Upload Logo" 
                  src={uploadedImage} 
                  onChange={handleLogoChange} 
                  name='school_logo'
               />
            </div>
            
            <div className="form-group">
               <label className="form-label">Primary Color</label>
               <ColorPicker color={primaryColor} onChange={handleColorChange} />
            </div>
         </div>
         
         <div className="form-actions">
            <button className="save-continue-button" onClick={handleSaveAndContinue}>
               Save & Continue
               <Icon name="ChevronRight" className="button-icon" />
            </button>
            {/* <button className="save-draft-button">Save as Draft</button> */}
         </div>
      </div>
   );
};

const DashboardChecklist = ({
   checkListData, 
   changeCheckListData,
   history,
   onSetupComplete
}) => {
   const dispatch = useDispatch();
   
   const forms = useMemo(() => {
     return [
       { key: 'account', fetchAction: getSettings.bind(null, 'account') }
     ];
   }, []);
 
   const { state } = useForms(forms, 'account');
   const { integrationSettings, isLoading: isLoadingIntegrations } = useIntegrationSettings();
   const courses = useSelector(selectors.coursesSelector);
   const memberships = useSelector(state => state.membership?.memberships || []);
   const subdomain = state.account?.data?.subdomain || '';

   const [isCheckingStatus, setIsCheckingStatus] = useState(true);
   const [setSettings] = useSubmitForm(putAccountSettings);
   const [activeStep, setActiveStep] = useState(null);
   const [completedSteps, setCompletedSteps] = useState({});
   const [uploadedImage, setUploadedImage] = useState('');
   const [localSteps, setLocalSteps] = useState([]);

   const hasConnectedPaymentMethod = useMemo(() => {
      const stripeConnected = integrationSettings?.stripe && 
                              integrationSettings.stripe !== false && 
                              integrationSettings.stripe_account_id;
      
      const braintreeConnected = integrationSettings?.braintree && 
                                 integrationSettings.braintree !== false && 
                                 integrationSettings.braintree_account_id;
      
      const paystackConnected = integrationSettings?.paystack && 
                                integrationSettings.paystack !== false;
      
      const boomfiConnected = integrationSettings?.boomfi && 
                              integrationSettings.boomfi !== false;
      
      const paypalConnected = integrationSettings?.paypal_client_id_v2 && 
                              integrationSettings.paypal_secret_v2 && 
                              integrationSettings.paypal_client_id_v2 !== null;
      
      return !!(stripeConnected || braintreeConnected || paystackConnected || 
               boomfiConnected || paypalConnected);
   }, [integrationSettings]);
   
   useEffect(() => {
      dispatch(operations.getCoursesOperation(1, {}, false));
   }, [dispatch]);
   
   const completeStepLocally = (stepId) => {
      if (!localSteps) return;
      
      setCompletedSteps(prev => ({
         ...prev,
         [stepId]: true
      }));
      
      setLocalSteps(prevSteps => 
         prevSteps.map(step => 
            step.id === stepId 
               ? { ...step, isCompleted: true } 
               : step
         )
      );
   };
   
   const checkCompletionStatus = () => {
      if (state.account?.data?.subdomain && state.account?.data?.picture_src) {
         completeStepLocally('brand-membership');
      }
     
      if (courses && courses.length > 0) {
         completeStepLocally('add-content');
      }
      
      if (memberships && memberships.length > 0 || courses && courses.length > 0) {
         completeStepLocally('price-subscription');
      }
      
      if (hasConnectedPaymentMethod) {
         completeStepLocally('prepare-launch');
      }
      
      setIsCheckingStatus(false);
   };
   
   useEffect(() => {
      if (!isLoadingIntegrations && !isCheckingStatus) {
         checkCompletionStatus();
      }
   }, [state.account?.data, courses, memberships, hasConnectedPaymentMethod, isLoadingIntegrations]);
   
   const mapCheckListDataToSteps = () => {
      const defaultSteps = [
         {
            id: 'brand-membership',
            title: 'Brand membership',
            description: 'Choose your name, domain, and colors',
            isCompleted: false,
            originalTitle: 'Customizing Branding'
         },
         {
            id: 'add-content',
            title: 'Create Product',
            description: 'Upload videos, courses, or create a community post',
            isCompleted: false,
            originalTitle: 'Create Product',
            path: '/admin/programs/create',
            actionButton: {
               text: 'Create content',
               onClick: () => history.push('/admin/programs/create')
            }
         },
         {
            id: 'price-subscription',
            title: 'Price subscription',
            description: 'Set up pricing plans for your membership. Learn more.',
            isCompleted: false,
            originalTitle: 'Create An Offer',
            path: '/admin/membership/create',
            actionButton: {
               text: 'Add pricing plan',
               onClick: () => history.push('/admin/membership/create')
            }
         },
         {
            id: 'prepare-launch',
            title: 'Prepare for launch',
            description: 'Connect to a payment provider and preview your membership',
            isCompleted: hasConnectedPaymentMethod,
            path: '/admin/settings#integrations', 
            actionButton: {
               text: 'Prepare launch',
               onClick: () => history.push('/admin/settings#integrations')
            }
         }
      ];
      
      Object.keys(completedSteps).forEach(stepId => {
         const stepIndex = defaultSteps.findIndex(step => step.id === stepId);
         if (stepIndex !== -1 && completedSteps[stepId]) {
            defaultSteps[stepIndex].isCompleted = true;
         }
      });
      
      return defaultSteps;
   };

   useEffect(() => {
      setLocalSteps(mapCheckListDataToSteps());
   }, [checkListData, completedSteps, hasConnectedPaymentMethod]);
   
   const completedCount = localSteps.filter(step => step.isCompleted).length;
   const totalSteps = localSteps.length;

   useEffect(() => {
      if (localSteps.length > 0) {
         const firstIncompleteStep = localSteps.find(step => !step.isCompleted);
         if (firstIncompleteStep) {
            setActiveStep(firstIncompleteStep.id);
         } else if (localSteps.length > 0) {
            setActiveStep(null);
         }
      }
      
      localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
      
      if (completedCount === totalSteps && totalSteps > 0 && onSetupComplete) {
         onSetupComplete(true);
      }
   }, [localSteps, completedSteps, completedCount, totalSteps, onSetupComplete]);
   
   useEffect(() => {
      const savedCompletedSteps = localStorage.getItem('completedSteps');
      if (savedCompletedSteps) {
         try {
            const parsed = JSON.parse(savedCompletedSteps);
            setCompletedSteps(parsed);
         } catch (e) {
         }
      }
      
      if (!isLoadingIntegrations) {
         setIsCheckingStatus(false);
      }
   }, [isLoadingIntegrations]);

   const handleInputChange = (_, value) => {
      const deff = getDeff(value);
      setSettings({
         picture_full_src: deff,
         picture_src: deff,
      }, () => {
         setUploadedImage(deff);
         
         if (state.account?.data?.subdomain && deff) {
            completeStepLocally('brand-membership');
         }
      });
   };

   const handleToggleStep = (stepId) => {
      const step = localSteps.find(s => s.id === stepId);
      
      if (step && step.isCompleted) {
         const firstUncompleteStep = localSteps.find(s => !s.isCompleted);
         if (firstUncompleteStep) {
            setActiveStep(firstUncompleteStep.id);
         } else {
            setActiveStep(null);
         }
         return;
      }
      
      setActiveStep(activeStep === stepId ? null : stepId);
   };
   
   const completeStep = (stepId) => {
      completeStepLocally(stepId);
      
      const currentIndex = localSteps.findIndex(s => s.id === stepId);
      if (currentIndex >= 0) {
         const nextUncompleteStep = localSteps.slice(currentIndex + 1).find(step => !step.isCompleted);
         if (nextUncompleteStep) {
            setActiveStep(nextUncompleteStep.id);
         } else {
            setActiveStep(null);
         }
      }
   };
   
   const moveToNextStep = (currentStepId) => {
      const currentIndex = localSteps.findIndex(step => step.id === currentStepId);
      
      if (currentIndex >= 0 && currentIndex < localSteps.length - 1) {
         const nextStep = localSteps.slice(currentIndex + 1).find(step => !step.isCompleted);
         if (nextStep) {
            setActiveStep(nextStep.id);
         } else {
            setActiveStep(null);
         }
      }
   };
   
   useEffect(() => {
      if (localSteps.length > 0 && completedCount === totalSteps) {
         setActiveStep(null);
      }
   }, [completedCount, totalSteps, localSteps]);
   
   const isSetupComplete = completedCount === totalSteps && totalSteps > 0;
   
   if (isLoadingIntegrations || isCheckingStatus) {
      return (
         <div className='setup-checklist loading'>
            <div className='loading-indicator'>
               <span>Loading setup data...</span>
            </div>
         </div>
      );
   }

   return (
      <div className='setup-checklist'>
         <div className='setup-header'>
            <h2>Complete your setup</h2>
            <div className='progress-indicator'>
               <span>{completedCount} of {totalSteps} complete</span>
               <div className='progress-bar'>
                  <div 
                     className='progress-fill' 
                     style={{ width: `${(completedCount / totalSteps) * 100}%` }}
                  ></div>
               </div>
            </div>
         </div>

         <div className='steps-container'>
            {localSteps.map((step, index) => {
               const isActive = activeStep === step.id;
               const stepNumber = index + 1;
               const isBrandMembership = step.id === 'brand-membership';
               const isAddContent = step.id === 'add-content';
               const isPriceSubscription = step.id === 'price-subscription';
               const isPrepareLaunch = step.id === 'prepare-launch';
               
               return (
                  <div 
                     key={step.id} 
                     className={`step-item ${step.isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  >
                     <div className='step-header' onClick={() => handleToggleStep(step.id)}>
                        <div className='step-indicator'>
                           {step.isCompleted ? (
                              <div className='completed-icon'>
                                 <Icon name='CheckedBlock' />
                              </div>
                           ) : (
                              <div className='step-number'>{stepNumber}</div>
                           )}
                        </div>
                        
                        <div className='step-title-container'>
                           <h3 className='step-title'>{step.title}</h3>
                           <p className='step-description'>{step.description}</p>
                        </div>
                        
                        <Icon 
                           name={isActive ? 'ChevronDown' : 'ChevronRight'} 
                           className='expand-icon' 
                        />
                     </div>
                     
                     {isActive && (
                        <div className='step-content step-content2'>
                           {isBrandMembership ? (
                              <BrandMembershipContent 
                                 uploadedImage={uploadedImage} 
                                 handleInputChange={handleInputChange}
                                 onMoveToNextStep={moveToNextStep}
                                 onCompleteStep={completeStep}
                                 subdomain={subdomain}
                              />
                           ) : isAddContent ? (
                              <AddContentStep 
                                 onMoveToNextStep={moveToNextStep}
                                 onCompleteStep={completeStep}
                              />
                           ) : isPriceSubscription ? (
                              <PriceSubscriptionContent 
                                 onMoveToNextStep={moveToNextStep}
                                 onCompleteStep={completeStep}
                              />
                           ) : isPrepareLaunch ? (
                              <PrepareLaunchContent 
                                 onMoveToNextStep={moveToNextStep}
                                 onCompleteStep={completeStep}
                                 hasConnectedPaymentMethod={hasConnectedPaymentMethod}
                              />
                           ) : (
                              <>
                                 {step.actionButton && !step.isCompleted && (
                                    <button 
                                       className='action-button' 
                                       onClick={step.actionButton.onClick}
                                    >
                                       {step.actionButton.text}
                                    </button>
                                 )}
                                 
                                 {!step.isCompleted && !step.actionButton && (
                                    <button 
                                       className='action-button' 
                                       onClick={() => history.push(step.path)}
                                    >
                                       Go to {step.title.toLowerCase()}
                                    </button>
                                 )}
                              </>
                           )}
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

BrandMembershipContent.propTypes = {
   uploadedImage: PropTypes.string,
   handleInputChange: PropTypes.func,
   onMoveToNextStep: PropTypes.func,
   onCompleteStep: PropTypes.func,
   subdomain: PropTypes.string
};

DashboardChecklist.propTypes = {
   checkListData: PropTypes.array,
   changeCheckListData: PropTypes.func,
   history: PropTypes.object.isRequired,
   onSetupComplete: PropTypes.func
};

export default withRouter(DashboardChecklist);