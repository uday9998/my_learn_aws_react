import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPES as txtTypes } from 'components/elements/TextNew';
import { copyToClipBoard } from 'utils/copy.js';

const apiUrl = process.env.REACT_APP_MAIN_DOMAIN;


const SiteSettingsPopup = ({ currentSite, handleSiteInputChange }) => {
   return (
      <div className='site__popup__flex'>
         <Input
            placeholder='Type here your portal name'
            label='Portal Name'
            type='text'
            name='name'
            value={ currentSite.name }
            onChange={ (name, value) => handleSiteInputChange(name, value) }
            maxlength='200'
         />
         {currentSite && currentSite.domain && currentSite.is_domain_pointed ? (
            <div className='site__popup__flex__domain'>
               <Input
                  id='subdomain'
                  label='Subdomain'
                  name='subdomain'
                  value={ currentSite.domain }
                  disabled={ true }
                  placeholder='Enter Preferred Subdomain'
               />
               <div className='site__popup__button' role='presentation' onClick={ () => copyToClipBoard(`https://${ currentSite.domain }`) }>
                  <Icon name='copyNew' />
               </div>
            </div>
         ) : (
            <div className='site__popup__flex__domain'>
               <Input
                  id='subdomain'
                  label='Subdomain'
                  name='subdomain'
                  value={ currentSite.subdomain }
                  onChange={ (name, value) => handleSiteInputChange(name, value) }
                  maxlength='80'
                  placeholder='Enter Preferred Subdomain'
               />
               <Text
                  inner={ `.${ apiUrl }` }
                  type={ txtTypes.regularDefault }
                  size={ txtSizes.small }
                  style={ { color: '#727978' } }
               />
               <div className='site__popup__button' role='presentation' onClick={ () => copyToClipBoard(`https://${ currentSite.subdomain }.${ apiUrl }`) }>
                  <Icon name='copyNew' />
               </div>
            </div>
         )}
      </div>
   );
};

SiteSettingsPopup.propTypes = {
   currentSite: PropTypes.object,
   handleSiteInputChange: PropTypes.func,
};

export default SiteSettingsPopup;
