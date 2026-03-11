import React from 'react';
import PropTypes from 'prop-types';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';
import SignInTemplateOneBottom from 'views/other/SignIn/template1/Components/TemplateBottom';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import SignUpTemplateOneTop from './Components/TemplateTop';
import './index.scss';

const SignUpTemplateOne = ({
   generalProps, onSubmit, googleLogin, previewMode,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const customBackground = generalProps.other_page_section?.props.background;
   return (
      <div
         className='signin__template'
         style={ generalProps.backgroundImage ? {
            backgroundImage: `url(${ generalProps.backgroundImage })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
         } : {
            backgroundColor: previewMode && customBackground
               ? customBackground
               : generalProps.background || siteInfo.membership.active_school_room.school_bg_color,
         } }
      >
         <div className='signin__template__content'>
            <SignUpTemplateOneTop
               generalProps={ generalProps }
               onSubmit={ onSubmit }
               googleLogin={ googleLogin }
               previewMode={ previewMode }
            />
            <a
               href={`mailto:${siteInfo.support_email || ''}`}
               style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
            >
               <Text
                  inner='Need Help? Contact Support'
                  style={ { textAlign: 'center', cursor: 'pointer', color: previewMode ? generalProps.other_page_section.props.textColor : generalProps.textColor || (siteInfo.membership.active_school_room.mode === 1 ? '#ffffff' : siteInfo.membership.active_school_room.school_text_color) } }
                  type={ types.regular148 }
                  size={ sizes.large }
               />
            </a>
            {generalProps.contactSection && (
               <SignInTemplateOneBottom
                  generalProps={ generalProps }
                  previewMode={ previewMode }
                  siteInfo={ siteInfo } />
            )}
         </div>
      </div>
   );
};

SignUpTemplateOne.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default SignUpTemplateOne;