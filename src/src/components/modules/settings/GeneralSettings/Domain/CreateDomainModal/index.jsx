/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import QueryParams from 'utils/QueryParams';
import Text, { TextWithIcon, TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import step1Image from 'assets/images/settings/step1.png';
import step2Image from 'assets/images/settings/step2.png';
import step3Image from 'assets/images/settings/step3.png';
import starImage from 'assets/images/settings/star.png';

const CreateDomainModal = ({
   setIsModalOpen, createDomain, isHidenGotIt,
}) => {
   const [step, setStep] = useState(+QueryParams.get('create-domain-step') || 1);

   // useEffect(() => {
   //    QueryParams.setQueryParam('create-domain-step', step);
   //    return () => {
   //       QueryParams.deletQueryParam();
   //    };
   // }, [step]);

   const handleNext = (currentStep) => {
      const nextStep = currentStep + 1;
      setStep(nextStep);
   };

   const Content = {
      1: {
         component: Step1,
         props: {
            handleCancel: () => setIsModalOpen(false),
            handleNext,
         },
      },
      2: {
         component: Step2,
         props: {
            handleCancel: () => setIsModalOpen(false),
            handleNext,
         },
      },
      3: {
         component: Step3,
         props: {
            handleCancel: () => setIsModalOpen(false),
            handleNext,
         },
      },
      4: {
         component: Step4,
         props: {
            handleCancel: () => setIsModalOpen(false),
            createDomain,
            handleNext,
         },
      },
      5: {
         component: Step5,
         props: {
            isHidenGotIt,
            handleClose: () => setIsModalOpen(false),
         },
      },

   };

   return (
      // <Modal
      //    blurColor='rgba(63, 79, 101, 0.6)'
      //    contentBgColor='white'
      //    contentPosition='center'
      //    closeOnClickOutside={ true }
      //    contentWidth='80%'
      //    onClose={ () => setIsModalOpen(false) }
      //    className='createDomain__modal'
      // >
      <div className='createDomain'>
         <div
            className='createDomain__close'
            role='presentation'
            onClick={ () => setIsModalOpen(false) }
         >
            <TextWithIcon
               type={ TextType.regularDefault }
               size={ TextSize.large }
               inner='Create Domain'
            />
         </div>
         <div className='createDomain__header'>
            <div
               className={ classNames({
                  'createDomain__step': true,
                  'createDomain__step_active': step === 1,
               }) }
            >
               {step <= 1 && (
                  <div className='createDomain__step__number'>
                     <Text
                        type={ TextType.regularLarge }
                        size={ TextSize.xsmall }
                        inner='1'
                     />
                  </div>
               )}
               {step > 1 && (
                  <div>
                     <IconNew name='CheckedGreenCircleL' />
                  </div>
               )}
               <div>
                  <Text
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                     inner='Domain Registar'
                  />
               </div>
            </div>
            <div
               className={ classNames({
                  'createDomain__step': true,
                  'createDomain__step_active': step === 2,
               }) }

            >
               {step <= 2 && (
                  <div className='createDomain__step__number'>
                     <Text
                        type={ TextType.regularLarge }
                        size={ TextSize.xsmall }
                        inner='2'
                     />
                  </div>
               )}
               {step > 2 && (
                  <div>
                     <IconNew name='CheckedGreenCircleL' />
                  </div>
               )}
               <div>
                  <Text
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                     inner='DNS Settings'
                  />
               </div>
            </div>
            <div
               className={ classNames({
                  'createDomain__step': true,
                  'createDomain__step_active': step === 3,
               }) }
            >
               {step <= 3 && (
                  <div className='createDomain__step__number'>
                     <Text
                        type={ TextType.regularLarge }
                        size={ TextSize.xsmall }
                        inner='3'
                     />
                  </div>
               )}
               {step > 3 && (
                  <div>
                     <IconNew name='CheckedGreenCircleL' />
                  </div>
               )}
               <div>
                  <Text
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                     inner='Set Name'
                  />
               </div>
            </div>
            <div
               className={ classNames({
                  'createDomain__step': true,
                  'createDomain__step_active': step === 4,
               }) }
            >
               {step <= 4 && (
                  <div className='createDomain__step__number'>
                     <Text
                        type={ TextType.regularLarge }
                        size={ TextSize.xsmall }
                        inner='4'
                     />
                  </div>
               )}
               {step > 4 && (
                  <div>
                     <IconNew name='CheckedGreenCircleL' />
                  </div>
               )}
               <div>
                  <Text
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                     inner='Set Domain Name'
                  />
               </div>
            </div>
            <div
               className={ classNames({
                  'createDomain__step': true,
                  'createDomain__step_active': step === 5,
               }) }
            >
               <div className='createDomain__step__number'>
                  <Text
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                     inner='5'
                  />
               </div>
               <div>
                  <Text
                     type={ TextType.regularLarge }
                     size={ TextSize.xsmall }
                     inner='Time Frame'
                  />
               </div>
            </div>
         </div>
         <div className='createDomain__body'>
            {
               typeof Content[step].component !== 'undefined' && (
                  React.createElement(Content[step].component, { ...Content[step].props })
               )
            }
         </div>
      </div>
      // </Modal>
   );
};


const Step1 = ({ handleNext }) => {
   return (
      <div className='createDomain__step1 m-t-exs'>
         <Text
            type={ TextType.regularLarge }
            size={ TextSize.large }
            inner='Setting Up A Custom Domain'
         />
         <div className='m-t-6'>
            <Text
               type={ TextType.regular160 }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner="Login to your domain name registrar, and find the DNS settings for the domain name you'd like to use"
            />
         </div>
         <div className='m-t-m'>
            <div className='createDomain__image'>
               <img src={ step1Image } alt='step1 images' />
            </div>
         </div>
         <div className='m-t-exl flex align-center domain_btns'>
            <div className='m-r-m'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSize.large }
                  text='Previous'
                  onClick={ () => {} }
                  disabled={ true }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  theme={ btnTheme.primary }
                  text='Next'
                  onClick={ () => handleNext(1) }
               />
            </div>
         </div>
      </div>
   );
};

