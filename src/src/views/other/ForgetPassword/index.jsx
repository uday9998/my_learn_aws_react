import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';

import ForgetPasswordTemplateTop from './Components/TemplateTop';
import './index.scss';

const ForgetPasswordTemplate = ({ generalProps, onSubmit, previewMode }) => {
   const siteInfo = useSelector(siteInfoSelector);
   
   
   const schoolBgColor = siteInfo.membership?.active_school_room?.school_bg_color?.toLowerCase();
   
   let textColorOverride;
   if (schoolBgColor === '#121212') {
      textColorOverride = '#ffffff'; 
   } else {
      textColorOverride = 'var(--memberTextColor)';
   }
   
   return (
      <div
         className='signin__template'
         style={ generalProps.backgroundImage ? {
            backgroundImage: `url(${ generalProps.backgroundImage })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
         } : {
            backgroundColor: siteInfo.membership?.active_school_room?.school_bg_color || siteInfo.membership?.active_school_room?.school_bg_color,
         } }
      >
         <div className='signin__template__content'>
            <ForgetPasswordTemplateTop generalProps={ generalProps } onSubmit={ onSubmit } />
            <a
               href={`mailto:${siteInfo.support_email || ''}`}
               style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
            >
               <Text
                  inner='Need Help? Contact Support'
                  style={ { textAlign: 'center', cursor: 'pointer', color: textColorOverride } }
                  type={ types.regular148 }
                  size={ sizes.medium }
               />
            </a>
         </div>
         
      </div>
   );
};

ForgetPasswordTemplate.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default ForgetPasswordTemplate;