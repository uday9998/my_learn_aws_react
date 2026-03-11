import React, { useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SettingsMenu from 'components/modules/settings/SettingsMenu';
import IntegrationModule from 'components/modules/settings/Integration';


const IntegrationSettings = ({ integrations }) => {

  return (
     <div className='d-integrationSettings w-full flex'>
        <div className='content_left'>
           <div className='m-r-exl'>
              <SettingsMenu active={ 6 } />
           </div>
        </div>
        <div className='content_right'>
           <div className='m-l-exl rightSide'>
              <IntegrationModule
                 integrations={ integrations }
              />
           </div>
        </div>
     </div>
  );
};

export default IntegrationSettings;

IntegrationSettings.propTypes = {
  integrations: PropTypes.array,
};