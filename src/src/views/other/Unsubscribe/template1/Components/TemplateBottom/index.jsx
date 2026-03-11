import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
// import { copyToClipBoard } from 'utils/copy';
// import AffiliateInlineEditor from 'views/pages/Affiliate/TemplateEditor/View/InlineEditor';
// import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';

const UnsubscribeTemplateOneBottom = ({ generalProps, previewMode }) => {
   // const data = React.useContext(OtherPageContext);
   // const { editor, changeProp } = data || {};
   const {
      secondaryTextColor,
   } = generalProps;

   const siteInfo = useSelector(siteInfoSelector);

   return (
      <div
         className='sign__template__bottom'
         // onClick={ () => window.open('https://support.miestro.com/', '_blank') }
         role='presentation'
         style={ { cursor: 'pointer' } }
      >
         <Text
            inner='Need Help? Contact Support'
            type={ types.medium }
            size={ sizes.medium }
            style={ { 
               color: previewMode 
                  ? generalProps.other_page_section.props.textColor 
                  : generalProps.textColor || siteInfo.active_school_room.school_text_color, 
            } }
         />
         <div className='sign__template__bottom__contacts'>
            {/* <TextWithIcon
               inner='1-844-542-5275'
               type={ types.regularDefault }
               size={ sizes.small }
               generalStyles={ { cursor: 'pointer' } }
               iconName='OtherPagePhoneS'
               style={ { color: textColor } }
               iconColor={ textColor }
               onClick={ () => copyToClipBoard('1-844-542-5275') }
            /> */}

            {/* <TextWithIcon
               inner={ editor ? '' : (generalProps.emailText || 'miestro@support.com') }
               iconName='OtherPageMailS'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: secondaryTextColor } }
               iconColor={ secondaryTextColor }
               generalStyles={ { cursor: 'pointer' } }
               onClick={ () => copyToClipBoard(generalProps.emailText || 'miestro@support.com') }
            /> */}
            {/* {editor && (
               <AffiliateInlineEditor
                  text={ generalProps.emailText || 'miestro@support.com' }
                  fontSize='16'
                  fontWeight='500'
                  lineHeight='168%'
                  color={ secondaryTextColor }
                  onChange={ (e) => {
                     changeProp('emailText', e);
                  } }
               />
            )} */}
         </div>
      </div>
   );
};

UnsubscribeTemplateOneBottom.propTypes = {
   generalProps: PropTypes.object,
   previewMode: PropTypes.bool,
};

export default UnsubscribeTemplateOneBottom;
