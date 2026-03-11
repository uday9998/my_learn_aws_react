import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Router from 'routes/router';
import { inputsSelector, errorVerificationSelector } from 'state/modules/login/selectors';
import { setInput as setInputAction } from 'state/modules/login/actions';
import { loginStartOperation } from 'state/modules/login/operations';
import { connect } from 'react-redux';
import * as common from 'state/modules/common/selectors';
import { getPageByType } from 'views/pages/OtherPageEdit';
// import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { isLocalhost } from '../../../../utils/Helpers';

const baseUrl = document
   .querySelector('meta[name="base_url"]')
   .getAttribute('content');
const apiUrl = isLocalhost() || window.location.hostname === 'vahe21.miestro.loc'
   ? process.env.REACT_APP_API_LOCAL_ENDPOINT
   : baseUrl;
class LoginStudentContainer extends Component {
   static propTypes = {
      setInput: PropTypes.func.isRequired,
      login: PropTypes.func.isRequired,
      history: PropTypes.object,
      siteInfo: PropTypes.object,
   }


   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      const { siteInfo } = this.props;
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
         event.preventDefault();
         document.querySelector('.login__button').click();
      }
   };


   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }


   handleLogin = (inputs = {}, rememberMeChecked) => {
      const { history } = this.props;
      const { login } = this.props;

      const newInputs = {
         email: inputs.email,
         password: inputs.password,
         remember_me: rememberMeChecked,
         // 'g-recaptcha-response': inputs['g-recaptcha-response'],
      };
      let path = history.location.search;
      if (path) {
         path = path.split('=');
         path = path[1].split('&');
      }

      return login(newInputs, path[0]);
   }

   handleGoogleLogin = () => {
      window.location.href = `${ apiUrl }/api/v1/auth/google`;
   }

   render() {
      const { siteInfo } = this.props;
      const templateProps = siteInfo.other_pages.sign_in.other_page_section.props;
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
               onSubmit={ this.handleLogin }
               googleLogin={ this.handleGoogleLogin }
               generalProps={ templateProps }
               siteInfo={ siteInfo }
            />
         </div>
         //  </GoogleReCaptchaProvider>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      inputs: inputsSelector(state),
      siteInfo: common.siteInfoSelector(state),
      error: errorVerificationSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setInput: (key, value) => {
         dispatch(setInputAction(key, value));
      },
      login: (inputs, path) => dispatch(loginStartOperation(inputs, path)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStudentContainer);

const Content = ({
   onSubmit,
   googleLogin,
   generalProps,
   siteInfo,
}) => {
   // const { executeRecaptcha } = useGoogleReCaptcha();

   // const handleLoginWithRecaptcha = (inputs = {}, rememberMeChecked) => {
   //    if (!executeRecaptcha) {
   //       ;
   //       return;
   //    }

   //    executeRecaptcha('loginFormSubmit').then(token => {
   //       onSubmit({ ...inputs, 'g-recaptcha-response': token }, rememberMeChecked);
   //    });
   // };

   const Template = getPageByType('sign_in', siteInfo.other_pages.sign_in.tempplate
      .other_page_theme_name);
   return (
      <Template
         onSubmit={ onSubmit }
         googleLogin={ googleLogin }
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
