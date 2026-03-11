import React from 'react';
import SettingsMenuModule from 'components/modules/settings/SettingsMenu';
import PropTypes from 'prop-types';

const SettingsMenu = ({ active, memberPermissions }) => {
   return (
      <div className='w-full'>
         <SettingsMenuModule active={ active } memberPermissions={ memberPermissions } />
      </div>
   );
};

SettingsMenu.propTypes = {
   active: PropTypes.number,
   memberPermissions: PropTypes.func,
};

export default SettingsMenu;
