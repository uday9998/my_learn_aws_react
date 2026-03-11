import React, { useState } from 'react';
// import SiteHeader from 'views/layout/SiteHeader';
import Text, { TextWithIcon, TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import IconNew from 'components/elements/iconsSize';
import EmailDripDate from 'components/modules/EmailDripDate';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { emailPreview } from 'api/AuthApi';
import Router from 'routes/router';

const EmailsBaseHeader = ({
   title, goTo, handleSave, delEmailModalClick, email,
}) => {
   const [openDateModal, setOpenDateModal] = useState(false);
   const [emailPreviewFunc] = useSubmitForm(emailPreview, {
      successMessage: '',
   });

   const handleEmailPreview = () => {
      emailPreviewFunc(email, (res) => {
         const previewUrl = `${ window.location.origin }/api/v1/emails/preview/0?key=${ res.key }`;
         window.open(previewUrl, '_blank');
      });
   };

   const handleOnSave = (type) => {
      handleSave(type);
   };

   const handleNavigateToSettings = () => {
      window.open(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#emails`, '_blank');
   };

   return (
      <>
         <div className='emails__header'>
            <div className='emails__header__left'>
               <div className='emails__header__left__content'>
                  <div style={ { cursor: 'pointer' } } onClick={ goTo } role='presentation'>
                     <Icon name='ArrowBackHeader' />
                  </div>
                  <Text
                     inner={ title || 'New Broadcast Email' }
                     type={ TextType.regularDefault }
                     size={ TextSize.xlarge }
                  />
               </div>
               <IconNew name='AffiliateDeleteM' onClick={ () => { delEmailModalClick(); } } role='presentation' />
            </div>
            <div className='emails__header__right'>
               {/* <Link to='/admin/reorder-courses'> */}
               <div className='rocket__btn__wrapper'>
                  <TextWithIcon
                     iconName='RocketM'
                     inner='Send Test'
                     type={ TextType.regularDefaultSmallX }
                     size={ TextSize.small }
                     style={ {
                        color: '#24554E',  
                     } }
                     onClick={ () => handleSave('test') }
                     generalStyles={ { cursor: 'pointer' } }
                  />
               </div>
               {
                  email && email.blocks && email.blocks.length > 0 && (
                     <div className='preview__wrapper'>
                        <TextWithIcon
                           iconName='eyeM'
                           inner='Preview'
                           type={ TextType.regularDefaultSmallX }
                           size={ TextSize.small }
                           style={ { color: '#24554E' } }
                           onClick={ handleEmailPreview }
                           generalStyles={ { cursor: 'pointer' } }
                        />
                     </div>
                  )
               }
               <div className='arrowGrey' />
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSizes.xsmall }
                  text='Settings'
                  onClick={ handleNavigateToSettings }
                  style={ {
                     maxHeight: '44px',
                     fontSize: '16px',
                  } }
               />
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSizes.xsmall }
                  text='Send Later'
                  onClick={ () => setOpenDateModal(true) }
                  style={ {
                     maxHeight: '44px',
                     fontSize: '16px',
                  } }
               />
               {/* </Link> */}
               <BaseButton
                  theme={ btnTheme.primary }
                  size={ btnSizes.xsmall }
                  text='Send Now'
                  onClick={ () => handleOnSave('sent') }
                  style={ {
                     maxHeight: '44px',
                     fontSize: '16px',
                  } }
               />
               <div className='arrowGrey' />
               <BaseButton
                  theme={ btnTheme.secondary }
                  size={ btnSizes.xsmall }
                  text='Save'
                  onClick={ () => handleOnSave('draft') }
                  style={ {
                     maxHeight: '44px',
                     fontSize: '16px',
                  } }
               />

            </div>
         </div>
         {openDateModal && (
            <EmailDripDate
               onSave={ (status, data) => {
                  handleSave(status, data);
                  // hideCourseHandle(courseId, 3, data);
                  // setOpenDateModal(false);
               } }
               onCancel={ () => setOpenDateModal(false) }
            />
         )}
      </>
   );
};

EmailsBaseHeader.propTypes = {
   goTo: PropTypes.func,
   title: PropTypes.string,
   handleSave: PropTypes.func,
   delEmailModalClick: PropTypes.func,
   email: PropTypes.object,
};


export default EmailsBaseHeader;
