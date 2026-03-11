import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Router from 'routes/router';
import { inputsSelector } from 'state/modules/login/selectors';
import { setInput as setInputAction } from 'state/modules/login/actions';
import { loginStartOperation, forgotPasswordOperation } from 'state/modules/login/operations';
import { connect } from 'react-redux';
import * as common from 'state/modules/common/selectors';
import ForgetPasswordTemplate from 'views/other/ForgetPassword';

class ForgotPasswordContainer extends Component {
   static propTypes = {
      setInput: PropTypes.func.isRequired,
      forgotPassword: PropTypes.func.isRequired,
      siteInfo: PropTypes.object,
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
         document.querySelector('.forget__password__link').click();
      }
   };

   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }

   handleLogin = (inputs) => {
      const email = {
         email: inputs.email,
      };
      const { forgotPassword } = this.props;
      forgotPassword(email);
   }

   render() {
      const { siteInfo } = this.props;
      const templateProps = siteInfo.other_pages.sign_in.other_page_section.props;
      return (
         <div style={ { height: '100vh' } }>
            <ForgetPasswordTemplate
               onSubmit={ this.handleLogin }
               generalProps={ templateProps }
            />
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      inputs: inputsSelector(state),
      siteInfo: common.siteInfoSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setInput: (key, value) => {
         dispatch(setInputAction(key, value));
      },
      login: (inputs) => {
         dispatch(loginStartOperation(inputs));
      },
      forgotPassword: (email) => {
         dispatch(forgotPasswordOperation(email));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
