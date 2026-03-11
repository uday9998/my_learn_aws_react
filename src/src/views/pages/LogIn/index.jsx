import React from 'react';
import Login from 'components/modules/logIn';
import PropTypes from 'prop-types';

const LogIn = ({
   hasImage, onChange, email, password, onSubmit,
}) => {
   return (
      <div className='loginPage' style={ { backgroundColor: '#272727', minHeight: '100vh' } }>
         <div style={ { paddingTop: '100px' } } className='flex justify-center p-l-exl p-r-exl'>
            <Login
               hasImage={ hasImage }
               onChange={ onChange }
               email={ email }
               password={ password }
               onSubmit={ onSubmit }
            />
         </div>
      </div>
   );
};

LogIn.propTypes = {
   hasImage: PropTypes.bool,
   onChange: PropTypes.func,
   email: PropTypes.string,
   password: PropTypes.string,
   onSubmit: PropTypes.func,
};

LogIn.defaultProps = {
   hasImage: false,
};

export default LogIn;
