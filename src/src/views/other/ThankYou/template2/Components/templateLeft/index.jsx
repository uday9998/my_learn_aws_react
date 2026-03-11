import React from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import Button from 'components/elements/buttons/BaseButtonNew';

import './index.scss';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';

const TemplateLeft = ({
   generalProps,
   email,
   onSubmit,
}) => {
   const {
      textColor, secondaryTextColor, buttonColor, buttonBackground,
   } = generalProps;

   const data = React.useContext(OtherPageContext);
   const { editor } = data || {};
   const css = `
   .input .input__default__label, .checkBox__label span {
       color: ${ textColor }
    }
`;

   const siteInfo = useSelector(siteInfoSelector);

   return (
      <div
         className='thankyou__template2__left'
         style={ { background: generalProps.cardBackground } }
      >
         <div className='logo__wrapper'>
            {(generalProps.logo || siteInfo.school_logo) ? (
               <img src={ generalProps.logo || siteInfo.school_logo } alt='' />
            ) : (
               <IconNew name='TemplateSecondDefaultLogo' />
            )}
         </div>
         <Text
            inner='Thank You'
            type={ types.mediumSmall }
            size={ sizes.size_28 }
            style={ { marginTop: '60px', color: textColor } }
         />
         <span
            style={ { color: secondaryTextColor } }
            className='thankyou__template2__left__text'
         >

            Your receipt will be sent to <b style={ { color: generalProps.buttonBackground } }> {email || 'test@gmail.com'} </b>
            visit your email for all the details or click the button to start learning
         </span>
         <style>
            {css}
         </style>
         <Button
            text='Go to School Room'
            className='thankyou__template2__left__button'
            onClick={ !editor ? () => onSubmit() : () => {} }
            style={ { background: buttonBackground, color: buttonColor } }
         />
         {
            generalProps.showSocialLinks && (
               <>
                  <span
                     style={ { color: secondaryTextColor } }
                     className='thankyou__template2__left__text'
                  >
                     Tell others about your great purchase and share at:
                  </span>
                  <div
                     className='social__links'
                  >
                     {
                        Boolean(generalProps.facebook) && (
                           <div
                              role='presentation'
                              onClick={ () => window.open(`https://facebook.com/${ generalProps.facebook }`, '_blank') }
                           >
                              <IconNew
                                 name='FaceBookM'
                                 // color='#FFFFFF'
                              />
                           </div>
                        )
                     }
                     {
                        Boolean(generalProps.twitter) && (
                           <div
                              role='presentation'
                              onClick={ () => window.open(`https://twitter.com/${ generalProps.twitter }`, '_blank') }
                           >
                              <IconNew
                                 name='TwitterM'
                                 // color='#FFFFFF'
                              />
                           </div>
                        )
                     }
                     {
                        Boolean(generalProps.instagram) && (
                           <div
                              role='presentation'
                              onClick={ () => window.open(`https://instagram.com/${ generalProps.instagram }`, '_blank') }
                           >
                              <IconNew
                                 name='InstagramMWithColors'
                                 // color='#FFFFFF'
                              />
                           </div>
                        )
                     }
                     {
                        Boolean(generalProps.youtube) && (
                           <div
                              role='presentation'
                              onClick={ () => window.open(`https://youtube.com/${ generalProps.youtube }`, '_blank') }
                           >
                              <IconNew
                                 name='YoutubeM'
                                 // color='#FFFFFF'
                              />
                           </div>
                        )
                     }
                  </div>
               </>
            )
         }
      </div>
   );
};

TemplateLeft.propTypes = {
   email: PropTypes.string,
   onSubmit: PropTypes.func,
   generalProps: PropTypes.object,
};

export default TemplateLeft;
