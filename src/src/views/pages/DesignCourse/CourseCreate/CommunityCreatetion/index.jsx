import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import img1 from 'assets/images/Program/program-image-5.png';
import img2 from 'assets/images/Program/program-image-6.png';
import './index.scss';
import UploadImage from 'components/modules/uploadImage';
import Switch from 'components/elements/switchNew';
import Info from 'components/elements/messages/info';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import MultiSelect from 'components/elements/multiSelectNew';
import GeneratorModal from 'components/elements/GeneratorModal';
import PlanPricingLeft from 'views/pages/DesignCourse/CourseCreate/PricingLeft';
import PlanCreateRight from 'views/pages/plansNew/create/components/PlanCreateRight';
import communityLogo from 'assets/images/community/communityLogo.png';

const CommunityCreatetion = ({
   step, setStep, onCreate, options, integrations, goToIntegrations,
   errorMessages, clearErrorMessages, removeErrorMessage, addTemporaryErrorMessage,
}) => {
   const [data, setData] = useState({
      name: '',
      private_community: false,
      allow_create_room: false,
      picture_src: '',
      allow_global_branding: false,
      pricings: [
         {
            currency: 'USD',
            name: '',
            price: '',
            'pricing_type': 0,
         },
      ],
   });

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
            type: '2',
         });
      } else {
         onCreate({
            ...data,
            type: '2',
         });
      }
   };
   return (
      <div className='community__createation'>
         {step === 1 && (
            <CourseCreatetionForm
               title='Community Information'
               imgUrl={ img1 }
               placeholder='Name Your Community'
               input={ {
                  name: 'name',
                  label: 'Community Name',
                  value: data.name,
                  withIcon: true,
                  iconName: 'Generator',
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
                  errorMessages: errorMessages.name,
               } }
               area={ {
                  name: 'description',
                  label: 'Community Description',
                  value: data.description,
                  placeholder: 'Describe What Your Community Is About',
                  withIcon: true,
                  iconName: 'Generator',
                  setOpenModal: (name, value) => setOpenModal({ name, value, isOpen: true }),
                  IToolTipTextNew: 'AI Generator',
                  onChange: handleInputChange,
                  errorMessages: errorMessages.description,
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(2, data.name, 'isCommunity'),
               } }
            />
         )}
         {step === 2 && (
            <CourseCreatetionForm
               title='Community Image'
               subtitle='Upload a cover image to visually represent your community.'
               imgUrl={ img2 }
               right={ (
                  <div>
                     <UploadImage
                        label='Community Cover'
                        name='picture_src'
                        onChange={ handleInputChange }
                        isOptional={ true }
                        src={ data.picture_src }
                        otherProps={ {
                           cropRatio: '1920x1080',
                           generalButtonProps: {
                              isIconRight: true,
                              iconName: 'DefaultUpload',
                           },
                        } }
                        size='full'
                        recomendation='1920x1080'
                        cropRatio='1920x1080'
                        isImageUpload={ true }
                     />
                     <div className='community__logo'>
                        <UploadImage
                           label='Add Logo'
                           isOptional={ true }
                           src={ data.logo || communityLogo }
                           onChange={ handleInputChange }
                           otherProps={ {
                              cropRatio: 'free',
                              generalButtonProps: {
                                 isIconRight: true,
                                 iconName: 'DefaultUpload',
                              },
                           } }
                           recomendation='60x60'
                           cropRatio='free'
                           isImageUpload={ true }
                           name='logo' />
                     </div>
                  </div>
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(1),
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(3),
               } }
            />
         )}
         {step === 3 && (
            <CourseCreatetionForm
               title='Community Settings'
               imgUrl={ img2 }
               right={ (
                  <div className='community__settings'>
                     {/* <Switch
                        label='Make this a private community'
                        value={ data.private_community }
                        positionText='left'
                        size='medium'
                        onChange={ (value) => handleInputChange('private_community', value) }
                     /> */}
                     <Switch
                        label='Allow members to create rooms'
                        value={ data.allow_create_room }
                        positionText='left'
                        size='medium'
                        onChange={ (value) => handleInputChange('allow_create_room', value) }
                     />
                     <div className='community__settings__mulit'>
                        <Text
                           inner='Combine communities with specific products (Optional)'
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <MultiSelect
                           values={ data.course_id || [] }
                           options={ options }
                           placeholder='Select product'
                           onRemove={ (value) => handleInputChange('course_id', (data.course_id.filter((classId) => classId !== value))) }
                           onAdd={ (value) => handleInputChange('course_id', ([...(data.course_id || []), value])) }
                        />
                     </div>
                     {/* <Switch
                        label='Apply a global branding to this community'
                        value={ data.allow_global_branding }
                        positionText='left'
                        size='medium'
                        onChange={ (value) => handleInputChange('allow_global_branding', value) }
                     /> */}
                     {/* <Info isHaveCancel={ false } title='The instructions depend on which settings the user chooses. And just explain in text format what happens if the user continues to work with these settings.' /> */}
                  </div>
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(2),
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(4),
               } }
            />
         )}
         {step === 4 && (
            <CourseCreatetionForm
               title='Community Price'
               subtitle='Choose payment type: One Time Payment, Subscription, Free. You can also create plans if needed'
               imgUrl={ img2 }
               view={ (
                  <PlanCreateRight
                     data={ {
                        ...data,
                        picture_src: data.picture_src || img2,
                     } }
                     selectedProduct={ true }
                     isMobile={ false }
                  />
               ) }
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
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(3),
               } }
               skipButton={ {
                  text: 'Skip for Now',
                  onClick: () => handleSave(true),
               } }
               primaryButton={ {
                  text: 'Create Community',
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

CommunityCreatetion.propTypes = {
   step: PropTypes.number,
   onCreate: PropTypes.func,
   options: PropTypes.array,
   setStep: PropTypes.func,
   integrations: PropTypes.object,
   goToIntegrations: PropTypes.func,
   errorMessages: PropTypes.object,
   clearErrorMessages: PropTypes.func,
   removeErrorMessage: PropTypes.func,
   addTemporaryErrorMessage: PropTypes.func,
};

export default CommunityCreatetion;
