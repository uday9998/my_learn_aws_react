import React from 'react';
import SignUpStudent from 'components/modules/signUpStudent';
import LogInStudentHeader from 'components/modules/logInStudentHeader';
import PropTypes from 'prop-types';

const SignupStudent = ({
   // eslint-disable-next-line camelcase
   hasImage, onChange, emailregister, passwordregister, onSubmit, nameregister, password_confirmationregister,
   coverImg, mainHubTitle, showStudentTitle, mainHubTitleColor, siteInfo, googleLogin,
}) => {
   return (
      <div className='loginPage' style={ siteInfo && siteInfo.school_theme_mode === 'dark' ? { backgroundColor: '#131313', minHeight: '100vh' } : { backgroundColor: '#f8f8f8', minHeight: '100vh' } }>
         <LogInStudentHeader title='Log in' isLogin={ true } siteInfo={ siteInfo } />
         <div style={ { paddingTop: '100px', paddingBottom: '24px' } } className='flex justify-center p-l-exl p-r-exl'>
            <SignUpStudent
               hasImage={ hasImage }
               onChange={ onChange }
               emailregister={ emailregister }
               passwordregister={ passwordregister }
               nameregister={ nameregister }
               // eslint-disable-next-line camelcase
               password_confirmationregister={ password_confirmationregister }
               onSubmit={ onSubmit }
               googleLogin={ googleLogin }
               coverImg={ coverImg }
               mainHubTitle={ mainHubTitle }
               showStudentTitle={ showStudentTitle }
               mainHubTitleColor={ mainHubTitleColor }
               siteInfo={ siteInfo }
            />
         </div>
      </div>
   );
};

SignupStudent.propTypes = {
   hasImage: PropTypes.bool,
   onChange: PropTypes.func,
   emailregister: PropTypes.string,
   passwordregister: PropTypes.string,
   nameregister: PropTypes.string,
   password_confirmationregister: PropTypes.string,
   onSubmit: PropTypes.func,
   coverImg: PropTypes.string,
   mainHubTitle: PropTypes.string,
   showStudentTitle: PropTypes.string,
   mainHubTitleColor: PropTypes.string,
   siteInfo: PropTypes.object,
   googleLogin: PropTypes.func,
};

SignupStudent.defaultProps = {
   hasImage: false,
};

export default SignupStudent;
