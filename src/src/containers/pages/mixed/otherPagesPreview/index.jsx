import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { siteInfoSelector } from 'state/modules/common/selectors';

import SignInTemplateOne from 'views/other/SignIn/template1';
import SignUpTemplateOne from 'views/other/Signup/template1';
import ThankYouTemplate from 'views/other/ThankYou';
import UnsubscribeTemplateOne from 'views/other/Unsubscribe/template1';
import UnsubscribeSuccessTemplateOne from 'views/other/UnsubscribeSuccess/template1';
import NotFoundTemplate from 'views/other/NotFound';

const getComponent = (templateName) => {
   // eslint-disable-next-line default-case
   switch (templateName) {
      case 'sign_in':
         return SignInTemplateOne;
      case 'sign_up':
         return SignUpTemplateOne;
      case 'thank_you':
         return ThankYouTemplate;
      case 'unsubscribe':
         return UnsubscribeTemplateOne;
      case 'unsubscribe_success':
         return UnsubscribeSuccessTemplateOne; 
   }
};

const OtherPagesPreview = () => {
   const siteInfo = useSelector(siteInfoSelector);
   const { location: { pathname } } = useHistory();
   const templateType = pathname.split('/').reverse()[0];
   const Component = getComponent(templateType);
   const templateProps = siteInfo.other_pages['404'].other_page_section.props;

   const filteredGeneralProps = {
      other_page_components: [...siteInfo.other_pages[templateType].other_page_components],
      other_page_section: { ...siteInfo.other_pages[templateType].other_page_section },
   };

   return (
      <>
         {
            templateType === '404' ? (
               <NotFoundTemplate
                  generalProps={ typeof templateProps === 'string' ? JSON.parse(templateProps) : templateProps }
               />
            ) : <Component generalProps={ filteredGeneralProps } previewMode={ true } />
         }
      </>
   );
};

export default OtherPagesPreview;