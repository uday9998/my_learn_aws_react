import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import classNames from 'classnames';
import ToggleEditor from '../SchoolRoomTheme/Menu/ToggleEditor';

const signTemplateOne = React.lazy(() => import('views/other/SignIn/template1'));
const signTemplateSecond = React.lazy(() => import('views/other/SignIn/template2'));
const signUpTemplateOne = React.lazy(() => import('views/other/Signup/template1'));
const signUpTemplateSecond = React.lazy(() => import('views/other/Signup/template2'));
const NotFoundTemplate = React.lazy(() => import('views/other/NotFound'));
const ThankYouTemplateOne = React.lazy(() => import('views/other/ThankYou'));
const ThankYouTemplate2 = React.lazy(() => import('views/other/ThankYou/template2'));
const UnsubscribeTemplateOne = React.lazy(() => import('views/other/Unsubscribe/template1'));
const UnsubscribeSuccessTemplateOne = React.lazy(() => import('views/other/UnsubscribeSuccess/template1'));

const signTemplates = {
   template1: signTemplateOne,
   template2: signTemplateSecond,
};

const signUpTemplates = {
   template1: signUpTemplateOne,
   template2: signUpTemplateSecond,
};

const ThankYouTemplates = {
   template1: ThankYouTemplateOne,
   template2: ThankYouTemplate2,
};

const UnsubscribeTemplates = {
   template1: UnsubscribeTemplateOne,
};

const UnsubscribeSuccessTemplates = {
   template1: UnsubscribeSuccessTemplateOne,
};

export const getPageByType = (type, templateName) => {
   switch (type) {
      case 'sign_in':
         return signTemplates[templateName];
      case 'sign_up':
         return signUpTemplates[templateName];
      case 'thank_you':
         return ThankYouTemplates[templateName];
      case 'unsubscribe':
         return UnsubscribeTemplates[templateName];
      case 'unsubscribe_success':
         return UnsubscribeSuccessTemplates[templateName];
      default:
         return NotFoundTemplate;
   }
};
const OtherPagesEditor = ({
   type, templateName, generalProps, isOpenEditor, setIsOpenEditor,
   selectedMode, 
}) => {
   const Component = getPageByType(type, templateName);

   return (
      <>
         <ToggleEditor
            setCloseEditor={ setIsOpenEditor }
            closeEditor={ isOpenEditor }
         />
         <div className={
            classNames({
               'phoneModeOther': selectedMode === 'phone',
               'tabletModeOther': selectedMode === 'tablet',
            })
         }
         >
            <Component generalProps={ generalProps } />
         </div>
      </>
   );
};

OtherPagesEditor.propTypes = {
   type: PropTypes.string,
   templateName: PropTypes.string,
   generalProps: PropTypes.object,
   setIsOpenEditor: PropTypes.func,
   isOpenEditor: PropTypes.bool,
   selectedMode: PropTypes.string,
};

export default OtherPagesEditor;
