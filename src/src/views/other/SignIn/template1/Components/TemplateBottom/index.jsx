import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';


const SignInTemplateOneBottom = ({ generalProps, siteInfo, previewMode }) => {
   const data = React.useContext(OtherPageContext);
   const { editor, changeProp } = data || {};

   return (
      <div className='sign__template__bottom'>
         {/* <Text
            inner='Need Help? Contact Support'
            type={ types.medium }
            size={ sizes.large }
            onClick={ () => window.open('https://support.miestro.com/', '_blank') }
            // style={ { color: secondaryTextColor } }
            style={ { cursor: 'pointer', color: previewMode ? generalProps.other_page_section.props.textColor : generalProps.textColor || (siteInfo.membership.active_school_room.mode === 1 ? '#ffffff' : siteInfo.membership.active_school_room.school_text_color) } }
         /> */}
         <div className='sign__template__bottom__contacts'>
            <TextWithIcon
               inner={ editor ? '' : siteInfo.site_owner_email }
               iconName='OtherPageMailS'
               type={ types.regularDefault }
               size={ sizes.medium }
               // style={ { color: textColor } }
               iconColor={ previewMode ? generalProps.other_page_section.props.textColor
                  : generalProps.textColor || (siteInfo.membership.active_school_room.mode === 1 ? '#ffffff' : siteInfo.membership.active_school_room.school_text_color) }
               iconGap='12px'
               style={ {
                  color: previewMode ? generalProps.other_page_section.props.textColor : generalProps.textColor
                || (siteInfo.membership.active_school_room.mode === 1 ? '#ffffff' : siteInfo.membership.active_school_room.school_text_color),
               } }
               //    onClick={ () => copyToClipBoard(generalProps.emailText || siteInfo.support_email || 'miestro@support.com') }
            />
            {editor && (
               <AffiliateInlineEditor
                  text={ generalProps.emailText || siteInfo.support_email || 'miestro@support.com' }
                  fontSize='18'
                  fontWeight='500'
                  lineHeight='168%'
                  color={ previewMode ? generalProps.other_page_section.props.textColor
                     : generalProps.textColor || (siteInfo.membership.active_school_room.mode === 1 ? '#ffffff' : siteInfo.membership.active_school_room.school_text_color) }
                  onChange={ (e) => {
                     changeProp('emailText', e);
                  } }
               />
            )}
         </div>
      </div>
   );
};

SignInTemplateOneBottom.propTypes = {
   generalProps: PropTypes.object,
   siteInfo: PropTypes.object,
   previewMode: PropTypes.bool,
};

export default SignInTemplateOneBottom;