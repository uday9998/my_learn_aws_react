/* eslint-disable no-prototype-builtins */
import React from 'react';
import PropTypes from 'prop-types';
import AccountPersonalPage from 'views/pages/account/accountComponents/AccountPersonal';
import Password from './Password';
import Domain from './Domain';

const GeneralSettingsContent = (props) => {
   const { selectedPage } = props;
   return (
      <>
         {selectedPage === 'password' && <Password { ...props } /> }
         {selectedPage === 'domain' && <Domain { ...props } /> }
         {selectedPage === 'personal' && <AccountPersonalPage { ...props } /> }
      </>
   );
};

GeneralSettingsContent.propTypes = {
   selectedPage: PropTypes.string,
};

export default GeneralSettingsContent;
