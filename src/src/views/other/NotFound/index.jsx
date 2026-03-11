/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { copyToClipBoard } from 'utils/copy';
import IconNew from 'components/elements/iconsSize';
import { OtherPageContext } from 'containers/pages/admin/otherpages/Edit';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';

const buttonStyles = {
   green: {
      color: '#fff',
      background: '#36796F',
      border: '1px solid #36796F',
   },
   white: {
      color: '#131F1E',
      background: '#FFFFFF',
      border: '1px solid #E7E9E9',
   },
   red: {
      color: '#fff',
      background: '#A61C23',
      border: '1px solid #A61C23',
   },
   black: {
      color: '#fff',
      background: '#131F1E',
      border: '1px solid #131F1E',
   },
   blue: {
      color: '#fff',
      background: '#3060BD',
      border: '1px solid #3060BD',
   },
};

const getButtonStylesByType = (type) => {
   return buttonStyles[type];
};

const getContactColorByType = (type, color) => {
   if (type === 'white') {
      return color;
   }
   return '#fff';
};

const NotFoundTemplate = ({ generalProps }) => {
   const { type } = generalProps;
   const data = React.useContext(OtherPageContext);
   const { editor } = data || {};
   const buttonStyle = getButtonStylesByType(type);

   const siteInfo = useSelector(siteInfoSelector);
   return (
      <div className='other__page__template' style={ { backgroundImage: `url(${ require(`assets/images/OtherPages/NotFoundBackgrounds/background_image_${ type }.png`) })` } }>
         <div className='other__page__template__logo'>
            {(generalProps.logo || siteInfo.school_logo) ? (
               <img src={ generalProps.logo || siteInfo.school_logo } alt='' />
            ) : (
               <Text
                  inner={ siteInfo.title }
                  type={ types.mediumSmall }
                  size={ sizes.size_40 }
                  style={ { color: '#131F1E' } }
               />
            )}
         </div>
         <div className='other__page__template__text'>
            <Text
               inner='Ooops...'
               type={ types.mediumSmall }
               size={ sizes.size_40 }
               style={ { color: '#131F1E' } }
            />
            <Text
               inner="We can't find the page you're looking for."
               type={ types.regular148 }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
         </div>
         <BaseButton
            text='Go to Homepage'
            onClick={ editor ? () => {} : () => window.location.pathname = '/portal/membership' }
            style={ buttonStyle }
         />
         <IconNew name={ `NotFound${ type }Svg` } />
         {/* <div className='other__page__template__contact'>
            <Text
               inner='Need Help? Contact Support'
               type={ types.medium }
               size={ sizes.medium }
               style={ { color: getContactColorByType(type, '#444C4B') } }
            />
            <div className='other__page__template__contact__bottom'>
               <TextWithIcon
                  inner='1-844-542-5275'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  generalStyles={ { cursor: 'pointer' } }
                  iconName='OtherPagePhoneS'
                  style={ { color: getContactColorByType(type, '#444C4B') } }
                  iconColor={ getContactColorByType(type, '#444C4B') }
                  onClick={ () => copyToClipBoard('1-844-542-5275') }
               />
               <TextWithIcon
                  inner='miestro@support.com'
                  iconName='OtherPageMailS'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { color: getContactColorByType(type, '#444C4B') } }
                  iconColor={ getContactColorByType(type, '#444C4B') }
                  generalStyles={ { cursor: 'pointer' } }
                  onClick={ () => copyToClipBoard('miestro@support.com') }
               />
            </div>
         </div> */}
      </div>
   );
};

NotFoundTemplate.propTypes = {
   generalProps: PropTypes.object,
};

export default NotFoundTemplate;
