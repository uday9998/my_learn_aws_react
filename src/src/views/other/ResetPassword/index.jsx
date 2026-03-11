import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import ResetPasswordTemplateTop from './Components/TemplateTop';
import './index.scss';

// import ResetPasswordTemplateBottom from './Components/TemplateBottom';

const ResetPasswordTemplate = ({ generalProps, onSubmit, previewMode }) => {
   const siteInfo = useSelector(siteInfoSelector);
   return (
      <div
         className='signin__template'
         style={ generalProps.backgroundImage ? {
            backgroundImage: `url(${ generalProps.backgroundImage })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
         } : {
            backgroundColor: generalProps.background || siteInfo.active_school_room.school_bg_color,
         } }
      >
         <div className='signin__template__content'>
            <ResetPasswordTemplateTop generalProps={ generalProps } onSubmit={ onSubmit } />
            {/* {generalProps.contactSection && (
               <ResetPasswordTemplateBottom generalProps={ generalProps } />
            )} */}
            <Text
               inner='Need Help? Contact Support'
               style={ { textAlign: 'center', cursor: 'pointer', color: previewMode ? generalProps.other_page_section.props.textColor : generalProps.textColor || siteInfo.active_school_room.school_text_color } }
               type={ types.regular148 }
               size={ sizes.medium }
            />
         </div>
      </div>
   );
};

ResetPasswordTemplate.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default ResetPasswordTemplate;
