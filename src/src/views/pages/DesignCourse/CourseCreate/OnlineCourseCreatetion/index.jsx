import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import img1 from 'assets/images/Program/program-image-3.png';
import img2 from 'assets/images/Program/program-image-4.png';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';
import GeneratorModal from 'components/elements/GeneratorModal';
import PlanPricingLeft from 'views/pages/DesignCourse/CourseCreate/PricingLeft';
import PlanCreateRight from 'views/pages/plansNew/create/components/PlanCreateRight';

const OnlineCourseCreatetion = ({
   goBack, setStep, step, onCreate, integrations, goToIntegrations,
   errorMessages = {}, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage,
}) => {
   const [data, setData] = useState({
      name: '',
      description: '',
      thumbnail_image: '',
      pricings: [
         {
            currency: 'USD',
            name: '',
            price: '',
            'pricing_type': 0,
         },
      ],
      requiresIntegration: false, // New flag to track if payment integration is needed
   });

   const [openModal, setOpenModal] = useState({
      name: '',
      value: '',
      isOpen: false,
   });

   const handleInputChange = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setData({
         ...data,
         [name]: value,
      });
   };

   const handlePricingChange = (pricingData) => {
      // Check if the pricing requires payment integration
      const needsIntegration = pricingData.some(pricing => 
         pricing.price > 0 && pricing.pricing_type !== 0 // pricing_type 0 might be "free"
      );

      setData({
         ...data,
         pricings: pricingData,
         requiresIntegration: needsIntegration
      });
   };

   const handleSave = () => {
      // If payment integration is required but not set up, show warning
      if (data.requiresIntegration && (!integrations || Object.keys(integrations).length === 0)) {
         if (addTemporaryErrorMessage) {
            addTemporaryErrorMessage('pricing', 'Warning: No payment integration set up. Course will be created but payments cannot be processed.');
         }
      }

      onCreate({
         ...data,
         type: '0',
      });
   };

   return (
      <div className='onlineCourse__createation'>
         {step === 1 && (
            <CourseCreatetionForm
               title='Product Information'
               imgUrl={img1}
               placeholder='Type Your Course Title Here'
               input={{
                  name: 'name',
                  label: 'Online Course Name',
                  withIcon: true,
                  iconName: 'Generator',
                  value: data.name,
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
                  errorMessages: errorMessages.name,
               }}
               area={{
                  name: 'description',
                  label: 'Online Course Description',
                  placeholder: 'Enter Description of Online Course Here',
                  value: data.description,
                  withIcon: true,
                  iconName: 'Generator',
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
                  errorMessages: errorMessages.description,
               }}
               secondaryButton={{
                  text: 'Previous',
                  onClick: goBack,
               }}
               primaryButton={{
                  text: 'Next Step',
                  onClick: () => setStep(2, data.name, 'isOnlineCourse'),
               }}
            />
         )}
         {step === 2 && (
            <CourseCreatetionForm
               title='Product Image'
               subtitle='Upload a cover image to visually represent your online course.'
               imgUrl={img2}
               input={{
                  name: 'name',
                  label: 'Online Course Name',
                  withIcon: true,
                  iconName: 'Generator',
                  value: data.name,
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
               }}
               right={(
                  <div>
                     <UploadImage
                        label='Online Course Cover'
                        name='thumbnail_image'
                        onChange={handleInputChange}
                        isOptional={true}
                        src={data.thumbnail_image}
                        otherProps={{
                           cropRatio: '1920x1080',
                        }}
                        size='full'
                        recomendation='1920x1080'
                        isImageUpload={true}
                     />
                  </div>
               )}
               secondaryButton={{
                  text: 'Previous',
                  onClick: () => setStep(1),
               }}
               primaryButton={{
                  text: 'Next Step',
                  onClick: () => setStep(3),
               }}
            />
         )}
         {step === 3 && (
            <CourseCreatetionForm
               title='Online Course Price'
               subtitle='Set your course pricing. You can proceed without payment integration - payment processing will be unavailable until integration is set up.'
               imgUrl={img2}
               view={(
                  <PlanCreateRight
                     data={{
                        ...data,
                        picture_src: data.thumbnail_image || img2,
                     }}
                     selectedProduct={true}
                     isMobile={false}
                  />
               )}
               right={(
                  <div>
                     <PlanPricingLeft
                        data={data}
                        setData={setData}
                        integrations={integrations}
                        goToIntegrations={goToIntegrations}
                        errorMessages={errorMessages}
                        clearErrorMessages={clearErrorMessages}
                        removeErrorMessage={removeErrorMessage}
                        addTemporaryErrorMessage={addTemporaryErrorMessage}
                        onPricingChange={handlePricingChange}
                        allowNoIntegration={true} // New prop to indicate integration is optional
                     />
                     {data.requiresIntegration && (!integrations || Object.keys(integrations).length === 0) && (
                        <div className="integration-warning">
                           <p>Warning: No payment integration is set up. You can still create the course, but payment processing will be unavailable until integration is configured.</p>
                           <button 
                              className="setup-integration-btn"
                              onClick={goToIntegrations}
                           >
                              Set Up Payment Integration
                           </button>
                        </div>
                     )}
                  </div>
               )}
               secondaryButton={{
                  text: 'Previous',
                  onClick: () => setStep(2),
               }}
               primaryButton={{
                  text: 'Create Online Course',
                  onClick: handleSave,
               }}
            />
         )}
         {openModal.isOpen && (
            <GeneratorModal
               name={openModal.name}
               value={openModal.value}
               setOpenModal={setOpenModal}
               data={data}
               setData={setData}
            />
         )}
      </div>
   );
};

OnlineCourseCreatetion.propTypes = {
   goBack: PropTypes.func,
   step: PropTypes.number,
   onCreate: PropTypes.func,
   setStep: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default OnlineCourseCreatetion;