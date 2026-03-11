import React from 'react';
import LogInStudent from 'components/modules/logInStudent';
import LogInStudentHeader from 'components/modules/logInStudentHeader';
import PropTypes from 'prop-types';

const LoginStudent = ({
   hasImage, onChange, email, password, onSubmit, rememberMeChecked, handleCheckedChange, coverImg, mainHubTitle,
   showStudentTitle, mainHubTitleColor, siteInfo, error, googleLogin,
}) => {
   return (
      <div className='loginPage' style={ siteInfo && siteInfo.school_theme_mode === 'dark' ? { backgroundColor: '#131313', minHeight: '100vh' } : { backgroundColor: '#f8f8f8', minHeight: '100vh' } }>
         <LogInStudentHeader siteInfo={ siteInfo } />
         <div style={ { paddingTop: '100px', paddingBottom: '24px' } } className='flex justify-center p-l-exl p-r-exl'>
            <LogInStudent
               hasImage={ hasImage }
               onChange={ onChange }
               email={ email }
               password={ password }
               onSubmit={ onSubmit }
               rememberMeChecked={ rememberMeChecked }
               handleCheckedChange={ handleCheckedChange }
               coverImg={ coverImg }
               mainHubTitle={ mainHubTitle }
               googleLogin={ googleLogin }
               showStudentTitle={ showStudentTitle }
               mainHubTitleColor={ mainHubTitleColor }
               siteInfo={ siteInfo }
               error={ error }
            />
         </div>
      </div>
   );
};

LoginStudent.propTypes = {
   hasImage: PropTypes.bool,
   onChange: PropTypes.func,
   googleLogin: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   onSubmit: PropTypes.func,
   rememberMeChecked: PropTypes.bool,
   handleCheckedChange: PropTypes.func,
   coverImg: PropTypes.string,
   mainHubTitle: PropTypes.string,
   showStudentTitle: PropTypes.string,
   mainHubTitleColor: PropTypes.string,
   siteInfo: PropTypes.object,
   error: PropTypes.any,
};

LoginStudent.defaultProps = {
   hasImage: false,
};

export default LoginStudent;
