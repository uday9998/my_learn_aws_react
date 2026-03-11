import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import UnsubscribeTemplateOneBottom from 'views/other/Unsubscribe/template1/Components/TemplateBottom';
import IconNew from 'components/elements/iconsSize';

import ThankYouTemplateTop from './Components/TemplateTop';
import './index.scss';
// import ThankYouTemplateBottom from './Components/TemplateBottom';

const ThankYouTemplate = ({
   generalProps, onSubmit, email, previewMode, onSubmitText,
}) => {
   const siteInfo = useSelector(siteInfoSelector);
   const icons = [
      {
         name: 'NewFacebook',
         link: `https://facebook.com/${ generalProps.facebook }`,
         isExist: Boolean(generalProps.facebook),
      },
      {
         name: 'NewTwitter',
         link: `https://twitter.com/${ generalProps.twitter }`,
         isExist: Boolean(generalProps.twitter),
      },
      {
         name: 'NewInstagram',
         link: `https://instagram.com/${ generalProps.instagram }`,
         isExist: Boolean(generalProps.instagram),
      },
      {
         name: 'Youtube',
         link: `https://youtube.com/${ generalProps.youtube }`,
         isExist: Boolean(generalProps.youtube),
      },

   ];

   const data = React.useContext(OtherPageContext);
   const { editor } = data || {};
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
            <ThankYouTemplateTop
               email={ email }
               generalProps={ generalProps }
               onSubmit={ onSubmit }
               siteInfo={ siteInfo }
               previewMode={ previewMode }
               onSubmitText={ onSubmitText }
            />
            {/* {generalProps.contactSection && (
               <ThankYouTemplateBottom generalProps={ generalProps } />
            )} */}
            {generalProps.showSocialLinks && (
               <div className='icons'>
                  <Text
                     inner='Tell others about your great purchase and share at:'
                     type={ types.mediumSmall }
                     size={ sizes.medium }
                     style={ { color: generalProps.secondaryTextColor || 'var(--subtitleTextColor060)', textAlign: 'center' } }
                  />
                  <div className='icons_wrapper'>
                     {
                        icons.map(icon => {
                           return (
                              Boolean(icon.isExist) && (
                                 <div
                                    role='presentation'
                                    onClick={ !editor ? () => window.open(icon.link) : () => {} }
                                 >
                                    <IconNew style={ { cursor: 'pointer' } } name={ icon.name } color={ generalProps.secondaryTextColor || 'var(--subtitleTextColor060)' } />
                                 </div>
                              )
                           );
                        })
                     }
                  </div>
               </div>
            )}
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

// Tell others about your great purchase and share at:

ThankYouTemplate.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   email: PropTypes.string,
   previewMode: PropTypes.bool,
   onSubmitText: PropTypes.string,
};

export default ThankYouTemplate;
