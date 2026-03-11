import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DesignCourseCreate from 'views/pages/DesignCourse/CourseCreate';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import AdminContainer from 'views/layout/AdminContainer';
import { programProgressSelector, generatedArraySelector, generateInprogressSelector } from 'state/modules/designCourse/create/selectors';
import { emptyGeneratedArray } from 'state/modules/designCourse/create/actions';
import { createProgramOperation, generateTitleDescOperation } from 'state/modules/designCourse/create/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { getAllCoursesOperation, settingsGetOperation } from 'state/modules/settings/operations';
import { allCoursesSelector, integrationSettingsSelector } from 'state/modules/settings/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { checkName, updateCoursePlanPricing, createPlanNew } from 'api/AuthApi';

const CreateCourseContainer = ({
   goTo, isProgress, onSubmit, getCourses, allCourses, getIntegrations, integrations,
}) => {
   const [handleCheckName, { loading: loadingCheckName }] = useSubmitForm(checkName, {
      successMessage: '',
   });

   const [createPlan] = useSubmitForm(createPlanNew, {
      successMessage: '',
   });

   const [hanldeUpdatePlanPricing, { loading: loadingPlanUpdate }] = useSubmitForm(updateCoursePlanPricing, {
      successMessage: '',
   });
   const [step, setStep] = useState(1);
   const [selectedLessonType, setSelectedLessonType] = useState(null);
   const [errorMessages, setErrorMessages] = useState({});

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

   const addErrorsFromQuery = ({ data: { errors = {} } }) => {
      addErrorMessages(errors);

      return true;
   };

   const goBack = () => {
      goTo(Router.route('ADMIN_COURSES').getMask());
   };

   const goToIntegrations = () => {
      goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`);
   };

   const setting = {
      'taxes': 0,
      'send_email': 0,
      'email_subject': null,
      'email_text': '<p>Hi {{member}},</p><p>Thank you for your interest in {{offer}}. To access the content login to your account by clicking the link below:</p><p><a href="{{site_login_url}}">Login to Your Account</a></p><p>Let us know if you need anything as you get started by emailing us at:</p>',
      'thank_you_page_active': 0,
      'thank_you_page_id': 2,
      'thank_you_page_url': null,
   };

   // const handleCreatePlan = (planData, res) => {
   //    ;
   //    if (planData && planData.id) {
   //       const newData = {
   //          ...planData,
   //          pricings: res.pricings,
   //          course_id: res.course_id,
   //          is_membership: true,
   //          setting: {
   //             'taxes': 0,
   //             'send_email': 0,
   //             'email_subject': null,
   //             'email_text': '<p>Hi {{member}},</p><p>Thank you for your interest in {{offer}}. To access the content login to your account by clicking the link below:</p><p><a href="{{site_login_url}}">Login to Your Account</a></p><p>Let us know if you need anything as you get started by emailing us at:</p>',
   //             'thank_you_page_active': 0,
   //             'thank_you_page_id': 2,
   //             'thank_you_page_url': null,
   //          },
   //       };
   //       hanldeUpdatePlanPricing({ planId: planData.id, data: newData }, () => {
   //          goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: res.course_id }));
   //       });
   //    } else {
   //       goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: res.course_id }));
   //       // createPlan({ ...planData, course_id: res.course_id }, () => {
   //       //    goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: res.course_id }));
   //       // });
   //    }
   // };

   const handleCreateVideoProgram = (programData, planData, membership) => {
      const callBack = (id, isError, step, res) => {
         if (isError) {
            if (step === 1) {
               setStep(1);
            }
         }
         goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id: res.course_id }));
      };

      let programDataLastVersion = { ...programData, pricings: null, membership_id: planData.id };

      if (!planData.id) {
         programDataLastVersion = { ...programData, membership_name: planData.name, pricings: planData.pricings };
         onSubmit(
            {
               ...programDataLastVersion,
            },
            callBack,
            addErrorsFromQuery
         );
      } else {
         const ids = [];
         membership.pricings.forEach(element => {
            if (element.id) {
               const item = planData.pricings.some((e) => e.id === element.id);
               if (!item) {
                  ids.push(element.id);
               }
            }
         });
         const newData = {
            delete_ids: ids,
            pricings: planData.pricings,
            is_membership: true,
            setting,
         };
         hanldeUpdatePlanPricing(
            { planId: planData.id, data: newData },
            () => {
               onSubmit(
                  {
                     ...programDataLastVersion,
                  },
                  callBack,
                  addErrorsFromQuery
               );
            },
            addErrorsFromQuery
         );
      }
   };


   const handleCreateProgram = (programData, planData, membership) => {
      if (programData.type === '1') {
         handleCreateVideoProgram(programData, planData, membership);
         return;
      }
      const callBack = (id, isError, step, res) => {
         if (isError) {
            if (step === 1) {
               setStep(1);
            }
            return;
         }
         if (res && res.plan_id && res.pricings && !(res.pricings.length === 1
            && res.pricings[0].pricing_type === 0)) {
            const newData = {
               ...programData,
               pricings: res.pricings,
               setting,
            };
            hanldeUpdatePlanPricing({ planId: res.plan_id, data: newData }, () => {
               if (programData.type === '2') {
                  goTo(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id }));
               } else {
                  goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }));
               }
            });
         } else if (programData.type === '2') {
            goTo(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id }));
         } else {
            goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }));
         }
      };

      onSubmit(
         {
            ...programData,
         },
         callBack,
         addErrorsFromQuery
      );
   };

   const handleSetStep = (value, name, courseType) => {
      if (value === 2 && name) {
         handleCheckName(
            { name, courseType },
            () => {
               clearErrorMessages();
               setStep(value);
            },
            addErrorsFromQuery
         );
      } else {
         clearErrorMessages();
         setStep(value);
      }
   };

   useEffect(() => {
      getCourses();
      getIntegrations();
   }, []);

   return (
      <>
         <MobileHeader>
            <SiteHeaderMobile
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <AdminContainer>
            {(isProgress || loadingPlanUpdate || loadingCheckName) && (
               <LoaderSpinner />
            )}
            <DesignCourseCreate
               courses={ allCourses }
               setStep={ handleSetStep }
               step={ step }
               onCreate={ handleCreateProgram }
               setSelectedLessonType={ setSelectedLessonType }
               selectedLessonType={ selectedLessonType }
               goBack={ goBack }
               integrations={ integrations }
               goToIntegrations={ goToIntegrations }
               errorMessages={ errorMessages }
               clearErrorMessages={ clearErrorMessages }
               removeErrorMessage={ removeErrorMessage }
               addTemporaryErrorMessage={ addTemporaryErrorMessage }
            />
         </AdminContainer>
      </>
   );
};

CreateCourseContainer.propTypes = {
   goTo: PropTypes.func,
   isProgress: PropTypes.bool,
   onSubmit: PropTypes.func,
   getCourses: PropTypes.func,
   allCourses: PropTypes.array,
   getIntegrations: PropTypes.func,
   integrations: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      allCourses: allCoursesSelector(state),
      isProgress: programProgressSelector(state),
      generatedArray: generatedArraySelector(state),
      generateInprogress: generateInprogressSelector(state),
      integrations: integrationSettingsSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      goTo: (location) => {
         dispatch(push(location));
      },
      getCourses: () => {
         dispatch(getAllCoursesOperation());
      },
      onSubmit: (data, callback, onError) => {
         dispatch(createProgramOperation(data, callback, onError));
      },
      generateTitleDesc: (name, value) => {
         dispatch(generateTitleDescOperation(name, value));
      },
      emptyGeneratedArrayAction: () => {
         dispatch(emptyGeneratedArray());
      },
      getIntegrations: () => {
         dispatch(settingsGetOperation('integrations'));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseContainer);
