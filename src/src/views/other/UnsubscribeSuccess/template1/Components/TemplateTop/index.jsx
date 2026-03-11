
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';

const UnsubscribeTemplateOneTop = ({
   generalProps, previewMode,
}) => {
   const {
      textColor, secondaryTextColor,
   } = generalProps;

   const siteInfo = useSelector(siteInfoSelector);

   const data = React.useContext(OtherPageContext);
   const { editor, changeProp } = data || {};

   return (
      <div className='unsubscribe__succes__template__top' style={ { background: previewMode && generalProps.other_page_section.props.cardBackground ? generalProps.other_page_section.props.cardBackground : generalProps.cardBackground || 'var(--mainBg005)' } }>
         {
            (generalProps.logo || siteInfo.school_logo) ? (
               <img src={ generalProps.logo || siteInfo.school_logo } alt='' />
            ) : (
               <Text
                  inner={ siteInfo.title }
                  type={ types.medium }
                  style={ {
                     color: previewMode 
                        ? generalProps.other_page_section.props.textColor 
                        : textColor || siteInfo.active_school_room.school_text_color, 
                  } }
                  size={ sizes.size_28 }
               />
            )
         }
         <div className='unsubscribe__succes__template__top__text'>
            <div>
               {/* <Text
                  inner='You have successfully unsubscribed'
                  type={ types.medium }
                  style={ { color: textColor || siteInfo.active_school_room.school_text_color } }
                  size={ sizes.size_28 }
               /> */}
               {editor ? (
                  <div style={ { width: '100%' } }>
                     <AffiliateInlineEditor
                        text={ generalProps.unsubscribeSuccessText || 'You have successfully unsubscribed' }
                        fontSize='28'
                        fontWeight='500'
                        lineHeight='130%'
                        color={ textColor || siteInfo.active_school_room.school_text_color }
                        onChange={ (e) => {
                           changeProp('unsubscribeSuccessText', e);
                        } }
                     />
                  </div>
               ) : (
                  <Text
                     inner={ generalProps.unsubscribeSuccessText || 'You have successfully unsubscribed' }
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
            <div>
               {/* <Text
                  inner='Emails will no longer be sent to you.'
                  type={ types.regular148 }
                  style={ { color: secondaryTextColor || 'var(--subtitleTextColor060)' } }
                  size={ sizes.medium }
               /> */}
               {editor ? (
                  <div style={ { width: '100%' } }>
                     <AffiliateInlineEditor
                        text={ generalProps.unsubscribeSuccessEmailText || 'Emails will no longer be sent to you.' }
                        fontSize='16'
                        fontWeight='500'
                        lineHeight='148%'
                        color={ secondaryTextColor || 'var(--subtitleTextColor060)' }
                        onChange={ (e) => {
                           changeProp('unsubscribeSuccessEmailText', e);
                        } }
                     />
                  </div>
               ) : (
                  <Text
                     inner={ generalProps.unsubscribeSuccessEmailText || 'Emails will no longer be sent to you.' }
                     type={ types.regular148 }
                     size={ sizes.medium }
                     style={ {
                        color: previewMode 
                           ? generalProps.other_page_section.props.secondaryTextColor 
                           : secondaryTextColor || 'var(--subtitleTextColor060)', 
                     } }
                  />
               )}
            </div>
         </div>
      </div>
   );
};

UnsubscribeTemplateOneTop.propTypes = {
   generalProps: PropTypes.object,
   previewMode: PropTypes.bool,
};

export default UnsubscribeTemplateOneTop;
