
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import { siteInfoSelector, authUserSelector } from 'state/modules/common/selectors';
import { useSelector } from 'react-redux';

const ThankYouTemplateTop = ({
   generalProps, email, onSubmit, previewMode, onSubmitText,
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
   const authUser = useSelector(authUserSelector);


   return (
      <div className='thank__template__top' style={ { background: previewMode && generalProps.other_page_section.props.cardBackground ? generalProps.other_page_section.props.cardBackground : generalProps.cardBackground || 'var(--mainBg005)' } }>
         {(generalProps.logo || siteInfo.school_logo) ? (
            <img src={ generalProps.logo || siteInfo.school_logo } alt='' />
         ) : (
            <Text
               inner={ siteInfo.title }
               type={ types.mediumSmall }
               size={ sizes.size_28 }
               style={ {
                  color: previewMode
                     ? generalProps.other_page_section.props.textColor
                     : textColor || siteInfo.active_school_room.school_text_color,
               } }
            />
         )}
         <div className='thank_you_icon' />
         <Text
            inner='Thank you for your purchase!'
            type={ types.mediumSmall }
            size={ sizes.size_28 }
            style={ {
               color: previewMode
                  ? generalProps.other_page_section.props.textColor
                  : textColor || siteInfo.active_school_room.school_text_color,
            } }
         />

         <div className='thank__template__top__text'>
            <span style={ { color: previewMode && generalProps.other_page_section.props.secondaryTextColor ? generalProps.other_page_section.props.secondaryTextColor : secondaryTextColor || 'var(--subtitleTextColor060)' } }>
               Your receipt will be sent to <span style={ { color: '#54938B', fontWeight: '900' } }>{ email || authUser.email || 'sample@gmail.com' } </span>
               visit your email for all the details or click the button to start learning
            </span>

         </div>
         <div className='thank__template__top__form'>
            <style>
               {css}
            </style>
            <Button
               text={ onSubmitText || 'Go to Your Portal' }
               className='forget__password__link'
               onClick={ !editor ? () => onSubmit() : () => {} }
               resetBorderColor={ `${ buttonBackground || siteInfo.active_school_room.school_color }` }
               style={ {
                  background: previewMode && generalProps.other_page_section.props.buttonBackground
                     ? generalProps.other_page_section.props.buttonBackground
                     : buttonBackground || siteInfo.active_school_room.school_color,
                  color: previewMode && generalProps.other_page_section.props.buttonColor
                     ? generalProps.other_page_section.props.buttonColor
                     : buttonColor || siteInfo.active_school_room.school_button_color,
                  padding: '27px 16px',
               } }
            />
         </div>
      </div>
   );
};

ThankYouTemplateTop.propTypes = {
   email: PropTypes.string,
   onSubmit: PropTypes.func,
   generalProps: PropTypes.object,
   previewMode: PropTypes.bool,
   onSubmitText: PropTypes.string,
};

export default ThankYouTemplateTop;
