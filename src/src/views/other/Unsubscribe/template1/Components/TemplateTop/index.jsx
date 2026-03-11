
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
// import Input from 'components/elements/inputNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import CheckBox from 'components/elements/form/CheckBoxNew';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
// import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
// import { Link } from 'react-router-dom';
// import Router from 'routes/router';
import OtherPageButton from 'views/other/OtherPageButton';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';

const UnsubscribeTemplateOneTop = ({
   generalProps,
   onSubmit,
   previewMode,
}) => {
   const {
      textColor, buttonColor, buttonBackground,
      secondaryButtonColor,
   } = generalProps;

   const data = React.useContext(OtherPageContext);
   const { editor, changeProp } = data || {};

   const siteInfo = useSelector(siteInfoSelector);
   // const authUser = useSelector(authUserSelector);

   return (
      <div className='unsubscribe__template__top' style={ { background: previewMode && generalProps.other_page_section.props.cardBackground ? generalProps.other_page_section.props.cardBackground : generalProps.cardBackground || 'var(--mainBg005)' } }>
         {
            (generalProps.logo || siteInfo.school_logo) ? (
               <img src={ generalProps.logo || siteInfo.school_logo } alt='' />
            ) : (
               <Text
                  inner={ siteInfo.title }
                  size={ sizes.size_32 }
                  style={ {
                     color: previewMode 
                        ? generalProps.other_page_section.props.textColor 
                        : textColor || siteInfo.active_school_room.school_text_color, 
                  } }
               />
            )
         }
         <div className='unsubscribe__template__top__text'>
            {/* <div>
               <Text
                  inner={ editor ? (authUser && authUser.email) : (match && match.params && match.params.email) }
                  type={ types.regular148 }
                  style={ { color: secondaryTextColor } }
                  size={ sizes.medium }
               />
            </div> */}
            <div>
               {/* <Text
                  inner='Unsubscribing from email subscription'
                  type={ types.medium }
                  style={ { color: textColor || siteInfo.active_school_room.school_text_color } }
                  size={ sizes.size_28 }
               /> */}
               {editor ? (
                  <div style={ { width: '100%' } }>
                     <AffiliateInlineEditor
                        text={ generalProps.unsubscribeText || 'Unsubscribing from email subscription' }
                        fontSize='28'
                        fontWeight='500'
                        lineHeight='130%'
                        color={ textColor || siteInfo.active_school_room.school_text_color }
                        onChange={ (e) => {
                           changeProp('unsubscribeText', e);
                        } }
                     />
                  </div>
               ) : (
                  <Text
                     inner={ previewMode ? generalProps.other_page_section.props.unsubscribeText : generalProps.unsubscribeText || 'Unsubscribing from email subscription' }
                     type={ types.mediumSmall }
                     size={ sizes.size_28 }
                     style={ {
                        color: previewMode 
                           ? generalProps.other_page_section.props.textColor 
                           : textColor || siteInfo.active_school_room.school_text_color, 
                     } }
                  />
               )}
            </div>
         </div>
         <div className='unsubscribe__template__top__form'>
            <OtherPageButton
               color={ 
                  previewMode && generalProps.other_page_section.props.buttonColor 
                     ? generalProps.other_page_section.props.buttonColor 
                     : buttonColor || siteInfo.active_school_room.school_button_color
               }
               isEditor={ editor }
               inner={ previewMode ? generalProps.other_page_section.props.buttonText : generalProps.buttonText }
               onChange={ changeProp }
               className='login__button'
               background={ 
                  previewMode && generalProps.other_page_section.props.buttonBackground 
                     ? generalProps.other_page_section.props.buttonBackground 
                     : buttonBackground || siteInfo.active_school_room.school_color 
               }
               onClick={ () => onSubmit() }
            />
            <OtherPageButton
               color={ previewMode ? generalProps.other_page_section.props.secondaryButtonColor : secondaryButtonColor }
               background='transparent'
               isEditor={ editor }
               inner={ 
                  previewMode 
                     ? generalProps.other_page_section.props.secondaryButtonText 
                     : generalProps.secondaryButtonText 
               }
               onChange={ changeProp }
               className='login__button'
               hasBorder={ true }
               onClick={ () => onSubmit(true) }
            />
         </div>
      </div>
   );
};

UnsubscribeTemplateOneTop.propTypes = {
   generalProps: PropTypes.object,
   onSubmit: PropTypes.func,
   previewMode: PropTypes.bool,
};

export default UnsubscribeTemplateOneTop;
