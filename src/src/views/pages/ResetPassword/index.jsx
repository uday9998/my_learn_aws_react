import React from 'react';
import ResetPasswordModul from 'components/modules/resetPassword';
import LogInStudentHeader from 'components/modules/logInStudentHeader';
import PropTypes from 'prop-types';

const ResetPassword = ({
   // eslint-disable-next-line camelcase
   hasImage, onChange, email, password, onSubmit, password_confirmation, siteInfo,
}) => {
   return (
      <div className='loginPage' style={ siteInfo && siteInfo.school_theme_mode === 'dark' ? { backgroundColor: '#131313', minHeight: '100vh' } : { backgroundColor: '#f8f8f8', minHeight: '100vh' } }>
         <LogInStudentHeader title='Log in' isLogin={ true } siteInfo={ siteInfo } />
         <div style={ { paddingTop: '100px', paddingBottom: '24px' } } className='flex justify-center p-l-exl p-r-exl'>
            <ResetPasswordModul
               hasImage={ hasImage }
               onChange={ onChange }
               email={ email }
               password={ password }
               // eslint-disable-next-line camelcase
               password_confirmation={ password_confirmation }
               onSubmit={ onSubmit }
               siteInfo={ siteInfo }
            />
         </div>
      </div>
   );
};

ResetPassword.propTypes = {
   hasImage: PropTypes.bool,
   onChange: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   onSubmit: PropTypes.func,
   password_confirmation: PropTypes.string,
   siteInfo: PropTypes.object,
};

ResetPassword.defaultProps = {
   hasImage: false,
};

export default ResetPassword;
