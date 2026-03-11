import React from 'react';
import ForgotPasswordModul from 'components/modules/forgotPassword';
import LogInStudentHeader from 'components/modules/logInStudentHeader';
import PropTypes from 'prop-types';

const ForgotPassword = ({
   hasImage, onChange, email, password, onSubmit, siteInfo,
}) => {
   return (
      <div className='loginPage' style={ siteInfo && siteInfo.school_theme_mode === 'dark' ? { backgroundColor: '#131313', minHeight: '100vh' } : { backgroundColor: '#f8f8f8', minHeight: '100vh' } }>
         <LogInStudentHeader title='Log in' isLogin={ true } siteInfo={ siteInfo } />
         <div style={ { paddingTop: '100px', paddingBottom: '24px' } } className='flex justify-center p-l-exl p-r-exl'>
            <ForgotPasswordModul
               hasImage={ hasImage }
               onChange={ onChange }
               email={ email }
               password={ password }
               onSubmit={ onSubmit }
               siteInfo={ siteInfo }
            />
         </div>
      </div>
   );
};

ForgotPassword.propTypes = {
   hasImage: PropTypes.bool,
   onChange: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   onSubmit: PropTypes.func,
   siteInfo: PropTypes.object,
};

ForgotPassword.defaultProps = {
   hasImage: false,
};

export default ForgotPassword;
