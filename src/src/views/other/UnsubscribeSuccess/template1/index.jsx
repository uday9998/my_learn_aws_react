import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import UnsubscribeTemplateOneTop from './Components/TemplateTop';
import './index.scss';
import UnsubscribeTemplateOneBottom from './Components/TemplateBottom';


const UnsubscribeSuccessTemplateOne = ({
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
               : generalProps.background || siteInfo.active_school_room.school_bg_color,
         } }
      >
         <div className='signin__template__content'>
            <UnsubscribeTemplateOneTop
               googleLogin={ googleLogin }
               generalProps={ generalProps }
               onSubmit={ onSubmit }
               previewMode={ previewMode }
            />
            {(generalProps.other_page_section
             && generalProps.other_page_section.props.contactSection && previewMode) || generalProps.contactSection ? (
                <UnsubscribeTemplateOneBottom generalProps={ generalProps } previewMode={ previewMode } />
               ) : null}
         </div>
      </div>
   );
};

UnsubscribeSuccessTemplateOne.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default UnsubscribeSuccessTemplateOne;