const Step2 = ({ handleNext }) => {
   return (
      <div className='createDomain__step2 m-t-exs'>
         <Text
            type={ TextType.regularLarge }
            size={ TextSize.large }
            inner='DNS Settings'
         />
         <div className='m-t-6'>
            <Text
               type={ TextType.regular160 }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Edit the DNS settings. Set "A" record by setting "name" of the "A" record to your domain and "value" to "52.37.203.239 and add a new record, select "CNAME record. Type www for the host and enter your domain name as the value.'
            />
         </div>
         <div className='m-t-m'>
            <div className='createDomain__image'>
               <img src={ step2Image } alt='step2 images' />
            </div>
         </div>
         <div className='m-t-exl flex  align-center domain_btns'>
            <div className='m-r-m'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSize.large }
                  text='Previous'
                  onClick={ () => handleNext(0) }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  theme={ btnTheme.primary }
                  text='Next'
                  onClick={ () => handleNext(2) }
               />
            </div>
         </div>
      </div>
   );
};

const Step3 = ({ handleNext }) => {
   return (
      <div className='createDomain__step3 m-t-exs'>
         <Text
            type={ TextType.regularLarge }
            size={ TextSize.large }
            inner='Set Name'
         />
         <div className='m-t-6'>
            <Text
               type={ TextType.regular160 }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Wait a little while. Domain name settings may take several hours to take effect, while the new domain name setting propagates across the internet.'
            />
         </div>
         <div className='m-t-m'>
            <div className='createDomain__image'>
               <img src={ step3Image } alt='step2 images' />
            </div>
         </div>
         <div className='m-t-exl flex  align-center domain_btns'>
            <div className='m-r-m'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSize.large }
                  text='Previous'
                  onClick={ () => handleNext(1) }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  theme={ btnTheme.primary }
                  text='Next'
                  onClick={ () => handleNext(3) }
               />
            </div>
         </div>
      </div>
   );
};

const Step4 = ({ createDomain, handleNext }) => {
   const [domainName, setDomainName] = useState('');

   return (
      <div className='createDomain__step4 m-t-exs'>
         <Text
            type={ TextType.regularLarge }
            size={ TextSize.large }
            inner='Set Domain Name'
         />
         <div className='m-t-6'>
            <Text
               type={ TextType.regular160 }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Set domain on "Your Own Domain" field and save. Example: example.com'
            />
         </div>
         <div className='m-t-m'>
            <div className='createDomain__input'>
               <TextInput
                  label='Domain Name'
                  placeholder='Add Your Domain Name'
                  type='text'
                  name='domain'
                  value={ domainName }
                  onChange={ (name, value) => setDomainName(value) }
               />
            </div>
         </div>
         <div className='m-t-exl flex align-center domain_btns'>
            <div className='m-r-m'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSize.large }
                  text='Previous'
                  onClick={ () => handleNext(2) }
               />
            </div>
            <div>
               <BaseButton
                  size={ btnSize.large }
                  theme={ btnTheme.primary }
                  text='Next'
                  onClick={ () => {
                     createDomain(domainName);
                     handleNext(4);
                  } }
               />
            </div>
         </div>
      </div>
   );
};

const Step5 = ({ handleClose, isHidenGotIt }) => {
   return (
      <div className='createDomain__step5'>
         <div className='createDomain__image'>
            <img src={ starImage } alt='step2 images' />
         </div>
         <div className='m-t-6'>
            <Text
               type={ TextType.regularLarge }
               size={ TextSize.large }
               inner='You’re All Done'
            />
         </div>
         <div className='m-t-6 text-center'>
            <Text
               type={ TextType.regular160 }
               size={ TextSize.small }
               style={ { color: '#727978' } }
               inner='Wait a little while. Domain name settings may take several hours to take effect, while the new domain name setting propagates across the internet. In the meantime, get back to creating awesome courses.'
            />
         </div>
         <div className='w-full m-t-exl flex justify-center align-center'>
            <div>
               <BaseButton
                  size={ btnSize.large120 }
                  theme={ btnTheme.primary }
                  text='Got It'
                  onClick={ isHidenGotIt ? () => { handleClose(); } : () => { window.location.reload(); } }
               />
            </div>
         </div>
      </div>
   );
};

CreateDomainModal.propTypes = {
   setIsModalOpen: PropTypes.any,
   createDomain: PropTypes.func,
   isHidenGotIt: PropTypes.bool,
};

Step1.propTypes = {
   handleNext: PropTypes.func,
};
Step2.propTypes = {
   handleNext: PropTypes.func,
};
Step3.propTypes = {
   handleNext: PropTypes.func,
};
Step4.propTypes = {
   createDomain: PropTypes.func,
   handleNext: PropTypes.func,
};
Step5.propTypes = {
   handleClose: PropTypes.func,
   isHidenGotIt: PropTypes.bool,
};

export default CreateDomainModal;
