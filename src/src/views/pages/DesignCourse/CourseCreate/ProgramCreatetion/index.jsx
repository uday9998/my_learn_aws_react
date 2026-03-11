import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import img1 from 'assets/images/Program/program-image-1.png';
import img2 from 'assets/images/Program/program-image-2.png';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';
import GeneratorModal from 'components/elements/GeneratorModal';
import PricingLeftMembership from 'views/pages/plansNew/create/components/PricingLeftMembership';

import PlanCreateRight from 'views/pages/plansNew/create/components/PlanCreateRight';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getMembership,
} from 'api';

const ProgramCreatetion = ({
   onCreate, goBack, step, setStep, integrations, goToIntegrations,
   errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage,
}) => {
   const {
      data: membership, loading: loadingMembership,
   } = useApiQuery(getMembership);


   const [data, setData] = useState({
      name: '',
      description: '',
      thumbnail_image: '',
      // pricings: [
      //    {
      //       currency: 'USD',
      //       name: '',
      //       price: '',
      //       'pricing_type': 2,
      //    },
      // ],
   });

   const [planData, setPlanData] = useState({
      name: 'Membership',
      description: '',
      thumbnail_image: '',
      is_membership: true,
      pricings: [
         {
            currency: 'USD',
            name: '',
            price: '',
            number_of_payments: 1,
            'pricing_type': 2,
         },
      ],
   });

   useEffect(() => {
      if (membership && membership.id) {
         setPlanData({ ...planData, ...membership, pricings: membership.pricings });
      }
   }, [loadingMembership]);

   const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);

   const [openModal, setOpenModal] = useState(
      {
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
   const handleSave = (isSkip) => {
      if (isSkip) {
         onCreate({
            ...data,
            pricings: null,
            type: '1',
         });
      } else {
         onCreate({
            ...data,
            type: '1',
         }, planData, membership);
      }
   };

   return (
      <div className='product__createation'>
         {step === 1 && (
            <CourseCreatetionForm
               title='Product Information'
               subtitle='Provide details about your new video membership below to inform and engage your audience.'
               imgUrl={ img1 }
               placeholder='Enter the name of your video membership'
               input={ {
                  name: 'name',
                  label: 'Video Membership Name',
                  withIcon: true,
                  iconName: 'Generator',
                  value: data.name,
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
                  errorMessages: errorMessages.name,
               } }
               area={ {
                  name: 'description',
                  value: data.description,
                  label: 'Video Membership Description',
                  placeholder: 'Describe your video membership here',
                  withIcon: true,
                  iconName: 'Generator',
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
                  errorMessages: errorMessages.description,
               } }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: goBack,
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(2, data.name),
               } }
            />
         )}
         {step === 2 && (
            <CourseCreatetionForm
               title='Video Membership Image'
               subtitle='Upload a cover image to visually represent your video program.'
               imgUrl={ img2 }
               right={ (
                  <div>
                     <UploadImage
                        label='Video Membership Cover'
                        name='thumbnail_image'
                        onChange={ handleInputChange }
                        isOptional={ true }
                        src={ data.thumbnail_image }
                        otherProps={ {
                           cropRatio: '1920x1080',
                           onLoadingChange: (bool) => {
                              setIsLoadingThumbnail(bool);
                           },
                        } }
                        size='full'
                        recomendation='1920x1080'
                        isImageUpload={ true }
                     />
                  </div>
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(1),
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(3),
                  disabled: step === 2 ? isLoadingThumbnail : false,
               } }
            />
         )}
         {step === 3 && (
            <CourseCreatetionForm
               title='Price Of Membership'
               subtitle='Set the price and payment structure of your video membership.'
               imgUrl={ img2 }
               view={ (
                  <PlanCreateRight
                     data={ {
                        ...data,
                        picture_src: data.thumbnail_image || img2,
                        pricings: planData.pricings,
                     } }
                     selectedProduct={ true }
                     isMobile={ false }
                  />
               ) }
               right={ (
                  <div>
                     <PricingLeftMembership
                        data={ data }
                        planData={ planData }
                        setData={ setData }
                        integrations={ integrations }
                        goToIntegrations={ goToIntegrations }
                        membership={ membership }
                        setPlanData={ setPlanData }
                        errorMessages={ errorMessages }
                        clearErrorMessages={ clearErrorMessages }
                        removeErrorMessage={ removeErrorMessage }
                        addTemporaryErrorMessage={ addTemporaryErrorMessage }
                     />
                  </div>
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(2),
               } }
               primaryButton={ {
                  text: 'Create Video Membership',
                  onClick: () => handleSave(),
               } }
            />
         )}
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               data={ data }
               setData={ setData }
            />
         )}
      </div>
   );
};

ProgramCreatetion.propTypes = {
   goBack: PropTypes.func,
   step: PropTypes.number,
   setStep: PropTypes.func,
   onCreate: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default ProgramCreatetion;
