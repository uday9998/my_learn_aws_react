import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import UnsubscribeTemplateOneTop from './Components/TemplateTop';
import './index.scss';
import UnsubscribeTemplateOneBottom from './Components/TemplateBottom';


const UnsubscribeTemplateOne = ({
   generalProps, onSubmit, googleLogin, match, previewMode,
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
               match={ match }
               previewMode={ previewMode }
            />
            {(generalProps.contactSection
            || (generalProps.other_page_section && generalProps.other_page_section.props.contactSection && previewMode))
               && (
                  <UnsubscribeTemplateOneBottom
                     generalProps={ generalProps }
                     previewMode={ previewMode } />
               )}
         </div>
      </div>
   );
};

UnsubscribeTemplateOne.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
   match: PropTypes.object,
   previewMode: PropTypes.bool,
};

export default UnsubscribeTemplateOne;
