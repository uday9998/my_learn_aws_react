import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CheckboxCircle from 'components/elements/CheckboxCircle';
import Button from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import SignInPreviewMini from 'assets/images/OtherPages/previewsMini/SignIn.png';
import SignInPreviewMiniTemplate2 from 'assets/images/OtherPages/previewsMini/SignIn_template2.png';
import NotFoundPreviewMini from 'assets/images/OtherPages/previewsMini/NotFound.png';
import SignUpPreviewMini from 'assets/images/OtherPages/previewsMini/SignUp.png';
import SignUpPreviewMiniTemplate2 from 'assets/images/OtherPages/previewsMini/SignUp_template2.png';
import ThankYouPreviewMini from 'assets/images/OtherPages/previewsMini/thankYou.png';
import ThankYouPreviewMiniTemplate2 from 'assets/images/OtherPages/previewsMini/thankYou_template2.png';
import SignInPreviewLarge from 'assets/images/OtherPages/previewsLarge/SignIn.png';
import NotFoundPreviewLarge from 'assets/images/OtherPages/previewsLarge/NotFound.png';
import SignUpPreviewLarge from 'assets/images/OtherPages/previewsLarge/SignUp.png';
import ThankYouPreviewLarge from 'assets/images/OtherPages/previewsLarge/ThankYou.png';
import ThankYouPreviewLargeTemplate2 from 'assets/images/OtherPages/previewsLarge/thankYou_template2.png';
import SignInPreviewLargeTemplate2 from 'assets/images/OtherPages/previewsLarge/SignIn_template2.png';
import SignUpPreviewLargeTemplate2 from 'assets/images/OtherPages/previewsLarge/SignUp_template2.png';
import UnsubscribeImg from 'assets/images/OtherPages/unsubscribeTemplate1Image.png';
import UnsubscribeSuccessImg from 'assets/images/OtherPages/unsubscribeSuccessTemplate1Image.png';
import UnsubscribePreviewLarge from 'assets/images/OtherPages/unsubscribe.png';
import UnsubscribeSuccessPreviewLarge from 'assets/images/OtherPages/unsubscribeSuccess.png';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { revertToDefault } from 'api';
import DeleteModal from 'components/elements/DeleteModal';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';


const LeftBarImages = {
   signIn: {
      template1: SignInPreviewMini,
      template2: SignInPreviewMiniTemplate2,
   },
   '404': {
      template1: NotFoundPreviewMini,
   },
   signUp: {
      template1: SignUpPreviewMini,
      template2: SignUpPreviewMiniTemplate2,
   },
   thankYou: {
      template1: ThankYouPreviewMini,
      template2: ThankYouPreviewMiniTemplate2,
   },
   unsubscribe: {
      template1: UnsubscribeImg,
   },
   unsubscribe_success: {
      template1: UnsubscribeSuccessImg,
   },
};

const RightBarImages = {
   sign_in: {
      template1: SignInPreviewLarge,
      template2: SignInPreviewLargeTemplate2,
   },
   '404': {
      template1: NotFoundPreviewLarge,
   },
   sign_up: {
      template1: SignUpPreviewLarge,
      template2: SignUpPreviewLargeTemplate2,
   },
   thank_you: {
      template1: ThankYouPreviewLarge,
      template2: ThankYouPreviewLargeTemplate2,
   },
   unsubscribe: {
      template1: UnsubscribePreviewLarge,
   },
   unsubscribe_success: {
      template1: UnsubscribeSuccessPreviewLarge,
   },
};

