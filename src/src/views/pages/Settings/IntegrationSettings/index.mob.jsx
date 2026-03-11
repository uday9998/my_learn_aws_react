import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IntegrationModule from 'components/modules/settings/Integration';

const IntegrationSettings = ({ integrations }) => {
   return (
      <div className='mob-integrationSettings w-full'>
         <IntegrationModule
            integrations={ integrations }
         />
      </div>
   );
};

export default IntegrationSettings;

IntegrationSettings.propTypes = {
   integrations: PropTypes.array,
};
