import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CertificateSettingsLeft from './Components/CertificateSettingsLeft';
import CertificateSettingsRight from './Components/CertificateSettingsRight';


const CertificateSettingsView = ({ inputs, setInputs, courses }) => {
   return (
      <div className='certificate__settings__view'>
         <CertificateSettingsLeft courses={ courses } setInputs={ setInputs } inputs={ inputs } />
         <div className='certificate__settings__view__line' />
         <CertificateSettingsRight
            data={ inputs }
         />
      </div>
   );
};

CertificateSettingsView.propTypes = {
   setInputs: PropTypes.func,
   inputs: PropTypes.object,
   courses: PropTypes.array,
};

export default CertificateSettingsView;
