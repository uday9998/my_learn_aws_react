import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Router from 'routes/router';
import { inputsSelector, registerInputsSelector } from 'state/modules/login/selectors';
import { setRegisterInputs } from 'state/modules/login/actions';
import { loginStartOperation, registerStudentOperation } from 'state/modules/login/operations';
import { connect } from 'react-redux';
import * as common from 'state/modules/common/selectors';
import { isLocalhost } from 'utils/Helpers';
import { getPageByType } from 'views/pages/OtherPageEdit';
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const baseUrl = document
   .querySelector('meta[name="base_url"]')
   .getAttribute('content');
const apiUrl = isLocalhost() || window.location.hostname === 'vahe21.miestro.loc'
   ? process.env.REACT_APP_API_LOCAL_ENDPOINT
   : baseUrl;
class SignupStudentContainer extends Component {
   static propTypes = {
      setRegisterInput: PropTypes.func.isRequired,
      registerStudent: PropTypes.func.isRequired,
      siteInfo: PropTypes.object,
      history: PropTypes.object,
   }

   componentDidMount() {
      const { siteInfo, setRegisterInput } = this.props;

      if (window.location.hash.split('#email=') && window.location.hash.split('#email=')[1] && window.location.hash.split('#email=')[1].split('#') && window.location.hash.split('#email=')[1].split('#')[0]) {
         setRegisterInput('emailregister', window.location.hash.split('#email=')[1].split('#')[0]);
      }
      if (window.location.hash.split('#name=') && window.location.hash.split('#name=')[1]) {
         setRegisterInput('nameregister', window.location.hash.split('#name=')[1]);
      }
      if (siteInfo.favicon) {
         document.querySelector("link[rel*='icon']").href = siteInfo.favicon;
      }
      window.addEventListener('keydown', this.onKeyDown);
   }

   componentWillUnmount() {
      document.querySelector("link[rel*='icon']").href = '/favicon.ico';
      window.removeEventListener('keydown', this.onKeyDown);
   }

   onKeyDown = (event) => {
      if (event.key === 'Enter') {
         document.querySelector('.SignUp__button').click();
      }
   };


   handleInputChange = (name, value) => {
      const { setRegisterInput } = this.props;
      setRegisterInput(name, value);
   }

   handleLogin = (registerInputs = {}) => {
      if (Object.keys(registerInputs).length) {
         const { registerStudent, history: { location: { state: { freeLessonCourse } = {} } = {} } = {} } = this.props;
         const newRegisterInputs = {
            email: registerInputs.email,
            name: registerInputs.fullname || registerInputs.name,
            password: registerInputs.password,
            password_confirmation: registerInputs.confirmPassword,
            free_lesson_course: freeLessonCourse,
            is_agree: registerInputs.remember,
         // 'g-recaptcha-response': registerInputs['g-recaptcha-response'],
         };

         return registerStudent(newRegisterInputs);
      }
   }

   handleGoogleLogin = () => {
      window.location.href = `${ apiUrl }/api/v1/auth/google`;
   }


   render() {
      const { siteInfo } = this.props;
      const templateProps = siteInfo.other_pages.sign_up.other_page_section.props;
      return (
         // <GoogleReCaptchaProvider
         //    reCaptchaKey={ process.env.REACT_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY }
         //    scriptProps={ {
         //       async: false,
         //       defer: false,
         //       appendTo: 'head',
         //       nonce: undefined,
         //    } }
         // >
         <div style={ { height: '100vh' } }>
            <Content
               googleLogin={ this.handleGoogleLogin }
               onSubmit={ this.handleLogin }
               generalProps={ templateProps }
               siteInfo={ siteInfo }
            />
         </div>
         // </GoogleReCaptchaProvider>
      );
      // return (
      //    <>
      //       <MultiLang>
      //          <SignupStudent
      //             onChange={ (key, value) => this.handleInputChange(key, value) }
      //             emailregister={ emailregister }
      //             passwordregister={ passwordregister }
      //             nameregister={ nameregister }
      //             // eslint-disable-next-line camelcase
      //             password_confirmationregister={ password_confirmationregister }
      //             onSubmit={ this.handleLogin }
      //             coverImg={ siteInfo && siteInfo.logo }
      //             googleLogin={ this.handleGoogleLogin }
      //             mainHubTitle={ siteInfo && siteInfo.banner_title }
      //             showStudentTitle={ siteInfo && siteInfo.show_student_title }
      //             mainHubTitleColor={ siteInfo && siteInfo.main_hub_title_color }
      //             siteInfo={ siteInfo }
      //          />
      //       </MultiLang>
      //    </>
      // );
   }
}

const mapStateToProps = (state) => {
   return {
      inputs: inputsSelector(state),
      registerInputs: registerInputsSelector(state),
      siteInfo: common.siteInfoSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setRegisterInput: (registerkey, registervalue) => {
         dispatch(setRegisterInputs(registerkey, registervalue));
      },
      login: (inputs) => {
         dispatch(loginStartOperation(inputs));
      },
      registerStudent: inputs => dispatch(registerStudentOperation(inputs)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupStudentContainer);

const Content = ({
   onSubmit,
   googleLogin,
   generalProps,
   siteInfo,
}) => {
   const Template = getPageByType('sign_up', siteInfo.other_pages.sign_up.tempplate
      .other_page_theme_name);

   // const { executeRecaptcha } = useGoogleReCaptcha();


   // const handleSignUpWithRecaptcha = (registerInputs = {}) => {
   //    if (!executeRecaptcha) {
   //       ;
   //       return;
   //    }

   //    executeRecaptcha('registrationFormSubmit').then(token => {
   //       onSubmit({ ...registerInputs, 'g-recaptcha-response': token });
   //    });
   // };

   return (
      <Template
         googleLogin={ googleLogin }
         onSubmit={ onSubmit }
         generalProps={ generalProps }
      />
   );
};

Content.propTypes = {
   onSubmit: PropTypes.func,
   googleLogin: PropTypes.func,
   generalProps: PropTypes.object,
   siteInfo: PropTypes.object,
};
