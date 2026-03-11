import React from 'react';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import PropTypes from 'prop-types';
import SignInTemplateOneTop from './Components/TemplateTop';
import './index.scss';
import SignInTemplateOneBottom from './Components/TemplateBottom';

const SignInTemplateOne = ({
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
            <SignInTemplateOneTop
               googleLogin={ googleLogin }
               generalProps={ generalProps }
               onSubmit={ onSubmit }
               previewMode={ previewMode }
            />
            <a
               href={`mailto:${siteInfo?.support_email || ''}`}
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
                  siteInfo={ siteInfo }
                  previewMode={ previewMode } />
            )}
         </div>
      </div>
   );
};

SignInTemplateOne.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default SignInTemplateOne;