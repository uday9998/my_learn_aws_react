import React, { useState, useEffect } from 'react';
import CheckoutTemplates from 'components/modules/checkout/CheckoutTemplates';
import Tracking from 'components/modules/checkout/Tracking';
import Header from 'components/modules/checkout/Header';
import AdvancedSettings from 'components/modules/checkout/AdvancedSettings';
import CheckoutTemplate from 'views/pages/DesignCourse/CheckoutTemplate';
import TabSwitch from 'components/elements/TabSwitch';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getCheckoutCourse, getCheckoutLandings, makeActiveLanding, getCustomFields,
} from 'api/AuthApi';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { useHistory } from 'react-router';
import withLoading from 'utils/withLoading';
import PropTypes from 'prop-types';
import './index.scss';

const CheckoutLoading = withLoading('div');

const Checkout = ({
   attachTag, detachTag, handleInputChange, settingsData, handleSettingsSave,
   app, copyCodeToClipboard, copyView, courseId, signUp,
   handleSignUpSave, goTo, autoresponderOptions, autoResponderListsOptions, onChange, updateCourse,
}) => {
   const history = useHistory();
   const location = history.location.hash;

   const { data: course, loading, setData: setCourse } = useApiQuery(getCheckoutCourse, [{ id: courseId }]);
   const { data: templates, loading: templatesLoading, setData: setTemplates } = useApiQuery(
      getCheckoutLandings, [{ courseId }]);
   const { data: customFieldsData, loading: loadingCustomFields, setData: setCustomFields } = useApiQuery(
      getCustomFields, [{ courseId }]);
   const [makeActiveLandingTemplate, { loading: activeLoading }] = useSubmitForm(makeActiveLanding, {
      successMessage: 'Checkout template has been changed.',
   });

   const [activeHeader, setActiveHeader] = useState('template');
   const activeTemplate = templates && templates.filter((template) => template.is_active === 1)[0];

   const setActiveHeaderFunc = (value) => {
      setActiveHeader(value);
      history.replace(`${ history.location.pathname }#checkout/advanced-settings`);
      if (value === 'settings') {
         history.replace(`${ history.location.pathname }#checkout/advanced-settings`);
      } else if (value === 'tracking') {
         history.replace(`${ history.location.pathname }#checkout/tracking`);
      } else if (value === 'template') {
         history.replace(`${ history.location.pathname }#checkout/template`);
      }
   };

   useEffect(() => {
      if (history.location.hash === '#checkout/tracking') {
         setActiveHeader('tracking');
      } else if (history.location.hash === '#checkout/advanced-settings') {
         setActiveHeader('settings');
      } else if (history.location.hash === '#checkout/template') {
         setActiveHeader('template');
      }
   }, [location]);

   return (
      <CheckoutLoading isLoading={ loading || templatesLoading || activeLoading || loadingCustomFields } className='checkout-overflow'>
         {!(loading || templatesLoading || activeLoading) && (
            <div className='checkout-templates'>
               <div className='checkout-main-container'>
                  <div className='checkout-container'>
                     {(location === '#checkout/template' || location === '#checkout' || location === '#checkout/advanced-settings' || location === '#checkout/tracking') && (
                        <Header
                           activeHeader={ activeHeader }
                           setActiveHeader={ setActiveHeaderFunc }
                        />
                     )}
                     {activeHeader === 'settings' && (
                        <div className='advanced-settings'>
                           <AdvancedSettings
                              activeHeader={ activeHeader }
                              course={ course }
                              attachTag={ attachTag }
                              detachTag={ detachTag }
                              handleInputChange={ handleInputChange }
                              settingsData={ settingsData }
                              handleSettingsSave={ handleSettingsSave }
                              app={ app }
                              copyCodeToClipboard={ copyCodeToClipboard }
                              copyView={ copyView }
                              setCourse={ setCourse }
                              signUp={ signUp }
                              onChange={ onChange }
                              handleSignUpSave={ () => handleSignUpSave('advanced') }
                              autoresponderOptions={ autoresponderOptions }
                              autoResponderListsOptions={ autoResponderListsOptions }
                              goTo={ goTo }
                              customFieldsData={ customFieldsData }
                              setCustomFields={ setCustomFields }
                           />
                        </div>
                     )}
                     {activeHeader === 'tracking' && (
                        <Tracking
                           activeHeader={ activeHeader }
                           course={ course }
                           setCourse={ setCourse }
                        />
                     )}
                     {activeHeader === 'template' && (
                        <TabSwitch hasParent={ true } initialTab='template'>
                           {(location === '#checkout/template' || location === '#checkout' || location === '#checkout/advanced-settings' || location === '#checkout/tracking') && (
                              <TabSwitch.Tab>
                                 <CheckoutTemplates
                                    activeHeader={ activeHeader }
                                    setActiveHeader={ setActiveHeader }
                                    location={ location }
                                    activeTemplate={ activeTemplate }
                                    courseId={ courseId }
                                    templates={ templates }
                                    setTemplates={ setTemplates }
                                    makeActiveLandingTemplate={ makeActiveLandingTemplate }
                                 />
                              </TabSwitch.Tab>
                           )}
                           {(location === '#checkout/template1' || location === '#checkout/template2' || location === '#checkout/template3')
                            && (
                               <CheckoutTemplate
                                  updateCourseNew={ updateCourse }
                                  changeCourse={ setCourse }
                                  course={ course }
                                  location={ location }
                                  landingId={ activeTemplate.id }
                                  courseId={ courseId }
                                  customFieldsData={ customFieldsData }
                               />
                            )}
                        </TabSwitch>
                     )}
                  </div>
               </div>
            </div>
         )}
      </CheckoutLoading>
   );
};

Checkout.propTypes = {
   attachTag: PropTypes.func,
   detachTag: PropTypes.func,
   handleInputChange: PropTypes.func,
   handleSettingsSave: PropTypes.func,
   settingsData: PropTypes.any,
   app: PropTypes.object,
   copyCodeToClipboard: PropTypes.func,
   copyView: PropTypes.string,
   courseId: PropTypes.string,
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   goTo: PropTypes.func,
   autoresponderOptions: PropTypes.array,
   autoResponderListsOptions: PropTypes.array,
   onChange: PropTypes.func,
   updateCourse: PropTypes.func,
};


export default Checkout;
