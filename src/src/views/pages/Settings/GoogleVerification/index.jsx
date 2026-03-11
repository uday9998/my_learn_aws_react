/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Button from 'components/elements/buttons/BaseButtonNew';

const GoogleVerification = ({ siteInfo, updateGoogleVerifyId }) => {
   const [googleId, setGoogleId] = useState(siteInfo.google_site_verify_id);

   return (
      <div className='google__verification'>
         <div className='google__verification__top'>
            <Text
               inner='Google Site Verification'
               type={ types.medium150 }
               size={ sizes.medium }
            />
            <Text
               inner='Verifying your site with Google will give you access to private Google search data. You will also be able to influence how Google Search will crawl your site.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         <div className='google__verification__input'>
            <Input
               type='text'
               label='Google Site Verification ID'
               value={ googleId }
               onChange={ (name, value) => setGoogleId(value) }
               placeholder='Enter verification id'
            />
            <div className='google__verification__input__text'>
                    Visit <a href='https://search.google.com/search-console' target='_blank'>Google Search Console</a> to add and verify your site. <a href='https://support.google.com/webmasters/answer/9008080?hl=en' target='_blank'> Learn more about validating your site</a>
            </div>
         </div>
         <div>
            <Button
               text='Save Changes'
               disabled={ siteInfo.google_site_verify_id === googleId }
               onClick={ () => updateGoogleVerifyId(googleId) }
            />
         </div>
      </div>
   );
};
GoogleVerification.propTypes = {
   siteInfo: PropTypes.object,
   updateGoogleVerifyId: PropTypes.func,
};

export default GoogleVerification;
