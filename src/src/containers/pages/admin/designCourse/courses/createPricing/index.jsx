import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanPricingLeft from 'views/pages/DesignCourse/CourseCreate/PricingLeft';
// import PlanCreateRight from 'views/pages/plansNew/create/components/PlanCreateRight';
// import img2 from 'assets/images/Program/program-image-2.png';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Router from 'routes/router';
import AdminContainer from 'views/layout/AdminContainer';
import { programProgressSelector, generatedArraySelector, generateInprogressSelector } from 'state/modules/designCourse/create/selectors';
import { createProgramOperation } from 'state/modules/designCourse/create/operations';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { settingsGetOperation } from 'state/modules/settings/operations';
import { integrationSettingsSelector } from 'state/modules/settings/selectors';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeaderMobile from 'containers/modules/siteheader/index.mob';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import CourseCreateHeader from 'views/pages/DesignCourse/CourseCreate/CourseCreateHeader';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { createPlanNew, updateCoursePlanPricing } from 'api/AuthApi';
import './index.scss';

const CreateCourseContainer = ({
   goTo, isProgress, getIntegrations, integrations, id, type, communityId,
}) => {
   const [handleCreatePlanNew] = useSubmitForm(createPlanNew, {
      successMessage: '',
   });

   const [hanldeUpdatePlanPricing] = useSubmitForm(updateCoursePlanPricing, {
      successMessage: '',
   });

   const [data, setData] = useState({
      is_course: true,
      course_id: id,
      pricings: [
         {
            currency: 'USD',
            name: '',
            price: '',
            'pricing_type': 0,
         },
      ],
   });
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

   const handleCreate = () => {
      handleCreatePlanNew(
         data,
         (res) => {
            if (res && res.id && res.pricings[0] && res.pricings[0].pricing_type !== 0
               && res.pricings[0].payment_method) {
               const newData = {
                  ...data,
                  pricings: res.pricings,
                  setting: {
                     'taxes': 0,
                     'send_email': 0,
                     'email_subject': null,
                     'email_text': '<p>Hi {{member}},</p><p>Thank you for your interest in {{offer}}. To access the content login to your account by clicking the link below:</p><p><a href="{{site_login_url}}">Login to Your Account</a></p><p>Let us know if you need anything as you get started by emailing us at:</p>',
                     'thank_you_page_active': 0,
                     'thank_you_page_id': 2,
                     'thank_you_page_url': null,
                  },
               };
               hanldeUpdatePlanPricing({ planId: res.id, data: newData }, () => {
                  if (type === 'community' && communityId) {
                     goTo(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: communityId }));
                  } else {
                     goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }));
                  }
               });
            } else if (type === 'community' && communityId) {
               goTo(Router.route('ADMIN_COMMUNITY').getCompiledPath({ id: communityId }));
            } else {
               goTo(Router.route('ADMIN_COURSES_EDIT').getCompiledPath({ id }));
            }
         },
         addErrorsFromQuery
      );
   };


   useEffect(() => {
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
            {isProgress && (
               <LoaderSpinner />
            )}
            <div className='course__pricing__create'>
               <CourseCreateHeader
                  title='Pricing'
                  // isDesingedStep={ step !== 1 }
                  //  isFinishCommunityStep={ step === 4 }
                  goBack={ goBack }
               />
               <CourseCreatetionForm
                  title='Create Pricing'
                  subtitle='Choose payment type: One Time Payment, Subscription, Free. You can also create plans if needed'
                  // imgUrl={ img2 }
                  // view={ (
                  //    <PlanCreateRight
                  //       data={ {
                  //          ...data,
                  //          picture_src: data.thumbnail_image || img2,
                  //       } }
                  //       selectedProduct={ true }
                  //       isMobile={ false }
                  //    />
                  // ) }
                  right={ (
                     <div>
                        <PlanPricingLeft
                           data={ data }
                           setData={ setData }
                           integrations={ integrations }
                           goToIntegrations={ goToIntegrations }
                           errorMessages={ errorMessages }
                           clearErrorMessages={ clearErrorMessages }
                           removeErrorMessage={ removeErrorMessage }
                           addTemporaryErrorMessage={ addTemporaryErrorMessage }
                        />
                     </div>
                  ) }
                  primaryButton={ {
                     text: 'Create Pricing',
                     onClick: () => handleCreate(),
                  } }
               />
            </div>
         </AdminContainer>
      </>
   );
};

CreateCourseContainer.propTypes = {
   goTo: PropTypes.func,
   isProgress: PropTypes.bool,
   getIntegrations: PropTypes.func,
   integrations: PropTypes.object,
   id: PropTypes.number,
   type: PropTypes.string,
   communityId: PropTypes.number,
};

const mapStateToProps = (state) => {
   return {
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
      onSubmit: (data, callback) => {
         dispatch(createProgramOperation(data, callback));
      },
      getIntegrations: () => {
         dispatch(settingsGetOperation('integrations'));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseContainer);
