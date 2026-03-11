import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';
import { copyToClipBoard } from 'utils/copy';

const ForgetPasswordTemplateBottom = ({ generalProps }) => {
   const {
      textColor, secondaryTextColor,
   } = generalProps;
   return (
      <div className='sign__template__bottom'>
         <Text
            inner='Need Help? Contact Support'
            type={ types.medium }
            size={ sizes.medium }
            style={ { color: secondaryTextColor } }
         />
         <div className='sign__template__bottom__contacts'>
            <TextWithIcon
               inner='1-844-542-5275'
               type={ types.regularDefault }
               size={ sizes.small }
               generalStyles={ { cursor: 'pointer' } }
               iconName='OtherPagePhoneS'
               style={ { color: textColor } }
               iconColor={ textColor }
               onClick={ () => copyToClipBoard('1-844-542-5275') }
            />
            <TextWithIcon
               inner='miestro@support.com'
               iconName='OtherPageMailS'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: textColor } }
               iconColor={ textColor }
               generalStyles={ { cursor: 'pointer' } }
               onClick={ () => copyToClipBoard('miestro@support.com') }
            />
         </div>
      </div>
   );
};

ForgetPasswordTemplateBottom.propTypes = {
   generalProps: PropTypes.object,
};

export default ForgetPasswordTemplateBottom;