const OtherExplorePageView = ({
   templateData,
   templates,
   templateTypeName,
   isMobile,
   onApplyTemplate,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [revertDefault] = useSubmitForm(revertToDefault, {
      successMessage: 'Revert to default',
   });
   const [selected, setSelected] = React.useState(templates.find(temp => Boolean(temp.is_active)));
   const history = useHistory();

   const onEdit = (id) => {
      history.push(`/admin/other-page/edit/${ id }`);
   };
   const templateNames = {
      template1: 'Triump',
      template2: 'Legacy',
   };
   const getImageSrc = (type, templateName) => {
      switch (type) {
         case 'sign_in':
            return LeftBarImages.signIn[templateName];
         case 'sign_up':
            return LeftBarImages.signUp[templateName];
         case 'thank_you':
            return LeftBarImages.thankYou[templateName];
         case 'unsubscribe':
            return LeftBarImages.unsubscribe[templateName];
         case 'unsubscribe_success':
            return LeftBarImages.unsubscribe_success[templateName];
         default:
            return LeftBarImages['404'][templateName];
      }
   };
   const urlByType = {
      404: '/not-found',
      'sign_in': '/admin/other-pages/preview/sign_in',
      'sign_up': '/admin/other-pages/preview/sign_up',
      'thank_you': '/admin/thank-you/preview',
      'unsubscribe': '/admin/other-pages/preview/unsubscribe',
      'unsubscribe_success': '/admin/other-pages/preview/unsubscribe_success',
   };

   const handleToggleModal = () => {
      setIsOpenModal(prevState => !prevState);
   };

   const handleRevertToDefault = () => {
      revertDefault(selected.id);
      handleToggleModal();
   };

   const handleEditTemplate = (selected) => {
      if (!Array.isArray(permissions)) {
         if (permissions.customize_other_pages[selected.page_type]) {
            onEdit(selected.id);
         } else {
            setPopupTitle(selected.page_type);
            setShowPopup(true);
         }
      } else {
         onEdit(selected.id);
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='other__explore__page'>
         {
            showPopup && createPortal(<PricingPopup 
               handleClosePopup={ handleClosePopup } 
               popupTitle={ popupTitle }
            />, document.body)
         }
         {
            isOpenModal && (
               <DeleteModal
                  title='This action will reset all settings to their original state. Confirm?'
                  onDelete={ handleRevertToDefault }
                  deleteText='Confirm'
                  isDeleteButton={ false }
                  maxWidth={ 450 }
                  onCancel={ handleToggleModal }
               />
            )
         }
         <TextWithIcon
            inner={ templateTypeName }
            iconProps={ { onClick: () => history.goBack(), style: { cursor: 'pointer' } } }
            type={ types.regularDefaultSmall }
            size={ isMobile ? sizes.xxlarge : sizes.size_28 }
            tooltipHelper={ templateTypeName === '404 Page'
               ? "If someone tries to access a page on your site that doesn't exist, they'll land on your custom 404 page instead. Customize this page here to match your branding." : '' }
         />
         <div className='other__explore__page__content'>
            <div className='left'>
               <div className='left__top'>
                  <Text
                     inner='Templates'
                     LargeText={ templates.length }
                     type={ types.regular160 }
                     size={ sizes.xlarge }
                  />
                  {
                     isMobile && (
                        <div className='left__top__actions'>
                           <div
                              className='right__top__actions__button'
                              role='presentation'
                              onClick={ () => window.open(urlByType[templateData.page_type], '_blank') }
                           >
                              <IconNew name='CheckoutPreviewM' />
                           </div>
                           <Button
                              text='Applied'
                              disabled={ templateData.id === selected.id }
                              onClick={ () => {} }
                           />
                        </div>
                     )
                  }
               </div>
               <div />
               {templates.map((e) => {
                  return (
                     <div className={ `left__item${ e.id === selected.id ? ' left__item__active' : '' }` } role='presentation' onClick={ () => setSelected(e) }>
                        <img src={ getImageSrc(e.page_type, e.other_page_theme_name) } alt='' />
                        <div className='left__item__bottom'>
                           <CheckboxCircle
                              isChecked={ e.id === selected.id }
                              label={ templateNames[e.other_page_theme_name] }
                              onCheck={ () => {} }
                           />
                        </div>
                     </div>
                  );
               })}
            </div>
            {
               !isMobile && (
                  <div className='right'>
                     <div className='right__top'>
                        <Text
                           inner='Preview'
                           type={ types.regular160 }
                           size={ sizes.xlarge }
                        />
                        <div className='right__top__actions'>
                           <div className='right__top__actions__button' role='presentation' onClick={ () => handleEditTemplate(selected) }>
                              <IconNew name='CheckoutEditM' />
                           </div>
                           <div className='right__top__actions__button' role='presentation' onClick={ () => window.open(urlByType[templateData.page_type], '_blank') }>
                              <IconNew name='CheckoutPreviewM' />
                           </div>
                           <Button 
                              text='Revert to default'
                              onClick={ handleToggleModal }
                           />
                           <Button
                              text='Applied'
                              disabled={ templateData.id === selected.id }
                              onClick={ () => onApplyTemplate(selected.id) }
                           />
                        </div>
                     </div>
                     <img src={ RightBarImages[selected.page_type][selected.other_page_theme_name] } alt='' />
                  </div>
               )
            }
         </div>
      </div>
   );
};

OtherExplorePageView.propTypes = {
   templateData: PropTypes.object,
   templates: PropTypes.array,
   templateTypeName: PropTypes.string,
   isMobile: PropTypes.bool,
   onApplyTemplate: PropTypes.func,
};

export default OtherExplorePageView;
