import React from 'react';
import PropTypes from 'prop-types';
import Text, {
   TYPES as txtTypes,
   SIZES as txtSizes,
} from 'components/elements/TextNew';
import './index.scss';
import ColorInput from 'components/elements/form/ColorInput';
import CssCustomSelector from 'components/elements/CssCustomSelector';
import UploadImage from 'components/modules/uploadImage';

const NotificationEditLeft = ({ inputs, handleInputChange, goBack }) => {
   return (
      <div className='notification__edit__left'>
         <div
            className='notification__edit__left__cancel'
            role='presentation'
            onClick={ () => goBack() }
         >
            <Text
               inner='Close'
               size={ txtSizes.small }
               type={ txtTypes.regularDefault }
            />
         </div>
         <div className='notification__edit__left__settings'>
            <div className='notification__edit__left__background'>
               <Text
                  inner='Global Settings'
                  size={ txtSizes.small }
                  type={ txtTypes.regularDefault }
                  style={ { color: '#727978' } }
               />
               <ColorInput
                  label='Background Color'
                  isPageBuilder={ true }
                  placeholder='#fff'
                  name='bg_color'
                  value={ inputs.bg_color || '#fff' }
                  onChange={ handleInputChange }
               />
               <ColorInput
                  label='Text Color'
                  isPageBuilder={ true }
                  placeholder='#131f1e'
                  name='color'
                  value={ inputs.color || '#131f1e' }
                  onChange={ handleInputChange }
               />
            </div>
            <CssCustomSelector
               name='padding'
               value={ inputs.padding }
               onChange={ handleInputChange }
               label='Padding'
            />
            <UploadImage
               recomendation='1954 x 56'
               label='Add Image'
               src={ inputs.image }
               onChange={ handleInputChange }
               name='image'
               isImageUpload={ true }
            />
            <div className='notification__edit__left__codes'>
               <Text
                  inner='Email Codes'
                  size={ txtSizes.small }
                  type={ txtTypes.regularDefault }
                  style={ { color: '#727978' } }
               />
               <div className='notification__edit__left__codes__flex'>
                  <Text
                     inner='[%user_email%]'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                  />
                  <Text
                     inner='[%sign_in_url%]'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                  />
                  <Text
                     inner='[%site_title%]'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                  />
                  <Text
                     inner='[%owner_name%]'
                     size={ txtSizes.small }
                     type={ txtTypes.regularDefault }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

NotificationEditLeft.propTypes = {
   inputs: PropTypes.object,
   handleInputChange: PropTypes.func,
   goBack: PropTypes.func,
};

export default NotificationEditLeft;
